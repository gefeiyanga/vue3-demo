<template>
  <div
    class="item"
    v-for="(task, index) in filterList"
    :key="index"
    :draggable="true"
    @dragstart="handleOnDragStart($event, task.value)"
    @dragover.prevent.stop
    @dragenter.prevent.stop
    @dragleave.prevent.stop
    @dragend="handleOnDragEnd"
    @drop.prevent.stop
  >
    <div class="text" :class="task.incompleted ? '' : 'completed-text'">
      {{ index + 1 }}. {{ task.value }}
    </div>
    <div class="switch-wrap">
      <el-switch
        inactive-color="#F2E0C7"
        @change="handleSwitch()"
        v-model="task.incompleted"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  filterList: any[];
  updateIsShowDelete: Function;
}

const props = defineProps<Props>();

const handleSwitch = () => {
  if (navigator.vibrate) {
    navigator.vibrate(2000);
  }
};

const handleOnDragStart = (e: any, value: any) => {
  props.updateIsShowDelete(value);

  const dragSrcEl = e.target;
  var dt = e.dataTransfer;
  dt.effectAllowed = "move";
  dt.setData("text", dragSrcEl.innerHTML);
};

const handleOnDragEnd = (e: any) => {
  e.preventDefault();
  e.stopPropagation();

  props.updateIsShowDelete(null);
};
</script>

<style scoped lang="less">
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 32px;
  padding: 2px 20px;
  position: relative;
  .completed-text {
    color: var(--completed-text-color);
    text-decoration: line-through;
  }
  &:hover {
    /* background: #fdf0e1; */
    background: var(--content-item-bg-color-hover);
    padding: 20px 20px;
  }
  .switch-wrap {
    display: none;
  }
  &:hover .switch-wrap {
    display: inline-block;
  }
}
@media (max-width: 900px) {
  .item {
    &:hover {
      padding: 0px 20px;
      background: transparent;
    }
    &:hover .switch-wrap {
      display: none;
    }
  }
}
</style>
