<template>
  <div class="test">
    <van-button class="btn" type="primary" size="large" @click="change">change</van-button>
    <van-button class="btn" type="primary" size="large" @click="getValue">getValue</van-button>
    <van-button class="btn" type="primary" size="large" @click="setValue">setValue</van-button>
  </div>

  <div class="test-wxworksuite-opendata">
    <wxworksuite-opendata ref="wxworksuiteopendataRef" :type="type" :openid="openid" mode="open"></wxworksuite-opendata>
    <!-- <wxworksuite-opendata :type="type" :openid="openid" mode="open"></wxworksuite-opendata>
    <wxworksuite-opendata :type="type" :openid="openid" mode="open"></wxworksuite-opendata>
    <wxworksuite-opendata :type="type" :openid="openid" mode="open"></wxworksuite-opendata>
    <wxworksuite-opendata :type="type" :openid="openid" mode="open"></wxworksuite-opendata> -->
  </div>

  <div class="test">
    <van-button class="btn" type="primary" size="large" @click="getLocation">getLocation</van-button>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
// import jssdk from '../../jssdk'
import { jssdk } from '@smart100/wxworksuite-plugin'

const wxworksuiteopendataRef = ref(null)
const type = ref('userName')
const openid = ref('woOUQJEAAATELkAo5cgbkznEdBjmtgcA')

const change = async () => {
  setTimeout(() => {
    type.value = type.value === 'departmentName' ? 'userName' : 'departmentName'
    openid.value = openid.value === '6' ? 'woOUQJEAAATELkAo5cgbkznEdBjmtgcA' : '6'
  }, 1000)
}

const getValue = () => {
  console.log(wxworksuiteopendataRef.value)
  // debugger
  const value = wxworksuiteopendataRef.value.getValue()
  console.log(value)
}

const setValue = () => {
  console.log(wxworksuiteopendataRef.value)
  // debugger
  wxworksuiteopendataRef.value.setValue({
    type: 'expression',
    openid: '__$$wwopendata(woOUQJEAAATELkAo5cgbkznEdBjmtgcA, userName)/__$$wwopendata(6, departmentName)'
  })
}




const getLocation = () => {
  jssdk.init(['getLocation', 'openUserProfile']).then((res) => {
    // console.error(222222)
    // window.wx.getLocation({
    //   type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    //   success: function (res: any) {
    //     console.error(1111111)
    //     console.log(res)
    //   },
    //   fail: function (err: any) {
    //     console.error(err)
    //   }
    // })

    // window.wx.invoke('openUserProfile', {
    //   type: 1, // 1表示该userid是企业成员，2表示该userid是外部联系人
    //   userid: openid.value // 可以是企业成员，也可以是外部联系人
    // }, function (res) {
    //   if (res.err_msg != "openUserProfile:ok") {
    //     // 错误处理
    //     console.log(res)
    //   }
    // })

  }).catch((err) => {
    console.error(err)
  })
}
</script>

<style lang="less" scoped>
.test {
  margin: 16px;
}
.test button {
  margin: 8px 0;
}
.test-wxworksuite-opendata {
  // color: red;
  // font-size: 12px;
}

</style>
