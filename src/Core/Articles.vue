<!--<template>-->
<!--  <div class="article-list">-->
<!--    <h1>文章列表</h1>-->
<!--    <ul>-->
<!--      <li v-for="article in articles" :key="article.id">-->
<!--        <h2>{{ article.title }}</h2>-->
<!--        <p>{{ article.summary }}</p>-->
<!--      </li>-->
<!--    </ul>-->
<!--    <button @click="addArticle">新增文章</button>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref } from 'vue';-->
<!--const articles = ref([-->
<!--  { id: 1, title: '文章标题1', summary: '文章摘要1' },-->
<!--  { id: 2, title: '文章标题2', summary: '文章摘要2' },-->
<!--  // 更多文章...-->
<!--]);-->

<!--function addArticle() {-->
<!--  // 添加文章的逻辑，例如弹窗输入标题和摘要-->
<!--  // articles.value.push({ id: 新ID, title: 新标题, summary: 新摘要 });-->
<!--}-->

<!--</script>-->

<!--<style>-->
<!--.article-list {-->
<!--  max-width: 600px;-->
<!--  margin: 0 auto;-->
<!--  padding: 20px;-->
<!--}-->

<!--ul {-->
<!--  list-style-type: none;-->
<!--  padding: 0;-->
<!--}-->

<!--li {-->
<!--  border-bottom: 1px solid #eee;-->
<!--  margin-bottom: 20px;-->
<!--  padding-bottom: 20px;-->
<!--}-->
<!--</style>-->



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

<style>
.article-list {
  max-width: 800px;
  margin: auto;
  margin-top: 70px;
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