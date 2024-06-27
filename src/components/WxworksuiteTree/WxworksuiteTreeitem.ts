import { LitElement, css, html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'

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

.treeNodeItem {
  width: 100%;
  height: auto;
  padding-left: 12px;
}
.iconAndName {
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  box-sizing: border-box;
}
.treeNodeItemIcon {
  margin-right: 4px;
}
.iconDown {
  transform: rotate(90deg);
  transition: all 0.3s;
}
.iconLeft {
  transition: all 0.3s;
}
.treeNodeItemName {
  color: #666;
  word-break: keep-all;
}
.noChildrenIcon {
  margin-left: 20px;
}
.iconAndName:hover {
  background-color: #f5f7fa;
}
.iconAndName:focus {
  background-color: #f5f7fa;
}

  `

  @property({ type: Object })
  item?: any = {}

  @property({ type: Boolean })
  isexpand: boolean = false

  @property({ type: Number })
  expandlevel: number = 0

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

  private clickIconFold () {
    this._isFold = !this._isFold
    // this.$emit("fold", this.item, this.isFold ? "折叠咯" : "展开啦");
  }

  private clickTree () {
    this.clickIconFold()
    // this.$emit("clickTree", this.item)
  }

  private test () {
    console.log(this)
  }

  render () {
    return html`
      <div class="treeNodeItem">
        <div class="iconAndName" tabindex="-1" @click="${this.clickTree}">
          <!-- 有树子节点才去渲染图标 -->
          ${
            (this.item.children && this.item.children.length)
            ?
            html`
              <i
                v-if="item.children"
                @click="${this.clickIconFold}"
                class=${classMap({
                  treeNodeItemIcon: true,
                  'el-icon-caret-right': true,
                  'iconLeft': this._isFold,
                  'iconDown': !this._isFold
                })}
              >
              </i>
            `
            :
            ''
          }

          <span
            class=${classMap({
              treeNodeItemName: true,
              'noChildrenIcon': !this.item.children.length
            })}
          >
            ${this.item.label}
          </span>
        </div>

        <div
          class="childrenTreeNode"
          style=${styleMap({
            display: this._isFold ? 'none' : 'block',
          })}
        >
          ${
            (this.item.children && this.item.children.length)
            ?
            html`
              ${this.item.children.map((item2: any) => {
                return html`
                  <wxworksuite-treeitem
                    item="${JSON.stringify(item2)}"
                    expandlevel="${this.expandlevel}"
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
