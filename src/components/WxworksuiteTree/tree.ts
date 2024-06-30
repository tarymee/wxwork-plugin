import { LitElement, css, html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import { cloneDeep } from 'lodash-es'
import { listToTree } from './utils'
import { v4 as uuidv4 } from 'uuid'

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
      overflow-x: hidden;
      overflow-y: auto;
    }
    .tree {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }
    .tree-none {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
    }
  `

  @property({ type: Array })
  list?: any = []

  @property({ type: Boolean })
  ismulselect: boolean = false

  // reflect: true
  @property({ type: Number })
  expandlevel: number = 0

  // normal 父子有关联 共同取值 半选不取
  // individual 父子无关联 各自独立取值
  // disable 父子有关联 不能选非末级节点 取值末级节点
  // shortcut 父子有关联 取值末级节点
  // related 父子有关联 取值非末级节点 如果只有一级 最高节点同样也是末级节点时 则该级视为最高级 要取值 半选不取
  // highest 父子有关联 取值最高节点 未实现
  @property({ type: String })
  mulselectmode: string = 'normal'

  // normal 正常选中取值
  // disable 不能选非末级节点 只能选末级节点 暂不实现
  @property({ type: String })
  singleselectmode: string = 'normal'

  @state()
  protected _updatepoint = false

  @state()
  protected _list: any = []

  @state()
  protected _map: any = {}

  @state()
  protected _data: any = {}

  willUpdate (changedProperties: any) {
    if (changedProperties.has('list')) {
      this._list = cloneDeep(this.list).map((item: any) => {
        return {
          ...item,
          uuid: uuidv4(),
          isselected: !!item.isselected,
          isexpand: !!item.isexpand,
          checkstate: '0'
        }
      })
      this._map = {}
      this._list.forEach((item: any) => {
        this._map[item.uuid] = item
      })

      this._data = listToTree(this._list, 'id', 'pid', 'name')
    }
  }

  // get _data () {
  //   console.error('_data')
  //   return listToTree(this._list, 'id', 'pid', 'name')
  // }

  updateTemplate () {
    this._updatepoint = !this._updatepoint
    // this.requestUpdate() // 强制更新
  }


  handleToggle (e: any) {
    console.log(e)
    if (e.detail.type === 'expand') {
      if (this._map[e.detail.node.uuid]) {
        this._map[e.detail.node.uuid].isexpand = !this._map[e.detail.node.uuid].isexpand
      }
    } else if (e.detail.type === 'select') {
      this._list.forEach((item: any) => {
        if (item.uuid === e.detail.node.uuid) {
          item.isselected = !item.isselected
        } else {
          item.isselected = false
        }
      })
    } else if (e.detail.type === 'check') {
      const checkstate = this._map[e.detail.node.uuid].checkstate
      if (this.mulselectmode === 'normal') {
        
      } else if (this.mulselectmode === 'individual') {
        if (checkstate === '1') {
          this._map[e.detail.node.uuid].checkstate = '0'
        } else if (checkstate === '0') {
          this._map[e.detail.node.uuid].checkstate = '1'
        } else if (checkstate === '2') {
          this._map[e.detail.node.uuid].checkstate = '1'
        }
      } else if (this.mulselectmode === 'disable') {

      } else if (this.mulselectmode === 'shortcut') {

      } else if (this.mulselectmode === 'related') {

      } else if (this.mulselectmode === 'highest') {

      } else {
        
      }
    }

    this.updateTemplate()
  }

  test () {
    // console.log(this.ismulselect)
    // // this.ismulselect = !this.ismulselect
    // this._data[0].isselected = !this._data[0].isselected
    // this._data[0].name = this._data[0].name + 'x'
    console.log(this._list)
    console.log(this._map)
    console.log(this._data)
  }

  getValue (type: 'id' | 'name' | 'fullvalue' = 'id') {
    if (this.ismulselect) {
      const arr = this._list.filter((item: any) => item.checkstate === '1')
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
    if (this.ismulselect) {

    } else {
      this._list.forEach((item: any) => {
        if (item.id === value) {
          item.isselected = true
        } else {
          item.isselected = false
        }
      })
    }
  }

  render () {
    return html`
      <div class="tree">
        <button class="demo" @click="${this.test}">
          test
          ${this.ismulselect}
        </button>
        ${
          this?._data?.length
          ?
          html`
            ${repeat(this._data, (item: any) => item.uuid, (item, index) => html`
              <wxworksuite-treenode
                .node="${item}"
                .ismulselect="${this.ismulselect}"
                .updatepoint="${this._updatepoint}"
                @toggle="${this.handleToggle}"
              >
              </wxworksuite-treenode>
            `)}
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
