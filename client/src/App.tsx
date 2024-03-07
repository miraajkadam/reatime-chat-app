import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './hooks/use-auth'
import AddUsersToGroup from './pages/AddUsersToGroup'
import Group from './pages/Group'
import Groups from './pages/Groups'
import RemoveUsersFromGroup from './pages/RemoveUsersFromGroup'
import Root from './pages/Root'
import Users from './pages/Users'
import Users2 from './pages/Users2'

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
