<script setup lang="ts">
import { RouterView } from 'vue-router';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'dayjs/locale/zh-cn';
// import { ref } from 'vue';

// const list = ref<number[]>([]);

// for (let i = 0; i < 1000; i++) {
//   list.value.push(i);
// }

window.addEventListener('popstate', (e) => {
  console.log('popstate', e);
});
</script>

<template>
  <el-config-provider size="default" :z-index="2000" :locale="zhCn">
    <RouterView />
    <!-- <img
      alt="Vue logo"
      class="logo"
      src="https://img2.baidu.com/it/u=2864910610,3451108898&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667"
      width="125"
      height="125"
    />
    <img
      alt="Vue logo"
      class="logo"
      src="https://img2.baidu.com/it/u=923444017,642453127&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067"
      width="125"
      height="125"
    />
    <div v-for="i in list" :key="i">{{ i }}</div> -->
  </el-config-provider>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView /> -->
</template>

<style scoped>
header {
  max-height: 100vh;
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  margin-top: 2rem;
  font-size: 12px;
  text-align: center;
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

@media (width >= 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    flex-wrap: wrap;
    place-items: flex-start;
  }

  nav {
    padding: 1rem 0;
    margin-top: 1rem;
    margin-left: -1rem;
    font-size: 1rem;
    text-align: left;
  }
}
</style>
