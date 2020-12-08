<template >
  <div class="upload-cover" @click="showCoverSelect">
    <div class="cover-wrap">
      <img width="100%" height="100%" ref="cover-image" :src="value" alt />
    </div>

    <el-dialog append-to-body title="选择封面" :visible.sync="dialogVisible" width="60%">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="素材库" name="first">
          <image-list ref="image-list" is-show-selected :is-show-add="false" :is-show-action="false" />
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input ref="file" type="file" @change="onFileChange" />
          <img width="200px" ref="preview-cover" src alt />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button :loading="updateLoading" type="primary" @click="updateCover">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from "@/api/images";

import imageList from "@/views/image/components/image-list.vue";
export default {
  data() {
    return {
      dialogVisible: false,
      activeName: "first",
      updateLoading: false,
    };
  },
  props: ["value"],
  components: { imageList },
  methods: {
    showCoverSelect() {
      this.dialogVisible = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onFileChange() {
      const file = this.$refs.file.files[0];
      const blob = window.URL.createObjectURL(file);
      this.$refs["preview-cover"].src = blob;
    },
    updateCover() {
      if (this.activeName == "second") {
        this.updateLoading = true;
        const file = this.$refs.file.files[0];
        if (!file) {
          this.$message("请选择图片");
          return;
        }

        const fd = new FormData();
        fd.append("image", file);
        uploadImage(fd).then((res) => {
          this.updateLoading = false;
          this.dialogVisible = false;
          // console.log(res);
          this.$refs["cover-image"].src = res.data.data.url;
          //将图片地址发送给父组件
          this.$emit("input", res.data.data.url);
          this.$message({
            type: "success",
            message: "上传封面成功",
          });
        });
      } else if (this.activeName == "first") {
        const imageList = this.$refs["image-list"];
        const selected = imageList.selected;
        if (selected === null) {
          this.$message("请选择图片");
          return;
        }
        this.dialogVisible = false;
        this.$emit("input", imageList.images[selected].url);
        this.$message({
          type: "success",
          message: "上传封面成功",
        });
      }
    },
  },
};
</script>

<style>
/* .upload-cover {
  display: flex;
} */
.cover-wrap {
  width: 150px;
  height: 120px;
  border: 1px solid black;
}
</style>