<template>
  <div v-if="!isLoading && !user" class="register-container">
    <h2 class="title">회원가입</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="username">아이디</label>
        <input v-model="username" id="username" type="text" class="input" required />
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input v-model="password" id="password" type="password" class="input" required />
      </div>
      <div class="form-group">
        <label for="email">이메일</label>
        <input v-model="email" id="email" type="email" class="input" required />
      </div>
      <div class="form-group">
        <label for="role">권한</label>
        <select v-model="role" id="role" class="input">
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <button type="submit" class="btn">회원가입</button>
    </form>
    <p class="login-link">이미 계정이 있으신가요? <router-link to="/login">로그인</router-link></p>
  </div>
</template>

<script setup lang="ts">
import { registerUser } from '@/api/user'
import { useAuth } from '@/composables/useAuth'
import router from '@/router'
import type { UserRegisterRequest } from '@/types/user'
import { isAxiosError } from 'axios'
import { reactive, ref, toRefs, watch } from 'vue'
const { isLoading, user } = useAuth()

watch(
  [isLoading, user],
  ([isLoading, user]) => {
    if (!isLoading && user) {
      router.push('/main')
    }
  },
  { immediate: true },
)

const errorMessage = ref('')

const registerData = reactive<UserRegisterRequest>({
  username: '',
  password: '',
  email: '',
  role: 'USER',
})
const { username, password, email, role } = toRefs(registerData)
async function handleRegister() {
  try {
    errorMessage.value = ''
    await registerUser(registerData)
    alert(`회원가입 성공`)
    router.push('/login')
  } catch (error) {
    if (isAxiosError(error)) {
      errorMessage.value = error.response?.data.message
    } else {
      errorMessage.value = '알수없는 에러입니다.'
    }
  }
}
</script>
<style scoped>
.register-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

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

.login-link {
  text-align: center;
  margin-top: 10px;
  font-size: 0.9rem;
  color: #666;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}

.error-message::before {
  content: '⚠️ ';
}
</style>
