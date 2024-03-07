import { Navigate } from 'react-router-dom'
import AddUsersToGroup from './AddUsersToGroup'
import Group from './Group'
import Groups from './Groups'
import RemoveUsersFromGroup from './RemoveUsersFromGroup'
import Root from './Root'
import Users2 from './Users2'

const routes = (isLoggedIn: boolean) => [
  {
    path: '/groups',
    element: isLoggedIn ? <Groups /> : <Navigate to='/' />,
    children: [
      {
        path: '/groups/:groupId',
        element: <Group />,
        children: [
          {
            path: '/groups/:groupId/users',
            element: <Users2 />,
            children: [
              { path: '/groups/:groupId/users/add', element: <AddUsersToGroup /> },
              { path: '/groups/:groupId/users/remove', element: <RemoveUsersFromGroup /> },
            ],
          },
        ],
      },
      // { path: '/', element: <Navigate to='/groups' /> },
    ],
  },
  {
    path: '/',
    element: !isLoggedIn ? <Root /> : <Navigate to='/groups' />,
    // children: [
    //   { path: 'login', element: <Login /> },
    //   { path: '/', element: <Navigate to='/login' /> },
    // ],
  },
]

export default routes
