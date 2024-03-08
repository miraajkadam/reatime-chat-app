import { Fragment, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

const Protected = ({ isSignedIn, children }: PropsWithChildren<{ isSignedIn: boolean }>) => {
  if (!isSignedIn) {
    return <Navigate to='/' replace />
  }

  return <Fragment>{children}</Fragment>
}

export default Protected
