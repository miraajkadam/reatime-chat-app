import { type Request, type Response } from 'express'

import {
  checkIfUserExistsInDb,
  createUserInDb,
  deleteUserFromDb,
  getAllUsersFromDb,
  getUserByIdFromDb,
  updateUserInDb,
} from '../dtos/users.dto'
import { ApiResponse } from '../models/ApiResponse'

/**
 * get all users
 */
export const getAllUsers = async (
  _req: Request,
  res: Response<
    ApiResponse<
      {
        email: string
        name: string
      }[]
    >
  >
) => {
  try {
    const users = await getAllUsersFromDb()

    return res.send({ message: 'Users get route', data: users, success: true })
  } catch (err: any) {
    return res.status(500).json({
      stack: err.stack,
      message: 'Error in getting all users',
      success: false,
    })
  }
}

/**
 * get a user by their ID
 */
export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response<
    ApiResponse<{
      email: string
      name: string
    }>
  >
) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ message: 'Please enter a user ID', success: false })
    }

    const user = await getUserByIdFromDb(id)

    return res
      .status(200)
      .json({ message: 'User get with id successfully', data: user, success: true })
  } catch (err: any) {
    return res.status(500).json({
      message: err.message,
      success: false,
      stack: err.stack,
    })
  }
}

/**
 * Add a new user
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

/**
 * Update a user
 */
export const updateUser = async (
  req: Request<
    {},
    ApiResponse<string>,
    {
      name: string
      email: string
    }
  >,
  res: Response<ApiResponse<string>>
) => {
  try {
    const { email, name } = req.body

    if (!email || !name) {
      return res.status(403).json({ message: 'Missing email or name', success: false })
    }

    const existingUser = await checkIfUserExistsInDb(email)

    if (!existingUser) {
      return res.status(400).send({ message: `User doesn't exists`, success: false })
    }

    console.log(`Editing user ${email}`)

    const updatedUserId = await updateUserInDb(email, name)

    return res
      .status(200)
      .json({ message: 'User edited successfully', success: true, data: updatedUserId })
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message, stack: err.stack })
  }
}

/**
 * delete a user
 */
export const deleteUser = async (
  req: Request<
    {},
    ApiResponse<string>,
    {
      email: string
    }
  >,
  res: Response<ApiResponse<string>>
) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(403).json({ message: 'Missing email', success: false })
    }

    const existingUser = await checkIfUserExistsInDb(email)

    if (!existingUser) {
      return res.status(400).send({ message: `User doesn't exists`, success: false })
    }

    console.log(`Deleting user ${email}`)

    const deletedUserId = await deleteUserFromDb(email)

    return res
      .status(200)
      .json({ message: 'User deleted successfully', success: true, data: deletedUserId })
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message, stack: err.stack })
  }
}
