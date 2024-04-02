import {
  addGroupInDb,
  addUsersToGroupInDb,
  deleteGroupFromDb,
  getAllGroupsFromDb,
  getGroupDetailsById,
  removeUsersFromGroupInDb,
} from '@dtos/groups.dto'
import { ApiResponse } from '@models/ApiResponse'
import { type Request, type Response } from 'express'

/**
 * get all groups
 */
export const getAllGroups = async (
  _req: Request,
  res: Response<
    ApiResponse<
      {
        id: string
        name: string
      }[]
    >
  >
) => {
  try {
    const groups = await getAllGroupsFromDb()

    return res.send({ message: 'Groups get route', data: groups, success: true })
  } catch (err: any) {
    return res.status(500).json({
      stack: err.stack,
      message: 'Error in getting all groups',
      success: false,
    })
  }
}

/**
 * get group details by id
 */
export const getGroupById = async (
  req: Request<
    { id: string },
    {
      name: string
      users: {
        id: string
        name: string
        email: string
      }[]
    }
  >,
  res: Response<
    ApiResponse<{
      name: string
      users: {
        id: string
        name: string
        email: string
      }[]
    }>
  >
) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).send({ message: 'Please enter a group ID', success: false })
    }

    const group = await getGroupDetailsById(id)

    if (!group) {
      return res.status(404).send({ message: 'Unable to get group details', success: false })
    }

    return res
      .status(200)
      .send({ message: 'Group get with id successfully', data: group, success: true })
  } catch (err: any) {
    return res.status(500).json({
      stack: err.stack,
      message: 'Error in getting group details',
      success: false,
    })
  }
}

export const getUsersInGroupById = async (
  req: Request<
    { id: string },
    ApiResponse<{
      name: string
      users: {
        id: string
        name: string
        email: string
      }[]
    }>,
    { negation: string }
  >,
  res: Response<
    ApiResponse<{
      name: string
      users: {
        id: string
        name: string
        email: string
      }[]
    }>
  >
) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).send({ message: 'Please enter a group ID', success: false })
    }

    const group = await getGroupDetailsById(id)

    if (!group) {
      return res.status(404).send({ message: 'Group not found', success: false })
    }

    return res
      .status(200)
      .send({ message: 'Group get with id successfully', data: group, success: true })
  } catch (err: any) {
    return res.status(500).json({
      stack: err.stack,
      message: 'Error in getting group details',
      success: false,
    })
  }
}

/**
 * Adds a new Group
 */
export const addGroup = async (
  req: Request<{}, ApiResponse<void>, { name: string }>,
  res: Response<ApiResponse<void>>
) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(403).send({ message: 'Missing group name', success: false })
    }

    console.log(`Adding a group with name: ${name}`)

    await addGroupInDb(name)

    return res.status(200).send({ message: 'Group created successfully', success: true })
  } catch (err: any) {
    return res.status(500).json({
      stack: err.stack,
      message: 'Error in adding group',
      success: false,
    })
  }
}

/**
 * Add users to group
 */
export const addUsersToGroup = async (
  req: Request<{ id: string }, ApiResponse<string[]>, { users: string[] }>,
  res: Response<ApiResponse<string[]>>
) => {
  try {
    const { id } = req.params
    const { users } = req.body

    if (!users?.length) {
      return res.status(403).send({ message: 'Missing users to add', success: false })
    }

    // Check if group exists
    const group = await getGroupDetailsById(id)

    if (!group) {
      return res.status(400).send({ message: `Group doesn't exists`, success: false })
    }

    const newUsers = await addUsersToGroupInDb(id, users)

    return res
      .status(200)
      .send({ message: 'Users added to group successfully', data: newUsers, success: true })
  } catch (err: any) {
    return res.status(500).json({
      stack: err.stack,
      message: 'Error in adding users to group',
      success: false,
    })
  }
}

/**
 * remove users from group
 */
export const removeUsersFromGroup = async (
  req: Request<{ id: string }, ApiResponse<string[]>, { users: string[] }>,
  res: Response<ApiResponse<string[]>>
) => {
  try {
    const { id } = req.params
    const { users } = req.body

    if (!users?.length) {
      return res.status(403).send({ message: 'Missing users to remove', success: false })
    }

    const group = await getGroupDetailsById(id)

    if (!group) {
      return res.status(400).send({ message: `Group doesn't exists`, success: false })
    }

    const filteredGroup = await removeUsersFromGroupInDb(id, users)

    return res.status(200).send({
      message: 'Users removed successfully from the group',
      data: filteredGroup,
      success: true,
    })
  } catch (err: any) {
    return res.status(500).json({
      stack: err.stack,
      message: 'Error in removing users from group',
      success: false,
    })
  }
}

/**
 * Delete a group
 */
export const deleteGroup = async (
  req: Request<{ id: string }, ApiResponse<void>>,
  res: Response<ApiResponse<void>>
) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(403).send({ message: 'Missing Id to delete', success: false })
    }

    const deleted = await deleteGroupFromDb(id)

    if (!deleted)
      return res
        .status(400)
        .send({ message: 'Something went wrong while deleting the group', success: false })

    return res.status(200).send({ message: 'Group deleted successfully', success: true })
  } catch (err: any) {
    return res.status(500).json({
      stack: err.stack,
      message: 'Error in removing users from group',
      success: false,
    })
  }
}
