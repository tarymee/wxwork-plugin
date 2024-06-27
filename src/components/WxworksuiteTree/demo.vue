<template>
  <div class="test">
    <van-button class="btn" type="primary" size="large" @click="test">test</van-button>
  </div>
  <div class="test-wxworksuite-tree">
    <wxworksuite-tree
      ref="wxworksuitetreeRef"
      :data="data"
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

const data = ref(
  [
    {
      label: 'Level one 1',
      children: [
        {
          label: 'Level two 1-1',
          children: [
            {
              label: 'Level three 1-1-1',
            },
          ],
        },
      ],
    },
    {
      label: 'Level one 2',
      children: [
        {
          label: 'Level two 2-1',
          children: [
            {
              label: 'Level three 2-1-1',
            },
          ],
        },
        {
          label: 'Level two 2-2',
          children: [
            {
              label: 'Level three 2-2-1',
            },
          ],
        },
      ],
    },
    {
      label: 'Level one 3',
      children: [
        {
          label: 'Level two 3-1',
          children: [
            {
              label: 'Level three 3-1-1',
            },
          ],
        },
        {
          label: 'Level two 3-2',
          children: [
            {
              label: 'Level three 3-2-1',
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
