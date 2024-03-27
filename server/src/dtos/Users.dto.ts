import { PrismaClient } from '@prisma/client'
import User from '../models/User'

const prisma = new PrismaClient()

/**
 * create a new user
 *
 * @param email - email of user
 * @param name - name of user
 * @param password - password of user
 *
 * @returns object id for created user
 */
export const createUser = async (email: string, name: string, password: string) => {
  const newUser = new User(email, name, password)

  const user = await prisma.users.create({
    data: newUser,
    select: {
      id: true,
    },
  })

  return user?.id
}

export const checkIfUserExists = async (email: string) => {
  const userExists = await prisma.users.count({
    where: {
      email,
    },
  })

  return Boolean(userExists)
}

export const getAllUsers = async () =>
  await prisma.users.findMany({
    select: {
      email: true,
      name: true,
    },
  })

export const getUserById = async (id: string) =>
  await prisma.users.findFirstOrThrow({
    where: {
      id,
    },
    select: {
      email: true,
      name: true,
    },
  })

export const updateUser = async (email: string, name: string) => {
  const updatedUser = await prisma.users.update({
    where: {
      email,
    },
    data: {
      name,
    },
    select: {
      id: true,
    },
  })

  return updatedUser?.id
}

export const deleteUser = async (email: string) => {
  const deletedUser = await prisma.users.delete({
    where: {
      email,
    },
    select: {
      id: true,
    },
  })

  return deletedUser?.id
}
