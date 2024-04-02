import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * get all groups
 *
 * @returns name and id of the groups
 */
export const getAllGroupsFromDb = async () => {
  const groups = await prisma.groups.findMany({
    select: {
      id: true,
      name: true,
    },
  })

  return groups
}

/**
 * get group details by group id
 *
 * @param id MongoDB group id
 *
 * @returns group details if found, null otherwise
 */
export const getGroupDetailsById = async (id: string) => {
  const group = await prisma.groups.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      users: true,
    },
  })

  if (!group) return null

  let groupsDetails = {
    name: group.name,
    users: [],
  } as {
    name: string
    users: {
      id: string
      name: string
      email: string
    }[]
  }

  for await (const results of group.users) {
    const userDetails = await prisma.users.findUnique({
      where: {
        id: results,
      },
      select: {
        email: true,
        id: true,
        name: true,
      },
    })

    if (userDetails) groupsDetails.users.push(userDetails)
  }

  // TODO: optimize users queries with following
  // await Promise.all(
  //   group?.users.map(async (user: string) => {
  //     const userDetails = await prisma.users.findUnique({
  //       where: {
  //         id: user,
  //       },
  //     })

  //     console.log(userDetails)
  //   })
  // )

  return groupsDetails
}

/**
 * get the list of users in the group
 *
 * @param groupId group id
 *
 * @returns list of users in the group
 */
export const getUsersInGroupByIdFromDb = async (groupId: string) => {
  const group = await prisma.groups.findFirstOrThrow({
    where: {
      id: groupId,
    },
    select: {
      users: true,
      name: true,
    },
  })

  return group
}

/**
 * add group in db
 *
 * @param groupName the name for the group
 *
 * @returns newly created group id
 */
export const addGroupInDb = async (groupName: string) => {
  const addedGroup = await prisma.groups.create({
    data: { name: groupName },
    select: {
      id: true,
    },
  })

  return addedGroup.id
}

/**
 * Add users to a group
 *
 * @param groupId ID of the group to be added
 * @param newUsers List of users to be added
 *
 * @returns updated list of users in the group
 */
export const addUsersToGroupInDb = async (groupId: string, newUsers: string[]) => {
  const group = await prisma.groups.update({
    where: {
      id: groupId,
    },
    data: {
      users: {
        push: newUsers,
      },
    },
    select: {
      users: true,
    },
  })

  return group.users
}

/**
 * Add users to a group
 *
 * @param groupId ID of the group to be added
 * @param users List of users to be removed
 *
 * @returns updated list of users in the group
 */
export const removeUsersFromGroupInDb = async (groupId: string, users: string[]) => {
  const group = await prisma.groups.findUnique({
    where: {
      id: groupId,
    },
    select: {
      users: true,
    },
  })

  const filteredUsers = group?.users.filter(user => !users.includes(user))

  const filteredGroup = await prisma.groups.update({
    where: {
      id: groupId,
    },
    data: {
      users: {
        set: filteredUsers,
      },
    },
    select: {
      users: true,
    },
  })

  return filteredGroup.users
}

/**
 * Delete a group from database
 *
 * @param groupId group id to be deleted
 */
export const deleteGroupFromDb = async (groupId: string) => {
  const group = await prisma.groups.delete({
    where: {
      id: groupId,
    },
    select: {
      id: true,
    },
  })

  return group.id
}
