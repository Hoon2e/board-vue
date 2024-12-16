<script setup lang="ts">
// Vue Composition API Imports
import { reactive, ref, watch } from 'vue'

// API 및 사용자 데이터 타입
import { loginUser } from '@/api/user'
import type { UserLoginRequest } from '@/types/user'

// Store 및 Composable Imports
import { useUserStore } from '@/stores/user'
import { useAuth } from '@/composables/useAuth'

// Router
import router from '@/router'

// 사용자 인증 상태 가져오기
const { isLoading, user } = useAuth()

// 로그인 폼 데이터 및 상태 초기화
const loginData = reactive<UserLoginRequest>({
  username: '', // 사용자 아이디
  password: '', // 사용자 비밀번호
})
const loginError = ref('') // 로그인 실패 메시지 상태

// 상태 변화에 따른 리다이렉션 처리
watch(
  () => [isLoading.value, user.value], // 로딩 상태와 사용자 정보를 감시
  ([isLoading, user]) => {
    if (!isLoading && user && router.currentRoute.value.name !== 'main') {
      router.push({ name: 'main' }) // 로그인된 사용자는 'main' 페이지로 이동
    }
  },
  { immediate: true }, // 컴포넌트 마운트 시 바로 실행
)

// 로그인 처리 메서드
async function handleLogin() {
  try {
    loginError.value = '' // 이전 에러 초기화

    // 로그인 API 호출
    const response = await loginUser(loginData)

    // 로그인 성공 시 사용자 정보를 스토어에 저장
    useUserStore().setUser(response.data)

    // 성공 메시지 출력 후 메인 페이지로 이동
    alert(`아이디: ${response.data.username} 로그인 성공`)
    router.push({ name: 'main' })
  } catch (error) {
    // 실패 시 에러 메시지 설정
    loginError.value = '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.'
    console.error('[LoginPage] 로그인 실패 : ', error)
  }
}
</script>

<template>
  <!-- 로그인 폼 -->
  <div v-if="!isLoading && !user" class="login-container">
    <h2 class="title">로그인</h2>

    <!-- 로그인 에러 메시지 -->
    <form @submit.prevent="handleLogin">
      <div v-if="loginError" class="error">{{ loginError }}</div>

      <!-- 사용자 아이디 입력 -->
      <div class="form-group">
        <label for="username">아이디</label>
        <input v-model="loginData.username" id="username" type="text" class="input" required />
      </div>

      <!-- 사용자 비밀번호 입력 -->
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input v-model="loginData.password" id="password" type="password" class="input" required />
      </div>

      <!-- 로그인 버튼 -->
      <button type="submit" class="btn">로그인</button>
    </form>

    <!-- 회원가입 링크 -->
    <p class="register-link">
      계정이 없으신가요? <router-link to="/register">회원가입</router-link>
    </p>
  </div>
</template>

<style scoped>
/* 로그인 컨테이너 스타일 */
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

/* 제목 스타일 */
.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

/* 폼 그룹 스타일 */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

/* 입력 필드 스타일 */
.input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* 버튼 스타일 */
.btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

/* 회원가입 링크 스타일 */
.register-link {
  text-align: center;
  margin-top: 10px;
  font-size: 0.9rem;
  color: #666;
}

/* 에러 메시지 스타일 */
.error {
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
  text-align: center;
}
</style>
