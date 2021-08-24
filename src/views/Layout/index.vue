<template>
  <div id="layout-container">
    <el-aside class="layout-aside-container">
        <el-menu
        default-active="2"
        class="el-menu-vertical-container"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
            <router-link :to="{
                name: ''
            }">
                <el-menu-item index="1">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                </el-menu-item>
            </router-link>
            <router-link :to="{
                name: ''
            }">
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
            </router-link>
        </el-menu>
    </el-aside>
    <el-container class="layout-container">
        <el-main class="layout-main-container">
            <router-view />
        </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  created() {
    console.log(this.$route);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scope>
#layout-container {
    width: 100%;
    height: 100%;
    display: flex;
}
.layout-aside-container {
    width: 200px;
    height:100%;
    display: inline-block;
    background: #abcdef;
}
.layout-main-container {
    width: 100%;
    height: 100%;
}
.layout-container {
    background: #fcc;
}
.el-menu-vertical-container {
    height: 100%;
}
</style>
