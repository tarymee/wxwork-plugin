// import { version } from '../package.json'
import components from './components'
import { initAxios } from './axios'
import
  jssdk,
  {
    isWxworkSuiteTenant,
    isWxwork,
    isWxworkPc,
    isWxworkApp
  } from './jssdk'
import { merge } from 'lodash-es'

const globalOptions: any = {
  getToken () {
    return ''
  }
}

const WxworksuitePluginInstall = (options: any) => {
  merge(globalOptions, options)
  console.log('@smart100/wxworksuite-plugin install')
  console.log('@smart100/wxworksuite-plugin options', options)
  console.log('@smart100/wxworksuite-plugin globalOptions', globalOptions)

  initAxios(globalOptions)

  for (const x in components) {
    components[x].register()
  }
}

export {
  // version
  WxworksuitePluginInstall,
  jssdk,
  isWxworkSuiteTenant,
  isWxwork,
  isWxworkPc,
  isWxworkApp
}
