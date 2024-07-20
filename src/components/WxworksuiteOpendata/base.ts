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

  static styles = css`
    :host {}
  `

  @property({ type: String })
  openid: string = ''

  @property({ type: String })
  type: string = '' // userName | departmentName

  @property({ type: String })
  mode: string = 'close' // open | close

  @state()
  protected _isCanUseWxworkSuite = true

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
          topWWOpenData.bind(this.wwopendataRef)
          // topWWOpenData.on('update', (event: any) => {
          //   const openid = event.detail.element.getAttribute('openid')
          //   console.log('渲染数据发生变更', event, openid)
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
