import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LoginButton from '../components/LoginButton'
import Protected from '../components/Protected'
import SignUpButton from '../components/SignUpButton'
import { useAuth } from '../hooks/use-auth'
import AddUsersToGroup from './AddUsersToGroup'
import Group from './Group'
import RemoveUsersFromGroup from './RemoveUsersFromGroup'
import Root from './Root'
import SignUp from './SignUp'
import Users2 from './Users2'
import AddGroup from './AddGroup'
import Groups from './Groups'
import Navbar from '../components/Navbar'

const Router = () => {
  const { authed, logout } = useAuth()

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Root />} />
        <Route path='/signup' element={<SignUp />} />
        <Route
          path='/groups/add'
          element={
            <Protected isSignedIn={authed}>
              <AddGroup />
            </Protected>
          }
        />
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
    </BrowserRouter>
  )
}

export default Router
