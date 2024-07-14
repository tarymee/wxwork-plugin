<template>
  <div class="test">
    <van-button class="btn" type="primary" size="large" @click="test">test</van-button>
    <van-button class="btn" type="primary" size="large" @click="getValue">getValue</van-button>
    <van-button class="btn" type="primary" size="large" @click="setValue">setValue</van-button>
  </div>
  <!-- <div class="test-wxworksuite-tree">
    <wxworksuite-tree ref="wxworksuitetreeRef" :iswwopendata="iswwopendata" :wwopendatatype="wwopendatatype"
      :expandicon="expandicon" :mulselectmode="mulselectmode" :list="list" :expandmode="expandmode"
      :ismulselect="ismulselect">
    </wxworksuite-tree>
  </div> -->

  <div class="" @click="toggleShow">
    树控件值：
    {{ treeNode?.name }}
    <wxworksuite-opendata v-if="treeNode" :openid="treeNode.name" type="departmentName"></wxworksuite-opendata>
  </div>
  <van-popup v-model:show="show" position="bottom" :style="{ height: '80%', zIndex: 9999 }" :lazy-render="false">
    <div class="widget-tree-popup">
      <div class="widget-tree-popup-content">
        <wxworksuite-tree ref="wxworksuitetreeRef" :iswwopendata="wxworksuitetreestate.iswwopendata"
          :wwopendatatype="wxworksuitetreestate.wwopendatatype" :expandicon="wxworksuitetreestate.expandicon"
          :mulselectmode="wxworksuitetreestate.mulselectmode" :list="list"
          :expandmode="wxworksuitetreestate.expandmode" :ismulselect="wxworksuitetreestate.ismulselect" :displaytype="wxworksuitetreestate.displaytype"
          @select="handleSelect">
        </wxworksuite-tree>
      </div>
    </div>
  </van-popup>

</template>

<script setup>
import { ref, reactive } from 'vue'

// const show = ref(false)
const show = ref(true)
const treeNode = ref(null)

const toggleShow = () => {
  show.value = !show.value
}

const handleSelect = () => {
  treeNode.value = wxworksuitetreeRef.value.getValue('fullvalue')
  toggleShow()
}

const getValue = () => {
  console.log('getValue')
  // console.log(wxworksuitetreeRef.value)
  // debugger
  const value = wxworksuitetreeRef.value.getValue()
  const name = wxworksuitetreeRef.value.getValue('name')
  const fullvalue = wxworksuitetreeRef.value.getValue('fullvalue')
  console.log(value)
  console.log(name)
  console.log(fullvalue)

  treeNode.value = fullvalue
}

const setValue = () => {
  console.log('setValue')
  wxworksuitetreeRef.value.setValue('0')
  getValue()
}


const wxworksuitetreeRef = ref(null)

const wxworksuitetreestate = reactive({
  iswwopendata: true, // true | false
  wwopendatatype: 'departmentName', // departmentName | userName
  displaytype: 'web', // web | mobile
  ismulselect: true, // true | false
  mulselectmode: 'normal', // individual | normal | disable | related | shortcut | highest
  expandicon: 'normal', // organization | normal
  expandmode: 'root'
})

const listsource = [
  {
    id: '0',
    name: '中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国',
    // name: '庄焕滨（全权限-勿删）',
    // name: '中国',
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

const listsource2 = [
  {
    id: '0',
    name: '1',
    iswwopendata: true,
    wwopendatatype: 'departmentName',
    pid: ''
  },
  {
    id: '0-0',
    name: 'woOUQJEAAATELkAo5cgbkznEdBjmtgcA',
    iswwopendata: true,
    wwopendatatype: 'userName',
    pid: '0'
  },
  {
    id: '0-0-0',
    name: '3',
    pid: '0-0'
  },
  {
    id: '0-0-1',
    name: '4',
    pid: '0-0'
  },
  {
    id: '0-0-2',
    name: '5',
    pid: '0-0'
  },
  {
    id: '0-1',
    name: '6',
    pid: '0'
  },
  {
    id: '0-1761',
    name: '5',
    pid: '0'
  },
  {
    id: '0-1761-1',
    name: '4',
    pid: '0-1761'
  },
  {
    id: '2',
    name: '3',
    pid: ''
  },
  {
    id: '3',
    name: '2',
    pid: ''
  },
]

// const list = ref([])
const list = ref(listsource)

const test = () => {
  // console.log(wxworksuitetreeRef.value)
  // wxworksuitetreeRef.value.change()
  list.value = listsource
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
  background-color: #F6F6F6;
  // background-color: #Fff;
  width: 100%;
  height: 500px;
  box-sizing: border-box;
  padding: 12px;
  flex-direction: column;
  justify-content: center;
}
</style>



<style lang="less">
.widget-tree-popup {
  box-sizing: border-box;
  position: relative;
  height: 100%;
  background-color: #F6F6F6;
  padding: 12px;
}
.widget-tree-popup-content {
  height: 100%;
  overflow-y: auto;
  text-align: left;
}
</style>
