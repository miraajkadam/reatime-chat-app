import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Group from './routes/Group'
import Groups from './routes/Groups'
import Root from './routes/Root'
import Users from './routes/Users'
import Users2 from './routes/Users2'
import AddUsersToGroup from './routes/AddUsersToGroup'
import RemoveUsersFromGroup from './routes/RemoveUsersFromGroup'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '/groups',
    element: <Groups />,
  },
  {
    path: '/groups/:groupId',
    element: <Group />,
  },
  {
    path: '/groups/:groupId/users',
    element: <Users2 />,
  },
  {
    path: '/groups/:groupId/users/add',
    element: <AddUsersToGroup />,
  },
  {
    path: '/groups/:groupId/users/remove',
    element: <RemoveUsersFromGroup />,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
