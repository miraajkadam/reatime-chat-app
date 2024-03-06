import { Fragment } from 'react/jsx-runtime'
import { useAuth } from '../hooks/use-auth'
import { useState } from 'react'

const Root = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { login } = useAuth()

  return (
    <Fragment>
      <h1>Welcome to Realtime Chat Application</h1>

      <h2>Please login to continue</h2>

      <form
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <label htmlFor='email'>Enter email: </label>
        <input
          type='text'
          name='email'
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
        />
        <br />
        <label htmlFor='password'>Enter Password: </label>
        <input
          type='text'
          name='password'
          value={password}
          onChange={e => {
            setPassword(e.target.value)
          }}
        />
        <br />
        <input
          type='submit'
          value='Login'
          onClick={() => {
            console.log('ADSJADN')
            login(email, password)
          }}
        />
      </form>
    </Fragment>
  )
}

export default Root
