import { Router } from 'express'

import { deleteUser, getAllUsers, getUserById, updateUser } from '@controllers/users.controller'

const usersRouter = Router()

usersRouter.get('/', getAllUsers)

usersRouter.get('/:id', getUserById)

usersRouter.patch('/', updateUser)

usersRouter.delete('/', deleteUser)

export default usersRouter
