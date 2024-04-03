import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, type Request, type Response } from 'express'
import { createServer } from 'http'

import authRouter from '@routes/auth.route'
import groupsRoutes from '@routes/groups.route'
import usersRouter from '@routes/users.route'
import { connectSocket } from './socket/socketConnection'

dotenv.config()

const prisma = new PrismaClient()

const app: Express = express()
const server = createServer(app)

connectSocket(server)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const uri: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/realtime-chat-app'

;(async () => {
  try {
    await prisma.$connect()

    console.log('Connected to the database')
  } catch {
    console.log('Error connecting to the database')
  }
})()

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).send('Server is running')
})

app.use('/api/users', usersRouter)
// app.use('/api/groups', groupsRoutes)
app.use('/api/auth', authRouter)

// app.use((err: Error, req: Request, res: Response<ApiResponse<null>>, next: NextFunction) => {
//   console.error(err.stack)

//   const apiResponse = new ApiResponse<null>()
//   apiResponse.isSuccess = false
//   apiResponse.message = `${err.name}, ${err.message}`

//   res.status(500).send(apiResponse)
// })

const PORT: string | number = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})
