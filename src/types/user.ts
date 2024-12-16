export interface UserRegisterRequest {
  username: string
  password: string
  email: string
  role: 'USER' | 'ADMIN'
}

export interface UserLoginRequest {
  username: string
  password: string
}

export interface UserResponse {
  userId: number
  username: string
  email: string
  role: 'USER' | 'ADMIN'
}
