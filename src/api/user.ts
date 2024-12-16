import type { APIResponse } from '@/types'
import type { UserLoginRequest, UserRegisterRequest, UserResponse } from '@/types/user'
import axios from './axios'
import { isAxiosError } from 'axios'
export const registerUser = async (data: UserRegisterRequest): Promise<APIResponse<number>> => {
  try {
    const response = await axios.post('/api/user/register', data)
    return response.data
  } catch (error) {
    handleError(error)
    throw error
  }
}

export const loginUser = async (data: UserLoginRequest): Promise<APIResponse<UserResponse>> => {
  try {
    const response = await axios.post('/api/user/login', data)
    return response.data
  } catch (error) {
    handleError(error)
    throw error
  }
}

export const authMe = async (): Promise<APIResponse<UserResponse>> => {
  try {
    const response = await axios.get('/api/user/me')
    return response.data
  } catch (error) {
    handleError(error)
    throw error
  }
}

export const logoutUser = async (): Promise<APIResponse<null>> => {
  try {
    const response = await axios.get('/api/user/logout')
    return response.data
  } catch (error) {
    handleError(error)
    throw error
  }
}

// 에러 핸들링 유틸리티 함수
function handleError(error: unknown) {
  if (isAxiosError<APIResponse<number>>(error)) {
    // Axios 에러 처리
    const status = error.response?.status
    const message = error.response?.data?.message || '요청 처리 중 오류가 발생했습니다.'
    const errorCode = error.response?.data?.errorCode || ''

    console.error(
      `유저 회원가입 실패 : \n상태코드 - ${status} \n메시지 - ${message} \n에러코드 - ${errorCode}`,
    )
  } else if (error instanceof Error) {
    // 일반적인 JS 에러 처리
    console.error(`알 수 없는 오류: ${error.message}`)
  } else {
    console.error('알 수 없는 오류가 발생했습니다.')
  }
}
