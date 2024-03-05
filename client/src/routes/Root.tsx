import { Fragment } from 'react/jsx-runtime'

const Root = () => {
  return (
    <Fragment>
      <h1>Welcome to Realtime Chat Application</h1>

      <h2>Please login to continue</h2>

      <form action=''>
        <label htmlFor='email'>Enter email: </label>
        <input type='text' name='email' />
        <br />
        <label htmlFor='password'>Enter Password: </label>
        <input type='text' name='password' />
        <br />
        <input type='submit' value='Login' />
      </form>
    </Fragment>
  )
}

export default Root
