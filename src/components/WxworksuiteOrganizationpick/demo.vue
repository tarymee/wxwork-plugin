<template>
  <div class="demo-btn">
    <van-button class="btn" type="primary" size="large" @click="singleSetValue">单选赋值</van-button>
    <van-button class="btn" type="primary" size="large" @click="singleGetValue">单选取值</van-button>
  </div>

  <div class="tree-form" @click="singleToggleShow">
    <div class="tree-form-l">营销组织单选：</div>
    <div class="tree-form-r">
      <wxworksuite-opendata v-if="singleNode" :openid="singleNode.name" type="departmentName" />
      <div v-else>
        请选择
      </div>
    </div>
  </div>

  <van-popup v-model:show="singleShow" position="bottom" :style="{ height: '85%', zIndex: 9999 }" :lazy-render="false">
    <div class="tree-popup">
      <!-- <wxworksuite-organizationpick-mobile ref="singleRef" @select="singleHandleSelect" /> -->
      <wxworksuite-organizationpick-web ref="singleRef" :issearch="true" @select="singleHandleSelect" />
    </div>
  </van-popup>







  <div class="demo-btn">
    <van-button class="btn" type="primary" size="large" @click="mulSetValue">多选赋值</van-button>
    <van-button class="btn" type="primary" size="large" @click="mulGetValue">多选取值</van-button>
  </div>

  <div class="tree-form" @click="mulToggleShow">
    <div class="tree-form-l">营销组织多选：</div>
    <div class="tree-form-r">
      <template v-if="mulNode && mulNode.length">
        <van-tag v-for="(item, index) in mulNode" :key="index" plain type="primary" closeable @close="mulRemove(item)">
          <wxworksuite-opendata :openid="item.name" type="departmentName" />
        </van-tag>
      </template>
      <div v-else>
        请选择
      </div>
    </div>
  </div>



  <van-popup v-model:show="mulShow" position="bottom" :style="{ height: '85%', zIndex: 9999 }">
    <div class="tree-popup" style="height: 300px">
      <div class="tree-popup-con">
        <wxworksuite-organizationpick-mobile ref="mulRef" :issearch="true" ismulselect="{{ true }}"  />
      </div>
      <div class="tree-popup-btn">
        <van-button class="btn" type="primary" size="large" @click="mulCancel">取消</van-button>
        <van-button class="btn" type="primary" size="large" @click="mulComfirm">确定</van-button>
      </div>
    </div>
  </van-popup>

  <!-- <div class="van-overlay" role="button" tabindex="0" style="z-index: 2002;"></div>
  <div class="van-popup van-popup--bottom" role="dialog" tabindex="0" :style="{ height: '40%', zIndex: 9999 }">
    <div class="tree-popup" style="height: 300px">
      <div class="tree-popup-con">
        <wxworksuite-organizationpick-mobile ref="mulRef" :issearch="true" ismulselect="{{ true }}"  />
      </div>
    </div>
  </div> -->

</template>

<script setup>
import { ref } from 'vue'

const singleRef = ref(null)
const singleShow = ref(false)
const singleNode = ref(null)

const singleToggleShow = () => {
  singleShow.value = !singleShow.value
}

const singleHandleSelect = () => {
  singleSyncValue()
  singleToggleShow()
}

const singleGetValue = () => {
  const id = singleRef.value.getValue()
  const name = singleRef.value.getValue('name')
  const fullvalue = singleRef.value.getValue('fullvalue')
  console.log(id)
  console.log(name)
  console.log(fullvalue)
}

const singleSyncValue = () => {
  const fullvalue = singleRef.value.getValue('fullvalue')
  console.log(fullvalue)
  singleNode.value = fullvalue
}

const singleSetValue = () => {
  singleRef.value.setValue('1803686397149065216')
  singleSyncValue()
}













const mulRef = ref(null)
const mulShow = ref(false)
const mulNode = ref([])

const mulToggleShow = () => {
  mulShow.value = !mulShow.value
}

const mulGetValue = () => {
  const id = mulRef.value.getValue()
  const name = mulRef.value.getValue('name')
  const fullvalue = mulRef.value.getValue('fullvalue')
  console.log(id)
  console.log(name)
  console.log(fullvalue)
}

const mulSyncValue = () => {
  const fullvalue = mulRef.value.getValue('fullvalue')
  console.log(fullvalue)
  mulNode.value = fullvalue
}

const mulSetValue = () => {
  mulRef.value.setValue(['1803686397149065216'])
  mulSyncValue()
}

const mulRemove = (item) => {
  console.log('mulRemove')
  console.log(item)
  mulRef.value.setCheck(item.id, false)
  mulSyncValue()
}


const mulCancel = () => {
  console.log('取消')
  const oldValue = mulNode.value.map((item) => {
    return item.id
  })
  mulRef.value.setValue(oldValue)
  mulToggleShow()
}
const a = {}
const mulComfirm = () => {
  console.log(a?.dd?.aa?.aaa)
  console.log('确定')
  mulSyncValue()
  mulToggleShow()
}
</script>

<style lang="less" scoped>
.demo-btn {
  margin: 16px;
}

.demo-btn button {
  margin: 8px 0;
}


.tree-form {
  margin: 16px;
  display: flex;
  justify-content: space-between;
}


.tree-popup {
  box-sizing: border-box;
  // position: relative;
  height: 100%;
  background-color: #F6F6F6;
  padding: 12px;
}

.tree-popup-con {
  height: 100%;
  overflow: hidden;
}

.wxworksuite-organizationpick-web {
  height: 100%;
  // overflow-y: auto;
}

// .tree-popup-text {
//   height: 500px;
//   background-color: red;
// }
.tree-popup-btn {
  flex: none;
  display: flex;
  margin: 12px;
}

.tree-popup-btn button {
  margin: 0px 8px;
}
</style>
<style>
/* .van-popup {
  overflow: scroll;
} */
</style>
