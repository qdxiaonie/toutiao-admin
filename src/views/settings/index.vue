<template>
  <div class="settings-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑导航 -->
      </div>
      <el-row>
        <el-col :span="14">
          <el-form ref="form" :model="user" label-width="80px">
            <el-form-item label="编号:">{{user.id}}</el-form-item>
            <el-form-item label="手机:">{{user.mobile}}</el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :offset="2" :span="8">
          <el-avatar shape="square" :size="160" fit="cover" :src="user.photo"></el-avatar>
          <p>点击修改图像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      user: {
          email:'',
          id:null,
          intro:'',
          mobile:'',
          name:'',
          photo:''
      },
    };
  },
  created() {
    this.loadUser();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    loadUser() {
      getUserProfile().then((res) => {
        console.log(res);
        this.user = res.data.data;
      });
    },
  },
};
</script>

<style>
</style>