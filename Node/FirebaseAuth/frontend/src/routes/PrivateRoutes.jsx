import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './../contexts/AuthContext'

// Définition du composant PrivateRoutes
export default function PrivateRoutes() {
  const { currentUser } = useAuth()
  // Obtient l'utilisateur courant à partir du contexte d'authentification

  // Si l'utilisateur est authentifié, retourne les routes enfants à l'aide de Outlet
  // Sinon, navigue vers la page de connexion à l'aide de Navigate
  return currentUser ? (<Outlet />) : (<Navigate to="/login" />)
}