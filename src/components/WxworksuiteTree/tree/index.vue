<template>
  <div class="widget-tree">
    <slot :nodes="selectedNodes" :show="toggleShow" :remove="removeByNode">
      <!-- <div @click="toggleShow" style="width: 100%">
        <span v-if="selectedNodes.length === 0" class="placeholder">{{ placeholder }}</span>
        <van-space :size="4" wrap>
          <van-tag v-for="node in selectedNodes" :key="node.id" plain type="primary" closeable @close="removeByNode(node)">
            {{ node.text }}
          </van-tag>
        </van-space>
      </div> -->
    </slot>
    <van-popup
      v-model:show="show"
      position="bottom"
      :style="{ height: '100%', zIndex: 9999 }"
      :lazy-render="false"
      :teleport="teleport"
    >
      <div class="widget-tree-popup">
        <div class="widget-tree-nav">
          <van-nav-bar
            :title="title"
            left-text="取消"
            right-text="确定"
            :left-arrow="false"
            @click-left="onCancel"
            @click-right="onConfirm"
          />
          <van-search v-model="keyword" input-align="center" placeholder="请输入文字搜索" />
        </div>
        <div class="widget-tree-popup-content">
          <el-tree
            v-show="nodes.length > 0"
            ref="treeRef"
            :data="nodes"
            :props="treeProps"
            show-checkbox
            :expand-on-click-node="true"
            :check-strictly="true"
            node-key="id"
            :default-expanded-keys="defaultExpandedKeys"
            @check="selectByNode"
            :filter-node-method="filterNode"
          />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref, computed, toRaw, watch } from 'vue'
import { listToTree } from '../tree-select/utils/listToTree'

export interface IProps {
  // expandRowByDefault?: boolean
  // value?: string
  title?: string
  props?: {
    text: string
    id: string
    parentid: string
  }
  data?: any[]
  // type?: 'checkbox' | 'radio'
  // mode?: 'disable' | 'shortcut' | 'individula' | 'gather' | 'related'
  getValueType?: 'id' | 'fullvalue' | string
  // placeholder?: string
  teleport?: string | any
}

const emits = defineEmits(['confirm', 'cancel'])

const props = withDefaults(defineProps<IProps>(), {
  // expandRowByDefault: false,
  title: '',
  props: () => ({
    text: 'text',
    id: 'id',
    parentid: 'parentid'
  }),
  data: () => [],
  // type: 'checkbox',
  // mode: 'gather',
  getValueType: 'id',
  placeholder: '请选择'
})

const treeRef = ref<any>(null)
const treeProps = {
  children: 'children',
  label: 'text'
}
const nodes: Ref<any[]> = ref([])
const selectedNodes: Ref<any[]> = ref([])
const keyword: Ref<string> = ref('')

const defaultExpandedKeys = computed(() => {
  return nodes.value?.length ? [nodes.value[0].id] : []
})

const show: Ref<boolean> = ref(false)

const toggleShow = () => {
  show.value = !show.value
}

const filterNode = (value: string, data: any) => {
  if (!value) return true
  return data.label.includes(value)
}

watch(keyword, (val) => {
  treeRef.value.filter(val)
})

const selectBykey: any = (key: string) => {
  // console.log(node)
  treeRef.value.setCheckedKeys([key], false)
  selectedNodes.value = treeRef.value.getCheckedNodes()
}

const selectByNode: any = (node: any) => {
  // console.log(node)
  selectedNodes.value = [node]
  treeRef.value.setCheckedKeys([node.id], false)
}

const removeByNode = (node: any) => {
  // console.log(node)
  treeRef.value.setCheckedKeys([], false)
  selectedNodes.value = []
}

const clearNode = () => {
  treeRef.value.setCheckedKeys([], false)
  selectedNodes.value = []
}

function getValue() {
  const node = treeRef.value.getCheckedNodes()
  console.log(node)
  if (!props.getValueType) {
    return node.length ? node[0].id : ''
  } else if (props.getValueType === 'fullvalue') {
    return node.length ? node[0] : null
  } else {
    return node.length ? node[0][props.getValueType] : ''
  }
}

const setValue = (value: string) => {
  // console.log('setvalue', value)
  if (value) {
    selectBykey(value)
  } else {
    clearNode()
  }
}

watch(
  () => props.data,
  () => {
    // console.log(props.data)
    // debugger
    nodes.value = listToTree(props.data, props.props.id, props.props.parentid, props.props.text, 'children')
    // console.log(nodes.value)
  },
  { immediate: true }
)

const onCancel = () => {
  emits('cancel')
  toggleShow()
}

const onConfirm = () => {
  emits('confirm')
  toggleShow()
}

defineExpose({
  getValue,
  setValue
})
</script>

<style lang="less">
.widget-tree-popup {
  box-sizing: border-box;
  position: relative;
  height: 100%;
  padding-top: 100px;
  .widget-tree-nav {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .widget-tree-popup-content {
    height: 100%;
    overflow-y: auto;
    text-align: left;
  }
}

.el-tree-node__label {
  flex: 1;
  // display: block;
  white-space: nowrap;
  word-wrap: normal;
  text-overflow: ellipsis;
  overflow: hidden;
}
.el-tree-node__content > label.el-checkbox {
  order: 3;
  align-self: end;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 0px;
}
</style>
