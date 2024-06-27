import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'

// @customElement('wxworksuite-tree')
export default class WxworksuiteTree extends LitElement {

  static componentName: string = 'wxworksuite-tree'
  static register () {
    if (!window.customElements.get(WxworksuiteTree.componentName)) {
      window.customElements.define(WxworksuiteTree.componentName, WxworksuiteTree)
    }
  }

  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      display: block
    }
    .demo {
      margin: 5px 10px;
    }
  `

  @property({ type: Array })
  data?: any = []

  @property({ type: Boolean })
  ismulselect: boolean = false

  // reflect: true
  @property({ type: Number })
  expandlevel: number = 0




  @state()
  protected _active = '内部属性值'

  @state()
  protected _opendata: any = {
    type: 'userName',
    openid: 'woOUQJEAAATELkAo5cgbkznEdBjmtgcA'
  }

  get computedvalue () {
    return 'computedvalue'
  }

  constructor () {
    super()
  }

  firstUpdated () {
    console.log('firstUpdated')
    this.print()
  }

  print () {
    console.log('firstUpdated')
    console.log('this', this)
  }

  connectedCallback () {
    super.connectedCallback()
  }

  disconnectedCallback () {
    super.disconnectedCallback()
  }

  attributeChangedCallback (name: any, oldValue: any, newValue: any) {
    console.log('属性变化', name, oldValue, newValue)
  }

  private change () {

  }

  private test () {

  }

  render () {
    return html`
      <div class="my-tree-wrap">
        ${
          (this.data && this.data.length)
          ?
          html`
              ${this.data.map((item: any) => {
                return html`
                  <wxworksuite-treeitem
                    item="${JSON.stringify(item)}"
                    expandlevel="${this.expandlevel}"
                    ismulselect="${this.ismulselect}"
                  >
                  </wxworksuite-treeitem>
                `
              })}
          `
          :
          html`<span class="noData">😭暂无数据😭</span>`
        }
      </div>
    `
  }
}
