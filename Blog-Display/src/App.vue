<template>
  <div class="main-container" @scroll="handleScroll" ref="main">
    <div
      :class="{
        'header-container': true,
        'show-animation': !lock,
        'hide-animation': lock
      }"
    >
      <Header/>
    </div>
    <div class="content-container">
      <router-view v-slot="{ Component }">
            <transition
              mode="out-in"
            >
                <component
                    :is="Component"
                    :main="main"
                ></component>
            </transition>
        </router-view>
    </div>
    <Footer />
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
                transform: styleLock ? 'rotate(0deg)' : 'rotate(-135deg)',
                background: bgState ? 'var(--icon-dark)' : 'var(--icon-bright)',
                color: bgState ? 'var(--font-dark)' : 'var(--font-bright)'
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
              opacity: styleLock ? 1 : 0,
              background: bgState ? 'var(--icon-dark)' : 'var(--icon-bright)',
              color: bgState ? 'var(--font-dark)' : 'var(--font-bright)'
            }"
            @click="handleChangScroll"
          >
            <CaretTop />
          </el-icon>
          <el-icon
            class="icon-item icon-show"
            :style="{
              bottom: styleLock ? '90px' : '0',
              opacity: styleLock ? 1 : 0,
              background: bgState ? 'var(--icon-dark)' : 'var(--icon-bright)',
              color: bgState ? 'var(--font-dark)' : 'var(--font-bright)'
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
  <Loading :lock="loadingLock"/>
</template>

<script lang="ts">
  import { defineComponent, ref, watchEffect } from 'vue'
  import Header from './components/Header/index.vue'
  import { CloseBold, Briefcase, CaretTop, VideoPlay, VideoPause, Moon, MoonNight } from '@element-plus/icons'
  import { useStore } from 'vuex'
  import Loading from "./components/Loading/index.vue"
  import Footer from './components/Footer/index.vue'

  export default defineComponent({
    components: {
      Header,
      CloseBold,
      Briefcase,
      CaretTop,
      VideoPlay,
      VideoPause,
      Moon,
      MoonNight,
      Loading,
      Footer
    },
    setup (props, context) {
      const store = useStore()
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

      // backTop回到顶部事件
      const handleChangScroll = () => {
        const timer = 100;
        const index = 10;
        const distance = main.value.scrollTop/index
        const timing =  setInterval(() => {
          main.value.scrollTop -= distance
          if (main.value.scrollTop <= 0) {
            main.value.scrollTop = 0
            clearInterval(timing)
          }
        }, timer/index)
        styleLock.value = false
      }

      // 音频管理
      const audioSwitch = ref(false)
      const audio: any = new Audio('http://qiniu.codegorgeous.top/a-soul.mp3')
      // 控制播放和暂停
      const handleChangeVideo = () => {
        // 音频音量
        audio.volume = 0.2
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
        audio.load()
        audio.play()
      }
      // 监控音频是否播放完毕
      audio.addEventListener('ended', audioEnd)
      
      // 背景色状态
      const bgState: any = ref(store.state.global.bgState)
      watchEffect(() => {
        bgState.value = store.state.global.bgState
      })

      const loadingLock: any = ref(store.state.global.loadingState);

      watchEffect(() => {
        loadingLock.value = store.state.global.loadingState
      })
      return {
        handleScroll,
        main,
        lock,
        handleClick,
        styleLock,
        audeoSwitch: audioSwitch,
        handleChangScroll,
        handleChangeVideo,
        audio,
        bgState,
        loadingLock
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
  transition: top 0.5s ease-in-out;
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
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 5px 0;
  cursor: pointer;
  transition: all 0.5s;
  font-size: 20px;
}

.backtop {
  position: absolute;
  z-index: 10001;
}

@media (max-width: 576px) {
  .menu-container {
    bottom: 10px;
    right: 10px;
  }
}

.show-animation {
  top: 0;
}

.hide-animation {
  top: -70px;
}


@keyframes show {
  0% {
    display: block;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes hide {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    display: none;
  }
}

</style>