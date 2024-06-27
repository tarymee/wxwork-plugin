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

export {
  // version
  WxworksuitePluginInstall,
  jssdk
}
