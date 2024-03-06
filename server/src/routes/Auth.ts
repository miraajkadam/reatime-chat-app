import { Router, type Request, type Response } from 'express'
import ApiResponse from '../models/ApiResponse'
import User from '../models/User'

const AuthController = Router()

/**
 * Login a user
 */
AuthController.post(
  '/login',
  async (
    req: Request<null, ApiResponse<boolean>, { email: string; password: string }, null>,
    res: Response<ApiResponse<boolean>>
  ) => {
    const apiResponse = new ApiResponse<boolean>()

    const { email, password } = req.body

    const user = await User.countDocuments({ email, password }).exec()

    if (user) {
      apiResponse.isSuccess = true
      apiResponse.message = 'User logged in successfully'
      apiResponse.data = true

      return res.status(200).send(apiResponse)
    } else {
      apiResponse.isSuccess = false
      apiResponse.message = 'Unable to login'
      apiResponse.data = false

      return res.status(200).send(apiResponse)
    }
  }
)

/**
 * Logout a user
 */
AuthController.post(
  '/logout',
  async (
    req: Request<null, ApiResponse<boolean>, null, null>,
    res: Response<ApiResponse<boolean>>
  ) => {
    const apiResponse = new ApiResponse<boolean>()

    apiResponse.message = 'Logged out successfully'

    return res.status(200).send(apiResponse)
  }
)

export default AuthController
