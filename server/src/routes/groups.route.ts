import {
  addGroup,
  addUsersToGroup,
  deleteGroup,
  getAllGroups,
  getGroupById,
  getUsersInGroupById,
  removeUsersFromGroup,
} from '@controllers/groups.controller'
import { Router } from 'express'

const groupsRoutes = Router()

groupsRoutes.get('/', getAllGroups)

groupsRoutes.get('/:id', getGroupById)

groupsRoutes.get('/:id/users', getUsersInGroupById)

groupsRoutes.post('/', addGroup)

groupsRoutes.post('/:id/addUsers', addUsersToGroup)

groupsRoutes.post('/:id/removeUsers', removeUsersFromGroup)

groupsRoutes.delete('/:id', deleteGroup)

export default groupsRoutes
