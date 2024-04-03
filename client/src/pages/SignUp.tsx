import { MethodType, sendRequest } from 'lib/apiHelper'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const signup = async () => {
    const response = await sendRequest('/auth/signup', MethodType.POST, {
      email,
      name,
      password,
    })

    if (!response.success) {
      console.error(response.message)

      return
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <h1>Welcome to Realtime Chat Application</h1>
      <h2>Please Signup </h2>
      <form
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <label htmlFor='name'>Enter Name: </label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={e => {
            setName(e.target.value)
          }}
        />
        <br />

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

        <input type='submit' value='Sign Up' onClick={signup} />
      </form>
    </>
  )
}

export default SignUp
