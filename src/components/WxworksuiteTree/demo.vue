<template>
  <div class="test">
    <van-button class="btn" type="primary" size="large" @click="test">test</van-button>
    <van-button class="btn" type="primary" size="large" @click="getValue">getValue</van-button>
    <van-button class="btn" type="primary" size="large" @click="setValue">setValue</van-button>
  </div>
  <div class="test-wxworksuite-tree">
    <wxworksuite-tree
      ref="wxworksuitetreeRef"
      :mulselectmode="mulselectmode"
      :list="list"
      :expandlevel="expandlevel"
      :ismulselect="ismulselect"
    >
    </wxworksuite-tree>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const wxworksuitetreeRef = ref<any>(null)

// const ismulselect = ref(false)
const ismulselect = ref(true)
const expandlevel = ref(0)
// const mulselectmode = ref('individual')
const mulselectmode = ref('noraml')

const list2 = ref(
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

const listsource = [
  {
    id: '0',
    // name: '中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国',
    name: '中国',
    pid: ''
  },
  {
    id: '0-0',
    name: '广东省',
    pid: '0'
  },
  {
    id: '0-0-0',
    name: '广州市',
    pid: '0-0'
  },
  {
    id: '0-0-1',
    name: '汕头市',
    pid: '0-0'
  },
  {
    id: '0-0-2',
    name: '潮州市',
    pid: '0-0'
  },
  {
    id: '0-1',
    name: '北京',
    pid: '0'
  },
  {
    id: '0-1761',
    name: '湖南省',
    pid: '0'
  },
  {
    id: '0-1761-1',
    name: 'xxx市',
    pid: '0-1761'
  },
  {
    id: '2',
    name: '美国',
    pid: ''
  },
  {
    id: '3',
    name: '英国',
    pid: ''
  },
]

const list = ref(listsource)

const test = () => {
  // console.log(wxworksuitetreeRef.value)
  // wxworksuitetreeRef.value.change()
  list.value = listsource
}

const getValue = () => {
  console.log(wxworksuitetreeRef.value)
  // debugger
  const value = wxworksuitetreeRef.value.getValue()
  console.log(value)
}

const setValue = () => {
  console.log('setValue')
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
  width: 100%;
  height: 500px;
  flex-direction: column;
  justify-content: center;
}
</style>
