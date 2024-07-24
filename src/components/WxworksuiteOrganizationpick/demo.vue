<template>
  <div class="demo-btn">
    <button class="btn" type="primary" size="large" @click="singleSetValue">单选赋值</button>
    <button class="btn" type="primary" size="large" @click="singleGetValue">单选取值</button>
  </div>

  <div class="demo-form" @click="singleToggleShow">
    <div class="demo-form-l">营销组织单选：</div>
    <div class="demo-form-r">
      <wxworksuite-opendata v-if="singleNode" :openid="singleNode.name" type="departmentName" />
      <div v-else>
        请选择
      </div>
    </div>
  </div>

  <!-- <div v-show="singleShow" class="demo-popup-wrap" :style="{ height: '55%' }">
    <div class="demo-popup">
      <wxworksuite-organizationpick-mobile ref="singleRef" :issearch="true" @select="singleHandleSelect" />
    </div>
  </div> -->

  <!--  :lock-scroll="false" -->
  <!-- van-popup打开会在body上加van-overflow-hidden类锁定body滚动，锁定滚动影响了shadow-dom内部的滚动，在van-popup上加   :lock-scroll="false"  不锁定body滚动可解决 -->
  <van-popup v-model:show="singleShow" position="bottom" :style="{ height: '55%' }" :lazy-render="false">
    <div class="demo-popup">
      <wxworksuite-organizationpick-web ref="singleRef" :issearch="true" @select="singleHandleSelect" />
    </div>
  </van-popup>

  <!-- <div class="van-overlay" role="button" tabindex="0" style="z-index: 2002;"></div>
  <div class="van-popup van-popup--bottom" role="dialog" tabindex="0" :style="{ height: '55%', 'z-index': 9999 }">
    <div class="demo-popup">
      <wxworksuite-organizationpick-web ref="singleRef" :issearch="true" @select="singleHandleSelect" />
    </div>
  </div> -->





  <div class="demo-btn">
    <button class="btn" type="primary" size="large" @click="mulSetValue">多选赋值</button>
    <button class="btn" type="primary" size="large" @click="mulGetValue">多选取值</button>
  </div>

  <div class="demo-form" @click="mulToggleShow">
    <div class="demo-form-l">营销组织多选：</div>
    <div class="demo-form-r">
      <template v-if="mulNode && mulNode.length">
        <span v-for="(item, index) in mulNode" :key="index" plain type="primary" closeable @close="mulRemove(item)">
          <wxworksuite-opendata :openid="item.name" type="departmentName" />
        </span>
      </template>
      <div v-else>
        请选择
      </div>
    </div>
  </div>

  <div v-show="mulShow" class="demo-popup-wrap" :style="{ height: '85%' }">
    <div class="demo-popup" style="height: 300px">
      <div class="tree-popup-con">
        <wxworksuite-organizationpick-mobile ref="mulRef" :issearch="true" ismulselect="{{ true }}"  />
      </div>
      <div class="tree-popup-btn">
        <button class="btn" type="primary" size="large" @click="mulCancel">取消</button>
        <button class="btn" type="primary" size="large" @click="mulComfirm">确定</button>
      </div>
    </div>
  </div>

  <!-- <van-popup v-model:show="mulShow" position="bottom" :style="{ height: '85%', zIndex: 9999 }">
    <div class="demo-popup" style="height: 300px">
      <div class="tree-popup-con">
        <wxworksuite-organizationpick-mobile ref="mulRef" :issearch="true" ismulselect="{{ true }}"  />
      </div>
      <div class="tree-popup-btn">
        <button class="btn" type="primary" size="large" @click="mulCancel">取消</button>
        <button class="btn" type="primary" size="large" @click="mulComfirm">确定</button>
      </div>
    </div>
  </van-popup> -->

  <!-- <div class="van-overlay" role="button" tabindex="0" style="z-index: 2002;"></div>
  <div class="van-popup van-popup--bottom" role="dialog" tabindex="0" :style="{ height: '40%', zIndex: 9999 }">
    <div class="demo-popup" style="height: 300px">
      <div class="tree-popup-con">
        <wxworksuite-organizationpick-mobile ref="mulRef" :issearch="true" ismulselect="{{ true }}"  />
      </div>
    </div>
  </div> -->

</template>

<script setup>
import { ref } from 'vue'

const singleRef = ref(null)
// const singleShow = ref(false)
const singleShow = ref(true)
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

.demo-form {
  margin: 16px;
  display: flex;
  justify-content: space-between;
}

.demo-popup-wrap {
  width: 100%;
  height: 70%;
  position: fixed;
  bottom: 0;
  left: 0;
}
.demo-popup {
  box-sizing: border-box;
  height: 100%;
  background-color: #F6F6F6;
  padding: 12px;
}















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
