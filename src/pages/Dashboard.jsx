// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Utilisateurs from './Utilisateurs';
// import Depot from './Depot';
// import Annuler from './Annuler';
// import Historique from './Historique';

// const Dashboard = () => {
//   const { agent, logout } = useAuth();
//   const location = useLocation();
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);
//   const [stats, setStats] = useState({
//     distributeurs: 0,
//     clients: 0,
//     agents: 0,
//     transactionsAujourdhui: 0,
//     soldeTotal: 0
//   });

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('/api/agent/dashboard/stats', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       setStats(data);
//     } catch (error) {
//       console.error('Erreur chargement stats:', error);
//     }
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle('dark');
//   };

//   const navItems = [
//     { path: '/dashboard/utilisateurs', label: '👥 Utilisateurs', icon: '👥' },
//     { path: '/dashboard/depot', label: '💰 Dépôt', icon: '💰' },
//     { path: '/dashboard/annuler', label: '❌ Annuler', icon: '❌' },
//     { path: '/dashboard/historique', label: '📊 Historique', icon: '📊' }
//   ];

//   return (
//     <div className={`flex min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
//       {/* Sidebar */}
//       <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 flex flex-col border-r border-gray-200 dark:border-gray-700`}>
        
//         {/* Header Sidebar */}
//         <div className="p-4 border-b border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             {sidebarOpen && (
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
//                   <span className="text-white font-bold text-sm">MB</span>
//                 </div>
//                 <span className="text-xl font-bold text-gray-800 dark:text-white">
//                   MiniBank
//                 </span>
//               </div>
//             )}
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//             >
//               {sidebarOpen ? '‹' : '›'}
//             </button>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-4">
//           <ul className="space-y-2">
//             {navItems.map((item) => (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center p-3 rounded-xl transition-all duration-200 ${
//                     location.pathname === item.path
//                       ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
//                       : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:transform hover:scale-105'
//                   }`}
//                 >
//                   <span className="text-xl">{item.icon}</span>
//                   {sidebarOpen && (
//                     <span className="ml-3 font-medium">{item.label}</span>
//                   )}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Footer Sidebar */}
//         <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//           <button
//             onClick={toggleDarkMode}
//             className="w-full flex items-center justify-center p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//           >
//             <span className="text-xl">{darkMode ? '☀️' : '🌙'}</span>
//             {sidebarOpen && (
//               <span className="ml-3 text-gray-700 dark:text-gray-300 font-medium">
//                 {darkMode ? 'Mode Clair' : 'Mode Sombre'}
//               </span>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Main Content - Scrollable */}
//       <div className="flex-1 flex flex-col min-h-0"> {/* Changement ici pour permettre le scroll */}
        
//         {/* Top Bar */}
//         <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
//           <div className="flex items-center justify-between p-6">
//             <div className="flex items-center space-x-4">
//               <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//                 Dashboard Agent
//               </h1>
//             </div>
            
//             {/* Profil */}
//             <div className="flex items-center space-x-4">
//               <div className="text-right">
//                 <p className="font-semibold text-gray-800 dark:text-white">
//                   {agent.prenom} {agent.nom}
//                 </p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   {agent.matricule}
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
//                 <span className="text-white font-semibold text-lg">
//                   {agent.prenom[0]}{agent.nom[0]}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Content Area - Scrollable */}
//         <div className="flex-1 overflow-auto p-6"> {/* Changement ici pour permettre le scroll */}
//           {/* Stats en Flex */}
//           <div className="flex flex-col md:flex-row gap-6 mb-8"> {/* Flex pour distributeur, client, agent */}
//             {/* Cercle Distributeurs */}
//             <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
//               <div className="relative inline-block">
//                 <svg className="w-32 h-32 transform -rotate-90">
//                   <circle
//                     cx="64"
//                     cy="64"
//                     r="56"
//                     stroke="#e5e7eb"
//                     strokeWidth="8"
//                     fill="none"
//                     className="dark:stroke-gray-600"
//                   />
//                   <circle
//                     cx="64"
//                     cy="64"
//                     r="56"
//                     stroke="#f97316"
//                     strokeWidth="8"
//                     fill="none"
//                     strokeDasharray="352"
//                     strokeDashoffset={352 - (stats.distributeurs / Math.max(stats.distributeurs, 1)) * 352}
//                     strokeLinecap="round"
//                   />
//                 </svg>
//                 <div className="absolute inset-0 flex flex-col items-center justify-center">
//                   <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
//                     <span className="text-white text-2xl">🏪</span>
//                   </div>
//                   <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
//                     {stats.distributeurs}
//                   </span>
//                   <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                     Distributeurs
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Cercle Clients */}
//             <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
//               <div className="relative inline-block">
//                 <svg className="w-32 h-32 transform -rotate-90">
//                   <circle
//                     cx="64"
//                     cy="64"
//                     r="56"
//                     stroke="#e5e7eb"
//                     strokeWidth="8"
//                     fill="none"
//                     className="dark:stroke-gray-600"
//                   />
//                   <circle
//                     cx="64"
//                     cy="64"
//                     r="56"
//                     stroke="#10b981"
//                     strokeWidth="8"
//                     fill="none"
//                     strokeDasharray="352"
//                     strokeDashoffset={352 - (stats.clients / Math.max(stats.clients, 1)) * 352}
//                     strokeLinecap="round"
//                   />
//                 </svg>
//                 <div className="absolute inset-0 flex flex-col items-center justify-center">
//                   <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
//                     <span className="text-white text-2xl">👥</span>
//                   </div>
//                   <span className="text-3xl font-bold text-green-600 dark:text-green-400">
//                     {stats.clients}
//                   </span>
//                   <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                     Clients
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Cercle Agents */}
//             <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
//               <div className="relative inline-block">
//                 <svg className="w-32 h-32 transform -rotate-90">
//                   <circle
//                     cx="64"
//                     cy="64"
//                     r="56"
//                     stroke="#e5e7eb"
//                     strokeWidth="8"
//                     fill="none"
//                     className="dark:stroke-gray-600"
//                   />
//                   <circle
//                     cx="64"
//                     cy="64"
//                     r="56"
//                     stroke="#3b82f6"
//                     strokeWidth="8"
//                     fill="none"
//                     strokeDasharray="352"
//                     strokeDashoffset={352 - (stats.agents / Math.max(stats.agents, 1)) * 352}
//                     strokeLinecap="round"
//                   />
//                 </svg>
//                 <div className="absolute inset-0 flex flex-col items-center justify-center">
//                   <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
//                     <span className="text-white text-2xl">👨‍💼</span>
//                   </div>
//                   <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
//                     {stats.agents}
//                   </span>
//                   <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                     Agents
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Routes des pages - Scrollable */}
//           <div className="flex-1">
//             <Routes>
//               <Route path="/utilisateurs" element={<Utilisateurs />} />
//               <Route path="/depot" element={<Depot />} />
//               <Route path="/annuler" element={<Annuler />} />
//               <Route path="/historique" element={<Historique />} />
//               <Route path="/" element={<Utilisateurs />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// import React, { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import Utilisateurs from "./Utilisateurs";
// import Depot from "./Depot";
// import Annuler from "./Annuler";
// import Historique from "./Historique";

// const Dashboard = () => {
//   const { agent } = useAuth();
//   const [darkMode, setDarkMode] = useState(false);
//   const [stats, setStats] = useState({
//     distributeurs: 0,
//     clients: 0,
//     agents: 0,
//      transactionsAujourdhui: 0,
//     soldeTotal: 0
//   });

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("/api/agent/dashboard/stats", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await response.json();
//       setStats(data);
//     } catch (error) {
//       console.error("Erreur chargement stats:", error);
//     }
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle("dark");
//   };

//   return (
//     <div className={`flex min-h-screen bg-gray-50 dark:bg-gray-900`}>
//       {/* Sidebar */}
//       <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

//       {/* Contenu principal */}
//       <div className="flex-1 flex flex-col">
//         {/* Navbar */}
//         <Navbar agent={agent} />

//         {/* Stats Cards */}
//         <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center">
//             <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mb-4">
//               <span className="text-white text-3xl">🏪</span>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
//               Distributeurs
//             </h3>
//             <p className="text-3xl font-bold text-orange-600">
//               {stats.distributeurs}
//             </p>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center">
//             <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4">
//               <span className="text-white text-3xl">👥</span>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
//               Clients
//             </h3>
//             <p className="text-3xl font-bold text-green-600">{stats.clients}</p>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center">
//             <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4">
//               <span className="text-white text-3xl">👨‍💼</span>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
//               Agents
//             </h3>
//             <p className="text-3xl font-bold text-blue-600">{stats.agents}</p>
//           </div>
//         </div>

//         {/* Routes enfants */}
//         <div className="flex-1 p-6">
//           <Routes>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/depot" element={<Depot />} />
//             <Route path="/annuler" element={<Annuler />} />
//             <Route path="/historique" element={<Historique />} />
//             <Route path="/utilisateurs" element={<Utilisateurs />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import Utilisateurs from "./Utilisateurs";
// import Depot from "./Depot";
// import Annuler from "./Annuler";
// import Historique from "./Historique";

// const Dashboard = () => {
//   const { agent } = useAuth();
//   // Récupérer le mode sombre depuis le localStorage ou utiliser false par défaut
//   const [darkMode, setDarkMode] = useState(() => {
//     const saved = localStorage.getItem("darkMode");
//     return saved ? JSON.parse(saved) : false;
//   });
//   const [stats, setStats] = useState({
//     distributeurs: 0,
//     clients: 0,
//     agents: 0,
//     transactionsAujourdhui: 0,
//     soldeTotal: 0
//   });

//   useEffect(() => {
//     fetchStats();
//     // Appliquer le mode sombre au chargement
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [darkMode]);

//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("/api/agent/dashboard/stats", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await response.json();
//       setStats(data);
//     } catch (error) {
//       console.error("Erreur chargement stats:", error);
//     }
//   };

//   const toggleDarkMode = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);
//     // Sauvegarder dans le localStorage
//     localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
    
//     if (newDarkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   };

//   // Fonction pour rafraîchir les stats (à passer aux enfants)
//   const refreshStats = () => {
//     fetchStats();
//   };

//   return (
//     <div className={`flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
//       {/* Sidebar */}
//       <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

//       {/* Contenu principal */}
//       <div className="flex-1 flex flex-col">
//         {/* Navbar */}
//         <Navbar agent={agent} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

//         {/* Stats Cards */}
//         <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-colors duration-300">
//             <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mb-4">
//               <span className="text-white text-3xl">🏪</span>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
//               Distributeurs
//             </h3>
//             <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
//               {stats.distributeurs}
//             </p>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-colors duration-300">
//             <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4">
//               <span className="text-white text-3xl">👥</span>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
//               Clients
//             </h3>
//             <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.clients}</p>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-colors duration-300">
//             <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4">
//               <span className="text-white text-3xl">👨‍💼</span>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
//               Agents
//             </h3>
//             <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.agents}</p>
//           </div>
//         </div>

//         {/* Routes enfants */}
//         <div className="flex-1 p-6">
//           <Routes>
//             <Route path="/utilisateurs" element={<Utilisateurs onUserChange={refreshStats} />} />
//             <Route path="/depot" element={<Depot />} />
//             <Route path="/annuler" element={<Annuler />} />
//             <Route path="/historique" element={<Historique />} />
//             {/* Route par défaut */}
//             <Route path="/" element={
//               <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
//                 <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
//                   Bienvenue sur votre tableau de bord
//                 </h2>
//                 <p className="text-gray-600 dark:text-gray-300">
//                   Utilisez le menu de navigation pour accéder aux différentes fonctionnalités.
//                 </p>
//               </div>
//             } />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import Utilisateurs from "./Utilisateurs";
// import Depot from "./Depot";
// import Annuler from "./Annuler";
// import Historique from "./Historique";

// const Dashboard = () => {
//   const { agent } = useAuth();
//   const [darkMode, setDarkMode] = useState(() => {
//     const saved = localStorage.getItem("darkMode");
//     return saved ? JSON.parse(saved) : false;
//   });
//   const [stats, setStats] = useState({
//     distributeurs: 0,
//     clients: 0,
//     agents: 0,
//     transactionsAujourdhui: 0,
//     soldeTotal: 0
//   });

//   useEffect(() => {
//     fetchStats();
//     // Appliquer le mode sombre au chargement
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [darkMode]);

//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("/api/agent/dashboard/stats", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await response.json();
//       setStats(data);
//     } catch (error) {
//       console.error("Erreur chargement stats:", error);
//     }
//   };

//   const toggleDarkMode = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);
//     localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
//   };

//   const refreshStats = () => {
//     fetchStats();
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//       <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
//       <div className="flex-1 flex flex-col ml-0">
//         <Navbar agent={agent} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
//         {/* Contenu principal */}
//         <main className="flex-1 overflow-auto">
//           {/* Stats Cards */}
//           <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-colors duration-300">
//               <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
//                 <span className="text-white text-2xl">🏪</span>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                 Distributeurs
//               </h3>
//               <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
//                 {stats.distributeurs}
//               </p>
//             </div>

//             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-colors duration-300">
//               <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
//                 <span className="text-white text-2xl">👥</span>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                 Clients
//               </h3>
//               <p className="text-3xl font-bold text-green-600 dark:text-green-400">
//                 {stats.clients}
//               </p>
//             </div>

//             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-colors duration-300">
//               <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
//                 <span className="text-white text-2xl">👨‍💼</span>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                 Agents
//               </h3>
//               <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
//                 {stats.agents}
//               </p>
//             </div>
//           </div>

//           {/* Routes */}
//           <div className="px-6 pb-6">
//             <Routes>
//               <Route path="utilisateurs" element={<Utilisateurs onUserChange={refreshStats} />} />
//               <Route path="depot" element={<Depot />} />
//               <Route path="annuler" element={<Annuler />} />
//               <Route path="historique" element={<Historique />} />
//               <Route 
//                 path="/" 
//                 element={
//                   <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
//                     <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
//                       Bienvenue sur votre tableau de bord
//                     </h2>
//                     <p className="text-gray-600 dark:text-gray-300">
//                       Utilisez le menu de navigation pour accéder aux différentes fonctionnalités.
//                     </p>
//                   </div>
//                 } 
//               />
//             </Routes>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Utilisateurs from "./Utilisateurs";
import Depot from "./Depot";
import Annuler from "./Annuler";
import Historique from "./Historique";

const Dashboard = () => {
  const { agent } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  const [stats, setStats] = useState({
    distributeurs: 0,
    clients: 0,
    agents: 0,
    transactionsAujourdhui: 0,
    soldeTotal: 0
  });

  useEffect(() => {
    fetchStats();
    // Appliquer le mode sombre au chargement
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://backend-tp-km23.onrender.com/api/agent/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Erreur chargement stats:", error);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  const refreshStats = () => {
    fetchStats();
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="flex-1 flex flex-col ml-0">
        <Navbar agent={agent} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        {/* Contenu principal */}
        <main className="flex-1 overflow-auto">
          {/* Stats Cards */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-colors duration-300">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🏪</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Distributeurs
              </h3>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {stats.distributeurs}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-colors duration-300">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Clients
              </h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.clients}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-colors duration-300">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-2xl">👨‍💼</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Agents
              </h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stats.agents}
              </p>
            </div>
          </div>

          {/* Routes */}
          <div className="px-6 pb-6">
            <Routes>
              <Route path="utilisateurs" element={<Utilisateurs onUserChange={refreshStats} />} />
              <Route path="depot" element={<Depot />} />
              <Route path="annuler" element={<Annuler />} />
              <Route path="historique" element={<Historique />} />
              <Route 
                path="/" 
                element={
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                      Bienvenue sur votre tableau de bord
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Utilisez le menu de navigation pour accéder aux différentes fonctionnalités.
                    </p>
                  </div>
                } 
              />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};


export default Dashboard;
