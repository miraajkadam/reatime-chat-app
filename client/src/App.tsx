import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './hooks/use-auth'
import AddUsersToGroup from './routes/AddUsersToGroup'
import Group from './routes/Group'
import Groups from './routes/Groups'
import RemoveUsersFromGroup from './routes/RemoveUsersFromGroup'
import Root from './routes/Root'
import Users from './routes/Users'
import Users2 from './routes/Users2'

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
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
