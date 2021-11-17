<template>
  <div class="main-container">
    <div class="header-container">
      <Header />
    </div>
    <div class="carousel-container">
      <Carousel />
    </div>
    <div class="content-container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
  import Header from './components/Header/index.vue'
  import Carousel from './components/Carousel/index.vue'

  export default defineComponent({
    components: {
      Header,
      Carousel
    },
    setup (props, context) {
      
      return {
        
      }
    }
  })
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
}

.header-container {
  width: 100%;
  position: absolute;
  z-index: 1000;
}

.carousel-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: #abcdef;
}

</style>