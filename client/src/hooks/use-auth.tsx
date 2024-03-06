import { PropsWithChildren, createContext, useContext, useState } from 'react'
import { MethodType, sendRequest } from '../lib/apiHelper'

// Create the context
const AuthContext = createContext({
  authed: false,
  setAuthed: (auth: boolean) => {},
  login: (email: string, password: string) => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
  // Using the useState hook to keep track of the value authed (if a
  // user is logged in)
  const [authed, setAuthed] = useState<boolean>(false)

  const login = async (email: string, password: string): Promise<void> => {
    const { isSuccess, message, data } = await sendRequest<boolean>('auth/login', MethodType.POST, {
      email,
      password,
    })

    if (!isSuccess || !data) return

    console.log('user has logged in')
    setAuthed(true)
  }

  const logout = async (): Promise<void> => {
    const { isSuccess, message, data } = await sendRequest<boolean>(
      'auth/logout',
      MethodType.POST,
      null
    )

    if (!isSuccess || !data) return

    console.log('The User has logged out')
    setAuthed(false)
  }

  return (
    // Using the provider so that ANY component in our application can
    // use the values that we are sending.
    <AuthContext.Provider value={{ authed, setAuthed, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Finally creating the custom hook
export const useAuth = () => useContext(AuthContext)
