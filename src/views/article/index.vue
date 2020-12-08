<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑导航 -->
      </div>
      <!-- 数据查询 -->
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              :key="index"
              v-for="(channel,index) in channels"
              :label="channel.name"
              :value="channel.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button :disabled="loading" type="primary" @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- /数据查询 -->
    </el-card>
    <!-- 数据列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询出{{totalCount}}条结果：</span>
      </div>
      <el-table
        v-loading="loading"
        class="list-table"
        :data="articleData"
        style="width: 100%"
        size="mini"
        stripe
      >
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.cover.images[0]"
              fit="cover"
              lazy
            ></el-image>
            <!-- <img
              v-if="scope.row.cover.images[0]"
              class="article-cover"
              :src="scope.row.cover.images[0] "
              alt
            />
            <img v-else class="article-cover" src="./no-cover.jpg" alt />-->
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag
              :type="articleStatus[scope.row.status].type"
            >{{articleStatus[scope.row.status].text}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="$router.push('/publish?id='+scope.row.id)" size="mini" circle type="primary">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button
              circle
              size="mini"
              type="danger"
              @click.native="onDeleteArticle(scope.row.id)"
            >
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @current-change="onCurrentChange"
        :disabled="loading"
        :page-size="this.pageSize"
        background
        layout="prev, pager, next"
        :total="totalCount"
      ></el-pagination>
    </el-card>
    <!-- /数据列表 -->
  </div>
</template>

<script>
import { getArticles, getArticlesChannels, deleteArticle } from "@/api/article";
export default {
  name: "ArticleIndex",
  data() {
    return {
      form: {
        name: "",
        date1: "",
      },
      articleData: [],
      articleStatus: [
        {
          type: "warning",
          text: "草稿",
        },
        {
          type: "warning",
          text: "待审核",
        },
        {
          type: "success",
          text: "审核通过",
        },
        {
          type: "danger",
          text: "审核失败",
        },
      ],
      totalCount: 0,
      pageSize: 10,
      status: null,
      channels: [],
      channelId: null,
      rangeDate: null,
      loading: true,
    };
  },
  created() {
    this.loadArticles(1);
    this.loadChannels();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    loadArticles(page = 1) {
      this.loading = true;
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null,
      }).then((res) => {
        // console.log(res);
        this.articleData = res.data.data.results;
        this.totalCount = res.data.data.total_count;
        this.loading = false;
      });
    },
    onCurrentChange(page) {
      this.loadArticles(page);
    },
    loadChannels() {
      getArticlesChannels().then((res) => {
        // console.log(res);
        this.channels = res.data.data.channels;
      });
    },
    onDeleteArticle(articleId) {
      this.$confirm("是否继续删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(articleId);
          console.log(articleId.toString());
          deleteArticle(articleId.toString()).then((res) => {
            console.log(res);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });sa                                                         
        });
    },
  },
};
</script>

<style>
.filter-card {
  margin-bottom: 30px;
}
.list-table {
  margin-bottom: 20px;
}
.article-cover {
  width: 100px;
  background-size: cover;
}
</style>