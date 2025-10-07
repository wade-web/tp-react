// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [agent, setAgent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Vérifier si l'agent est déjà connecté au chargement de l'application
//     const token = localStorage.getItem('token');
//     const savedAgent = localStorage.getItem('agent');
    
//     if (token && savedAgent) {
//       try {
//         setAgent(JSON.parse(savedAgent));
//       } catch (error) {
//         console.error('Erreur parsing agent data:', error);
//         localStorage.removeItem('token');
//         localStorage.removeItem('agent');
//       }
//     }
//     setLoading(false);
//   }, []);

//   // Fonction pour mettre à jour le profil agent
//   const updateAgentProfile = (updatedData) => {
//     const updatedAgent = { ...agent, ...updatedData };
//     setAgent(updatedAgent);
//     // Mettre à jour aussi le localStorage
//     localStorage.setItem('agent', JSON.stringify(updatedAgent));
//   };

//   // Fonction pour rafraîchir les données depuis le serveur
//   const refreshAgentData = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) return;

//       const response = await fetch('/api/agent/me', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.ok) {
//         const agentData = await response.json();
//         setAgent(agentData);
//         localStorage.setItem('agent', JSON.stringify(agentData));
//       }
//     } catch (error) {
//       console.error('Erreur rafraîchissement données agent:', error);
//     }
//   };

//   const login = async (matricule, motDePasse) => {
//     try {
//       console.log('🔐 Tentative de connexion...', { matricule });
      
//       const response = await fetch('/api/agent/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ matricule, motDePasse }),
//       });

//       console.log('📡 Réponse du serveur:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('❌ Erreur réponse:', errorText);
        
//         let errorMessage = 'Erreur de connexion';
//         try {
//           const errorData = JSON.parse(errorText);
//           errorMessage = errorData.error || errorMessage;
//         } catch (e) {
//           errorMessage = `Erreur serveur: ${response.status}`;
//         }
        
//         throw new Error(errorMessage);
//       }

//       const data = await response.json();
//       console.log('✅ Connexion réussie:', data.agent);
      
//       // Sauvegarder le token et les infos de l'agent
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('agent', JSON.stringify(data.agent));
      
//       setAgent(data.agent);
//       return { success: true };
//     } catch (error) {
//       console.error('❌ Erreur connexion:', error.message);
//       return { success: false, error: error.message };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('agent');
//     setAgent(null);
//   };

//   const value = {
//     agent,
//     login,
//     logout,
//     loading,
//     updateAgentProfile, // Ajout de la fonction de mise à jour
//     refreshAgentData    // Ajout de la fonction de rafraîchissement
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );

// };

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔧 Base URL du backend — adaptative selon l'environnement
  const API_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === 'production'
      ? 'https://backend-tp-km23.onrender.com'
      : 'http://localhost:10000');

  // Vérifier si l'agent est déjà connecté
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedAgent = localStorage.getItem('agent');

    if (token && savedAgent) {
      try {
        setAgent(JSON.parse(savedAgent));
      } catch (error) {
        console.error('⚠️ Erreur parsing agent data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('agent');
      }
    }

    setLoading(false);
  }, []);

  // 🧩 Fonction de connexion
  const login = async (matricule, motDePasse) => {
    try {
      console.log('🔐 Tentative de connexion...', { matricule });

      const response = await fetch(`${API_URL}/api/agent/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matricule, motDePasse }),
        credentials: 'include', // important pour CORS
      });

      console.log('📡 Réponse du serveur:', response.status);

      const text = await response.text();

      if (!response.ok) {
        console.error('❌ Erreur réponse:', text);

        let errorMessage = 'Erreur de connexion';
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = `Erreur serveur: ${response.status}`;
        }

        throw new Error(errorMessage);
      }

      const data = JSON.parse(text);
      console.log('✅ Connexion réussie:', data.agent);

      localStorage.setItem('token', data.token);
      localStorage.setItem('agent', JSON.stringify(data.agent));
      setAgent(data.agent);

      return { success: true, agent: data.agent };
    } catch (error) {
      console.error('❌ Erreur connexion:', error.message);
      return { success: false, error: error.message };
    }
  };

  // 🧩 Déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('agent');
    setAgent(null);
  };

  // 🧩 Mise à jour locale du profil
  const updateAgentProfile = (updatedData) => {
    const updatedAgent = { ...agent, ...updatedData };
    setAgent(updatedAgent);
    localStorage.setItem('agent', JSON.stringify(updatedAgent));
  };

  // 🧩 Rafraîchissement des données depuis le serveur
  const refreshAgentData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${API_URL}/api/agent/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        const agentData = await response.json();
        setAgent(agentData);
        localStorage.setItem('agent', JSON.stringify(agentData));
      } else {
        console.warn('⚠️ Impossible de rafraîchir les données agent');
      }
    } catch (error) {
      console.error('Erreur rafraîchissement données agent:', error);
    }
  };

  const value = {
    agent,
    login,
    logout,
    loading,
    updateAgentProfile,
    refreshAgentData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};



