import { Navigate, Outlet } from 'react-router-dom'

export const GuestRoute = () => {
  const hasToken = localStorage.getItem('super_site_token') !== null

  return hasToken
    ? <Navigate to='/' replace /> 
    : <Outlet/>;
}

export default GuestRoute