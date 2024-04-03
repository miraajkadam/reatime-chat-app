import React from 'react'
import { useNavigate } from 'react-router-dom'

const SignUpButton = () => {
  const navigate = useNavigate()

  return (
    <div className='d-grid mt-5'>
      <button
        className='btn-dark'
        onClick={() => {
          navigate('/signup')
        }}
      >
        Sign Up
      </button>
    </div>
  )
}

export default SignUpButton
