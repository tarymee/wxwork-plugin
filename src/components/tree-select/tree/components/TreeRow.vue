<!-- eslint-disable vue/no-mutating-props -->
<template>
  <li
    class="tree-row"
    :style="{
      gap: `${gap}px`,
      paddingLeft: `${indentSize}px`,
      '--row-hover-background': rowHoverBackground
    }"
  >
    <div class="tree-row-item" @click.stop="handleExpand(node)">
      <div class="tree-row-item-left">
        <div v-if="useIcon" class="tree-row-item-icon-wrapper">
          <template v-if="childCount">
            <template v-if="!node.expanded">
              <slot name="iconActive">
                <arrow-right />
              </slot>
            </template>
            <template v-else>
              <slot name="iconInactive">
                <arrow-down />
              </slot>
            </template>
          </template>
        </div>
        <span class="tree-row-txt">
          {{ node.label }}
        </span>
        <template v-if="childCount && showChildCount">
          <slot name="childCount" :count="childCount" :checkedCount="checkedChildCount" :childs="node.nodes">
            <span class="child-count">
              {{ childCount }}
            </span>
          </slot>
        </template>
      </div>
      <div class="tree-row-item-right" @click.stop="onToggleCheckbox(node)">
        <slot
          v-if="!(mode == 'disable' && childCount)"
          :id="node.id"
          name="checkbox"
          :node="node"
          :checked="node.checked"
          :indeterminate="node.indeterminate"
        >
          <input
            v-if="useCheckbox"
            v-model="node.checked"
            class="tree-row-checkbox"
            type="checkbox"
            :checked="node.checked"
            :indeterminate="node.indeterminate"
            :disabled="node.disabled"
          />
        </slot>
        <template v-if="!node.undeletable && useRowDelete">
          <div class="delete-icon" @click.stop="removedRow(node)">
            <slot name="deleteIcon">
              <delete-icon />
            </slot>
          </div>
        </template>
      </div>
    </div>
    <ul v-if="node.expanded" class="tree-list">
      <template v-for="child in node.nodes" :key="child.id">
        <tree-row
          v-if="!child.hidden"
          :ref="`tree-row-${child.id}`"
          :node="child"
          :use-checkbox="useCheckbox"
          :use-icon="useIcon"
          :use-row-delete="useRowDelete"
          :show-child-count="showChildCount"
          :gap="gap"
          :expand-row-by-default="expandRowByDefault"
          :indent-size="indentSize"
          :row-hover-background="rowHoverBackground"
          :set-node="setNode"
          :get-node="getNode"
          :update-node="updateNode"
          :expandable="expandable"
          :mode="mode"
          @delete-row="removedRow"
          @node-click="(item) => handleClick(item, true)"
          @toggle-checkbox="onToggleCheckbox"
          @node-expanded="onNodeExpanded"
        >
          <template #childCount="{ count, checkedCount, childs }">
            <slot name="childCount" :count="count" :checked-count="checkedCount" :childs="childs" />
          </template>
          <template #iconActive>
            <slot name="iconActive">
              <arrow-right />
            </slot>
          </template>
          <template #iconInactive>
            <slot name="iconInactive">
              <arrow-down />
            </slot>
          </template>
          <template #deleteIcon>
            <slot name="deleteIcon">
              <delete-icon />
            </slot>
          </template>
          <template #checkbox="{ node: slotNode, checked, indeterminate }">
            <slot
              :id="slotNode.id"
              name="checkbox"
              :node="slotNode"
              :checked="checked"
              :indeterminate="indeterminate"
            />
          </template>
        </tree-row>
      </template>
    </ul>
  </li>
</template>

<script>
import { computed, nextTick } from 'vue'
import ArrowRight from './Icons/ArrowRight.vue'
import ArrowDown from './Icons/ArrowDown.vue'
import DeleteIcon from './Icons/DeleteIcon.vue'

export default {
  components: {
    ArrowRight,
    ArrowDown,
    DeleteIcon
  },
  props: {
    node: {
      type: Object,
      required: true
    },
    indentSize: {
      type: Number,
      required: true
    },
    gap: {
      type: Number,
      required: true
    },
    getNode: {
      type: Function,
      required: true
    },
    setNode: {
      type: Function,
      required: true
    },
    updateNode: {
      type: Function,
      required: true
    },
    expandRowByDefault: {
      type: Boolean,
      default: false
    },
    useCheckbox: {
      type: Boolean,
      default: false
    },
    useIcon: {
      type: Boolean,
      default: true
    },
    useRowDelete: {
      type: Boolean,
      default: false
    },
    showChildCount: {
      type: Boolean,
      default: false
    },
    rowHoverBackground: {
      type: String,
      default: '#ffffff'
    },
    expandable: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'gather'
    }
  },
  emits: ['nodeClick', 'toggleCheckbox', 'nodeExpanded', 'deleteRow'],
  setup(props, { emit }) {
    const childCount = computed(() => props.node.nodes?.length)
    const checkedChildCount = computed(() => props.node.nodes?.filter((item) => item.checked).length)

    const toggleExpanded = (node) => {
      // eslint-disable-next-line
      props.node.expanded = props.node.nodes ? !props.node.expanded : false
      nextTick(() => {
        emit('nodeExpanded', node, props.node.expanded)
      })
    }
    const handleExpand = (node, passExpand) => {
      if (!passExpand && props.expandable && childCount.value) {
        toggleExpanded(node)
      }
    }

    const onToggleCheckbox = (node) => {
      emit('toggleCheckbox', node)
    }

    const handleClick = (node, passExpand) => {
      if (props.mode === 'disable' && !childCount.value) {
        return
      }
      if (props.useCheckbox && !node.disabled) {
        onToggleCheckbox(node)
      } else {
        emit('nodeClick', node)
      }
    }

    const onNodeExpanded = (node, state) => {
      emit('nodeExpanded', node, state)
    }

    const removedRow = (node) => {
      emit('deleteRow', node)
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function nop() {}

    return {
      childCount,
      checkedChildCount,
      handleClick,
      handleExpand,
      onNodeExpanded,
      onToggleCheckbox,
      removedRow,
      nop
    }
  }
}
</script>

<style lang="less" scoped>
input[type='checkbox'] {
  background-color: #fff;
  -webkit-appearance: none;
  border: 1px solid #c0c4cc;
  border-radius: 2px;
  outline: none;
}

input[type='checkbox']:checked {
  border: none;
  background: url('./Icons/check_icon.png') no-repeat center;
  background-size: contain;
}

.tree-list,
.tree-row {
  display: grid;
  margin: 0;
  padding: 0;
}

.tree-row {
  transform-style: preserve-3d;

  &-checkbox {
    width: 18px;
    height: 18px;
    border-color: #c0c4cc;
  }

  &-item {
    display: flex;
    align-items: center;
    position: relative;
    padding: 10px 16px;
    justify-content: space-between;

    &-left {
      flex: 1;
    }

    &:hover:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background-color: var(--row-hover-background);
      transform: translate3d(0, 0, -0.1px);
      width: 200vw;
      margin-left: calc(100% - 100vw);
      z-index: -1;
    }

    .child-count {
      color: gray;
      margin-left: 6px;
    }

    .delete-icon {
      color: red;
      opacity: 0;
      display: flex;
      align-items: center;
      width: 16px;
      height: 16px;
    }

    &-icon-wrapper {
      width: 18px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      top: 4px;
      padding-right: 2px;
    }
  }

  &-item:hover {
    .delete-icon {
      opacity: 1;
    }
  }

  &-txt {
    user-select: none;
    color: #333333;
    font-size: 14px;
  }
}
</style>
