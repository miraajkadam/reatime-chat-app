import { Router, type Request, type Response } from 'express'
import {
  checkIfUserExists,
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../dtos/Users.dto'
import { ApiResponse } from '../models/ApiResponse'

const UsersController = Router()

/**
 * Get all users
 */
UsersController.get(
  '/',
  async (
    req,
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
      const users = await getAllUsers()

      return res.send({ message: 'Users get route', data: users, success: true })
    } catch (err: any) {
      return res.status(500).json({
        stack: err.stack,
        message: 'Error in getting all users',
        success: false,
      })
    }
  }
)

/**
 * Get user by ID
 */
UsersController.get(
  '/:id',
  async (
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

      const user = await getUserById(id)

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
)

/**
 * Adds a new user
 */
UsersController.post(
  '/',
  async (
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

      const userExists = await checkIfUserExists(email)

      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'User already exists',
        })
      }

      console.log(`Adding user with email id: ${email}`)

      const createdUserId = await createUser(email, name, password)

      return res
        .status(200)
        .send({ message: 'User created successfully', success: true, data: createdUserId })
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message, stack: err.stack })
    }
  }
)

/**
 * Edits the user
 */
UsersController.patch(
  '/',
  async (
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

      const existingUser = await checkIfUserExists(email)

      if (!existingUser) {
        return res.status(400).send({ message: `User doesn't exists`, success: false })
      }

      console.log(`Editing user ${email}`)

      const updatedUserId = await updateUser(email, name)

      return res
        .status(200)
        .json({ message: 'User edited successfully', success: true, data: updatedUserId })
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message, stack: err.stack })
    }
  }
)

/**
 * Deletes a user
 */
UsersController.delete(
  '/',
  async (
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

      const existingUser = await checkIfUserExists(email)

      if (!existingUser) {
        return res.status(400).send({ message: `User doesn't exists`, success: false })
      }

      console.log(`Deleting user ${email}`)

      const deletedUserId = await deleteUser(email)

      return res
        .status(200)
        .json({ message: 'User deleted successfully', success: true, data: deletedUserId })
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message, stack: err.stack })
    }
  }
)

export default UsersController
