
// // import React, { useState, useRef } from "react";
// // import { useAuth } from "../context/AuthContext";

// // const Navbar = () => {
// //   const { agent, logout } = useAuth();
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //   const [formData, setFormData] = useState({
// //     nom: agent?.nom || "",
// //     prenom: agent?.prenom || "",
// //     email: agent?.email || "",
// //     telephone: agent?.telephone || "",
// //     agence: agent?.agence || ""
// //   });
// //   const dropdownRef = useRef(null);

// //   // Fermer le dropdown quand on clique ailleurs
// //   React.useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setIsDropdownOpen(false);
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, []);

// //   const handleLogout = () => {
// //     if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
// //       logout();
// //     }
// //   };

// //   const handleEditProfile = () => {
// //     setIsEditModalOpen(true);
// //     setIsDropdownOpen(false);
// //   };

// //   const handleSaveProfile = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await fetch('/api/agent/profile', {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`
// //         },
// //         body: JSON.stringify(formData)
// //       });

// //       if (response.ok) {
// //         alert('Profil mis à jour avec succès!');
// //         setIsEditModalOpen(false);
// //         // Recharger la page pour voir les changements
// //         window.location.reload();
// //       } else {
// //         const error = await response.json();
// //         alert(`Erreur: ${error.error}`);
// //       }
// //     } catch (error) {
// //       alert('Erreur lors de la mise à jour du profil');
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   return (
// //     <>
// //       <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
// //         <div className="flex items-center justify-between p-4">
// //           <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
// //             Dashboard Agent
// //           </h1>

// //           {/* Profil avec dropdown */}
// //           <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
// //             <div className="text-right hidden sm:block">
// //               <p className="font-semibold text-gray-800 dark:text-white">
// //                 {agent.prenom} {agent.nom}
// //               </p>
// //               <p className="text-sm text-gray-600 dark:text-gray-400">
// //                 {agent.matricule}
// //               </p>
// //             </div>
            
// //             {/* Avatar avec dropdown */}
// //             <div className="relative">
// //               <button
// //                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
// //                 className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
// //               >
// //                 {agent.prenom[0]}
// //                 {agent.nom[0]}
// //               </button>

// //               {/* Dropdown Menu */}
// //               {isDropdownOpen && (
// //                 <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fadeIn">
// //                   {/* En-tête du dropdown */}
// //                   <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
// //                     <p className="text-sm font-semibold text-gray-900 dark:text-white">
// //                       {agent.prenom} {agent.nom}
// //                     </p>
// //                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
// //                       {agent.email}
// //                     </p>
// //                     <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
// //                       {agent.agence}
// //                     </p>
// //                   </div>

// //                   {/* Élément Modifier le profil */}
// //                   <button
// //                     onClick={handleEditProfile}
// //                     className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
// //                   >
// //                     <span className="mr-3">👤</span>
// //                     Modifier le profil
// //                   </button>

// //                   {/* Élément Paramètres */}
// //                   <button
// //                     onClick={() => {
// //                       setIsDropdownOpen(false);
// //                       // Rediriger vers les paramètres si disponible
// //                       alert("Page paramètres en développement");
// //                     }}
// //                     className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
// //                   >
// //                     <span className="mr-3">⚙️</span>
// //                     Paramètres
// //                   </button>

// //                   {/* Séparateur */}
// //                   <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

// //                   {/* Élément Déconnexion */}
// //                   <button
// //                     onClick={handleLogout}
// //                     className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 font-semibold"
// //                   >
// //                     <span className="mr-3">🚪</span>
// //                     Déconnexion
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Modal de modification du profil */}
// //       {isEditModalOpen && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
// //           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
// //             {/* En-tête du modal */}
// //             <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
// //               <h2 className="text-xl font-bold text-gray-900 dark:text-white">
// //                 Modifier le profil
// //               </h2>
// //               <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
// //                 Mettez à jour vos informations personnelles
// //               </p>
// //             </div>

// //             {/* Formulaire */}
// //             <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                     Prénom
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="prenom"
// //                     value={formData.prenom}
// //                     onChange={handleInputChange}
// //                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                     Nom
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="nom"
// //                     value={formData.nom}
// //                     onChange={handleInputChange}
// //                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                   Email
// //                 </label>
// //                 <input
// //                   type="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleInputChange}
// //                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   required
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                   Téléphone
// //                 </label>
// //                 <input
// //                   type="tel"
// //                   name="telephone"
// //                   value={formData.telephone}
// //                   onChange={handleInputChange}
// //                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   required
// //                   pattern="\+221[0-9]{9}"
// //                   placeholder="+221701234567"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                   Agence
// //                 </label>
// //                 <select
// //                   name="agence"
// //                   value={formData.agence}
// //                   onChange={handleInputChange}
// //                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   required
// //                 >
// //                   <option value="">Sélectionnez une agence</option>
// //                   <option value="Dakar">Dakar</option>
// //                   <option value="Thiès">Thiès</option>
// //                   <option value="Saint-Louis">Saint-Louis</option>
// //                   <option value="Kaolack">Kaolack</option>
// //                   <option value="Ziguinchor">Ziguinchor</option>
// //                   <option value="Mbour">Mbour</option>
// //                   <option value="Touba">Touba</option>
// //                 </select>
// //               </div>

// //               {/* Actions du modal */}
// //               <div className="flex justify-end space-x-3 pt-4">
// //                 <button
// //                   type="button"
// //                   onClick={() => setIsEditModalOpen(false)}
// //                   className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 font-medium"
// //                 >
// //                   Annuler
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
// //                 >
// //                   Sauvegarder
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* Styles CSS pour l'animation */}
// //       <style jsx>{`
// //         @keyframes fadeIn {
// //           from {
// //             opacity: 0;
// //             transform: translateY(-10px);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateY(0);
// //           }
// //         }
// //         .animate-fadeIn {
// //           animation: fadeIn 0.2s ease-out;
// //         }
// //       `}</style>
// //     </>
// //   );
// // };

// // export default Navbar;
// // Navbar.jsx
// import React, { useState, useRef, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const { agent, logout, updateAgentProfile } = useAuth();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     nom: "",
//     prenom: "",
//     email: "",
//     telephone: "",
//     agence: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const dropdownRef = useRef(null);

//   // Mettre à jour formData quand agent change
//   useEffect(() => {
//     if (agent) {
//       setFormData({
//         nom: agent.nom || "",
//         prenom: agent.prenom || "",
//         email: agent.email || "",
//         telephone: agent.telephone || "",
//         agence: agent.agence || ""
//       });
//     }
//   }, [agent]);

//   // Fermer le dropdown quand on clique ailleurs
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleLogout = () => {
//     if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
//       logout();
//     }
//   };

//   const handleEditProfile = () => {
//     setIsEditModalOpen(true);
//     setIsDropdownOpen(false);
//   };

//   const handleSaveProfile = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('/api/agent/profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         alert('Profil mis à jour avec succès!');
        
//         // Mettre à jour le contexte avec les nouvelles données
//         updateAgentProfile(data.agent);
        
//         setIsEditModalOpen(false);
//         // Plus besoin de recharger la page !
//       } else {
//         const error = await response.json();
//         alert(`Erreur: ${error.error}`);
//       }
//     } catch (error) {
//       alert('Erreur lors de la mise à jour du profil');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <>
//       <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
//         <div className="flex items-center justify-between p-4">
//           <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//             Dashboard Agent
//           </h1>

//           {/* Profil avec dropdown */}
//           <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
//             <div className="text-right hidden sm:block">
//               <p className="font-semibold text-gray-800 dark:text-white">
//                 {agent?.prenom} {agent?.nom}
//               </p>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 {agent?.matricule}
//               </p>
//             </div>
            
//             {/* Avatar avec dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               >
//                 {agent?.prenom?.[0]}
//                 {agent?.nom?.[0]}
//               </button>

//               {/* Dropdown Menu */}
//               {isDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fadeIn">
//                   {/* En-tête du dropdown */}
//                   <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
//                     <p className="text-sm font-semibold text-gray-900 dark:text-white">
//                       {agent?.prenom} {agent?.nom}
//                     </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                       {agent?.email}
//                     </p>
//                     <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
//                       {agent?.agence}
//                     </p>
//                   </div>

//                   {/* Élément Modifier le profil */}
//                   <button
//                     onClick={handleEditProfile}
//                     className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
//                   >
//                     <span className="mr-3">👤</span>
//                     Modifier le profil
//                   </button>

//                   {/* Élément Paramètres */}
//                   <button
//                     onClick={() => {
//                       setIsDropdownOpen(false);
//                       alert("Page paramètres en développement");
//                     }}
//                     className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
//                   >
//                     <span className="mr-3">⚙️</span>
//                     Paramètres
//                   </button>

//                   {/* Séparateur */}
//                   <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

//                   {/* Élément Déconnexion */}
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 font-semibold"
//                   >
//                     <span className="mr-3">🚪</span>
//                     Déconnexion
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Modal de modification du profil */}
//       {isEditModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
//             {/* En-tête du modal */}
//             <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//               <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                 Modifier le profil
//               </h2>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                 Mettez à jour vos informations personnelles
//               </p>
//             </div>

//             {/* Formulaire */}
//             <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Prénom
//                   </label>
//                   <input
//                     type="text"
//                     name="prenom"
//                     value={formData.prenom}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Nom
//                   </label>
//                   <input
//                     type="text"
//                     name="nom"
//                     value={formData.nom}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Téléphone
//                 </label>
//                 <input
//                   type="tel"
//                   name="telephone"
//                   value={formData.telephone}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                   pattern="\+221[0-9]{9}"
//                   placeholder="+221701234567"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Agence
//                 </label>
//                 <select
//                   name="agence"
//                   value={formData.agence}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 >
//                   <option value="">Sélectionnez une agence</option>
//                   <option value="Dakar">Dakar</option>
//                   <option value="Thiès">Thiès</option>
//                   <option value="Saint-Louis">Saint-Louis</option>
//                   <option value="Kaolack">Kaolack</option>
//                   <option value="Ziguinchor">Ziguinchor</option>
//                   <option value="Mbour">Mbour</option>
//                   <option value="Touba">Touba</option>
//                 </select>
//               </div>

//               {/* Actions du modal */}
//               <div className="flex justify-end space-x-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setIsEditModalOpen(false)}
//                   className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 font-medium"
//                   disabled={loading}
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-lg hover:shadow-xl disabled:bg-blue-400 disabled:cursor-not-allowed"
//                   disabled={loading}
//                 >
//                   {loading ? 'Sauvegarde...' : 'Sauvegarder'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Styles CSS pour l'animation */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Navbar;

// Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { agent, logout, updateAgentProfile } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    agence: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const dropdownRef = useRef(null);

  // Mettre à jour formData quand agent change
  useEffect(() => {
    if (agent) {
      setFormData({
        nom: agent.nom || "",
        prenom: agent.prenom || "",
        email: agent.email || "",
        telephone: agent.telephone || "",
        agence: agent.agence || ""
      });
    }
  }, [agent]);

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fonctions de validation
  const validateField = (name, value) => {
    switch (name) {
      case 'nom':
      case 'prenom':
        if (!value.trim()) return 'Ce champ est obligatoire';
        if (value.length < 2) return 'Doit contenir au moins 2 caractères';
        if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(value)) return 'Caractères non autorisés';
        return null;

      case 'email':
        if (!value.trim()) return 'L\'email est obligatoire';
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return 'Format d\'email invalide';
        return null;

      case 'telephone':
        if (!value.trim()) return 'Le téléphone est obligatoire';
        if (/^\+221[567][0-9]{7}$/.test(value)) return 'Format: +2217XXXXXXX';
        return null;

      case 'agence':
        if (!value) return 'L\'agence est obligatoire';
        return null;

      default:
        return null;
    }
  };

  const handleLogout = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      logout();
    }
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
    setIsDropdownOpen(false);
    setErrors({}); // Réinitialiser les erreurs
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    
    // Validation finale avant envoi
    const finalErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) finalErrors[key] = error;
    });

    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      return;
    }

    setLoading(true);
    
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

      if (response.ok) {
        const data = await response.json();
        alert('Profil mis à jour avec succès!');
        
        // Mettre à jour le contexte avec les nouvelles données
        updateAgentProfile(data.agent);
        
        setIsEditModalOpen(false);
        setErrors({});
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.error}`);
      }
    } catch (error) {
      alert('Erreur lors de la mise à jour du profil');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validation en temps réel
    const error = validateField(name, value);
    
    setErrors(prev => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  // Vérifier si le formulaire est valide
  const isFormValid = () => {
    return Object.keys(errors).length === 0 && 
           Object.values(formData).every(value => value && value.toString().trim() !== '');
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Dashboard Agent
          </h1>

          {/* Profil avec dropdown */}
          <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
            <div className="text-right hidden sm:block">
              <p className="font-semibold text-gray-800 dark:text-white">
                {agent?.prenom} {agent?.nom}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {agent?.matricule}
              </p>
            </div>
            
            {/* Avatar avec dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {agent?.prenom?.[0]}
                {agent?.nom?.[0]}
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fadeIn">
                  {/* En-tête du dropdown */}
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {agent?.prenom} {agent?.nom}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {agent?.email}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      {agent?.agence}
                    </p>
                  </div>

                  {/* Élément Modifier le profil */}
                  <button
                    onClick={handleEditProfile}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <span className="mr-3">👤</span>
                    Modifier le profil
                  </button>

                  {/* Élément Paramètres */}
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      alert("Page paramètres en développement");
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <span className="mr-3">⚙️</span>
                    Paramètres
                  </button>

                  {/* Séparateur */}
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

                  {/* Élément Déconnexion */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 font-semibold"
                  >
                    <span className="mr-3">🚪</span>
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modal de modification du profil */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            {/* En-tête du modal */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Modifier le profil
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Mettez à jour vos informations personnelles
              </p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.prenom ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    required
                  />
                  {errors.prenom && (
                    <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.nom ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    required
                  />
                  {errors.nom && (
                    <p className="text-red-500 text-xs mt-1">{errors.nom}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.telephone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                  pattern="\+221[0-9]{9}"
                  placeholder="+221701234567"
                />
                {errors.telephone && (
                  <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Format: +2217XXXXXXX (ex: +221701234567)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Agence *
                </label>
                <select
                  name="agence"
                  value={formData.agence}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.agence ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                >
                  <option value="">Sélectionnez une agence</option>
                  <option value="Dakar">Dakar</option>
                  <option value="Thiès">Thiès</option>
                  <option value="Saint-Louis">Saint-Louis</option>
                  <option value="Kaolack">Kaolack</option>
                  <option value="Ziguinchor">Ziguinchor</option>
                  <option value="Mbour">Mbour</option>
                  <option value="Touba">Touba</option>
                </select>
                {errors.agence && (
                  <p className="text-red-500 text-xs mt-1">{errors.agence}</p>
                )}
              </div>

              {/* Actions du modal */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setErrors({});
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 font-medium"
                  disabled={loading}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-lg hover:shadow-xl disabled:bg-blue-400 disabled:cursor-not-allowed"
                  disabled={loading || !isFormValid()}
                >
                  {loading ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Styles CSS pour l'animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;