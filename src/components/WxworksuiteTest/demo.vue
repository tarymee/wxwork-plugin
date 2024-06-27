<template>
  <div class="test">
    <van-button class="btn" type="primary" size="large" @click="test">test</van-button>
  </div>
  <div class="test-wxworksuite-test">
    <wxworksuite-test
      ref="wxworksuitetestRef"
      @change="handleChange"
      :flag="true"
      name1="外部属性传入"
      :count="count"
      :classes="{ 'lithhh': true }"
      _active="外部属性传入"
      :obj="obj"
      :arr="arr"
    >
    </wxworksuite-test>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const wxworksuitetestRef = ref<any>(null)

const count = ref(8)
const name1 = ref('外部属性传入')
const obj = ref({
  bbb: 'aaa'
})
const arr = ref([{
  vvv: 'vvv'
}])

const test = () => {
  // console.log(wxworksuitetestRef.value)
  // wxworksuitetestRef.value.change()
  console.log(count.value)
  count.value++
}

const handleChange = (e) => {
  console.log('handleChange')
  console.log(e)
  count.value = e.detail.count
  name1.value = e.detail.name1
}

</script>

<style lang="less" scoped>
.test {
  margin: 16px;
}
.test button {
  margin: 8px 0;
}
.test-wxworksuite-test {

}
</style>
