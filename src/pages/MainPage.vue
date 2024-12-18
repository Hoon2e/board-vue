<template>
  <div>main</div>
  <button @click="onClickLogout">logout</button>
</template>

<script setup lang="ts">
import { logoutUser } from '@/api/user'
import router from '@/router'

const onClickLogout = async () => {
  try {
    await logoutUser()
    alert('logout 성공')
    router.push('/login')
  } catch {
    alert('logout 실패')
  }
}
</script>

<style scoped></style>
