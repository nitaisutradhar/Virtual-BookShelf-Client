import { use } from 'react'
import { Navigate, useLocation } from 'react-router'
import { AuthContext } from '../contexts/AuthContext'
import Loading from '../pages/Shared/Loading'


const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext)

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