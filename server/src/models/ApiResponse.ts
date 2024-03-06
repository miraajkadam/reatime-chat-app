export default class ApiResponse<T> {
  isSuccess: boolean
  message: string
  data?: T

  constructor() {
    this.isSuccess = false
    this.message = ''
  }
}
