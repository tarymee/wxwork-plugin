import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import { axios } from '../../axios'

export default class WxworksuiteMemberpickMobile extends LitElement {

  static componentName: string = 'wxworksuite-memberpick-mobile'
  static register () {
    if (!window.customElements.get(WxworksuiteMemberpickMobile.componentName)) {
      window.customElements.define(WxworksuiteMemberpickMobile.componentName, WxworksuiteMemberpickMobile)
    }
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `

  @property({ type: String })
  displaytype: string = 'mobile'

  @property({ type: Boolean })
  ismulselect: boolean = false

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

  @state()
  protected _list: any = []

  constructor () {
    super()
    axios.post('/api/teapi/dy-biz/1032470355689738336/1273067686762516579', {
      member: {
        searchkey: '',
        orglimit: '',
        orgstructid: '',
        email: '',
        includechild: '1'
      }
    }).then((res: any) => {
      // console.log(res)
      const list = res?.data?.member || []
      list.forEach((item: any) => {
        // item.name = `__$$wwopendata(${item.open_user_id}, userName)(${item.positionname})`
        item.name = `__$$wwopendata(${item.userinfoname}, userName)(${item.positionname})`
        item.id = item.memberid
        item.pid = ''
        item.iswwopendata = true
        item.wwopendatatype = 'expression'
      })
      this._list = list
    })
  }

  get treeRef (): any {
    return this.renderRoot?.querySelector('wxworksuite-tree') ?? null
  }

  private _handleCheck (e: any) {
    // console.log('_handleCheck')
    // console.log(e)
    e.stopPropagation()
    this.dispatchEvent(new CustomEvent('check', {
      bubbles: true,
      composed: true,
      detail: {
        // node: JSON.parse(JSON.stringify(e?.detail?.node))
        node: e?.detail?.node
      }
    }))
  }

  private _handleSelect (e: any) {
    // console.log('_handleSelect')
    // console.log(e)
    e.stopPropagation()
    this.dispatchEvent(new CustomEvent('select', {
      bubbles: true,
      composed: true,
      detail: {
        // node: JSON.parse(JSON.stringify(e?.detail?.node))
        node: e?.detail?.node
      }
    }))
  }

  getValue (type: 'id' | 'name' | 'fullvalue' = 'id') {
    return this.treeRef?.getValue(type)
  }

  setValue (value: any) {
    this.treeRef?.setValue(value)
  }

  setCheck (id: any, value = true) {
    this.treeRef?.setCheck(id, value)
  }

  setSelect (id: any, value = true) {
    this.treeRef?.setSelect(id, value)
  }


  render () {
    return html`
      <wxworksuite-tree
        wwopendatatype="expression"
        displaytype="mobile"
        expandicon="organization"
        .iswwopendata="${true}"
        .list="${this._list}"
        .ismulselect="${this.ismulselect}"
        singleselectmode="${this.singleselectmode}"
        mulselectmode="${this.mulselectmode}"
        @select="${this._handleSelect}"
        @check="${this._handleCheck}"
      ></wxworksuite-tree>
    `
  }
}
