import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ darkMode, toggleDarkMode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { path: "/dashboard/utilisateurs", label: "Utilisateurs", icon: "👥" },
    { path: "/dashboard/depot", label: "Dépôt", icon: "💰" },
    { path: "/dashboard/annuler", label: "Annuler", icon: "❌" },
    { path: "/dashboard/historique", label: "Historique", icon: "📊" },
  ];
const handleSaveProfile = async (e) => {
  e.preventDefault();
  setLoading(true);
  setErrors({});

  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/agent/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      alert('Profil mis à jour avec succès!');
      setIsEditModalOpen(false);
      
      // Mettre à jour le contexte d'authentification si vous en avez un
      // au lieu de recharger toute la page
      if (window.updateAuthUser) {
        window.updateAuthUser(data.agent);
      } else {
        // Fallback: recharger la page
        window.location.reload();
      }
    } else {
      console.error('Erreur backend:', data);
      setErrors({ general: data.error || 'Erreur lors de la mise à jour' });
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
    setErrors({ general: 'Erreur de connexion au serveur' });
  } finally {
    setLoading(false);
  }
};
  return (
    <div
      className={`${sidebarOpen ? "w-50" : "w-20"} bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        {sidebarOpen && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Link to="/dashboard">    <span className="text-white font-bold text-sm">MB</span></Link>
            </div>
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              MiniBank
            </span>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {sidebarOpen && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mode sombre */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center justify-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <span className="text-lg">{darkMode ? "☀️" : "🌙"}</span>
          {sidebarOpen && (
            <span className="ml-3 text-gray-700 dark:text-gray-300">
              {darkMode ? "Mode Clair" : "Mode Sombre"}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
