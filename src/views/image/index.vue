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
      <!-- 图片列表 -->
      <image-list />
      <!-- 图片列表 -->
    </el-card>
  </div>
</template>

<script>
import imageList from "./components/image-list";
export default {
  components: { imageList },
};
</script>

<style>
</style>