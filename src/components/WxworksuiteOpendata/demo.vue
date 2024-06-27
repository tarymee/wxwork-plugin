<template>
  <div class="test">
    <van-button class="btn" type="primary" size="large" @click="change">change</van-button>
    <van-button class="btn" type="primary" size="large" @click="getValue">getValue</van-button>
    <van-button class="btn" type="primary" size="large" @click="setValue">setValue</van-button>
  </div>

  <div class="test-wxworksuite-opendata">
    <wxworksuite-opendata ref="wxworksuiteopendataRef" :type="type" :openid="openid" mode="open"></wxworksuite-opendata>
    <wxworksuite-opendata :type="type" :openid="openid" mode="open"></wxworksuite-opendata>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
// import wxworkOpendata from './index.vue'

const wxworksuiteopendataRef = ref<any>(null)
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
  console.log(wxworksuiteopendataRef.value)
  // debugger
  const value = wxworksuiteopendataRef.value.getValue()
  console.log(value)
}

const setValue = () => {
  console.log(wxworksuiteopendataRef.value)
  // debugger
  wxworksuiteopendataRef.value.setValue({
    type: type.value === 'departmentName' ? 'userName' : 'departmentName',
    openid: openid.value === '6' ? 'woOUQJEAAATELkAo5cgbkznEdBjmtgcA' : '6'
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
