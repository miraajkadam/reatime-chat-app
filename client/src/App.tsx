import { AuthProvider } from './hooks/use-auth'
import Router from './Router'

const App = () => (
  <AuthProvider>
    <Router />
  </AuthProvider>
)

export default App
