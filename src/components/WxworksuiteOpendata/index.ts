import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import jssdk from '../../jssdk'

// @customElement('wxworksuite-opendata')
export default class WxworksuiteOpendata extends LitElement {

  static componentName: string = 'wxworksuite-opendata'
  static register () {
    if (!window.customElements.get(WxworksuiteOpendata.componentName)) {
      window.customElements.define(WxworksuiteOpendata.componentName, WxworksuiteOpendata)
    }
  }

  static styles = css`
    :host {
      // color: red;
    }
  `

  declare openid: string
  declare type: string
  declare mode: string
  static properties = {
    openid: {
      type: String
    },
    type: {
      type: String
    },
    mode: {
      type: String // open | close
    }
  }

  constructor () {
    super()
    this.openid = ''
    this.type = ''
    this.mode = 'close'
  }

  // private wwopendataRef: any = null
  get wwopendataRef () {
    return this.renderRoot?.querySelector('ww-open-data') ?? null
  }

  async connectedCallback () {
    super.connectedCallback()
    console.log('connectedCallback')

    await jssdk.init().then((res: any) => {
      console.log('window.WWOpenData', window.WWOpenData)
      // this.wwopendataRef = this.shadowRoot?.querySelector('ww-open-data')

      if (window.WWOpenData && this.wwopendataRef) {
        window.WWOpenData.bind(this.wwopendataRef)
        // window.WWOpenData.on('update', update)
        // window.WWOpenData.on('error', () => {
        //   console.error('获取数据失败')
        // })
      }
    })
  }

  // 当组件从 DOM 文档移除后调用。
  disconnectedCallback () {
    super.disconnectedCallback()
    console.log('disconnectedCallback')
  }

  private test (e: Event) {
    // console.log(this.shadowRoot)
    // console.log(this.renderRoot)
    // console.log(this.shadowRoot?.querySelector('#aaaa'))
    // console.log(this.shadowRoot?.querySelector('ww-open-data'))
    // debugger
    const value = this.getValue()
    console.log(value)
  }

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

  render () {
    // return html`<p>Hello, ${this.foo}!</p>`
    // return html`<p>Hello,!</p>`
    // console.log(this.openid)
    // console.log(this.type)
    // console.log(this.mode)
    // <div div id = "aaaa" @click="${this.test}" >
    //   ${ this.openid }, ${ this.type } !
    // </div>
    return html`
      <ww-open-data type="${this.type}" openid="${this.openid}" mode="${this.mode}" />
    `
  }
}

// window.customElements.define('wxworksuite-opendata', WxworksuiteOpendata)
