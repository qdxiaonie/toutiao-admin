<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.query.id ? "修改文章":"发布文章"}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑导航 -->
      </div>
      <!-- 发布文章区域 -->
      <el-form ref="publish-form" :rules="formRules" :model="article" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-tiptap width="100%" height="300px" v-model="article.content" :extensions="extensions"></el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <template v-if="article.cover.type > 0">
            <article-cover
              :key="index"
              v-for="(cover,index) in article.cover.type"
              v-model="article.cover.images[index]"
            />
          </template>
        </el-form-item>

        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              :key="index"
              v-for="(channel,index) in channels"
              :label="channel.name"
              :value="channel.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">{{$route.query.id ? "修改":"发布"}}</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getArticlesChannels,
  addArticle,
  getArticle,
  updateArticle,
} from "@/api/article";
import { ElementTiptap } from "element-tiptap";
import ArticleCover from "./components/cover";

import {
  // necessary extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Image,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
} from "element-tiptap";
import { uploadImage } from "@/api/images";
export default {
  name: "PublishIndex",

  components: {
    "el-tiptap": ElementTiptap,
    "article-cover": ArticleCover,
  },
  data() {
    return {
      article: {
        title: "",
        content: "",
        cover: {
          type: 0,
          images: [],
        },
      },
      channels: [],
      channel_id: null,
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
        new Italic(),
        new Image({
          uploadRequest(file) {
            const fd = new FormData();
            fd.append("image", file);
            return uploadImage(fd).then((res) => {
              return res.data.data.url;
            });
          },
        }),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
      ],
      formRules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 5, max: 30, message: "长度在5到30个字符", trigger: "blur" },
        ],
        content: [
          {
            validator(rule, value, callback) {
              if (value === "<p></p>") {
                callback(new Error("请输入文章内容"));
              } else {
                callback();
              }
            },
          },
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
        channel_id: [
          { required: true, message: "请选择频道", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.loadChannels();

    //如果路径中有id则请求展示文章内容
    if (this.$route.query.id) {
      this.loadArticle();
    }
  },
  methods: {
    onPublish(draft) {
      this.$refs["publish-form"].validate((valid) => {
        if (valid) {
          const articleId = this.$route.query.id;
          if (articleId) {
            updateArticle(articleId, this.article, draft).then((res) => {
              this.$message({
                type: "success",
                message: `${draft ? "存入草稿" : "修改"}成功`,
              });
              this.$router.push("/article");
            });
          } else {
            addArticle(this.article, draft).then((res) => {
              // console.log(res);
              // this.$message(`${draft ? "存入草稿" : "发布"}成功`);
              this.$message({
                type: "success",
                message: `${draft ? "存入草稿" : "发布"}成功`,
              });
              this.$router.push("/article");
            });
          }
        } else {
          return false;
        }
      });
    },
    loadChannels() {
      getArticlesChannels().then((res) => {
        this.channels = res.data.data.channels;
      });
    },
    //加载文章内容
    loadArticle() {
      getArticle(this.$route.query.id).then((res) => {
        this.article = res.data.data;
      });
    },
    // 上传封面
    onUpdateCover(index, url) {
      this.article.cover.images[index] = url;
    },
  },
};
</script>

<style>
</style>