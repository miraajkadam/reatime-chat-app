import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Protected from '../components/Protected'
import { useAuth } from '../hooks/use-auth'
import AddUsersToGroup from './AddUsersToGroup'
import Group from './Group'
import Groups from './Groups'
import RemoveUsersFromGroup from './RemoveUsersFromGroup'
import Root from './Root'
import Users2 from './Users2'

const Router = () => {
  const { authed, logout } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />} />
        <Route
          path='/groups'
          element={
            <Protected isSignedIn={authed}>
              <Groups />
            </Protected>
          }
        />
        <Route
          path='/groups/:groupId'
          element={
            <Protected isSignedIn={authed}>
              <Group />
            </Protected>
          }
        />
        <Route
          path='/groups/:groupId'
          element={
            <Protected isSignedIn={authed}>
              <Group />
            </Protected>
          }
        />
        <Route
          path='/groups/:groupId/users'
          element={
            <Protected isSignedIn={authed}>
              <Users2 />
            </Protected>
          }
        />
        <Route
          path='/groups/:groupId/users/add'
          element={
            <Protected isSignedIn={authed}>
              <AddUsersToGroup />
            </Protected>
          }
        />

        <Route
          path='/groups/:groupId/users/remove'
          element={
            <Protected isSignedIn={authed}>
              <RemoveUsersFromGroup />
            </Protected>
          }
        />
      </Routes>
      {authed ? (
        <div className='d-grid mt-5'>
          <button
            className='btn-danger'
            onClick={() => {
              logout()
            }}
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className='d-grid mt-5'>
          <button className='btn-dark' onClick={() => {}}>
            Sign in
          </button>
        </div>
      )}
    </BrowserRouter>
  )
}

export default Router
