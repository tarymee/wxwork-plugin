import { initAxios } from './axios'
import components from './components/index'
import { merge } from 'lodash-es'

const globalOptions: any = {
  getToken () {
    return ''
  }
}

const install = (app: any, options: any) => {
  // console.log(app)
  // console.log(app.version)
  merge(globalOptions, options)
  console.log('@smart100/wxwork-plugin start!')
  console.log('options', options)
  console.log('globalOptions', globalOptions)

  // if (app) {
  //   const version = Number(app.version.split('.')[0])
  //   if (version < 3) {
  //     console.error('This plugin requires Vue 3')
  //     return false
  //   }
  // } else {
  //   console.error('This plugin requires Vue App Instance')
  // }

  initAxios(globalOptions)

  for (const x in components) {
    components[x].register()
  }
}

export {
  install,
  globalOptions
}
