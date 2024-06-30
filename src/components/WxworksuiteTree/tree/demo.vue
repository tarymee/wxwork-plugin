<template>
  <widget-tree ref="treeRef" title="tree" :data="purposeList" :props="{ text: 'name', id: 'id', parentid: 'pid' }">
    <template #default="{ show, nodes, remove }">
      <div class="row" @click="show">
        <div
          class="search-box"
          style="
            min-height: 34px;
            border: 1px solid #eeeeee;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0px 8px;
          "
        >
          <van-space :size="4" wrap>
            <van-tag v-for="node in nodes" :key="node.id" plain type="primary" closeable @close="remove(node)">
              {{ node.text }}
            </van-tag>
          </van-space>
          <div v-if="nodes.length === 0" style="color: #909399; font-size: 14px; flex: 1">请选择</div>
          <van-icon name="arrow-down" color="#909399" />
        </div>
      </div>
    </template>
  </widget-tree>
  <van-button @click="getValue">取值</van-button>
  <van-button @click="setValue">赋值</van-button>
</template>

<script lang="ts" setup>
import { Ref, ref, watch } from 'vue'
import widgetTree from './index.vue'

const treeRef = ref()

const purposeList = ref([
  {
    id: '0',
    name: '中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国中国',
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
    id: '0-1',
    name: '北京',
    pid: '0'
  },
  {
    id: '0-1761',
    name: '湖南省',
    pid: '0'
  }
])

const getValue = () => {
  const value = treeRef.value.getValue()
  console.log(value)
}
const setValue = () => {
  treeRef.value.setValue('0-0')
}
</script>
