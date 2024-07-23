import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import jssdk from '../../jssdk'

export default class WxworksuiteBaseOpendata extends LitElement {

  static componentName: string = 'wxworksuite-base-opendata'
  static register () {
    if (!window.customElements.get(WxworksuiteBaseOpendata.componentName)) {
      window.customElements.define(WxworksuiteBaseOpendata.componentName, WxworksuiteBaseOpendata)
    }
  }

  static styles = css``

  @property({ type: String })
  openid: string = ''

  @property({ type: String })
  type: string = '' // userName | departmentName

  @property({ type: String })
  mode: string = 'close' // open | close

  @state()
  protected _isCanUseWxworkSuite = true

  @state()
  protected _topWWOpenData: any = null

  get wwopendataRef () {
    return this.renderRoot?.querySelector('ww-open-data') ?? null
  }

  async connectedCallback () {
    super.connectedCallback()
    // console.log('connectedCallback')

    jssdk.init().then(({ topWWOpenData }) => {
      this._isCanUseWxworkSuite = true
      if (this.wwopendataRef) {
        if (topWWOpenData) {
          this._topWWOpenData = topWWOpenData
          topWWOpenData.bind(this.wwopendataRef)
          // topWWOpenData.on('update', (event: any) => {
          //   const openid = event.detail.element.getAttribute('openid')
          //   console.log('渲染数据发生变更', event, openid)
          //   if (this.type === 'departmentName') {
          //     console.log('渲染数据发生变更', event)
          //     console.log('渲染数据发生变更', openid)
          //   }
          // })
          topWWOpenData.on('error', (event: any) => {
            // console.error('获取数据失败', event)
            this._isCanUseWxworkSuite = false
          })
        }
      }
    }).catch((err) => {
      // console.error('jssdk.init() fail', err)
      this._isCanUseWxworkSuite = false
    })
  }

  updated (changedProperties: any) {
    // 页面在浏览器，在 iOS，Mac，Android 上面的企业微信都表现正常，但是在 windows 企业微信下，会偶发不能渲染通讯录控件内容
    // 解答：由于 企业微信的 windows 客户端浏览器内核不支持 customElements，每次更新了 open-data 元素后，需要用 bind 或者 bindAll 接口对目标元素进行一次更新，这样才能保证 open-data 元素实时渲染正确的数据。遇到上面的情况，请检查一下页面代码，看看有没有可能出现时序问题：先执行了 bind，然后才渲染出对应的 open-data 元素
    if (changedProperties.has('openid')) {
      if (this.wwopendataRef && this._isCanUseWxworkSuite && this._topWWOpenData) {
        this._topWWOpenData.bind(this.wwopendataRef)
      }
    }
  }

  // private test (e: Event) {
  //   // console.log(this.shadowRoot)
  //   // console.log(this.renderRoot)
  //   // console.log(this.shadowRoot?.querySelector('#aaaa'))
  //   // console.log(this.shadowRoot?.querySelector('ww-open-data'))
  //   // debugger
  //   const value = this.getValue()
  //   console.log(value)
  //   this._isCanUseWxworkSuite = !this._isCanUseWxworkSuite
  // }

  getValue () {
    const data: any = {
      type: this.type,
      openid: this.openid,
      name: null
    }

    if (this.wwopendataRef) {
      // console.log(this.wwopendataRef)
      // debugger
      const name = this.wwopendataRef?.shadowRoot?.innerHTML || ''
      if (name !== this.openid) {
        data.name = name
      }
    }
    return data
  }

  setValue (obj: any) {
    this.type = obj.type
    this.openid = obj.openid
  }

  render () {
    // return html`<p>Hello, ${this.foo}!</p>`
    // console.log(this.openid)
    // console.log(this.type)
    // console.log(this.mode)
    // <button @click="${this.test}">test</button>
    // ${this._isCanUseWxworkSuite ? html`<ww-open-data type="${this.type}" openid="${this.openid}" mode="${this.mode}" />` : this.openid}
    // ${ this._isCanUseWxworkSuite ? html`true` : 'false' }
    return html`
      ${
        this._isCanUseWxworkSuite
        ?
        html`<ww-open-data type="${this.type}" openid="${this.openid}" mode="${this.mode}" />`
        :
        this.openid
      }
    `
  }
}
