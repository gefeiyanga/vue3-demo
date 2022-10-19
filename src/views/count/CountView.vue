<template>
  <div class="wrap">
    <div>
      <div class="input-wrap mt-20 mb-20">
        <el-input
          class="mr-20"
          maxlength="28"
          show-word-limit
          v-model="task.value"
          @keydown.enter="handleEnter"
        ></el-input>
        <el-button type="primary" @click="submit">提交</el-button>
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
          <div class="text" :class="task.incompleted ? '' : 'completed-text'">
            {{ index + 1 }}. {{ task.value }}
          </div>
          <div class="switch-wrap">
            <el-switch
              inactive-color="#F2E0C7"
              @change="handleSwitch(task)"
              v-model="task.incompleted"
            />
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
// import { ElInput } from "element-plus";

const TABS: any = ['未完成', '所有', '已完成'];

const currentTab = reactive({ value: TABS[0] }); // incomplete completed all

const allList: any = reactive([]);

const filterList: any = () =>
  allList
    .filter((item: any) =>
      currentTab.value == '未完成'
        ? item.incompleted == true
        : currentTab.value == '已完成'
        ? item.incompleted == false
        : item
    )
    ?.sort((a: any, b: any) => b.incompleted - a.incompleted);
const task = reactive({ value: '' });

const toggle = (tab: string) => {
  currentTab.value = tab;
};

const isActived = computed(
  () => (tab: string) => tab == currentTab.value ? 'activedTab' : 'tab'
);

const submit = () => {
  const data = task.value;
  if (data && data.length) {
    allList?.push({ value: data, incompleted: true });
    task.value = '';
  }
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
  min-width: calc(375px - 2rem);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px 20px;
  height: 300px;
  .mt-20 {
    margin-top: 20px;
  }
  .mr-20 {
    margin-right: 20px;
  }
  .mb-20 {
    margin-bottom: 20px;
  }
  .input-wrap :deep(.el-input__wrapper) {
    background: var(--content-item-bg-color-hover);
  }
  .input-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    & :deep(.el-input__wrapper:hover) {
      box-shadow: 0px 0px 0px;
    }
    & :deep(.el-input__wrapper) {
      box-shadow: 0px 0px 0px;
    }
    & :deep(.el-input .el-input__count .el-input__count-inner) {
      background: transparent;
    }
    & :deep(.el-input__inner) {
      color: var(--color-text);
    }
  }
  .tab-wrap {
    width: 100%;
    height: 32px;
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--nav-bg-color);
    font-size: 16px;
    font-weight: 700;
    border-radius: 4px 4px 0px 0px;
    .activedTab {
      color: #000000;
      font-weight: 700;
    }
    .tab {
      color: #333333;
    }
    .tab,
    .activedTab {
      cursor: pointer;
    }
  }
  .content {
    width: 100%;
    background: var(--content-bg-color);
    color: var(--color-text);
    height: 300px;
    text-align: left;
    overflow-y: auto;
    border-radius: 0px 0px 4px 4px;
    padding-top: 10px;
    /* overflow-x: hidden; */
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 32px;
      padding: 2px 20px;
      position: relative;
      .text {
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
      }
      .completed-text {
        color: var(--completed-text-color);
        text-decoration: line-through;
      }
      &:hover {
        /* background: #fdf0e1; */
        background: var(--content-item-bg-color-hover);
      }
      .switch-wrap {
        display: none;
        position: absolute;
        right: 20px;
        top: 0px;
        bottom: 0px;
      }
      &:hover .switch-wrap {
        display: inline-block;
      }
    }
  }
}
@media (max-width: 900px) {
  .wrap {
    grid-template-columns: 1fr;
    grid-gap: 0px 20px;
  }
}
</style>
