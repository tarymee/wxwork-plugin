import { LitElement, css, html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { axios } from '../../axios'

export default class WxworksuiteOrganizationpickMobile extends LitElement {

  static componentName: string = 'wxworksuite-organizationpick-mobile'
  static register () {
    if (!window.customElements.get(WxworksuiteOrganizationpickMobile.componentName)) {
      window.customElements.define(WxworksuiteOrganizationpickMobile.componentName, WxworksuiteOrganizationpickMobile)
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

  @property({ type: Boolean })
  issearch: boolean = true

  @property({ type: Boolean })
  userule: boolean = true

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

  @state()
  protected _expandicon = 'organization'

  @state()
  protected _isWxworkSuiteTenant: boolean = true

  @state()
  protected _list: any = []

  connectedCallback () {
    super.connectedCallback()
    // axios.post('/api/teapi/dy-biz/100000000000000000/110000000000000000', {
    //   pl_orgstruct: {
    //     status: '1'
    //   }
    // }).then((res: any) => {
    //   // console.log(res)
    //   const list = res?.data?.pl_orgstruct || []
    //   list.forEach((item: any) => {
    //     item.name = item.orgname
    //     // item.name = '1'
    //     item.id = item.orgstructid
    //     item.pid = item.parentorgstructid
    //   })
    //   this._list = list
    // })

    axios.post('/api/system/v1.0/org/page', {
      showchild: true,
      orgstructtypeid: 1,
      useRule: this.userule, // 使用数据权限
      pageindex: 1,
      pagesize: 99999,
      getAllStatus: false // 是否获取全部数据（即包含禁用）
    }).then((res: any) => {
      // console.log(res)
      const list = res?.data?.data?.list || []
      list.forEach((item: any) => {
        item.name = item.orgname
        // item.name = '1'
        item.id = item.orgstructid
        item.pid = item.parentorgstructid
      })
      this._list = list
    })
  }

  get treeRef (): any {
    return this.renderRoot?.querySelector('wxworksuite-tree') ?? null
  }

  protected _handleCheck (e: any) {
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

  protected _handleSelect (e: any) {
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
        wwopendatatype="${this._isWxworkSuiteTenant ? 'departmentName' : ''}"
        displaytype="${this.displaytype}"
        expandicon="${this._expandicon}"
        searchplaceholder="${this.searchplaceholder}"
        .issearch="${this.issearch}"
        .iswwopendata="${this._isWxworkSuiteTenant}"
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
