import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import { repeat } from 'lit/directives/repeat.js'

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
  `

  @property({ type: Array })
  treedata?: any = []

  @property({ type: Boolean })
  ismulselect: boolean = false

  // reflect: true
  @property({ type: Number })
  expandlevel: number = 0

  @state()
  protected _status: any = {
    name: 'userName',
    openid: 'woOUQJEAAATELkAo5cgbkznEdBjmtgcA'
  }

  test () {
    // this.treedata.push({
    //   name: 'Level one 4',
    //   id: 'Level one 4',
    //   selected: true
    // })
    this._status.name = this._status.name + 'x'
    // this.requestUpdate() // 强制更新
  }

  getValue () {
    return this.treedata
  }

  render () {
    return html`
      <button class="demo" @click="${this.test}">
        test
        ${this._status.name}
      </button>
      <div class="tree">
        ${
          this?.treedata?.length
          ?
          html`
            ${repeat(this.treedata, (item: any) => item.id, (item, index) => html`
              <wxworksuite-treeitem
                .item="${item}"
                ismulselect="${this.ismulselect}"
              >
              </wxworksuite-treeitem>
            `)}
          `
          :
          html`<span class="tree-none">暂无数据</span>`
        }
      </div>
    `
  }
}
