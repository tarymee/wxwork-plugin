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
      // display: inline-block;
      // color: red;
    }
  `

  declare openid: string
  declare type: string
  declare mode: string
  declare isCanUseWxworkSuite: boolean
  static properties = {
    openid: {
      type: String
    },
    type: {
      type: String
    },
    mode: {
      type: String // open | close
    },
    isCanUseWxworkSuite: {
      type: Boolean
    }
  }

  constructor () {
    super()
    this.openid = ''
    this.type = ''
    this.mode = 'close'
    this.isCanUseWxworkSuite = false
  }

  // private wwopendataRef: any = null
  get wwopendataRef () {
    return this.renderRoot?.querySelector('ww-open-data') ?? null
  }

  async connectedCallback () {
    super.connectedCallback()
    // console.log('connectedCallback')

    await jssdk.init().then((res: any) => {
      this.isCanUseWxworkSuite = true
      // console.log('window.WWOpenData', window.WWOpenData)

      if (window.WWOpenData && this.wwopendataRef) {
        window.WWOpenData.bind(this.wwopendataRef)
        // window.WWOpenData.on('update', update)
        // window.WWOpenData.on('error', () => {
        //   console.error('获取数据失败')
        // })
      }
    }).catch((err) => {
      // console.error(err)
      this.isCanUseWxworkSuite = false
    })
  }

  // 当组件从 DOM 文档移除后调用。
  disconnectedCallback () {
    super.disconnectedCallback()
    // console.log('disconnectedCallback')
  }

  private test (e: Event) {
    // console.log(this.shadowRoot)
    // console.log(this.renderRoot)
    // console.log(this.shadowRoot?.querySelector('#aaaa'))
    // console.log(this.shadowRoot?.querySelector('ww-open-data'))
    // debugger
    const value = this.getValue()
    console.log(value)
    this.isCanUseWxworkSuite = !this.isCanUseWxworkSuite
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
    // ${this.isCanUseWxworkSuite ? html`<ww-open-data type="${this.type}" openid="${this.openid}" mode="${this.mode}" />` : this.openid}
    // ${ this.isCanUseWxworkSuite ? html`true` : 'false' }
    return html`
      ${ this.isCanUseWxworkSuite ? html`<ww-open-data type="${this.type}" openid="${this.openid}" mode="${this.mode}" />` : this.openid }
    `
  }
}

// window.customElements.define('wxworksuite-opendata', WxworksuiteOpendata)
