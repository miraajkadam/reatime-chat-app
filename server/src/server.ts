import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import mongoose from 'mongoose'
import GroupsController from './routes/Groups'
import UsersController from './routes/Users'

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const uri: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/realtime-chat-app'

;(async () => {
  try {
    await mongoose.connect(uri)
    console.log('Connected to the database')
  } catch {
    console.log('Error connecting to the database')
  }
})()

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).send('Server is running')
})

app.use('/api/users', UsersController)
app.use('/api/groups', GroupsController)

const PORT: string | number = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})
