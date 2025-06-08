import { Navigate, useLocation } from 'react-router'
import Loading from '../pages/Shared/Loading'
import useAuth from '../hooks/useAuth'


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()

  const location = useLocation()

  if (loading) {
    return <Loading />
  }

  if (user && user?.email) {
    return children
  }
  return <Navigate state={location.pathname} to='/signin'></Navigate>
}

export default PrivateRoute