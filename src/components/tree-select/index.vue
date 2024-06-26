<template>
  <slot :nodes="selectedNodes" :show="toggleShow" :label="label" :remove="unselect">
    <div @click="toggleShow" style="width: 100%">
      <span v-if="selectedNodes.length === 0" class="placeholder">{{ placeholder }}</span>
      <van-space :size="4" wrap>
        <van-tag v-for="node in selectedNodes" :key="node.id" plain type="primary" closeable @close="unselect(node)">
          {{ node.text }}
        </van-tag>
      </van-space>
    </div>
  </slot>
  <van-popup
    v-model:show="show"
    position="bottom"
    :style="{ height: '100%', zIndex: 9999 }"
    :lazy-render="false"
    :teleport="teleport"
  >
    <div class="popup-container">
      <div class="nav-bar">
        <van-nav-bar
          :title="label"
          left-text="取消"
          right-text="确定"
          :left-arrow="false"
          @click-left="onCancel"
          @click-right="onConfirm"
        />
        <van-search v-model="keyword" input-align="center" :placeholder="searchplaceholder" />
      </div>
      <div class="popup-content">
        <widget-tree
          v-show="nodes.length > 0"
          v-model:nodes="nodes"
          :use-checkbox="true"
          :type="type"
          :mode="mode"
          :search-text="keyword"
          @node-click="handleNodeClick"
          ref="treeRef"
        />
      </div>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
import { Ref, ref, watchEffect, toRaw, watch } from 'vue'
import { TreeProps, TreeNode } from './tree'
import { listToTree } from './utils/listToTree'
import { getCheckedNodes } from './tree/utils/getCheckedNodes'
import { useCustomFieldValue } from '@vant/use'
import { updateNodeById } from './tree/utils'
import widgetTree from './tree/components/Tree.vue'

export interface IProps {
  expandRowByDefault?: boolean
  value?: string
  props?: {
    text: string
    id: string
    parentid: string
  }
  label?: string
  list?: any[]
  type?: 'checkbox' | 'radio'
  mode?: 'disable' | 'shortcut' | 'individula' | 'gather' | 'related'
  valueType?: 'id' | 'fullvalue' | string
  placeholder?: string
  searchplaceholder?: string
  teleport?: string | any
}

const emits = defineEmits(['update:value', 'change', 'confirm'])

const props = withDefaults(defineProps<IProps>(), {
  required: false,
  value: '',
  props: () => ({
    text: 'value',
    id: 'id',
    parentid: 'parentid'
  }),
  label: '',
  list: () => [],
  type: 'checkbox',
  mode: 'gather',
  expandRowByDefault: false,
  valueType: 'id',
  placeholder: '请选择',
  searchplaceholder: '请选择'
})

// const props = defineProps({
//   expandRowByDefault: Boolean,
//   value: String,
//   props: Object,
//   label: String,
//   list: Array,
//   type: String,
//   mode: String,
//   valueType: String,
//   placeholder: String,
//   searchplaceholder: String,
//   teleport: String,
// })

const treeRef = ref<any>(null)
// const treeProps = reactive({
//   nodes: 'children',
//   label: props.props.text
// })
const nodes: Ref<TreeProps['nodes']> = ref([])

const selectedNodes: Ref<TreeNode[]> = ref([])
const _value: Ref<any[]> = ref([])
const keyword: Ref<string> = ref('')
const cache: Ref<any[]> = ref([])

// const selectedText: ComputedRef<string> = computed(() => {
//   return selectedNodes.value.map(node => node.label).join(';')
// })

watchEffect(() => {
  selectedNodes.value = getCheckedNodes(nodes.value, props.mode)
  _value.value = getValue()
  emits('update:value', getValue())
  emits('change', toRaw(_value.value))
})

const show: Ref<boolean> = ref(false)

const toggleShow = () => {
  if (!show.value) {
    console.log('cache', _value.value)
    cache.value = selectedNodes.value
  }
  show.value = !show.value
}

const handleNodeClick: TreeProps['onNodeClick'] = (node: any) => {
  // if (props.type === 'radio') {
  //   selectedNodes.value = [node]
  // }
}

function getValue(key: string | string[] = props.valueType) {
  let res: any[] = []
  if (key === 'fullvalue') {
    res = selectedNodes.value
  } else {
    res = selectedNodes.value.map((node) => {
      if (Array.isArray(key)) {
        const obj: { [key: string]: any } = {}
        key.forEach((k: string) => {
          obj[k] = node[k]
        })
        return obj
      } else {
        return node[key]
      }
    })
  }
  if (props.type === 'checkbox') {
    return JSON.stringify(res)
  }
  if (res.length > 0) {
    if (typeof key === 'string') {
      return res[0]
    }
    return JSON.stringify(res[0])
  }
  return ''
}

const setValue = (value: string | any[]) => {
  console.log('setvalue', value)
  if (!value) {
    nodes.value.forEach((n) => {
      n.checked = false
      updateNodeById(nodes.value, n.id, { checked: false }, true)
    })
    return
  }
  const updateChild = props.type !== 'radio' && props.mode !== 'individula'
  if (props.type === 'checkbox') {
    const val: any[] = typeof value === 'string' ? JSON.parse(value) : value
    val.forEach((node: any) => {
      if (typeof node === 'string') {
        updateNodeById(nodes.value, node, { checked: true }, updateChild)
      } else {
        updateNodeById(nodes.value, node.id, { checked: true }, updateChild)
      }
    })
  } else {
    nodes.value.forEach((n) => {
      n.checked = false
      updateNodeById(nodes.value, n.id, { checked: false }, true)
    })
    updateNodeById(nodes.value, value, { checked: true }, updateChild)
  }
}

const unselect = (node: TreeNode) => {
  treeRef.value && treeRef.value.updateNode(node.id, { checked: false })
}

watch(
  () => props.list,
  () => {
    nodes.value = listToTree(props.list, props.props.id, props.props.parentid, props.props.text)
    if (props.value) {
      setValue(props.value)
    }
  },
  { immediate: true }
)

watch(
  () => props.value,
  () => {
    console.log(props.label, props.value)
    setValue(props.value)
  },
  { immediate: true }
)

const onCancel = () => {
  if (props.type === 'radio') {
    setValue(cache.value.length > 0 ? cache.value[0].id : '')
  } else {
    setValue(cache.value.map((n) => n.id))
  }
  toggleShow()
}
const onConfirm = () => {
  emits('update:value', getValue())
  // emits('change', getValue())
  keyword.value = ''
  emits('confirm', getValue())
  toggleShow()
}

useCustomFieldValue(() => {
  return getValue()
})

defineExpose({
  getValue,
  setValue
})
</script>

<style lang="less" scoped>
.popup-container {
  box-sizing: border-box;
  position: relative;
  height: 100%;
  padding-top: 100px;
  .nav-bar {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .popup-content {
    height: 100%;
    overflow-y: auto;
    text-align: left;
  }
}
.placeholder {
  color: rgb(192, 196, 204);
}
</style>
