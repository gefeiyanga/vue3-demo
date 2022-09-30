<template>
  <div class="wrap">
    <div class="submit-wrap mb-20">
      <el-input
        class="mr-20"
        maxlength="28"
        show-word-limit
        v-model="task.value"
        @keydown.enter="handleEnter"
      ></el-input>
      <el-button @click="submit">提交</el-button>
    </div>
    <div class="tab-wrap">
      <div
        @click="toggle(tab)"
        v-for="tab in TABS"
        :key="tab"
        :class="isActived(tab)"
      >
        {{ tab }}
      </div>
    </div>
    <div class="content">
      <div class="item" v-for="(task, index) in filterList()" :key="index">
        <div>{{ index + 1 }}. {{ task.value }}</div>
        <div class="switch-wrap">
          <el-switch @change="handleSwitch(task)" v-model="task.incompleted" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
// import { ElInput } from "element-plus";

const TABS: any = ['未完成', '所有', '已完成'];

const currentTab = reactive({ value: TABS[0] }); // incomplete completed all

const allList: any = reactive([]);

const filterList: any = () =>
  allList.filter((item: any) =>
    currentTab.value == '未完成'
      ? item.incompleted == true
      : currentTab.value == '已完成'
      ? item.incompleted == false
      : item
  );
const task = reactive({ value: '' });

const toggle = (tab: string) => {
  currentTab.value = tab;
};

const isActived = computed(
  () => (tab: string) => tab == currentTab.value ? 'activedTab' : 'tab'
);

const submit = () => {
  const data = task.value;

  allList?.push({ value: data, incompleted: true });
  task.value = '';
};

const handleEnter = (e: any) => {
  if (e.keyCode == 13) {
    submit();
  }
};

const handleSwitch = (val: any) => {
  console.log(val);
  console.log(allList);
};
</script>

<style scoped lang="less">
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 300px;
  .mr-20 {
    margin-right: 20px;
  }
  .mb-20 {
    margin-bottom: 20px;
  }
  .submit-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }
  .tab-wrap {
    width: 500px;
    height: 64px;
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgb(242, 199, 90);
    font-size: 16px;
    font-weight: 700;
    .activedTab {
      color: #000;
    }
    .tab {
      color: #fff;
    }
    .tab,
    .activedTab {
      cursor: pointer;
    }
  }
  .content {
    width: 100%;
    background: bisque;
    color: chocolate;
    height: 300px;
    text-align: left;
    overflow: auto;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 500px;
      height: 32px;
      padding: 2px 20px;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
      &:hover {
        background: rgb(241, 163, 106);
        color: bisque;
      }
      .switch-wrap {
        display: none;
      }
      &:hover .switch-wrap {
        display: inline-block;
      }
    }
  }
}
</style>
