import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';

// Crée un contexte d'authentification
export const AuthContext = React.createContext({});

// Crée un composant qui fournit le contexte d'authentification à ses enfants
export function AuthProvider({ children }) {
  // Initialise l'état local pour l'utilisateur actuel et l'état de chargement
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Utilise useEffect pour écouter les changements d'état
  // d'authentification de l'utilisateur
  useEffect(() => {
    // Abonne une fonction de rappel à la méthode onAuthStateChanged de Firebase
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Met à jour l'état local pour l'utilisateur actuel avec l'utilisateur reçu
      setCurrentUser(user);
      // Indique que le chargement est terminé
      setLoading(false);
    });

    // Désabonne la fonction de rappel lorsqu'elle n'est plus nécessaire
    return unsubscribe;
  }, []);

  // Définit la valeur du contexte en fonction de l'utilisateur actuel
  const value = {
    currentUser,
  };

  // Rend les enfants du composant lorsqu'ils sont chargés et que l'état de chargement est terminé
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}