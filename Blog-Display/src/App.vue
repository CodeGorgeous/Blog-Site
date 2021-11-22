<template>
  <div class="main-container" @scroll="handleScroll" ref="main">
    <div
      class="header-container"
      :style="{
        opacity: lock ? '0' : '1'
      }"
    >
      <Header/>
    </div>
    <div class="content-container">
      <router-view :main="main"/>
    </div>
    <div
      class="menu-container"
    >
      <div class="icon-container">
        <div class="icon-main">
          <el-icon
            class="icon-item"
            :size="20"
            @click="handleClick"
            :style="{
              opacity: lock ? '1' : '0',
              cursor: lock ? 'pointer' : 'default',
              transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
              transform: styleLock ? 'rotate(0deg)' : 'rotate(-135deg)'
            }"
          >
            <CloseBold />
          </el-icon>
        </div>
        <div class="icon-items">
          <el-icon
            class="icon-item icon-show"
            :size="20"
            :style="{
              bottom: styleLock ? '45px' : '0',
              opacity: styleLock ? 1 : 0
            }"
            @click="handleChangScroll"
          >
            <CaretTop />
          </el-icon>
          <el-icon
            class="icon-item icon-show"
            :size="20"
            :style="{
              bottom: styleLock ? '90px' : '0',
              opacity: styleLock ? 1 : 0
            }"
            @click="handleChangeVideo"
          >
            <VideoPause v-if="audeoSwitch"/>
            <VideoPlay v-if="!audeoSwitch"/>
          </el-icon>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, ref, watchEffect, onMounted, onUnmounted } from 'vue'
  import Header from './components/Header/index.vue'
  import { CloseBold, Briefcase, CaretTop, VideoPlay, VideoPause } from '@element-plus/icons'

  export default defineComponent({
    components: {
      Header,
      CloseBold,
      Briefcase,
      CaretTop,
      VideoPlay,
      VideoPause
    },
    setup (props, context) {
      const lock = ref(false)
      const handleScroll = (e: any) => {
        if (main.value.scrollTop > 200) {
          lock.value = true
        } else {
          lock.value = false
          styleLock.value = false
        }
      }
      const main: any = ref(null)

      const styleLock = ref(false)
      const handleClick = () => {
        if (!lock.value) return
        styleLock.value = !styleLock.value
      }

      const handleChangScroll = () => {
        const timer = 100;
        const index = 10;
        const distance = main.value.scrollTop/index
        const timing =  setInterval(() => {
          main.value.scrollTop -= distance
          if (main.value.scrollTop < 0) {
            main.value.scrollTop = 0
          }
        }, timer/index)
        setTimeout(() => {
          clearInterval(timing)
        }, timer)
        styleLock.value = false
      }

      // 音频管理
      const audioSwitch = ref(false)
      // 音频资源
      const audio: any = new Audio('src/assets/music.mp3')
      // 控制播放和暂停
      const handleChangeVideo = () => {
        // 音频音量
        audio.volume = 0.1
        if (audioSwitch.value) {
          audio.pause()
        } else {
          audio.play()
        }
        audioSwitch.value = !audioSwitch.value
        styleLock.value = false
      }
      // 音频重新播放
      const audioEnd = () => {
        console.log('播放完毕')
        audio.load()
        audio.play()
      }

      // 目前想要知道audio什么时候播完完毕, 播放完毕后重新播放音频
      // ...
      audio.addEventListener('ended', audioEnd)

      return {
        handleScroll,
        main,
        lock,
        handleClick,
        styleLock,
        audeoSwitch: audioSwitch,
        handleChangScroll,
        handleChangeVideo,
        audio
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

.menu-container {
  position: fixed;
  bottom: 40px;
  right: 50px;
  color: #fff;
}

.icon-container {
  position: relative;
  z-index: 10;
}

.icon-main {
  position: relative;
  left: 0;
  top: 0;
  z-index: 100;
}

.icon-items {
  position: relative;
}

.icon-show {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  opacity: 0;
  transition: bottom 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.icon-item {
  width: 40px;
  height: 40px;
  background: #33333D;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 5px 0;
  cursor: pointer;
}

@media (max-width: 576px) {
  .menu-container {
    bottom: 10px;
    right: 10px;
  }
}


</style>