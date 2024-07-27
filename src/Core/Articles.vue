<template>
  <navigate  :origin-tab="'功能'"></navigate>
  <div class="article-list">
    <input type="text" v-model="searchQuery" placeholder="Search..." />
    <h1 style="margin: 0;">文章列表</h1>
    <ul>
      <li v-for="article in filteredArticles" :key="article.id">
        <h2>{{ article.title }}</h2>
        <div class="meta">
          <span>Reads: {{ article.reads }}</span>
          <span>Comments: {{ article.comments }}</span>
          <span>Likes: {{ article.likes }}</span>
          <span>Date: {{ formatDate(article.date) }}</span>
          <a style="text-decoration: underline; float: right; color: dodgerblue; ">编辑</a>
          <a style="text-decoration: underline; float: right; color: dodgerblue; margin: 0 8px;">浏览</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { format } from 'date-fns';
import Navigate from "@/components/Navigate.vue";
const searchQuery = ref('');
const articles = ref([]);

import {myHttp} from "@/request/myrequest";
import {ElMessage} from "element-plus";

myHttp.get('/article/articles')
    .then(response => {
      if (response.data.code === 200) {
        let array = response.data.data;
        for (let i = 0; i < array.length; i++) {
          let item = array[i]
          articles.value.push({
            id: item.articleId,
            title: item.title,
            reads: 100,
            comments: 20,
            likes: 50,
            date: item.createdAt.replace(/\.0$/, '')})
        }
      }else {
        ElMessage({
          message: '获取文章列表失败！',
          type: 'error',
        });
      }
    })
    .catch(error => console.error('Error:', error));

const filteredArticles = computed(() => {
  return articles.value.filter(article =>
      article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const formatDate = (date) => {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};

</script>

<style scoped>
.article-list {
  max-width: 800px;
  margin: 70px auto auto;
}
.article-list input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}
.article-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.article-list li {
  border-bottom: 1px solid #eee;
  padding: 20px;
  margin-bottom: 10px;
  width: 100%;
  float: left;
  text-align: left;
}
.article-list .meta {
  color: #888;
  font-size: 14px;
}
</style>