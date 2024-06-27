<template>
  <div class="test">
    <van-button class="btn" type="primary" size="large" @click="test">test</van-button>
  </div>
  <div class="test-wxworksuite-tree">
    <wxworksuite-tree
      ref="wxworksuitetreeRef"
      :flag="true"
      name1="外部属性传入"
      :count="count"
      :classes="{ 'lithhh': true }"
      _active="外部属性传入"
      :obj="obj"
      :arr="arr"
    >
    </wxworksuite-tree>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const wxworksuitetreeRef = ref<any>(null)

const count = ref(8)
const obj = ref({
  bbb: 'aaa'
})
const arr = ref([{
  vvv: 'vvv'
}])

const test = () => {
  // console.log(wxworksuitetreeRef.value)
  // wxworksuitetreeRef.value.change()
  console.log(count.value)
  count.value++
}

</script>

<style lang="less" scoped>
.test {
  margin: 16px;
}
.test button {
  margin: 8px 0;
}
.test-wxworksuite-tree {

}
</style>
