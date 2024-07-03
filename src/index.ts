// import { version } from '../package.json'
import components from './components'
import { initAxios } from './axios'
import jssdk from './jssdk'
import { merge } from 'lodash-es'

const globalOptions: any = {
  getToken () {
    return ''
  }
}

const WxworksuitePluginInstall = (options: any) => {
  // console.log(app)
  // console.log(app.version)
  merge(globalOptions, options)
  console.log('@smart100/wxworksuite-plugin install')
  // console.log('options', options)
  // console.log('globalOptions', globalOptions)

  initAxios(globalOptions)

  for (const x in components) {
    components[x].register()
  }
}

// 是否企微软件内 包括电脑端和APP端
const isWxwork = () => {
  return navigator.userAgent.indexOf('wxwork') >= 0
}

// 是否在电脑端企微软件内
const isWxworkPc = () => {
  return isWxwork() && navigator.userAgent.indexOf('Mobile') === -1
}

// 是否在企微APP内
const isWxworkApp = () => {
  return isWxwork() && navigator.userAgent.indexOf('Mobile') >= 0
}

const isWxworkSuiteTenant = jssdk.checkData.bind(jssdk)

export {
  // version
  WxworksuitePluginInstall,
  jssdk,
  isWxworkSuiteTenant,
  isWxwork,
  isWxworkPc,
  isWxworkApp
}
