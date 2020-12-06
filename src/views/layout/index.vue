<template>
  <el-container class="layout-container">
    <el-aside width="auto" class="aside">
      <app-aside class="aside-menu" :is-collapse="isCollapse"></app-aside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i
            :class="{'el-icon-s-unfold':isCollapse,'el-icon-s-fold':!isCollapse}"
            @click="isCollapse =!isCollapse"
          ></i>
          <span>中山原子创客空间</span>
        </div>
        <div class="user-wrap">
          <div class="userimg">
            <img :src="user.photo" alt />
          </div>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ user.name }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人设置</el-dropdown-item>
              <el-dropdown-item @click.native="onLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from "./components/aside.vue";
import { getUserProfile } from "@/api/user";
import globalBus from "@/utils/global-bus";
export default {
  data() {
    return {
      user: {},
      isCollapse: false,
    };
  },
  components: { AppAside },
  created() {
    //组件初始化好，请求获取用户资料
    this.loaderUserProfile();
    globalBus.$on("update-user", (data) => {
      this.user.name = data.name;
      this.user.photo = data.photo;
    });
  },
  methods: {
    loaderUserProfile() {
      getUserProfile().then((res) => {
        this.user = res.data.data;
      });
    },
    onLogout() {
      this.$confirm("是否继续退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // this.$message({
          //   type: "success",
          //   message: "退出成功!",

          // });
          window.localStorage.removeItem("user");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
};
</script>

<style>
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside {
  background-color: rgb(148, 96, 96);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
/* .main {
  background-color: rgb(94, 127, 170);
} */
.aside-menu {
  height: 100%;
}
.user-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
.userimg {
  margin-right: 10px;
}
.userimg img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>