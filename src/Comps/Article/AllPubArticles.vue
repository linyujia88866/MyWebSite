<template>
  <div class="article-list">
    <input type="text" v-model="searchQuery" placeholder="Search..." />
    <h1 style="margin: 0;">文章列表</h1>
    <ul v-if="filteredArticles.length > 0">
      <li v-for="article in filteredArticles" :key="article.id">
        <h2>{{ article.title }}</h2>
        <div class="meta">
          <span>作者: {{ article.username }}</span>
          <span>阅读数: {{ article.reads }}</span>
          <span>评论数: {{ article.comments }}</span>
          <span>点赞数: {{ article.likes }}</span>
          <span>发表时间： {{ formatDate(article.date) }}</span>
          <a
              @click="viewArticleById(article.id)"
              style="text-decoration: underline;
              float: right;
              cursor: pointer;
              color: dodgerblue;
              margin: 0 8px;">浏览</a>
        </div>
      </li>
    </ul>
    <el-empty  v-else description="没有文章" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { format } from 'date-fns';
import {useRouter} from "vue-router";
import {getAllPubArticles, viewArt} from "@/utils/articleApi";

const searchQuery = ref('');
const articles = ref([]);
const router = useRouter();

getArtList()
async function getArtList() {
  let array = await  getAllPubArticles()
  for (let i = 0; i < array.length; i++) {
    let item = array[i]
    articles.value.push({
      id: item.articleId,
      title: item.title,
      reads: item.readCount,
      comments: item.commentCount,
      likes: item.goodCount,
      username: item.username,
      date: item.createdAt.replace(/\.0$/, '')
    })
  }
}

const filteredArticles = computed(() => {
  return articles.value.filter(article =>
      article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

async function viewArticleById(artId) {
  // let res = await  viewArt(artId)
  await router.push({
    name: 'viewArticle',
    // state: res,
    query:{articleId: artId}
  });
}
const formatDate = (date) => {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};

</script>

<style scoped>
.article-list {
  max-width: 800px;
  max-height: 600px;
  margin: 0 auto auto;
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

span{
  margin: 8px;
}
</style>