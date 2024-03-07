import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { useAuth } from './hooks/use-auth'
import routes from './pages/routes'

const Router = () => {
  const { authed } = useAuth()

  const router = createBrowserRouter(routes(authed))

  return <RouterProvider router={router} />
}

export default Router
