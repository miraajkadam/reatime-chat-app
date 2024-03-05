import { Router, type Request } from 'express'
import Group from '../models/Group'
import User from '../models/User'

const GroupsController = Router()

/**
 * Gets all groups
 */
GroupsController.get('/', async (req, res) => {
  const groups = await Group.find(
    {},
    {
      name: 1,
    }
  )

  return res.send({ message: 'Groups get route', data: groups })
})

/**
 * Gets a group by ID
 */
GroupsController.get('/:id', async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).send({ message: 'Please enter a group ID' })
  }

  const group = await Group.findById(id, {
    name: 1,
    _id: 0,
  })

  if (!group) {
    return res.status(404).send({ message: 'Group not found' })
  }

  return res.status(200).send({ message: 'Group get with id successfully', data: group })
})

/**
 * Gets a group by ID
 */
GroupsController.get('/:id/users', async (req, res) => {
  const { id } = req.params
  const negation = req.query.negation === 'true' ? true : false

  if (!id) {
    return res.status(400).send({ message: 'Please enter a group ID' })
  }

  const group = await Group.findById(id, {
    users: 1,
    _id: 0,
  })

  if (!group) {
    return res.status(404).send({ message: 'Group not found' })
  }

  let usersMap

  if (negation) {
    usersMap = await User.find(
      {
        _id: { $nin: group.users },
      },
      {
        name: 1,
      }
    ).exec()
  } else {
    usersMap = await Promise.all(
      group.users.map(
        async userId =>
          await User.findById(userId, {
            name: 1,
          })
      )
    )
  }

  return res.status(200).send({ message: 'Group get with id successfully', data: usersMap })
})

/**
 * Adds a new Group
 */
GroupsController.post('/', async (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(403).send({ message: 'Missing group name' })
  }

  console.log(`Adding a group with name: ${name}`)

  const group = new Group({ name, users: [] })
  await group.save()

  return res.status(200).send({ message: 'Group created successfully' })
})

/**
 * Edits the user
 */
GroupsController.post('/:id/addUsers', async (req, res) => {
  const { id } = req.params
  const { users } = req.body

  if (!users?.length) {
    return res.status(403).send({ message: 'Missing users to add' })
  }

  // Check if group exists
  const group = await Group.findById(id)

  if (!group) {
    return res.status(400).send({ message: `Group doesn't exists` })
  }

  group.users.push(...users)

  await group.save()

  return res.status(200).send({ message: 'Users added to group successfully' })
})

/**
 * Edits a user
 */
GroupsController.post(
  '/:id/removeUsers',
  async (req: Request<{ id: string }, any, { users: string[] }>, res) => {
    const { id } = req.params
    const { users } = req.body

    if (!users?.length) {
      return res.status(403).send({ message: 'Missing users to add' })
    }

    // Check if group exists
    const group = await Group.findById(id)

    if (!group) {
      return res.status(400).send({ message: `Group doesn't exists` })
    }

    group.users = group.users.filter(user => !users.includes(user))

    await group.save()

    return res.status(200).send({ message: 'Users removed successfully from the group' })
  }
)

/**
 * Delete a group
 */
GroupsController.delete('/:id', async (req: Request<{ id: string }>, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(403).send({ message: 'Missing Id to delete' })
  }

  const deleted = await Group.findByIdAndDelete(id, { projection: { _id: 1 } })

  if (!deleted)
    return res.status(400).send({ message: 'Something went wrong while deleting the group' })

  return res.status(200).send({ message: 'Group deleted successfully' })
})

export default GroupsController
