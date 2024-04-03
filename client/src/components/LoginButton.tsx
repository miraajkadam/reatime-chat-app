import { useNavigate } from 'react-router-dom'

const LoginButton = () => {
  const navigate = useNavigate()

  return (
    <div className='d-grid mt-5'>
      <button
        className='btn-dark'
        onClick={() => {
          navigate('/')
        }}
      >
        Login
      </button>
    </div>
  )
}

export default LoginButton
