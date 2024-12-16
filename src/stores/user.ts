import { readonly, ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserResponse } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserResponse | null>(null)

  function setUser(data: UserResponse | null) {
    user.value = data
  }

  return { user: readonly(user), setUser }
})
