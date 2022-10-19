<script setup lang="ts">
import { RouterView } from 'vue-router';
import { reactive, onMounted } from 'vue';
import { Sunny, Moon } from '@element-plus/icons-vue';

const theme = reactive({ value: 'light' });

onMounted(() => {
  const localTheme = localStorage.getItem('loose-theme');
  if (localTheme) {
    theme.value = localTheme;
  }
  if (theme.value == 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    /* document.documentElement.setAttribute('data-theme', 'light'); */
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme.value = 'dark';
    }
  }
});

const changeTheme = (val: string) => {
  console.log(val);
  theme.value = val;
  if (val == 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('loose-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('loose-theme', 'dark');
  }
};
</script>

<template>
  <header>
    <div class="theme-wrap">
      <el-switch
        active-value="light"
        inactive-value="dark"
        v-model="theme.value"
        @change="changeTheme"
        :active-icon="Sunny"
        :inactive-icon="Moon"
        inactive-color="#999"
        inline-prompt
      />
    </div>
  </header>

  <RouterView />
</template>

<style lang="less" scoped>
header {
  height: 60px;
  display: flex;
  align-items: center;
  max-height: 100vh;
  & :deep(.el-switch) {
    height: 20px;
  }
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
.theme-wrap {
  position: absolute;
  right: 0px;
  & :deep(.el-switch__core .el-switch__action) {
    background-color: transparent;
  }
  & :deep(.el-switch.is-checked .el-switch__core .el-switch__inner) {
    border-radius: 50%;
    background: #f5f5f5;
  }
  & :deep(.el-switch__core .el-switch__inner) {
    background: #333;
    border-radius: 50%;
  }
  & :deep(.el-switch__core .el-switch__inner .is-icon) {
    color: var(--color-text);
  }
}
@media (min-width: 1024px) {
  header {
    display: flex;
    position: relative;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
