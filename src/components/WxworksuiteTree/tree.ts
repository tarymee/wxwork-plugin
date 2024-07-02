import { LitElement, css, html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import { cloneDeep } from 'lodash-es'
import { listToTree } from './utils'

export default class WxworksuiteTree extends LitElement {

  static componentName: string = 'wxworksuite-tree'
  static register () {
    if (!window.customElements.get(WxworksuiteTree.componentName)) {
      window.customElements.define(WxworksuiteTree.componentName, WxworksuiteTree)
    }
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    .tree {
      display: block;
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      position: relative;
    }
    .tree-search {
      width: 100%;
      box-sizing: border-box;
      /* position: absolute;
      top: 8px; */
      margin: 8px 0;
      border: 1px solid #F6F6F6;
      background-color: #FFF;
      overflow: hidden;
      border-radius: 16px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      padding: 0 12px;
      color: #999999;
      /* box-shadow: 0px 0px 2px #ddd; */
    }
    .tree-con {
      overflow-y: auto;
    }
    .tree-none {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #777;
      font-size: 14px;
    }
  `

  @property({ type: Array })
  list?: any = []

  // 判断是否开启企微通信录支持，默认不开启
  @property({ type: Boolean })
  iswwopendata: boolean = false

  // 控制通信录转移类型
  @property({ type: String })
  wwopendatatype: string = '' // userName | departmentName | express

  @property({ type: Boolean })
  ismulselect: boolean = false

  @property({ type: String })
  displaytype: string = 'mobile' // web | mobile

  @property({ type: Boolean })
  issearch: boolean = true

  @property({ type: String })
  searchplaceholder: string = '请输入关键字搜索'

  // normal 父子有关联 共同取值 半选不取
  // individual 父子无关联 各自独立取值
  // disable 父子有关联 不能选非末级节点 取值末级节点
  // shortcut 父子有关联 取值末级节点
  // related 父子有关联 取值非末级节点 如果只有一级 最高节点同样也是末级节点时 则该级视为最高级 要取值 半选不取
  // highest 父子有关联 取值最高节点
  @property({ type: String })
  mulselectmode: string = 'normal'

  // normal 正常选中取值
  // disable 不能选非末级节点 只能选末级节点 暂不实现
  @property({ type: String })
  singleselectmode: string = 'normal'

  @property({ type: String })
  expandmode: string = 'root' // root | no | all

  @property({ type: String })
  expandicon: string = 'normal' // normal | organization

  @state()
  protected _updatepoint = false

  @state()
  protected _list: any = []

  @state()
  protected _data: any = {}

  willUpdate (changedProperties: any) {
    if (changedProperties.has('list')) {
      this._list = cloneDeep(this.list).map((item: any) => {
        let isexpand = !!item.isexpand
        if (this.expandmode === 'all') {
          isexpand = true
        } else if (this.expandmode === 'root') {
          if (!item.pid) {
            isexpand = true
          } else {
            isexpand = false
          }
        } else if (this.expandmode === 'no') {
          isexpand = false
        }
        return {
          ...item,
          isselected: !!item.isselected,
          isexpand: isexpand,
          checkstate: '0'
        }
      })
      this._data = listToTree(this._list, 'id', 'pid', 'name')
    }
  }

  _updateTemplate () {
    this._updatepoint = !this._updatepoint
    // this.requestUpdate() // 强制更新
  }

  _findNode (id: any) {
    return this._list.find((item: any) => item.id === id)
  }


  _handleToggle (e: any) {
    // console.log(e)
    e.stopPropagation()
    const type = e.detail.type
    const node = e.detail.node
    if (type === 'expand') {
      node.isexpand = !node.isexpand
      this._updateTemplate()
    } else if (type === 'select') {
      this._setSelect(node.id, !node.isselected)
      this._updateTemplate()
    } else if (type === 'check') {
      const checkstate = node.checkstate
      this._setCheck(node.id, checkstate === '1' ? '0' : '1')
      this._updateTemplate()
    }
    this.dispatchEvent(new CustomEvent(type, {
      bubbles: true,
      composed: true,
      detail: {
        node: node
      }
    }))
  }

  _test () {
    // console.log(this.ismulselect)
    // // this.ismulselect = !this.ismulselect
    // this._data[0].isselected = !this._data[0].isselected
    // this._data[0].name = this._data[0].name + 'x'
    console.log(this._list)
    console.log(this._data)
  }

  _setCheck (id: any, value: '0' | '1' | '2') {
    const setChildren = (node: any, value: any) => {
      node.checkstate = value
      node.children.forEach((item: any) => {
        setChildren(item, value)
      })
    }

    const setParent = (node: any) => {
      if (node.parent) {
        const a = node.parent.children.every((item: any) => item.checkstate === '1')
        const b = node.parent.children.every((item: any) => item.checkstate === '0')
        const c = node.parent.children.some((item: any) => (item.checkstate === '0' || item.checkstate === '2'))
        if (a) {
          node.parent.checkstate = '1'
        } else if (b) {
          node.parent.checkstate = '0'
        } else if (c) {
          node.parent.checkstate = '2'
        }
        setParent(node.parent)
      }
    }

    const node = this._findNode(id)
    if (node) {
      if (this.mulselectmode === 'normal' || this.mulselectmode === 'shortcut' || this.mulselectmode === 'related' || this.mulselectmode === 'highest') {
        setChildren(node, value)
        setParent(node)
      } else if (this.mulselectmode === 'individual') {
        node.checkstate = value
      } else if (this.mulselectmode === 'disable') {
        if (node?.children?.length) {
          console.warn(`id = ${id} 为非末级节点，mulselectmode = ${this.mulselectmode} 模式不能设置非末级节点。`)
          return false
        }
        setChildren(node, value)
        setParent(node)
      } else {
        console.error(`暂不支持 mulselectmode = ${this.mulselectmode} 模式。`)
      }
    } else {
      console.error(`找不到 id = ${id} 的节点。`)
    }
  }

  _setSelect (id: any, value: boolean) {
    this._list.forEach((item: any) => {
      if (item.id === id) {
        item.isselected = value
      } else {
        item.isselected = false
      }
    })
  }

  getValue (type: 'id' | 'name' | 'fullvalue' = 'id') {
    if (this.ismulselect) {
      let arr = this._list.filter((item: any) => item.checkstate === '1')
      // normal 父子有关联 共同取值 半选不取
      // individual 父子无关联 各自独立取值
      // disable 父子有关联 不能选非末级节点 取值末级节点
      // shortcut 父子有关联 取值末级节点
      // related 父子有关联 取值非末级节点 如果只有一级 最高节点同样也是末级节点时 则该级视为最高级 要取值 半选不取
      // highest 父子有关联 取值最高节点
      if (this.mulselectmode === 'disable' || this.mulselectmode === 'shortcut') {
        arr = arr.filter((item: any) => !item?.children?.length)
      } else if (this.mulselectmode === 'related') {
        arr = arr.filter((item: any) => (item?.children?.length || (!item?.parent && !item?.children?.length)))
      } else if (this.mulselectmode === 'highest') {
        arr = arr.filter((item: any) => !item?.parent)
      }

      if (type === 'id') {
        return arr?.length ? arr.map((item: any) => item.id) : []
      } else if (type === 'name') {
        return arr?.length ? arr.map((item: any) => item.name) : []
      } else {
        return arr?.length ? cloneDeep(arr) : []
      }
    } else {
      const obj = this._list.find((item: any) => item.isselected)
      if (type === 'id') {
        return obj ? obj.id : ''
      } else if (type === 'name') {
        return obj ? obj.name : ''
      } else {
        return obj ? cloneDeep(obj) : null
      }
    }
  }

  setValue (value: any) {
    // debugger
    if (this.ismulselect) {
      this._list.forEach((item: any) => {
        item.checkstate = '0'
      })
      value?.length && value.forEach((item: any) => {
        this._setCheck(item, '1')
      })
      this._updateTemplate()
    } else {
      this._setSelect(value, true)
      this._updateTemplate()
    }
  }

  setCheck (id: any, value = true) {
    this._setCheck(id, value ? '1' : '0')
    this._updateTemplate()
  }

  setSelect (id: any, value = true) {
    this._setSelect(id, value)
    this._updateTemplate()
  }

  render () {
    return html`
      <div class=${classMap({
        'tree': true,
        'tree-web': this.displaytype === 'web',
        'tree-mobile': this.displaytype === 'mobile'
      })}>
        <!-- <button class="demo" @click="${this._test}">
          _test
          ${this.ismulselect}
        </button> -->

        ${
          (this?._data?.length && this.issearch)
          ?
          html`
            <div class="tree-search">
              ${this.searchplaceholder}
            </div>
          `
          :
          ''
        }

        ${
          this?._data?.length
          ?
          html`
            <div class="tree-con" style=${styleMap({
              height: this.issearch ? 'calc(100% - 48px)' : '100%',
            })}>
              ${repeat(this._data, (item: any) => item.id, (item, index) => html`
                <wxworksuite-treenode
                  displaytype="${this.displaytype}"
                  expandmode="${this.expandmode}"
                  expandicon="${this.expandicon}"
                  .node="${item}"
                  .iswwopendata="${this.iswwopendata}"
                  wwopendatatype="${this.wwopendatatype}"
                  .ismulselect="${this.ismulselect}"
                  .updatepoint="${this._updatepoint}"
                  @toggle="${this._handleToggle}"
                >
                </wxworksuite-treenode>
              `)}
            </div>
          `
          :
          html`<div class="tree-none">暂无数据</div>`
        }
      </div>
    `
  }
}

// father isselected: ${item.isselected}<br />
// father ismulselect: ${this.ismulselect}<br />
