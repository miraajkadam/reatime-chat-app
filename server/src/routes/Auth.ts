// import { Router, type Request, type Response } from 'express'
// import { LoginApiPayload, LoginApiResponse } from '../types/AuthTypes'
// import ApiResponse from '../models/ApiResponse'
// import User from '../models/User'

// const AuthController = Router()

// /**
//  * Login a user
//  */
// AuthController.post(
//   '/login',
//   async (
//     req: Request<null, ApiResponse<LoginApiResponse>, LoginApiPayload, null>,
//     res: Response<ApiResponse<LoginApiResponse>>
//   ) => {
//     const apiResponse = new ApiResponse<LoginApiResponse>()

//     const { email, password } = req.body

//     const user = await User.findOne<{
//       id: string
//       email: string
//       name: string
//     }>(
//       { email, password },
//       {
//         id: '$_id',
//         _id: 0,
//         email: 1,
//         name: 1,
//       }
//     )

//     if (user) {
//       apiResponse.isSuccess = true
//       apiResponse.message = 'User logged in successfully'
//       apiResponse.data = user

//       return res.status(200).send(apiResponse)
//     } else {
//       apiResponse.isSuccess = false
//       apiResponse.message = 'Unable to login'

//       return res.status(200).send(apiResponse)
//     }
//   }
// )

// /**
//  * Logout a user
//  */
// AuthController.post(
//   '/logout',
//   async (
//     req: Request<null, ApiResponse<boolean>, null, null>,
//     res: Response<ApiResponse<boolean>>
//   ) => {
//     const apiResponse = new ApiResponse<boolean>()

//     apiResponse.message = 'Logged out successfully'

//     return res.status(200).send(apiResponse)
//   }
// )

// export default AuthController
