import { property } from 'lit/decorators.js'
import WxworksuiteOrganizationpickMobile from './mobile'

export default class WxworksuiteOrganizationpickWeb extends WxworksuiteOrganizationpickMobile {

  static componentName: string = 'wxworksuite-organizationpick-web'
  static register () {
    if (!window.customElements.get(WxworksuiteOrganizationpickWeb.componentName)) {
      window.customElements.define(WxworksuiteOrganizationpickWeb.componentName, WxworksuiteOrganizationpickWeb)
    }
  }

  @property({ type: String })
  displaytype: string = 'web'
}
