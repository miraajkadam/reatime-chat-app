import { Router } from 'express'

import { addUser, loginUser, logoutUser } from '@controllers/auth.controller'

const authRouter = Router()

authRouter.post('/login', loginUser)

authRouter.post('/logout', logoutUser)

authRouter.post('/signup', addUser)

export default authRouter
