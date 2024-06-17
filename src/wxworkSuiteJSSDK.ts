import { apaasAxios as axios } from './axios'
import { globalOptions } from './install'

class WxworkSuiteJSSDK {
  public lastConfigUrl = ''
  public lastConfigJsApiList: string[] = []

  public lastAgentConfigUrl = ''
  public lastAgentConfigJsApiList: string[] = []

  config (jsApiList: string[] = []) {
    // debugger
    return new Promise(async (resolve, reject) => {
      const url = location.origin + location.pathname + location.search
      const isin = jsApiList.every((item) => {
        return this.lastConfigJsApiList.some((item2) => item2 === item)
      })
      if (isin && this.lastConfigUrl === url) {
        resolve('wx.config success')
        return
      }

      let newJsApiList: string[] = []
      if (!isin) {
        newJsApiList = [...new Set([...this.lastConfigJsApiList, ...jsApiList])]
      }

      const wxworksuitedata = globalOptions.getWxworkSuiteData()

      let signature: IAny = await axios.post('/api/wxwork/common/getJsapiSignature', {
        url: url,
        suiteKey: wxworksuitedata.suiteKey,
        corpId: wxworksuitedata.corpId
      })
      signature = signature?.data?.data || {}
      // console.log(signature)

      window.wx.config({
        beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        // debug: false,
        appId: signature.corpid, // 必填，企业微信的corpID
        timestamp: signature.timestamp, // 必填，生成签名的时间戳
        nonceStr: signature.nonceStr, // 必填，生成签名的随机串
        signature: signature.signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
        jsApiList: newJsApiList // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
      })
      window.wx.ready((res: any) => {
        console.log('wx.config success', res)
        this.lastConfigUrl = url
        this.lastConfigJsApiList = newJsApiList
        resolve('wx.config success')
      })
      window.wx.error((err: any) => {
        console.error('wx.config fail', err)
        reject(new Error('wx.config fail'))
      })
      setTimeout(() => {
        reject(new Error('wx.config fail timeout 3000'))
      }, 3000)
    })
  }

  agentConfig (jsApiList: string[] = []) {
    return new Promise(async (resolve, reject) => {
      const url = location.origin + location.pathname + location.search
      const isin = jsApiList.every((item) => {
        return this.lastAgentConfigJsApiList.some((item2) => item2 === item)
      })
      if (isin && this.lastAgentConfigUrl === url) {
        resolve('wx.agentConfig success')
        return
      }
      let newJsApiList: string[] = []
      if (!isin) {
        newJsApiList = [...new Set([...this.lastAgentConfigJsApiList, ...jsApiList])]
      }

      const wxworksuitedata = globalOptions.getWxworkSuiteData()

      let signature: IAny = await axios.post('/api/wxwork/common/getSuiteJsapiSignature', {
        url: url,
        suiteKey: wxworksuitedata.suiteKey,
        corpId: wxworksuitedata.corpId
      })
      signature = signature?.data?.data || {}

      window.wx.agentConfig({
        corpid: signature.corpid, // 必填，企业微信的corpid，必须与当前登录的企业一致
        agentid: signature.agentid, // 必填，企业微信的应用id （e.g. 1000247）
        timestamp: signature.timestamp, // 必填，生成签名的时间戳
        nonceStr: signature.nonceStr, // 必填，生成签名的随机串
        signature: signature.signature, // 必填，签名，见附录-JS-SDK使用权限签名算法
        jsApiList: newJsApiList, // 必填，传入需要使用的接口名称
        success: (res: any) => {
          console.log('wx.agentConfig success', res)
          this.lastAgentConfigUrl = url
          this.lastAgentConfigJsApiList = newJsApiList
          resolve('wx.agentConfig success')
        },
        fail: (error: Error) => {
          console.error('wx.agentConfig fail', error)
          reject(new Error('wx.agentConfig fail'))
        }
      })
    })
  }

  public isHack = false

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

  public isLoadJs = false

  loadJsUrl (url: string) {
    return new Promise(async (resolve, reject) => {
      const script: any = document.createElement('script')
      script.setAttribute('type', 'text/javascript')
      script.setAttribute('src', url)
      document.getElementsByTagName('head')[0].appendChild(script)
      script.onload = script.onreadystatechange = () => {
        const st = script.readyState
        if (st && st !== 'loaded' && st !== 'complete') return
        script.onload = script.onreadystatechange = null
        resolve('success')
      }
    })
  }

  async initFun (jsApiList: string[] = []) {
    return new Promise(async (resolve, reject) => {
      if (!this.isHack) {
        this.hack()
        this.isHack = true
      }

      if (!this.isLoadJs) {
        await this.loadJsUrl('//res.wx.qq.com/open/js/jweixin-1.2.0.js')
        await this.loadJsUrl('//open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js')
        this.isLoadJs = true
      }

      try {
        if (/MicroMessenger/i.test(navigator.userAgent)) {
          await this.config(jsApiList)
        }
        await this.agentConfig(jsApiList)
      } catch (err) {
        this.reset()
        reject(err)
      }

      window.WWOpenData.checkSession({
        success: () => {
          console.info('open-data 登录态校验成功')
          resolve('success')
        },
        fail: (err: any) => {
          console.error('open-data 登录态过期')
          this.reset()
          reject(err)
        }
      })
    })
  }

  initPro: any = null

  async init (jsApiList: string[] = []) {
    // 兼容同时间发起多个
    if (this.initPro) {
      return this.initPro
    }

    this.initPro = this.initFun()
    return await this.initPro
  }

  reset () {
    this.lastConfigUrl = ''
    this.lastConfigJsApiList = []
    this.lastAgentConfigUrl = ''
    this.lastAgentConfigJsApiList = []
    this.initPro = null
  }
}

export default new WxworkSuiteJSSDK()
