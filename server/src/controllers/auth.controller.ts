import { type Request, type Response } from 'express'

import {
  checkIfUserExistsInDb,
  createUserInDb,
  getUserByEmailAndPasswordFromDb,
} from '@dtos/users.dto'
import { ApiResponse } from '@models/ApiResponse'
import type { LoginApiPayload, LoginApiResponse } from '../types/AuthTypes.d'

export const loginUser = async (
  req: Request<null, ApiResponse<LoginApiResponse>, LoginApiPayload, null>,
  res: Response<ApiResponse<LoginApiResponse>>
) => {
  const { email, password } = req.body

  const user = await getUserByEmailAndPasswordFromDb(email, password)

  if (!user) {
    res.status(200).send({
      message: 'Invalid email or password',
      success: false,
    })
  } else {
    res.status(200).send({
      message: 'successfully logged in',
      success: true,
      data: user,
    })
  }
}

export const logoutUser = async (req: Request, res: Response<ApiResponse<void>>) =>
  res.status(200).send({ message: 'logged out successfully', success: true })

/**
 * Add a new user (Sign up)
 */
export const addUser = async (
  req: Request<
    {},
    ApiResponse<string>,
    {
      name: string
      email: string
      password: string
    }
  >,
  res: Response<ApiResponse<string>>
) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res
        .status(403)
        .json({ success: false, message: 'Missing email or username or password' })
    }

    const userExists = await checkIfUserExistsInDb(email)

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      })
    }

    console.log(`Adding user with email id: ${email}`)

    const createdUserId = await createUserInDb(email, name, password)

    return res
      .status(200)
      .send({ message: 'User created successfully', success: true, data: createdUserId })
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message, stack: err.stack })
  }
}
