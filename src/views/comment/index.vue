<template>
  <div class="comment-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑导航 -->
      </div>
      <el-table
        v-loading="loading"
        class="comment-list"
        :data="articleData"
        style="width: 100%"
        stripe
      >
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="评论状态">
          <template slot-scope="scope">{{scope.row.comment_status ? '正常' : '关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.statusDisabled"
              @change="onStatusChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :disabled="disabled"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, uploadCommentStatus } from "@/api/article";
export default {
  created() {
    this.loadArticles();
  },
  data() {
    return {
      articleData: [],
      totalCount: 0,
      pageSize: 10,
      page: 1,
      loading: false,
      disabled: false,
    };
  },
  methods: {
    handleSizeChange() {
      this.loadArticles(1);
    },
    handleCurrentChange(page) {
      this.loadArticles(page);
    },
    loadArticles(page = 1) {
      this.disabled = true;
      this.loading = true;
      this.page = page;
      getArticles({
        response_type: "comment",
        page,
        per_page: this.pageSize,
      }).then((res) => {
        const results = res.data.data.results;
        results.forEach((article) => {
          article.statusDisabled = false;
        });
        this.articleData = results;
        this.totalCount = res.data.data.total_count;
        this.loading = false;
        this.disabled = false;
      });
    },
    onStatusChange(article) {
      article.statusDisabled = true;
      console.log(article);
      uploadCommentStatus(article.id.toString(), article.comment_status).then(
        (res) => {
          console.log(res);
          article.statusDisabled = false;
          this.$message({
            type: "success",
            message: article.comment_status ? "开启成功" : "关闭成功",
          });
        }
      );
    },
  },
};
</script>

<style>
.comment-list {
  margin-bottom: 30px;
}
</style>