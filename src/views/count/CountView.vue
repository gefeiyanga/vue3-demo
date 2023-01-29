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
          @dragover.prevent
          @drop.prevent.stop
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
        <SingleItem
          v-if="currentTab.value == '未完成'"
          :filterList="incompletedList"
          :updateIsShowDelete="updateIsShowDelete"
        />
        <SingleItem
          v-if="currentTab.value == '已完成'"
          :filterList="completedList"
          :updateIsShowDelete="updateIsShowDelete"
        />
        <SingleItem
          v-if="currentTab.value == '所有'"
          :filterList="allList"
          :updateIsShowDelete="updateIsShowDelete"
        />
      </div>
      <div
        v-if="isShowDelete.value"
        @drop="handleOnDrop($event)"
        @dragover.prevent
        class="may-delete"
      >
        删除
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, onBeforeUnmount } from "vue";
import { ElMessage } from "element-plus";
import { polyfill } from "mobile-drag-drop";
import { defaultList } from "./config";
import SingleItem from "./single-item.vue";

const options: any = {
  passive: true,
};

polyfill({
  // use this to make use of the scroll behaviour
  /* dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride, */
  holdToDrag: 400,
});
const TABS: any = ["未完成", "已完成", "所有"];

const currentTab = reactive({ value: TABS[0] }); // incomplete completed all

const allList: any = reactive([...defaultList]);

const isShowDelete: any = reactive({ value: null });

const incompletedList: any = computed(() =>
  allList
    .filter((item: any) => item.incompleted === true)
    ?.sort((a: any, b: any) => b.incompleted - a.incompleted)
);

const completedList: any = computed(() =>
  allList
    .filter((item: any) => item.incompleted === false)
    ?.sort((a: any, b: any) => b.incompleted - a.incompleted)
);
const task = reactive({ value: "" });

const toggle = (tab: string) => {
  currentTab.value = tab;
};

const isActived = computed(
  () => (tab: string) => tab == currentTab.value ? "activedTab" : "tab"
);

onMounted(() => {
  window.addEventListener("touchmove", bodyScroll, { passive: false });
});
onBeforeUnmount(() => {
  window.removeEventListener("touchmove", bodyScroll, options);
});

const bodyScroll = () => {};

const submit = () => {
  const data = task.value;
  if (allList.find((i: any) => i.value == data)) {
    return ElMessage({
      type: "info",
      message: "请勿添加重复任务！",
      grouping: true,
    });
  }
  if (data && data.length) {
    allList?.push({ value: data, incompleted: true });
    task.value = "";
  }
};

const handleEnter = (e: any) => {
  if (e.keyCode == 13) {
    submit();
  }
};
const handleOnDrop = (e: any) => {
  e.preventDefault();
  e.stopPropagation();
  allList.splice(
    allList.findIndex((i: any) => i.value == isShowDelete.value),
    1
  );
  isShowDelete.value = null;
};

const updateIsShowDelete = (value: any) => {
  isShowDelete.value = value;
};
</script>

<style scoped lang="less">
.wrap {
  min-width: calc(100% - 2rem);
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
  .may-delete {
    width: 100%;
    height: 72px;
    line-height: 72px;
    border: 1px dashed #999;
    text-align: center;
    margin-top: 20px;
    color: var(--color-text);
  }
  .content {
    width: 100%;
    background: var(--content-bg-color);
    color: var(--color-text);
    height: 300px;
    text-align: left;
    overflow-y: auto;
    overscroll-behavior: none;
    border-radius: 0px 0px 4px 4px;
    padding-top: 10px;
    /* overflow-x: hidden; */
  }
}
@media (max-width: 900px) {
  .wrap {
    grid-template-columns: 1fr;
    grid-gap: 0px 20px;
  }
}
</style>
