<template>
  <div class="test">
    <van-button class="btn" type="primary" size="large" @click="test">test</van-button>
  </div>
  <div class="test-wxworksuite-test">
    <wxworksuite-test ref="wxworksuitetestRef" _aaa="father_aaa" active="45646546" :foo="foo" :count="count" :obj="obj" :arr="arr" :classes="{ 'lithhh': true }" :flag="true" name12="ddddd"></wxworksuite-test>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const wxworksuitetestRef = ref<any>(null)
const foo = ref('hello')
const count = ref(8)
const obj = ref({
  bbb: 'aaa'
})
const arr = ref([{
  vvv: 'vvv'
}])
const test = () => {
  console.log(wxworksuitetestRef.value)
  wxworksuitetestRef.value.change()
}

</script>

<style lang="less" scoped>
.test {
  margin: 16px;
}
.test button {
  margin: 8px 0;
}
.test-wxwork-opendata {
  color: red;
  font-size: 12px;
}
</style>
