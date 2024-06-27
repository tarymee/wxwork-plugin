<template>
  <widget-treeselect
    :list="purposeList"
    ref="treeselectRef"
    :props="{ text: 'name', id: 'id', parentid: 'pid' }"
    mode="individula"
    type="checkbox"
  >
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
  </widget-treeselect>
</template>

<script lang="ts" setup>
import { Ref, ref, watch } from 'vue'
import widgetTreeselect from './index.vue'

const treeselectRef = ref()

const purposeList = ref([
  {
    id: '0',
    name: '0',
    pid: ''
  },
  {
    id: '0-0',
    name: '0-0',
    pid: ''
  },
  {
    id: '0-0-0',
    name: '0-0-0',
    pid: ''
  },
  {
    id: '0-1',
    name: '0-1',
    pid: ''
  },
  {
    id: '0-1761',
    name: '0-1',
    pid: ''
  },
  {
    id: '0-191',
    name: '0-1',
    pid: ''
  },
  {
    id: '0-411',
    name: '0-1',
    pid: ''
  },
  {
    id: '06-11',
    name: '0-1',
    pid: ''
  },
  {
    id: '0-711',
    name: '0-1',
    pid: ''
  },
  {
    id: '0-111',
    name: '0-1',
    pid: ''
  },
  {
    id: '0-121',
    name: '0-1',
    pid: ''
  },
  {
    id: '0-113',
    name: '0-1',
    pid: ''
  },
  {
    id: '0-151',
    name: '0-1',
    pid: ''
  },
  {
    id: '07-611',
    name: '0-71',
    pid: ''
  },
  {
    id: '0-171',
    name: '0-1',
    pid: ''
  }
])

// treeselectRef.value.setValue(data.purpose)
</script>
