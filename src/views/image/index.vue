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
      <div class="btns">
        <el-radio-group @change="onCollectChange" v-model="collect" size="mini">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="dialogUploadVisible = true" type="success" size="mini">上传素材</el-button>
      </div>

      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col :key="index" v-for="(img,index) in images" :xs="12" :sm="6" :md="6" :lg="4">
          <el-image style=" height: 100px" :src="img.url" fit="cover"></el-image>
        </el-col>
      </el-row>
      <!-- /素材列表 -->
    </el-card>
    <el-dialog :append-to-body="true" title="上传素材" :visible.sync="dialogUploadVisible">
      <el-upload
        class="upload-demo"
        drag
        name="image"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeader"
        :on-success="onUpLoadSuccess"
        :show-file-list='false'
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages } from "@/api/images";
export default {
  data() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    return {
      collect: false,
      images: [],
      dialogUploadVisible: false,
      uploadHeader: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  },
  created() {
    this.loadImages(false);
  },
  methods: {
    loadImages(collect) {
      getImages({
        collect,
      }).then((res) => {
        this.images = res.data.data.results;
      });
    },
    onCollectChange(value) {
      this.loadImages(value);
    },
    onUpLoadSuccess() {
      this.dialogUploadVisible = false;
      this.loadImages(false);
    },
  },
};
</script>

<style>
.btns {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
}
</style>