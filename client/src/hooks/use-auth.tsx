import { PropsWithChildren, createContext, useContext, useState } from 'react'
import { MethodType, sendRequest } from '../lib/apiHelper'
import { LoginApiResponse } from '@server/types/AuthTypes'

type UserContext = {
  email: string
  name: string
  id: string
}

// Create the context
const AuthContext = createContext<{
  authed: boolean
  user: UserContext | null
  setAuthed: (auth: boolean) => void
  login: (email: string, password: string) => void
  logout: () => void
}>({
  authed: false,
  user: null,
  setAuthed: (auth: boolean) => {},
  login: (email: string, password: string) => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
  // Using the useState hook to keep track of the value authed (if a
  // user is logged in)
  const [authed, setAuthed] = useState<boolean>(false)
  const [user, setUser] = useState<UserContext | null>(null)

  const login = async (email: string, password: string): Promise<void> => {
    const { success, data } = await sendRequest<LoginApiResponse>('auth/login', MethodType.POST, {
      email,
      password,
    })

    if (!success) {
      alert('Unable to login, Please check email/password')

      return
    }

    setAuthed(true)
    setUser(data as LoginApiResponse)
  }

  const logout = async (): Promise<void> => {
    const { success, message, data } = await sendRequest<boolean>(
      'auth/logout',
      MethodType.POST,
      null
    )

    if (!success || !data) return

    console.log('The User has logged out')
    setAuthed(false)
  }

  return (
    // Using the provider so that ANY component in our application can
    // use the values that we are sending.
    <AuthContext.Provider value={{ authed, setAuthed, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

// Finally creating the custom hook
export const useAuth = () => useContext(AuthContext)
