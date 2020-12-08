<template>
  <div class="imageList-container">
    <div class="btns">
      <el-radio-group @change="loadImages(1)" v-model="collect" size="mini">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button
        v-if="isShowAdd"
        @click="dialogUploadVisible = true"
        type="success"
        size="mini"
      >上传素材</el-button>
    </div>

    <!-- 素材列表 -->
    <el-row :gutter="10">
      <el-col
        class="img-box"
        :key="index"
        v-for="(img,index) in images"
        :xs="12"
        :sm="6"
        :md="6"
        :lg="4"
        @click.native="selected = index"
      >
        <el-image style=" height: 100px" :src="img.url" fit="cover"></el-image>
        <div v-if="isShowSelected && selected === index" class="selected">
          <i class="el-icon-check"></i>
        </div>
        <div v-if="isShowAction" class="image-action">
          <el-button
            type="warning"
            :icon=" img.is_collected?'el-icon-star-on': 'el-icon-star-off'"
            circle
            size="mini"
            :loading="img.loading"
            @click="onCollect(img)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete-solid"
            circle
            size="mini"
            :loading="img.loading"
            @click="onDelete(img)"
          ></el-button>
          <!-- <i
              :class="{'el-icon-star-on':img.is_collected,'el-icon-star-off':!img.is_collected}"
              @click="onCollect(img)"
          ></i>-->
          <!-- <i class="el-icon-delete-solid"></i> -->
        </div>
      </el-col>
    </el-row>
    <!-- /素材列表 -->
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="totalCount"
      :current-page.sync="page"
      @current-change="onpageChange"
    ></el-pagination>
    <!-- /分页 -->
    <el-dialog :append-to-body="true" title="上传素材" :visible.sync="dialogUploadVisible">
      <el-upload
        class="upload-demo"
        drag
        name="image"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeader"
        :on-success="onUpLoadSuccess"
        :show-file-list="false"
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
import { getImages, collectImage, deleteImage } from "@/api/images";
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
      pageSize: 10,
      page: 1,
      totalCount: 0,
      selected: null,
    };
  },
  props: {
    isShowAdd: {
      type: Boolean,
      default: true,
    },
    isShowAction: {
      type: Boolean,
      default: true,
    },
    isShowSelected: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.loadImages(1);
  },
  methods: {
    loadImages(page) {
      this.page = page;
      getImages({
        collect: this.collect,
        page,
        per_page: this.pageSize,
      }).then((res) => {
        const results = res.data.data.results;
        results.forEach((img) => {
          img.loading = false;
        });
        this.images = results;
        this.totalCount = res.data.data.total_count;
      });
    },
    onUpLoadSuccess() {
      this.dialogUploadVisible = false;
      this.loadImages(this.page);
      this.$message({
        type: "success",
        message: "上传成功",
      });
    },
    onpageChange(page) {
      this.loadImages(page);
    },
    onCollect(img) {
      img.loading = true;
      collectImage(img.id, !img.is_collected).then((res) => {
        img.is_collected = !img.is_collected;
        img.loading = false;
      });
    },
    onDelete(img) {
      img.loading = true;
      deleteImage(img.id).then((res) => {
        this.loadImages();
        img.loading = false;
      });
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
.img-box {
  position: relative;
}
.image-action {
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 30px;
  bottom: 4px;
  font-size: 20px;
  text-align: center;
  background-color: rgba(248, 247, 247, 0.5);
}
.selected {
  position: absolute;
  font-size: 70px;
  font-weight: 700;

  color: green;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>