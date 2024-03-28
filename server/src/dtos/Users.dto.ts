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
export const createUserInDb = async (email: string, name: string, password: string) => {
  const newUser = new User(email, name, password)

  const user = await prisma.users.create({
    data: newUser,
    select: {
      id: true,
    },
  })

  return user?.id
}

/**
 * check if the user already exists in the database
 *
 * @param email the email address of the user to check
 *
 * @returns true if the user exists in the database, false otherwise
 */
export const checkIfUserExistsInDb = async (email: string) => {
  const userExists = await prisma.users.count({
    where: {
      email,
    },
  })

  return Boolean(userExists)
}

/**
 * retrieve all users from the database
 *
 * @returns email and names of all users
 */
export const getAllUsersFromDb = async () =>
  await prisma.users.findMany({
    select: {
      email: true,
      name: true,
    },
  })

/**
 * retrieve the user by mongodb object id
 *
 * @param id mongodb object id
 *
 * @returns name and email of the user
 */
export const getUserByIdFromDb = async (id: string) =>
  await prisma.users.findFirstOrThrow({
    where: {
      id,
    },
    select: {
      email: true,
      name: true,
    },
  })

/**
 * update the user name in the database
 *
 * @param email email to match
 * @param name name to be updated
 *
 * @returns updated user id
 */
export const updateUserInDb = async (email: string, name: string) => {
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

/**
 * delete a user from the database
 *
 * @param email the email of the user to be deleted
 *
 * @returns deleted user id
 */
export const deleteUserFromDb = async (email: string) => {
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
