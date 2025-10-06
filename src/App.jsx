
// import React, { useState } from 'react';
// import Sidebar from './components/Sidebar';
// import Dashboard from './components/Dashboard';

// export default function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//   //   <div className="flex h-screen bg-gray-100">
//   //     {sidebarOpen && <Sidebar />}
//   //     <div className="p-4">
//   //       <button 
//   //         className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" 
//   //         onClick={() => setSidebarOpen(!sidebarOpen)}
//   //       >
//   //         {sidebarOpen ? 'Masquer' : 'Afficher'} le menu
//   //       </button>
//   //       <Dashboard />
//   //     </div>
//   //   </div>
//   // );
//   <div className="h-screen bg-gray-100">
//   {sidebarOpen && <Sidebar />}
//   <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} p-4`}>
//     <button 
//       className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" 
//       onClick={() => setSidebarOpen(!sidebarOpen)}
//     >
//       {sidebarOpen ? 'Masquer' : 'Afficher'} le menu
//     </button>
//     <Dashboard />
//   </div>
// </div>
// );
// }



// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';

// import Utilisateurs from './pages/Utilisateurs';
// import Depot from './pages/Depot';
// import Annuler from './pages/Annuler';
// import Historique from './pages/Historique';

// export default function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <Router>
//       <div className="h-screen bg-gray-100">
//         {sidebarOpen && <Sidebar />}
//         <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} p-4`}>
//           <button
//             className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             {sidebarOpen ? 'Masquer' : 'Afficher'} le menu
//           </button>

//           <Routes>
//             <Route path="/" element={<Navigate to="/utilisateurs" />} />
//             <Route path="/utilisateurs" element={<Utilisateurs />} />
//             <Route path="/depot" element={<Depot />} />
//             <Route path="/annuler" element={<Annuler />} />
//             <Route path="/historique" element={<Historique />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import './App.css';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//             <Route path="/" element={<Navigate to="/dashboard" />} />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// const ProtectedRoute = ({ children }) => {
//   const { agent } = useAuth();
//   return agent ? children : <Navigate to="/login" />;
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

const ProtectedRoute = ({ children }) => {
  const { agent, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return agent ? children : <Navigate to="/login" />;
};

export default App;



// src/
// ├── context/
// │   └── AuthContext.jsx
// ├── pages/
// │   ├── Login.jsx
// │   ├── Dashboard.jsx
// │   ├── Utilisateurs.jsx
// │   ├── Depot.jsx
// │   ├── Annuler.jsx
// │   └── Historique.jsx
// └── App.jsx