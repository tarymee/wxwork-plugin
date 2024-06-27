<template>
  <div class="test">
    <van-button class="btn" type="primary" size="large" @click="change">change</van-button>
    <van-button class="btn" type="primary" size="large" @click="getValue">getValue</van-button>
  </div>

  <div class="test-wxwork-opendata">
    <wxwork-opendata ref="wxworkopendataRef" :type="type" :openid="openid" mode="open"></wxwork-opendata>
    <wxwork-opendata :type="type" :openid="openid" mode="open"></wxwork-opendata>
    <wxwork-opendata :type="type" :openid="openid" mode="open"></wxwork-opendata>
    <wxwork-opendata :type="type" :openid="openid" mode="open"></wxwork-opendata>
    <wxwork-opendata :type="type" :openid="openid" mode="open"></wxwork-opendata>
    <wxwork-opendata :type="type" :openid="openid" mode="open"></wxwork-opendata>
    <wxwork-opendata :type="type" :openid="openid" mode="open"></wxwork-opendata>
    <wxwork-opendata :type="type" :openid="openid" mode="open"></wxwork-opendata>
    <wxwork-opendata :type="type" :openid="openid" mode="open"></wxwork-opendata>
    <wxwork-opendata :type="type" :openid="openid" mode="open"></wxwork-opendata>
    <wxwork-opendata :type="type" :openid="openid" mode="open"></wxwork-opendata>
    <wxwork-opendata :type="type" :openid="openid" mode="open"></wxwork-opendata>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
// import wxworkOpendata from './index.vue'

const wxworkopendataRef = ref<any>(null)
const show = ref(true)
const type = ref('userName')
const openid = ref('woOUQJEAAATELkAo5cgbkznEdBjmtgcA')

const change = async () => {
  show.value = !show.value
  setTimeout(() => {
    type.value = type.value === 'departmentName' ? 'userName' : 'departmentName'
    openid.value = openid.value === '6' ? 'woOUQJEAAATELkAo5cgbkznEdBjmtgcA' : '6'
  }, 1000)
}

const getValue = () => {
  console.log(wxworkopendataRef.value)
  // debugger
  const value = wxworkopendataRef.value.getValue()
  console.log(value)
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
