import axios from 'axios'
import type {
  AxiosInstance,
  AxiosError,
  AxiosResponse
} from 'axios'
import { get } from 'lodash-es'
// import { Message } from 'element-ui'
import { loadding } from './components/WxworksuiteLoadding/loadding'

interface Response {
  code: number | string
  data: any
  msg: string
}

const createAxiosInstance = (type: 'spu' | 'apaas' = 'spu', options: any) => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: '',
    // timeout: 36000000
    // withCredentials: true, // 不能开启 影响ali oss
    // headers: {
    //   // 'Content-Type': 'application/json;charset=UTF-8',
    //   // 'app_id': '100'
    // }
  })

  axiosInstance.interceptors.request.use((config: any) => {
    // const isShowLoading = typeof config?.isShowLoading !== 'undefined' ? config.isShowLoading : true
    const isShowLoading = get(config, 'isShowLoading', true)
    isShowLoading && loadding.open()

    const isSendToken = get(config, 'isSendToken', true)
    if (isSendToken) {
      const token = options.getToken()
      if (config?.headers && token) {
        config.headers.token = token
      }
    }
    return config
  }, error => {
    return Promise.reject(error)
  })

  axiosInstance.interceptors.response.use((res: AxiosResponse) => {
    // debugger
    const isShowLoading = get(res, 'config.isShowLoading', true)
    isShowLoading && loadding.close()

    let realRes: Response = {
      code: 404,
      data: '',
      msg: ''
    }

    if (type === 'spu') {
      if (res.data.code === 200) {
        // return res.data
        realRes = {
          code: res.data.code,
          data: res.data.data,
          msg: res.data.msg
        }
        return realRes
      } else {
        const msg = res?.data?.msg || '网络异常，请稍后重试。'
        const isShowErrorMessage = get(res, 'config.isShowErrorMessage', true)
        // isShowErrorMessage && Message.error(msg)

        realRes = {
          code: res.data.code,
          data: res.data.data,
          msg: res.data.msg
        }
        return Promise.reject(realRes) as any
      }
    } else if (type === 'apaas') {
      realRes = {
        code: res.status || 200,
        data: res.data?.resp_data || res.data,
        msg: res.data?.error_code || ''
      }
      return realRes
    }
  }, (err: AxiosError) => {
    // console.log(err)
    // debugger
    const isShowLoading = get(err, 'config.isShowLoading', true)
    isShowLoading && loadding.close()

    // console.log(err)
    // debugger
    // 兼容处理接口新方案 通过传参配置区分 默认使用新方案
    // 接口返回非 200 状态码 肯定是报错必须要提示
    const msg = (type === 'spu' ? get(err, 'response.data.msg') : get(err, 'response.data.error_code')) || get(err, 'response.statusText') || get(err, 'message', '网络异常，请稍后重试。')

    const isShowErrorMessage = get(err, 'config.isShowErrorMessage', true)
    // isShowErrorMessage && Message.error(msg)

    const isNoLogin = () => {
      if (type === 'spu') {
        if (msg === '未授权' && get(err, 'response.data.code') === 401) {
          return true
        } else {
          return false
        }
      } else if (type === 'apaas') {
        if (msg.indexOf('token is invalid(decode).') !== -1 || msg.indexOf('token is invalid(null).') !== -1 || msg === 'token无效，请重新登录' || msg === 'jwt token无效') {
          return true
        } else {
          return false
        }
      }
    }

    const noLoginFn = () => {
      if (isNoLogin()) {

      }
    }

    return Promise.reject(err)
  })

  return axiosInstance
}

// const apaasAxios: AxiosInstance = createAxiosInstance('apaas')

let apaasAxios: any = null

function initAxios (options: any) {
  apaasAxios = createAxiosInstance('apaas', options)
}

export {
  initAxios,
  apaasAxios
}
