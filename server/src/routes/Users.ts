import { Router } from 'express'
import User from '../models/User'

const UsersController = Router()

/**
 * Get all users
 */
UsersController.get('/', async (req, res) => {
  const users = await User.find(
    {},
    {
      email: 1,
      name: 1,
    }
  )

  return res.send({ message: 'Users get route', data: users })
})

/**
 * Get user by ID
 */
UsersController.get('/:id', async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).send({ message: 'Please enter a user ID' })
  }

  const user = await User.findById(id, {
    name: 1,
    email: 1,
    _id: 0,
  })

  if (!user) {
    return res.status(404).send({ message: 'User not found' })
  }

  return res.status(200).send({ message: 'User get with id successfully', data: user })
})

/**
 * Adds a new user
 */
UsersController.post('/', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(403).send({ message: 'Missing email or username or password' })
  }

  // Check if user already exists
  const existingUserQuery = User.where({ email })

  const existingUser = await existingUserQuery.countDocuments()

  if (existingUser) {
    return res.status(400).send({ message: 'User already exists' })
  }

  console.log(`Adding user with email id: ${email}`)

  // if user doesn't exist, create
  const user = new User({ email, password, name })
  await user.save()

  return res.status(200).send({ message: 'User created successfully' })
})

/**
 * Edits the user
 */
UsersController.patch('/', async (req, res) => {
  const { email, name } = req.body

  if (!email || !name) {
    return res.status(403).send({ message: 'Missing email or name' })
  }

  // Check if user exists
  const existingUser = await User.where({ email }).countDocuments({ email })

  if (!existingUser) {
    return res.status(400).send({ message: `User doesn't exists` })
  }

  console.log(`Editing user ${email}`)

  // if user exists, delete
  await User.where({ email }).updateOne({ name })

  return res.status(200).send({ message: 'User edited successfully' })
})

/**
 * Edits a user
 */
UsersController.delete('/', async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(403).send({ message: 'Missing email' })
  }

  // Check if user exists
  const existingUser = await User.where({ email }).countDocuments({ email })

  if (!existingUser) {
    return res.status(400).send({ message: `User doesn't exists` })
  }

  console.log(`Deleting user ${email}`)

  // if user exists, delete
  await User.where({ email }).deleteOne()

  return res.status(200).send({ message: 'User deleted successfully' })
})

export default UsersController
