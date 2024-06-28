import { LitElement, css, html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'

// import icon_right from './img/icon_right.png'

const icon_right = require('./img/icon_right.png')
console.log(icon_right)

export default class WxworksuiteTreeitem extends LitElement {

  static componentName: string = 'wxworksuite-treeitem'
  static register () {
    if (!window.customElements.get(WxworksuiteTreeitem.componentName)) {
      window.customElements.define(WxworksuiteTreeitem.componentName, WxworksuiteTreeitem)
    }
  }

  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      display: block
    }

.tree-item {
  display: block;
}
.tree-item-line {
  display: flex;
  width: 100%;
  height: 54px;
  line-height: 54px;
  fone-size: 16px;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  border-bottom: 1px solid #E5E5E5;
}
.tree-item-line-select {
  background-color: rgba(000, 000, 000, 0.2);
}
.tree-item-line:hover {
  background-color: rgba(000, 000, 000, 0.1);
}
.tree-item-line:focus {
  background-color: rgba(000, 000, 000, 0.1);
}

.tree-item-icon {
  flex: none;
  // width: 20px;
  // height: 20px;
  // background: red;

  font-size: 0;
  width: 0;
  height: 0;
  line-height: 0;
  overflow: hidden;
  display: inline-block;
  border: 0 dashed transparent;
  border-width: 6px;
  border-left-style: solid;
  border-left-color: #ccc;
  margin: 0 4px;
}
.tree-item-icon-down {
  transform: rotate(90deg);
  transition: all 0.3s;
}
.tree-item-icon-left {
  transition: all 0.3s;
}
.tree-item-name {
  flex: 1;
  color: #666;
  word-break: keep-all;
}
.tree-item-children {
  padding-left: 20px;
}
.tree-item-name-noicon {
  padding-left: 20px;
}

  `

  @property({ type: Object, reflect: true })
  item: any = {}

  @property({ type: Boolean })
  isexpand: boolean = false

  @property({ type: Boolean })
  ismulselect: boolean = false

  @state()
  protected _isFold: boolean = false

  constructor () {
    super()
  }

  connectedCallback () {
    super.connectedCallback()

    this._isFold = this.isexpand
    console.log('item', this.item)
  }

  private toggleExpand () {
    this._isFold = !this._isFold
  }

  private clickItem () {
    console.log(this.item)
    // console.log(this.item)
    if (!this.ismulselect) {
      this.item.selected = true
    } else {
      this.item.checked = true
    }
    this.requestUpdate() // 强制更新
  }

  private test () {
    console.log(this)
  }

  render () {
    return html`
      <div class="tree-item">
        <div class="tree-item-line" tabindex="-1" class=${classMap({
          'tree-item-line': true,
          'tree-item-line-select': this.item.selected
        })}>
          ${
            this.item?.children?.length
            ?
            html`
              <i
                @click="${this.toggleExpand}"
                class=${classMap({
                  'tree-item-icon': true,
                  'tree-item-icon-left': this._isFold,
                  'tree-item-icon-down': !this._isFold
                })}
              >
              </i>
            `
            :
            ''
          }

          <span
            @click="${this.clickItem}"
            class=${classMap({
              'tree-item-name': true,
              'tree-item-name-noicon': !this.item?.children?.length
            })}
          >
            ${this.item.name}
          </span>
        </div>

        <div
          class="tree-item-children"
          style=${styleMap({
            display: this._isFold ? 'none' : 'block',
          })}
        >
          ${
            this.item?.children?.length
            ?
            html`
              ${this.item.children.map((item2: any) => {
                return html`
                  <wxworksuite-treeitem
                    .item="${item2}"
                    ismulselect="${this.ismulselect}"
                  >
                  </wxworksuite-treeitem>
                `
              })}
            `
            :
            ''
          }
        </div>
      </div>

    `
  }
}
