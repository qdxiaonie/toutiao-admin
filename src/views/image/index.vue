<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑导航 -->
      </div>
      <el-radio-group v-model="radio" size="mini">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col :xs="12" :sm="6" :md="6" :lg="4">
          <el-image
            style=" height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          ></el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="6" :lg="4">
          <el-image
            style=" height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          ></el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="6" :lg="4">
          <el-image
            style=" height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          ></el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="6" :lg="4">
          <el-image
            style=" height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          ></el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="6" :lg="4">
          <el-image
            style=" height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          ></el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="6" :lg="4">
          <el-image
            style=" height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="cover"
          ></el-image>
        </el-col>
      </el-row>
      <!-- /素材列表 -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "全部",
      radio1: "收藏",
    };
  },
};
</script>

<style>
</style>