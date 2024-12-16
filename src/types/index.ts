export interface APIResponse<T> {
  status: 'SUCCESS' | 'FAILURE'
  statusCode: number
  message: string
  errorCode: string
  data: T
}
