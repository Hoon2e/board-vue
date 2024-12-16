<template>
  <div class="container">
    <h1 class="title">홈페이지에 오신 것을 환영합니다!</h1>
    <p class="description">저희 서비스를 탐험하거나 로그인하여 더 많은 기능을 이용해보세요.</p>
    <div class="links">
      <router-link to="/login" class="btn">로그인</router-link>
      <router-link to="/register" class="btn">회원가입</router-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomePage',
}
</script>

<style scoped>
.container {
  text-align: center;
  margin-top: 50px;
  padding: 20px;
}

.title {
  font-size: 2rem;
  color: #333;
}

.description {
  font-size: 1.2rem;
  margin: 20px 0;
  color: #666;
}

.links {
  margin-top: 20px;
}

.btn {
  text-decoration: none;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 0 10px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
