<template>
  <div class="test">
    <van-button class="btn" type="primary" size="large" @click="test">test</van-button>
    <van-button class="btn" type="primary" size="large" @click="getValue">getValue</van-button>
    <van-button class="btn" type="primary" size="large" @click="setValue">setValue</van-button>
  </div>
  <div class="test-wxworksuite-tree">
    <wxworksuite-tree
      ref="wxworksuitetreeRef"
      :treedata="treedata"
      :expandlevel="expandlevel"
      :ismulselect="ismulselect"
    >
    </wxworksuite-tree>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const wxworksuitetreeRef = ref<any>(null)

const ismulselect = ref(false)
const expandlevel = ref(0)

const treedata = ref(
  [
    {
      name: 'Level one 1',
      id: 'Level one 1',
      selected: true,
      children: [
        {
          name: 'Level two 1-1',
          id: 'Level two 1-1',
          selected: false,
          children: [
            {
              name: 'Level three 1-1-1',
              id: 'Level three 1-1-1',
              selected: true,
            },
          ],
        },
      ],
    },
    {
      name: 'Level one 2',
      id: 'Level one 2',
      selected: false,
      children: [
        {
          name: 'Level two 2-1',
          id: 'Level two 2-1',
          selected: false,
          children: [
            {
              name: 'Level three 2-1-1',
              id: 'Level three 2-1-1',
              selected: false,
            },
          ],
        },
        {
          name: 'Level two 2-3',
          id: 'Level two 2-3',
          selected: false,
          children: [],
        },
        {
          name: 'Level two 2-2',
          id: 'Level two 2-2',
          selected: false,
          children: [
            {
              name: 'Level three 2-2-1',
              id: 'Level three 2-2-1',
              selected: false,
            },
          ],
        },
      ],
    }
  ]
)

const test = () => {
  // console.log(wxworksuitetreeRef.value)
  // wxworksuitetreeRef.value.change()
}

const getValue = () => {
  console.log(wxworksuitetreeRef.value)
  // debugger
  const value = wxworksuitetreeRef.value.getValue()
  console.log(value)
}

// const setValue = () => {
//   console.log(wxworksuitetreeRef.value)
//   // debugger
//   wxworksuitetreeRef.value.setValue({
//     type: type.value === 'departmentName' ? 'userName' : 'departmentName',
//     openid: openid.value === '6' ? 'woOUQJEAAATELkAo5cgbkznEdBjmtgcA' : '6'
//   })
// }
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
