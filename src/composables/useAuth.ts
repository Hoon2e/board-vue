import { ref, onMounted, readonly, unref, toValue } from 'vue'
import type { UserResponse } from '@/types/user'
import { authMe } from '@/api/user'
import { useUserStore } from '@/stores/user'

export function useAuth() {
  const user = ref<UserResponse | null>(null) // 사용자 정보
  const error = ref(false) // 에러 메시지
  const isLoading = ref(true) // 로딩 상태
  const userStore = useUserStore()

  const fetchAuthStatus = async () => {
    try {
      const response = await authMe()
      user.value = response.data // 사용자 정보 저장
      userStore.setUser(user.value)
    } catch {
      user.value = null
      error.value = true
      userStore.$reset()
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    fetchAuthStatus() // 컴포넌트 마운트 시 호출
  })

  return {
    user: readonly(user),
    error: readonly(error),
    isLoading: readonly(isLoading),
  }
}
