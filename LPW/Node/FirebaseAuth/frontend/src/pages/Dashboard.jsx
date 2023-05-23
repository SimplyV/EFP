import { useAuth } from './../contexts/AuthContext';

function DashboardPage() {
  // Récupère l'utilisateur actuellement authentifié depuis le contexte d'authentification
  const { currentUser } = useAuth();

  return(
    <header aria-label="Page Header">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            {/* Affiche le message de bienvenue avec l'e-mail de l'utilisateur */}
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome Back, {currentUser.email}!
            </h1>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardPage;