import { axios } from './axios'
import { cloneDeep } from 'lodash-es'

// 是否企微软件内 包括电脑端和APP端
const isWxwork = () => {
  return navigator.userAgent.indexOf('wxwork') >= 0
}

// 是否在电脑端企微软件内
const isWxworkPc = () => {
  return isWxwork() && navigator.userAgent.indexOf('Mobile') === -1
}

// 是否在企微APP内
const isWxworkApp = () => {
  return isWxwork() && navigator.userAgent.indexOf('Mobile') >= 0
}

class Jssdk {
  private isHack = false

  hack () {
    (Element.prototype as any)._attachShadow = Element.prototype.attachShadow
    Element.prototype.attachShadow = function (e) {
      // console.log(e)
      // console.log(this)
      // debugger
      if (this.tagName === 'WW-OPEN-DATA' && this.getAttribute('mode') === 'open') {
        return (this as any)._attachShadow({ mode: 'open' })
      } else {
        return (this as any)._attachShadow(e)
      }
    }
  }

  private isLoadJs = false

  loadJsUrl (url: string, property: any, whichWindow: any = window) {
    return new Promise(async (resolve, reject) => {
      const script: any = whichWindow.document.createElement('script')
      script.setAttribute('type', 'text/javascript')
      script.setAttribute('src', url)
      if (property) {
        for (const x in property) {
          script.setAttribute(x, property[x])
        }
      }
      whichWindow.document.getElementsByTagName('head')[0].appendChild(script)
      script.onload = script.onreadystatechange = () => {
        const st = script.readyState
        if (st && st !== 'loaded' && st !== 'complete') return
        script.onload = script.onreadystatechange = null
        resolve('success')
      }
    })
  }

  private lastConfigUrl = ''
  private lastConfigJsApiList: string[] = ['getLocation']

  private lastAgentConfigUrl = ''
  private lastAgentConfigJsApiList: string[] = ['getLocation']

  private config (jsApiList: string[] = [], url: string) {
    // debugger
    return new Promise(async (resolve, reject) => {
      try {
        const wxworksuitedata = this.getData()

        let signature: IAny = await axios.post('/api/wxwork/common/getJsapiSignature', {
          url: url,
          suiteKey: wxworksuitedata.suiteKey,
          corpId: wxworksuitedata.corpId
        })
        signature = signature?.data?.data || {}
        // console.log(signature)

        const topWindow = this.getTopWindow()
        topWindow.wx.config({
          beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          // debug: false,
          appId: signature.corpid, // 必填，企业微信的corpID
          timestamp: signature.timestamp, // 必填，生成签名的时间戳
          nonceStr: signature.nonceStr, // 必填，生成签名的随机串
          signature: signature.signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
          jsApiList: cloneDeep(jsApiList) // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
          // jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        })
        topWindow.wx.ready((res: any) => {
          this.lastConfigUrl = url
          this.lastConfigJsApiList = cloneDeep(jsApiList)
          console.log('wx.config success')
          resolve('wx.config success')
        })
        topWindow.wx.error((err: any) => {
          console.error('wx.config fail', err)
          reject(err)
        })
        setTimeout(() => {
          reject(new Error('wx.config fail timeout 3000'))
        }, 3000)
      } catch (err) {
        reject(err)
      }
    })
  }

  private agentConfig (jsApiList: string[] = [], url: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const wxworksuitedata = this.getData()
        let signature: IAny = await axios.post('/api/wxwork/common/getSuiteJsapiSignature', {
          url: url,
          suiteKey: wxworksuitedata.suiteKey,
          corpId: wxworksuitedata.corpId
        })
        signature = signature?.data?.data || {}

        // agentConfig 和 config 必须在最上层的 window 上注册
        const topWindow = this.getTopWindow()
        topWindow.wx.agentConfig({
          corpid: signature.corpid, // 必填，企业微信的corpid，必须与当前登录的企业一致
          agentid: signature.agentid, // 必填，企业微信的应用id （e.g. 1000247）
          timestamp: signature.timestamp, // 必填，生成签名的时间戳
          nonceStr: signature.nonceStr, // 必填，生成签名的随机串
          signature: signature.signature, // 必填，签名，见附录-JS-SDK使用权限签名算法
          jsApiList: cloneDeep(jsApiList), // 必填，传入需要使用的接口名称
          success: (res: any) => {
            this.lastAgentConfigUrl = url
            this.lastAgentConfigJsApiList = cloneDeep(jsApiList)
            console.log('wx.agentConfig success', res)
            resolve('wx.agentConfig success')
          },
          fail: (error: Error) => {
            console.error('wx.agentConfig fail', error)
            reject(error)
          }
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  private checkSession () {
    return new Promise(async (resolve, reject) => {
      const topWWOpenData = this.getTopWWOpenData()
      const topWindow = this.getTopWindow()
      if (topWWOpenData) {
        topWWOpenData.checkSession({
          success: () => {
            console.log('open-data 登录态校验成功')
            resolve({
              topWindow,
              topWWOpenData,
            })
          },
          fail: (err: any) => {
            console.error('open-data 登录态过期')
            reject(err)
          }
        })
      } else {
        reject(new Error('不存在 WWOpenData，请排查。'))
      }
    })
  }

  private async initFun (jsApiList: string[] = [], url: string) {
    return new Promise(async (resolve, reject) => {
      if (!this.isHack) {
        this.hack()
        this.isHack = true
      }

      if (!this.isLoadJs) {
        // 兼容iframe
        // agentConfig 和 config 须引入 jweixin.js 且必须在 top window 上注册
        // 执行 jssdk 的命名空间也必须在 top window 上拿，如 window.top.wx window.top.WWOpenData
        // jwxwork.js 是生成 ww-open-data 组件的代码 必须在当前 window 引入
        if (window.top && window.top !== window) {
          if (isWxworkApp()) {
            await this.loadJsUrl('//res.wx.qq.com/wwopen/js/jsapi/jweixin-1.0.0.js', {
              referrerpolicy: 'origin'
            }, window.top)
          } else {
            await this.loadJsUrl('//res.wx.qq.com/open/js/jweixin-1.2.0.js', {
              referrerpolicy: 'origin'
            }, window.top)
          }
          await this.loadJsUrl('//open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js', {
            referrerpolicy: 'origin'
          })
        } else {
          if (isWxworkApp()) {
            await this.loadJsUrl('//res.wx.qq.com/wwopen/js/jsapi/jweixin-1.0.0.js', {
              referrerpolicy: 'origin'
            })
          } else {
            await this.loadJsUrl('//res.wx.qq.com/open/js/jweixin-1.2.0.js', {
              referrerpolicy: 'origin'
            })
          }
          await this.loadJsUrl('//open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js', {
            referrerpolicy: 'origin'
          })
        }

        this.isLoadJs = true
      }

      try {
        if (/MicroMessenger/i.test(navigator.userAgent)) {
          await this.config(jsApiList, url)
        }
        await this.agentConfig(jsApiList, url)
        const res = await this.checkSession()
        resolve(res)
      } catch (err) {
        // this.isFail = true
        this.reset()
        reject(err)
      }
    })
  }

  private initPro: any = null

  async init (jsApiList: string[] = []) {
    if (!this.checkData()) {
      throw new Error('The current tenant is not a wxworksuite tenant.')
    }

    jsApiList = [...new Set([...this.lastAgentConfigJsApiList, ...jsApiList])]
    const url = location.origin + location.pathname + location.search
    const isin = jsApiList.every((item) => {
      return this.lastAgentConfigJsApiList.some((item2) => item2 === item)
    })

    // console.log('jsApiList', jsApiList)
    // console.log('lastAgentConfigJsApiList', this.lastAgentConfigJsApiList)

    if (isin && this.lastAgentConfigUrl === url) {
      try {
        const res = await this.checkSession()
        return res
      } catch (err) {
        // this.isFail = true
        this.reset()
        throw err
      }

    } else {
      // 兼容同时间发起多个
      if (this.initPro) {
        return this.initPro
      }
      this.initPro = this.initFun(jsApiList, url)
      const res = await this.initPro
      this.initPro = null
      return res
    }
  }

  getTopWWOpenData () {
    return window?.top?.WWOpenData || window?.WWOpenData || null
  }

  getTopWindow () {
    return window.top || window
  }

  private reset () {
    this.lastConfigUrl = ''
    this.lastConfigJsApiList = ['getLocation']
    this.lastAgentConfigUrl = ''
    this.lastAgentConfigJsApiList = ['getLocation']
    this.initPro = null
  }

  public getData () {
    const wxworksuitedata = window.localStorage.getItem('wxworksuitedata')
    if (wxworksuitedata) {
      return JSON.parse(wxworksuitedata) as IAny
    } else {
      return {
        corpId: '',
        suiteKey: 'smartSFA'
      }
    }
  }

  public setData (obj: any) {
    obj.suiteKey = this.getData().suiteKey
    window.localStorage.setItem('wxworksuitedata', JSON.stringify(obj))
  }

  public removeData () {
    window.localStorage.removeItem('wxworksuitedata')
  }

  public checkData () {
    const data = this.getData()
    return !!data.corpId
    // return false
  }
}

const jssdk = new Jssdk()

const isWxworkSuiteTenant = jssdk.checkData.bind(jssdk)

export {
  jssdk as default,
  isWxworkSuiteTenant,
  isWxwork,
  isWxworkPc,
  isWxworkApp
}

