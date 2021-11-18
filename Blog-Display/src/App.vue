<template>
  <div class="main-container" @scroll="handleScroll" ref="main">
    <div
      class="header-container"
      :style="{
        opacity: lock ? '0' : '1'
      }"
    >
      <Header />
    </div>
    <div class="content-container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
  import Header from './components/Header/index.vue'

  export default defineComponent({
    components: {
      Header
    },
    setup (props, context) {
      const lock = ref(false)
      const handleScroll = (e: any) => {
        if (main.value.scrollTop > 200) {
          lock.value = true
        } else {
          lock.value = false
        }
      }
      const main: any = ref(null)
      return {
        handleScroll,
        main,
        lock
      }
    }
  })
</script>

<style scoped>
.main-container {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.header-container {
  width: 100vw;
  height: 60px;
  position: fixed;
  z-index: 1;
  transition: opacity 0.5s ease-in-out;
}

.content-container {
  width: 100%;
  position: relative;
  top: 0;
}

</style>