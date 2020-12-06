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
          <el-form ref="update-form" :rules="formRules" :model="user" label-width="80px">
            <el-form-item label="编号:">{{user.id}}</el-form-item>
            <el-form-item label="手机:">{{user.mobile}}</el-form-item>
            <el-form-item prop="name" label="媒体名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item prop="intro" label="媒体介绍">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button :loading="loading" type="primary" @click="updateUser">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :offset="2" :span="8">
          <label for="file">
            <el-avatar shape="square" :size="160" fit="cover" :src="user.photo"></el-avatar>
            <!-- <p @click="$refs.file.click()">点击修改图像</p>
            -->
            <p>点击修改图像</p>
          </label>
          <input @change="onFileChange" type="file" id="file" ref="file" hidden />
        </el-col>

        <el-dialog
          append-to-body
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
          @opened="onDialogOpened"
        >
          <div>
            <img class="preview-image" ref="preview-image" width="200px" :src="previewImage" alt />
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button :loading="updatePhotoLoading" type="primary" @click="updatePhoto">确 定</el-button>
          </span>
        </el-dialog>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile, updateUserPhoto } from "@/api/user";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
  data() {
    return {
      loading: false,
      dialogVisible: false,
      previewImage: "",
      cropper: null,
      updatePhotoLoading: false,
      user: {
        email: "",
        id: null,
        intro: "",
        mobile: "",
        name: "",
        photo: "",
      },
      formRules: {
        name: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 1, max: 7, message: "长度在1到7个字符之间", trigger: "blur" },
        ],
        intro: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 0,
            max: 60,
            message: "长度在0到60个字符之间",
            trigger: "blur",
          },
        ],
        email: [
          {
            pattern: /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/,
            message: "请输入正确的邮箱格式",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.loadUser();
  },
  methods: {
    updateUser() {
      this.loading = true;
      this.$refs["update-form"].validate((valid) => {
        if (valid) {
          updateUserProfile(this.user).then((res) => {
            this.$message({
              type: "success",
              message: "更新成功",
            });
            this.loading = false;
          });
        } else {
          return false;
        }
      });
    },
    loadUser() {
      getUserProfile().then((res) => {
        // console.log(res);
        this.user = res.data.data;
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    onFileChange() {
      // 处理图片预览
      const file = this.$refs.file;
      // console.log(file.files[0]);
      const blobData = window.URL.createObjectURL(file.files[0]);
      this.previewImage = blobData;

      this.dialogVisible = true;

      // console.log("change");
      // 解决选择相同文件时不触发点击事件
      this.$refs.file.value = "";
    },
    onDialogOpened() {
      if (this.cropper) {
        this.cropper.replace(this.previewImage);
        return;
      }
      const image = this.$refs["preview-image"];
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: "none",
      });
    },
    updatePhoto() {
      this.updatePhotoLoading = true;
      this.cropper.getCroppedCanvas().toBlob((file) => {
        // console.log(file);
        const fd = new FormData();
        fd.append("photo", file);
        updateUserPhoto(fd).then((res) => {
          this.user.photo = window.URL.createObjectURL(file);
          this.dialogVisible = false;
          this.updatePhotoLoading = false;
        });
      });
    },
  },
};
</script>

<style>
.preview-image {
  display: block;
  max-width: 100%;
  height: 200px;
}
</style>