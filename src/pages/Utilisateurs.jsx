// import React, { useState, useEffect } from 'react';

// const Utilisateurs = () => {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [formData, setFormData] = useState({
//     nom: '',
//     prenom: '',
//     email: '',
//     telephone: '',
//     dateNaissance: '',
//     adresse: '',
//     numPieceIdentite: '',
//     role: 'client'
//   });

//   useEffect(() => {
//     fetchUsers();
//   }, [currentPage, searchTerm]);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(
//         `/api/agent/dashboard/users?page=${currentPage}&limit=5&search=${searchTerm}`,
//         {
//           headers: { 'Authorization': `Bearer ${token}` }
//         }
//       );
//       const data = await response.json();
//       setUsers(data.users);
//       setTotalPages(data.totalPages);
//     } catch (error) {
//       console.error('Erreur chargement utilisateurs:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Sélection multiple
//   const toggleUserSelection = (userId) => {
//     setSelectedUsers(prev => 
//       prev.includes(userId) 
//         ? prev.filter(id => id !== userId)
//         : [...prev, userId]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (selectAll) {
//       setSelectedUsers([]);
//     } else {
//       const allIds = users.map(user => user._id);
//       setSelectedUsers(allIds);
//     }
//     setSelectAll(!selectAll);
//   };

//   // Actions groupées
//   // Dans votre composant Utilisateurs, remplacez la fonction handleBulkAction par :

// const handleBulkAction = async (action) => {
//   if (selectedUsers.length === 0) {
//     alert('Veuillez sélectionner au moins un utilisateur');
//     return;
//   }

//   const actionText = {
//     'bloquer': 'bloquer',
//     'debloquer': 'débloquer', 
//     'supprimer': 'supprimer'
//   }[action];

//   // Message plus explicite selon l'action
//   let confirmMessage = '';
//   if (action === 'bloquer') {
//     confirmMessage = `Voulez-vous bloquer les utilisateurs actifs sélectionnés ?\n(Les utilisateurs déjà bloqués ne seront pas affectés)`;
//   } else if (action === 'debloquer') {
//     confirmMessage = `Voulez-vous débloquer les utilisateurs bloqués sélectionnés ?\n(Les utilisateurs actifs ne seront pas affectés)`;
//   } else {
//     confirmMessage = `Voulez-vous vraiment supprimer ${selectedUsers.length} utilisateur(s) ?`;
//   }

//   if (!confirm(confirmMessage)) {
//     return;
//   }

//   try {
//     const token = localStorage.getItem('token');
//     const response = await fetch('/api/agent/utilisateurs/bulk-action', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         userIds: selectedUsers,
//         action: action
//       })
//     });

//     const data = await response.json();

//     if (response.ok) {
//       alert(data.message);
//       // Recharger les utilisateurs
//       fetchUsers();
//       // Réinitialiser la sélection
//       setSelectedUsers([]);
//       setSelectAll(false);
//     } else {
//       alert(`Erreur: ${data.error}`);
//     }
//   } catch (error) {
//     console.error('Erreur lors de l\'action groupée:', error);
//     alert('Erreur lors de l\'opération');
//   }
// };
//   // Actions individuelles
//   const handleCreateUser = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('/api/agent/comptes/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         alert('Utilisateur créé avec succès!');
//         setShowCreateModal(false);
//         setFormData({
//           nom: '', prenom: '', email: '', telephone: '',
//           dateNaissance: '', adresse: '', numPieceIdentite: '', role: 'client'
//         });
//         fetchUsers();
//       } else {
//         const error = await response.json();
//         alert(`Erreur: ${error.error}`);
//       }
//     } catch (error) {
//       alert('Erreur lors de la création');
//     }
//   };

//   const handleEditUser = (user) => {
//     setCurrentUser(user);
//     setFormData({
//       nom: user.nom || '',
//       prenom: user.prenom || '',
//       email: user.email || '',
//       telephone: user.telephone || '',
//       dateNaissance: user.dateNaissance || '',
//       adresse: user.adresse || '',
//       numPieceIdentite: user.numPieceIdentite || '',
//       role: user.role || 'client'
//     });
//     setShowEditModal(true);
//   };

//   const handleUpdateUser = async (e) => {
//     e.preventDefault();
//     if (!currentUser) return;

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`/api/agent/comptes/${currentUser._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         alert('Utilisateur modifié avec succès!');
//         setShowEditModal(false);
//         setCurrentUser(null);
//         setFormData({
//           nom: '', prenom: '', email: '', telephone: '',
//           dateNaissance: '', adresse: '', numPieceIdentite: '', role: 'client'
//         });
//         fetchUsers();
//       } else {
//         const error = await response.json();
//         alert(`Erreur: ${error.error}`);
//       }
//     } catch (error) {
//       alert('Erreur lors de la modification');
//     }
//   };

//   const toggleBlockUser = async (userId, currentStatus) => {
//     if (!confirm(`Voulez-vous vraiment ${currentStatus === 'actif' ? 'bloquer' : 'débloquer'} cet utilisateur ?`)) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`/api/agent/comptes/${userId}/toggle-block`, {
//         method: 'PATCH',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.ok) {
//         alert('Statut mis à jour avec succès!');
//         fetchUsers();
//       } else {
//         alert('Erreur lors de la mise à jour');
//       }
//     } catch (error) {
//       alert('Erreur lors de la mise à jour');
//     }
//   };

//   const handleDeleteUser = async (userId, userName) => {
//     if (!confirm(`Voulez-vous vraiment supprimer l'utilisateur ${userName} ? Cette action est irréversible.`)) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`/api/agent/comptes/${userId}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.ok) {
//         alert('Utilisateur supprimé avec succès!');
//         fetchUsers();
//       } else {
//         const errorData = await response.json();
//         alert(`Erreur lors de la suppression: ${errorData.error || 'Erreur inconnue'}`);
//       }
//     } catch (error) {
//       console.error('Erreur suppression:', error);
//       alert('Erreur lors de la suppression');
//     }
//   };

//   return (
//     <div>
//       {/* En-tête avec recherche et boutons */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div className="flex-1 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
//           <div className="relative flex-1 max-w-md w-full">
//             <input
//               type="text"
//               placeholder="Rechercher un utilisateur..."
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <span className="text-gray-400">🔍</span>
//             </div>
//           </div>
          
//           <button
//             onClick={() => setShowCreateModal(true)}
//             className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
//           >
//             + Ajouter un utilisateur
//           </button>
//         </div>
//       </div>

//       {/* Barre d'actions groupées */}
//       {selectedUsers.length > 0 && (
//         <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
//             <span className="text-blue-800 dark:text-blue-200 font-medium mb-2 sm:mb-0">
//               {selectedUsers.length} utilisateur(s) sélectionné(s)
//             </span>
//             <div className="flex flex-wrap gap-2">
//               <button
//                 onClick={() => handleBulkAction('bloquer')}
//                 className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
//               >
//                 🔒 Bloquer ({selectedUsers.length})
//               </button>
//               <button
//                 onClick={() => handleBulkAction('debloquer')}
//                 className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
//               >
//                 🔓 Débloquer ({selectedUsers.length})
//               </button>
//               <button
//                 onClick={() => handleBulkAction('supprimer')}
//                 className="bg-red-800 hover:bg-red-900 text-white px-3 py-2 rounded-lg text-sm transition-colors"
//               >
//                 🗑️ Supprimer ({selectedUsers.length})
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Tableau */}
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   <input
//                     type="checkbox"
//                     checked={selectAll}
//                     onChange={toggleSelectAll}
//                     className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   />
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Utilisateur
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Téléphone
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Rôle
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Compte
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Solde
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Statut
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//               {users.map((user) => (
//                 <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <input
//                       type="checkbox"
//                       checked={selectedUsers.includes(user._id)}
//                       onChange={() => toggleUserSelection(user._id)}
//                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                     />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
//                         <span className="text-blue-600 dark:text-blue-300 text-sm font-semibold">
//                           {user.prenom[0]}{user.nom[0]}
//                         </span>
//                       </div>
//                       <div>
//                         <div className="text-sm font-medium text-gray-900 dark:text-white">
//                           {user.prenom} {user.nom}
//                         </div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">
//                           {user.email}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                     {user.telephone}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       user.role === 'distributeur' 
//                         ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
//                         : user.role === 'agent'
//                         ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
//                         : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                     }`}>
//                       {user.role}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                     {user.compte.numeroCompte}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                     {user.compte.solde.toLocaleString()} FCFA
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       user.compte.statut === 'actif'
//                         ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                         : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
//                     }`}>
//                       {user.compte.statut}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleEditUser(user)}
//                         className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
//                         title="Modifier"
//                       >
//                         ✏️
//                       </button>
//                       <button
//                         onClick={() => toggleBlockUser(user._id, user.compte.statut)}
//                         className={`${
//                           user.compte.statut === 'actif'
//                             ? 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300'
//                             : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
//                         }`}
//                         title={user.compte.statut === 'actif' ? 'Bloquer' : 'Débloquer'}
//                       >
//                         {user.compte.statut === 'actif' ? '🔒' : '🔓'}
//                       </button>
//                       <button
//                         onClick={() => handleDeleteUser(user._id, `${user.prenom} ${user.nom}`)}
//                         className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
//                         title="Supprimer"
//                       >
//                         🗑️
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
//             <div className="flex items-center justify-between">
//               <p className="text-sm text-gray-700 dark:text-gray-300">
//                 Page <span className="font-medium">{currentPage}</span> sur{' '}
//                 <span className="font-medium">{totalPages}</span>
//               </p>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-1 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Précédent
//                 </button>
//                 {[...Array(totalPages)].map((_, index) => (
//                   <button
//                     key={index + 1}
//                     onClick={() => setCurrentPage(index + 1)}
//                     className={`px-3 py-1 rounded-lg ${
//                       currentPage === index + 1
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300'
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-1 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Suivant
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Modal Création Utilisateur */}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
//               Créer un Utilisateur
//             </h2>
//             <form onSubmit={handleCreateUser} className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   placeholder="Nom"
//                   value={formData.nom}
//                   onChange={(e) => setFormData({...formData, nom: e.target.value})}
//                   className="col-span-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Prénom"
//                   value={formData.prenom}
//                   onChange={(e) => setFormData({...formData, prenom: e.target.value})}
//                   className="col-span-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                   required
//                 />
//               </div>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//                 className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 required
//               />
//               <input
//                 type="tel"
//                 placeholder="Téléphone"
//                 value={formData.telephone}
//                 onChange={(e) => setFormData({...formData, telephone: e.target.value})}
//                 className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 required
//               />
//               <input
//                 type="date"
//                 placeholder="Date de naissance"
//                 value={formData.dateNaissance}
//                 onChange={(e) => setFormData({...formData, dateNaissance: e.target.value})}
//                 className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Adresse"
//                 value={formData.adresse}
//                 onChange={(e) => setFormData({...formData, adresse: e.target.value})}
//                 className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Numéro pièce identité"
//                 value={formData.numPieceIdentite}
//                 onChange={(e) => setFormData({...formData, numPieceIdentite: e.target.value})}
//                 className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 required
//               />
//               <select
//                 value={formData.role}
//                 onChange={(e) => setFormData({...formData, role: e.target.value})}
//                 className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//               >
//                 <option value="client">Client</option>
//                 <option value="distributeur">Distributeur</option>
//                 {/* <option value="agent">Agent</option> */}
//               </select>
//               <div className="flex justify-end space-x-3 mt-6">
//                 <button
//                   type="button"
//                   onClick={() => setShowCreateModal(false)}
//                   className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Créer
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Modal Modification Utilisateur */}
//       {showEditModal && currentUser && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
//               Modifier l'Utilisateur
//             </h2>
//             <form onSubmit={handleUpdateUser} className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   placeholder="Nom"
//                   value={formData.nom}
//                   onChange={(e) => setFormData({...formData, nom: e.target.value})}
//                   className="col-span-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Prénom"
//                   value={formData.prenom}
//                   onChange={(e) => setFormData({...formData, prenom: e.target.value})}
//                   className="col-span-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                   required
//                 />
//               </div>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//                 className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 required
//               />
//               <input
//                 type="tel"
//                 placeholder="Téléphone"
//                 value={formData.telephone}
//                 onChange={(e) => setFormData({...formData, telephone: e.target.value})}
//                 className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 required
//               />
//               <input
//                 type="date"
//                 placeholder="Date de naissance"
//                 value={formData.dateNaissance}
//                 onChange={(e) => setFormData({...formData, dateNaissance: e.target.value})}
//                 className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Adresse"
//                 value={formData.adresse}
//                 onChange={(e) => setFormData({...formData, adresse: e.target.value})}
//                 className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Numéro pièce identité"
//                 value={formData.numPieceIdentite}
//                 onChange={(e) => setFormData({...formData, numPieceIdentite: e.target.value})}
//                 className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 required
//               />
//               <select
//                 value={formData.role}
//                 onChange={(e) => setFormData({...formData, role: e.target.value})}
//                 className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//               >
//                 <option value="client">Client</option>
//                 <option value="distributeur">Distributeur</option>
//                 <option value="agent">Agent</option>
//               </select>
//               <div className="flex justify-end space-x-3 mt-6">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowEditModal(false);
//                     setCurrentUser(null);
//                   }}
//                   className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Modifier
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Utilisateurs;




// import React, { useState, useEffect } from 'react';

// const Utilisateurs = () => {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [formData, setFormData] = useState({
//     nom: '',
//     prenom: '',
//     email: '',
//     telephone: '',
//     dateNaissance: '',
//     adresse: '',
//     numPieceIdentite: '',
//     role: 'client',
//     matricule: '',
//     agence: ''
//   });
  
//   // États pour les erreurs et le chargement
//   const [errors, setErrors] = useState({});
//   const [formLoading, setFormLoading] = useState(false);

//   useEffect(() => {
//     fetchUsers();
//   }, [currentPage, searchTerm]);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(
//         `/api/agent/dashboard/users?page=${currentPage}&limit=5&search=${searchTerm}&archived=false`,
//         {
//           headers: { 'Authorization': `Bearer ${token}` }
//         }
//       );
//       const data = await response.json();
//       setUsers(data.users);
//       setTotalPages(data.totalPages);
//     } catch (error) {
//       console.error('Erreur chargement utilisateurs:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fonction utilitaire pour mapper les erreurs du backend
//   const mapBackendErrors = (errorsArray) => {
//     const errorMap = {
//       'nom': 'nom',
//       'prénom': 'prenom', 
//       'email': 'email',
//       'téléphone': 'telephone',
//       'date de naissance': 'dateNaissance',
//       'adresse': 'adresse',
//       'pièce d\'identité': 'numPieceIdentite',
//       'rôle': 'role',
//       'matricule': 'matricule',
//       'agence': 'agence'
//     };

//     const errorObj = {};
    
//     errorsArray.forEach(error => {
//       let found = false;
//       for (const [key, value] of Object.entries(errorMap)) {
//         if (error.toLowerCase().includes(key)) {
//           errorObj[value] = error;
//           found = true;
//           break;
//         }
//       }
//       if (!found) {
//         errorObj.general = errorObj.general ? `${errorObj.general}, ${error}` : error;
//       }
//     });

//     return errorObj;
//   };

//   // Validation côté client (optionnel mais recommandé)
//   const validateForm = (data) => {
//     const errors = {};

//     if (!data.nom.trim()) errors.nom = 'Le nom est obligatoire';
//     else if (data.nom.length < 2) errors.nom = 'Le nom doit contenir au moins 2 caractères';

//     if (!data.prenom.trim()) errors.prenom = 'Le prénom est obligatoire';
//     else if (data.prenom.length < 2) errors.prenom = 'Le prénom doit contenir au moins 2 caractères';
    
//     if (!data.email.trim()) errors.email = 'L\'email est obligatoire';
//     else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Email invalide';

//     if (!data.telephone.trim()) errors.telephone = 'Le téléphone est obligatoire';
//     else if (!/^\+221[567][0-9]{7}$/.test(data.telephone)) errors.telephone = 'Format téléphone invalide (+2217XXXXXXX)';

//     if (!data.dateNaissance) errors.dateNaissance = 'La date de naissance est obligatoire';
//     else {
//       const birthDate = new Date(data.dateNaissance);
//       const today = new Date();
//       const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
//       if (birthDate > minAgeDate) errors.dateNaissance = 'L\'utilisateur doit avoir au moins 18 ans';
//     }

//     if (!data.adresse.trim()) errors.adresse = 'L\'adresse est obligatoire';
//     else if (data.adresse.length < 4) errors.adresse = 'L\'adresse doit contenir au moins 10 caractères';

//     if (!data.numPieceIdentite.trim()) errors.numPieceIdentite = 'Le numéro de pièce d\'identité est obligatoire';
//     else if (!/^[A-Z0-9]{6,15}$/.test(data.numPieceIdentite.toUpperCase())) errors.numPieceIdentite = 'Le numéro doit contenir 8-15 caractères alphanumériques';

//     if (!data.role) errors.role = 'Le rôle est obligatoire';

//     // Validation des champs spécifiques aux agents
//     if (data.role === 'agent') {
//       if (!data.matricule.trim()) errors.matricule = 'Le matricule est obligatoire pour un agent';
//       else if (!/^[A-Z0-9]{6,10}$/.test(data.matricule.toUpperCase())) errors.matricule = 'Le matricule doit contenir 6-10 caractères alphanumériques';

//       if (!data.agence) errors.agence = 'L\'agence est obligatoire pour un agent';
//     }

//     return errors;
//   };

//   // Sélection multiple
//   const toggleUserSelection = (userId) => {
//     setSelectedUsers(prev => 
//       prev.includes(userId) 
//         ? prev.filter(id => id !== userId)
//         : [...prev, userId]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (selectAll) {
//       setSelectedUsers([]);
//     } else {
//       const allIds = users.map(user => user._id);
//       setSelectedUsers(allIds);
//     }
//     setSelectAll(!selectAll);
//   };

//   // Actions groupées
//   const handleBulkAction = async (action) => {
//     if (selectedUsers.length === 0) {
//       alert('Veuillez sélectionner au moins un utilisateur');
//       return;
//     }

//     const actionText = {
//       'bloquer': 'bloquer',
//       'debloquer': 'débloquer', 
//       'supprimer': 'supprimer'
//     }[action];

//     let confirmMessage = '';
//     if (action === 'bloquer') {
//       confirmMessage = `Voulez-vous bloquer les utilisateurs actifs sélectionnés ?\n(Les utilisateurs déjà bloqués ne seront pas affectés)`;
//     } else if (action === 'debloquer') {
//       confirmMessage = `Voulez-vous débloquer les utilisateurs bloqués sélectionnés ?\n(Les utilisateurs actifs ne seront pas affectés)`;
//     } else {
//       confirmMessage = `Voulez-vous vraiment supprimer ${selectedUsers.length} utilisateur(s) ?`;
//     }

//     if (!confirm(confirmMessage)) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('/api/agent/utilisateurs/bulk-action', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           userIds: selectedUsers,
//           action: action
//         })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert(data.message);
//         fetchUsers();
//         setSelectedUsers([]);
//         setSelectAll(false);
//       } else {
//         alert(`Erreur: ${data.error}`);
//       }
//     } catch (error) {
//       console.error('Erreur lors de l\'action groupée:', error);
//       alert('Erreur lors de l\'opération');
//     }
//   };

//   const handleCreateUser = async (e) => {
//   e.preventDefault();
//   setFormLoading(true);
//   setErrors({});

//   // Validation côté client
//   const clientErrors = validateForm(formData);
//   if (Object.keys(clientErrors).length > 0) {
//     setErrors(clientErrors);
//     setFormLoading(false);
//     return;
//   }

//   try {
//     const token = localStorage.getItem('token');
    
//     // Préparer les données à envoyer
//     const dataToSend = {
//       nom: formData.nom,
//       prenom: formData.prenom,
//       email: formData.email,
//       telephone: formData.telephone,
//       dateNaissance: formData.dateNaissance,
//       adresse: formData.adresse,
//       numPieceIdentite: formData.numPieceIdentite,
//       role: formData.role
//     };
 
   
//     // Ajouter les champs spécifiques aux agents seulement si le rôle est agent
//     if (formData.role === 'agent') {
//       dataToSend.matricule = formData.matricule;
//       dataToSend.agence = formData.agence;
//     }

//     console.log('Données envoyées:', dataToSend); // Pour debug

//     const response = await fetch('/api/agent/comptes/create', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify(dataToSend)
//     });

//     const data = await response.json();

//     if (response.ok) {
//       alert('Utilisateur créé avec succès!');
//       setShowCreateModal(false);
//       setFormData({
//         nom: '', prenom: '', email: '', telephone: '',
//         dateNaissance: '', adresse: '', numPieceIdentite: '', role: 'client',
//         matricule: '', agence: ''
//       });
//       setErrors({});
//       fetchUsers();
//     } else {
//       console.log('Erreur backend:', data); // Pour debug
//       // Gérer les erreurs du backend
//       if (data.details && Array.isArray(data.details)) {
//         const errorObj = mapBackendErrors(data.details);
//         setErrors(errorObj);
//       } else if (data.error) {
//         setErrors({ general: data.error });
//       } else {
//         setErrors({ general: 'Erreur inconnue du serveur' });
//       }
//     }
//   } catch (error) {
//     console.error('Erreur fetch:', error);
//     setErrors({ general: 'Erreur de connexion au serveur' });
//   } finally {
//     setFormLoading(false);
//   }
// };

//  const handleEditUser = (user) => {
//      setCurrentUser(user);
//      setFormData({
//        nom: user.nom || '',
//        prenom: user.prenom || '',
//        email: user.email || '',
//        telephone: user.telephone || '',
//        dateNaissance: user.dateNaissance || '',
//        adresse: user.adresse || '',
//        numPieceIdentite: user.numPieceIdentite || '',
//        role: user.role || 'client'
//      });
//      setShowEditModal(true);
//    };


//   // Modification d'utilisateur avec gestion d'erreurs
//   const handleUpdateUser = async (e) => {
//   e.preventDefault();
//   if (!currentUser) return;
  
//   setFormLoading(true);
//   setErrors({});

//   // Validation côté client
//   const clientErrors = validateForm(formData);
//   if (Object.keys(clientErrors).length > 0) {
//     setErrors(clientErrors);
//     setFormLoading(false);
//     return;
//   }

//   try {
//     const token = localStorage.getItem('token');
    
//     // Préparer les données à envoyer
//     const dataToSend = {
//       nom: formData.nom,
//       prenom: formData.prenom,
//       email: formData.email,
//       telephone: formData.telephone,
//       dateNaissance: formData.dateNaissance,
//       adresse: formData.adresse,
//       numPieceIdentite: formData.numPieceIdentite,
//       role: formData.role
//     };

//     // Ajouter les champs spécifiques aux agents seulement si le rôle est agent
//     if (formData.role === 'agent') {
//       dataToSend.matricule = formData.matricule;
//       dataToSend.agence = formData.agence;
//     }

//     console.log('Données envoyées pour modification:', dataToSend); // Pour debug

//     const response = await fetch(`/api/agent/comptes/${currentUser._id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify(dataToSend)
//     });

//     const data = await response.json();

//     if (response.ok) {
//       alert('Utilisateur modifié avec succès!');
//       setShowEditModal(false);
//       setCurrentUser(null);
//       setFormData({
//         nom: '', prenom: '', email: '', telephone: '',
//         dateNaissance: '', adresse: '', numPieceIdentite: '', role: 'client',
//         matricule: '', agence: ''
//       });
//       setErrors({});
//       fetchUsers();
//     } else {
//       console.log('Erreur backend modification:', data);
//       if (data.details && Array.isArray(data.details)) {
//         const errorObj = mapBackendErrors(data.details);
//         setErrors(errorObj);
//       } else if (data.error) {
//         setErrors({ general: data.error });
//       } else {
//         setErrors({ general: 'Erreur inconnue du serveur' });
//       }
//     }
//   } catch (error) {
//     console.error('Erreur fetch modification:', error);
//     setErrors({ general: 'Erreur de connexion au serveur' });
//   } finally {
//     setFormLoading(false);
//   }
// };

//   const toggleBlockUser = async (userId, currentStatus) => {
//     if (!confirm(`Voulez-vous vraiment ${currentStatus === 'actif' ? 'bloquer' : 'débloquer'} cet utilisateur ?`)) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`/api/agent/comptes/${userId}/toggle-block`, {
//         method: 'PATCH',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.ok) {
//         alert('Statut mis à jour avec succès!');
//         fetchUsers();
//       } else {
//         alert('Erreur lors de la mise à jour');
//       }
//     } catch (error) {
//       alert('Erreur lors de la mise à jour');
//     }
//   };

//   // const handleDeleteUser = async (userId, userName) => {
//   //   if (!confirm(`Voulez-vous vraiment supprimer l'utilisateur ${userName} ? Cette action est irréversible.`)) {
//   //     return;
//   //   }

//   //   try {
//   //     const token = localStorage.getItem('token');
//   //     const response = await fetch(`/api/agent/comptes/${userId}`, {
//   //       method: 'DELETE',
//   //       headers: { 'Authorization': `Bearer ${token}` }
//   //     });

//   //     if (response.ok) {
//   //       alert('Utilisateur supprimé avec succès!');
//   //       fetchUsers();
//   //     } else {
//   //       const errorData = await response.json();
//   //       alert(`Erreur lors de la suppression: ${errorData.error || 'Erreur inconnue'}`);
//   //     }
//   //   } catch (error) {
//   //     console.error('Erreur suppression:', error);
//   //     alert('Erreur lors de la suppression');
//   //   }
//   // };
//   const handleDeleteUser = async (userId, userName) => {
//   if (!confirm(`Voulez-vous vraiment archiver l'utilisateur ${userName} ?\n\nL'utilisateur sera archivé et ne sera plus visible dans la liste, mais ses données seront conservées.`)) {
//     return;
//   }

//   try {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`/api/agent/comptes/${userId}/archive`, {
//       method: 'PATCH',
//       headers: { 
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     if (response.ok) {
//       alert('Utilisateur archivé avec succès!');
//       fetchUsers();
//     } else {
//       const errorData = await response.json();
//       alert(`Erreur lors de l'archivage: ${errorData.error || 'Erreur inconnue'}`);
//     }
//   } catch (error) {
//     console.error('Erreur archivage:', error);
//     alert('Erreur lors de l\'archivage');
//   }
// };

//   // Fonction pour effacer une erreur quand l'utilisateur commence à taper
//   const clearError = (fieldName) => {
//     if (errors[fieldName]) {
//       setErrors(prev => {
//         const newErrors = { ...prev };
//         delete newErrors[fieldName];
//         return newErrors;
//       });
//     }
//   };

//   return (
//     <div>
//       {/* En-tête avec recherche et boutons */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div className="flex-1 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
//           <div className="relative flex-1 max-w-md w-full">
//             <input
//               type="text"
//               placeholder="Rechercher un utilisateur..."
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <span className="text-gray-400">🔍</span>
//             </div>
//           </div>
          
//           <button
//             onClick={() => {
//               setShowCreateModal(true);
//               setErrors({});
//             }}
//             className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
//           >
//             + Ajouter un utilisateur
//           </button>
//         </div>
//       </div>

//       {/* Barre d'actions groupées */}
//       {selectedUsers.length > 0 && (
//         <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
//             <span className="text-blue-800 dark:text-blue-200 font-medium mb-2 sm:mb-0">
//               {selectedUsers.length} utilisateur(s) sélectionné(s)
//             </span>
//             <div className="flex flex-wrap gap-2">
//               <button
//                 onClick={() => handleBulkAction('bloquer')}
//                 className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
//               >
//                 🔒 Bloquer ({selectedUsers.length})
//               </button>
//               <button
//                 onClick={() => handleBulkAction('debloquer')}
//                 className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
//               >
//                 🔓 Débloquer ({selectedUsers.length})
//               </button>
//               <button
//                 onClick={() => handleBulkAction('supprimer')}
//                 className="bg-red-800 hover:bg-red-900 text-white px-3 py-2 rounded-lg text-sm transition-colors"
//               >
//                 🗑️ Supprimer ({selectedUsers.length})
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Tableau */}
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   <input
//                     type="checkbox"
//                     checked={selectAll}
//                     onChange={toggleSelectAll}
//                     className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   />
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Utilisateur
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Téléphone
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Rôle
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Compte
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Solde
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Statut
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//               {users.map((user) => (
//                 <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <input
//                       type="checkbox"
//                       checked={selectedUsers.includes(user._id)}
//                       onChange={() => toggleUserSelection(user._id)}
//                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                     />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
//                         <span className="text-blue-600 dark:text-blue-300 text-sm font-semibold">
//                           {user.prenom[0]}{user.nom[0]}
//                         </span>
//                       </div>
//                       <div>
//                         <div className="text-sm font-medium text-gray-900 dark:text-white">
//                           {user.prenom} {user.nom}
//                         </div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">
//                           {user.email}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                     {user.telephone}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       user.role === 'distributeur' 
//                         ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
//                         : user.role === 'agent'
//                         ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
//                         : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                     }`}>
//                       {user.role}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                     {user.compte.numeroCompte}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                     {user.compte.solde.toLocaleString()} FCFA
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       user.compte.statut === 'actif'
//                         ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                         : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
//                     }`}>
//                       {user.compte.statut}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex space-x-2">
//                       {/* <button
//                         onClick={() => handleEditUser(user)}
//                         className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
//                         title="Modifier"
//                       >
//                         ✏️
//                       </button> */}
//                      <button
//       onClick={() =>  handleEditUser(user)}
//       className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
//       title="Modifier"
//     >
//       ✏️
//     </button>
//                       <button
//                         onClick={() => toggleBlockUser(user._id, user.compte.statut)}
//                         className={`${
//                           user.compte.statut === 'actif'
//                             ? 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300'
//                             : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
//                         }`}
//                         title={user.compte.statut === 'actif' ? 'Bloquer' : 'Débloquer'}
//                       >
//                         {user.compte.statut === 'actif' ? '🔒' : '🔓'}
//                       </button>
//                       <button
//                         onClick={() => handleDeleteUser(user._id, `${user.prenom} ${user.nom}`)}
//                         className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
//                         title="Supprimer"
//                       >
//                         🗑️
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
//             <div className="flex items-center justify-between">
//               <p className="text-sm text-gray-700 dark:text-gray-300">
//                 Page <span className="font-medium">{currentPage}</span> sur{' '}
//                 <span className="font-medium">{totalPages}</span>
//               </p>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-1 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Précédent
//                 </button>
//                 {[...Array(totalPages)].map((_, index) => (
//                   <button
//                     key={index + 1}
//                     onClick={() => setCurrentPage(index + 1)}
//                     className={`px-3 py-1 rounded-lg ${
//                       currentPage === index + 1
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300'
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-1 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Suivant
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Modal Création Utilisateur */}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
//               Créer un Utilisateur
//             </h2>
            
//             {/* Affichage des erreurs générales */}
//             {errors.general && (
//               <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//                 {errors.general}
//               </div>
//             )}
            
//             <form onSubmit={handleCreateUser} className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Nom"
//                     value={formData.nom}
//                     onChange={(e) => {
//                       setFormData({...formData, nom: e.target.value});
//                       clearError('nom');
//                     }}
//                     className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                       errors.nom ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                     }`}
//                     required
//                   />
//                   {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
//                 </div>
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Prénom"
//                     value={formData.prenom}
//                     onChange={(e) => {
//                       setFormData({...formData, prenom: e.target.value});
//                       clearError('prenom');
//                     }}
//                     className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                       errors.prenom ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                     }`}
//                     required
//                   />
//                   {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>}
//                 </div>
//               </div>

//               <div>
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={formData.email}
//                   onChange={(e) => {
//                     setFormData({...formData, email: e.target.value});
//                     clearError('email');
//                   }}
//                   className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                     errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   required
//                 />
//                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//               </div>

//               <div>
//                 <input
//                   type="tel"
//                   placeholder="Téléphone (+2217XXXXXXX)"
//                   value={formData.telephone}
//                   onChange={(e) => {
//                     setFormData({...formData, telephone: e.target.value});
//                     clearError('telephone');
//                   }}
//                   className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                     errors.telephone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   required
//                 />
//                 {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
//               </div>

//               <div>
//                 <input
//                   type="date"
//                   placeholder="Date de naissance"
//                   value={formData.dateNaissance}
//                   onChange={(e) => {
//                     setFormData({...formData, dateNaissance: e.target.value});
//                     clearError('dateNaissance');
//                   }}
//                   className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                     errors.dateNaissance ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   required
//                 />
//                 {errors.dateNaissance && <p className="text-red-500 text-sm mt-1">{errors.dateNaissance}</p>}
//               </div>

//               <div>
//                 <input
//                   type="text"
//                   placeholder="Adresse complète"
//                   value={formData.adresse}
//                   onChange={(e) => {
//                     setFormData({...formData, adresse: e.target.value});
//                     clearError('adresse');
//                   }}
//                   className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                     errors.adresse ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   required
//                 />
//                 {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse}</p>}
//               </div>

//               <div>
//                 <input
//                   type="text"
//                   placeholder="Numéro pièce identité"
//                   value={formData.numPieceIdentite}
//                   onChange={(e) => {
//                     setFormData({...formData, numPieceIdentite: e.target.value});
//                     clearError('numPieceIdentite');
//                   }}
//                   className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                     errors.numPieceIdentite ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   required
//                 />
//                 {errors.numPieceIdentite && <p className="text-red-500 text-sm mt-1">{errors.numPieceIdentite}</p>}
//               </div>

//               <div>
//                 <select
//                   value={formData.role}
//                   onChange={(e) => {
//                     setFormData({...formData, role: e.target.value});
//                     clearError('role');
//                   }}
//                   className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                     errors.role ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                 >
//                   <option value="client">Client</option>
//                   <option value="distributeur">Distributeur</option>
//                   <option value="agent">Agent</option>
//                 </select>
//                 {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
//               </div>

//               {/* Champs conditionnels pour les agents */}
//               {formData.role === 'agent' && (
//                 <>
//                   <div>
//                     <input
//                       type="text"
//                       placeholder="Matricule"
//                       value={formData.matricule}
//                       onChange={(e) => {
//                         setFormData({...formData, matricule: e.target.value});
//                         clearError('matricule');
//                       }}
//                       className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                         errors.matricule ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                       }`}
//                     />
//                     {errors.matricule && <p className="text-red-500 text-sm mt-1">{errors.matricule}</p>}
//                   </div>
//                   <div>
//                     <select
//                       value={formData.agence}
//                       onChange={(e) => {
//                         setFormData({...formData, agence: e.target.value});
//                         clearError('agence');
//                       }}
//                       className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                         errors.agence ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                       }`}
//                     >
//                       <option value="">Sélectionnez une agence</option>
//                       <option value="Dakar">Dakar</option>
//                       <option value="Thiès">Thiès</option>
//                       <option value="Saint-Louis">Saint-Louis</option>
//                       <option value="Kaolack">Kaolack</option>
//                       <option value="Ziguinchor">Ziguinchor</option>
//                       <option value="Mbour">Mbour</option>
//                       <option value="Touba">Touba</option>
//                     </select>
//                     {errors.agence && <p className="text-red-500 text-sm mt-1">{errors.agence}</p>}
//                   </div>
//                 </>
//               )}

//               <div className="flex justify-end space-x-3 mt-6">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowCreateModal(false);
//                     setErrors({});
//                   }}
//                   className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
//                   disabled={formLoading}
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
//                   disabled={formLoading}
//                 >
//                   {formLoading ? 'Création...' : 'Créer'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Modal Modification Utilisateur */}
//       {showEditModal && currentUser && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
//               Modifier l'Utilisateur
//             </h2>
            
//             {/* Affichage des erreurs générales */}
//             {errors.general && (
//               <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//                 {errors.general}
//               </div>
//             )}
            
//             <form onSubmit={handleUpdateUser} className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Nom"
//                     value={formData.nom}
//                     onChange={(e) => {
//                       setFormData({...formData, nom: e.target.value});
//                       clearError('nom');
//                     }}
//                     className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                       errors.nom ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                     }`}
//                     required
//                   />
//                   {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
//                 </div>
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Prénom"
//                     value={formData.prenom}
//                     onChange={(e) => {
//                       setFormData({...formData, prenom: e.target.value});
//                       clearError('prenom');
//                     }}
//                     className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                       errors.prenom ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                     }`}
//                     required
//                   />
//                   {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>}
//                 </div>
//               </div>

//               <div>
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={formData.email}
//                   onChange={(e) => {
//                     setFormData({...formData, email: e.target.value});
//                     clearError('email');
//                   }}
//                   className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                     errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   required
//                 />
//                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//               </div>

//               <div>
//                 <input
//                   type="tel"
//                   placeholder="Téléphone (+2217XXXXXXX)"
//                   value={formData.telephone}
//                   onChange={(e) => {
//                     setFormData({...formData, telephone: e.target.value});
//                     clearError('telephone');
//                   }}
//                   className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                     errors.telephone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   required
//                 />
//                 {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
//               </div>

//               <div>
//                 <input
//                   type="date"
//                   placeholder="Date de naissance"
//                   value={formData.dateNaissance}
//                   onChange={(e) => {
//                     setFormData({...formData, dateNaissance: e.target.value});
//                     clearError('dateNaissance');
//                   }}
//                   className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                     errors.dateNaissance ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   required
//                 />
//                 {errors.dateNaissance && <p className="text-red-500 text-sm mt-1">{errors.dateNaissance}</p>}
//               </div>

//               <div>
//                 <input
//                   type="text"
//                   placeholder="Adresse complète"
//                   value={formData.adresse}
//                   onChange={(e) => {
//                     setFormData({...formData, adresse: e.target.value});
//                     clearError('adresse');
//                   }}
//                   className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                     errors.adresse ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   required
//                 />
//                 {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse}</p>}
//               </div>

//               <div>
//                 <input
//                   type="text"
//                   placeholder="Numéro pièce identité"
//                   value={formData.numPieceIdentite}
//                   onChange={(e) => {
//                     setFormData({...formData, numPieceIdentite: e.target.value});
//                     clearError('numPieceIdentite');
//                   }}
//                   className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                     errors.numPieceIdentite ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   required
//                 />
//                 {errors.numPieceIdentite && <p className="text-red-500 text-sm mt-1">{errors.numPieceIdentite}</p>}
//               </div>

//               <div>
//                 <select
//                   value={formData.role}
//                   onChange={(e) => {
//                     setFormData({...formData, role: e.target.value});
//                     clearError('role');
//                   }}
//                   className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                     errors.role ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                 >
//                   <option value="client">Client</option>
//                   <option value="distributeur">Distributeur</option>
//                   <option value="agent">Agent</option>
//                 </select>
//                 {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
//               </div>

//               {/* Champs conditionnels pour les agents */}
//               {formData.role === 'agent' && (
//                 <>
//                   <div>
//                     <input
//                       type="text"
//                       placeholder="Matricule"
//                       value={formData.matricule}
//                       onChange={(e) => {
//                         setFormData({...formData, matricule: e.target.value});
//                         clearError('matricule');
//                       }}
//                       className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                         errors.matricule ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                       }`}
//                     />
//                     {errors.matricule && <p className="text-red-500 text-sm mt-1">{errors.matricule}</p>}
//                   </div>
//                   <div>
//                     <select
//                       value={formData.agence}
//                       onChange={(e) => {
//                         setFormData({...formData, agence: e.target.value});
//                         clearError('agence');
//                       }}
//                       className={`w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                         errors.agence ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                       }`}
//                     >
//                       <option value="">Sélectionnez une agence</option>
//                       <option value="Dakar">Dakar</option>
//                       <option value="Thiès">Thiès</option>
//                       <option value="Saint-Louis">Saint-Louis</option>
//                       <option value="Kaolack">Kaolack</option>
//                       <option value="Ziguinchor">Ziguinchor</option>
//                       <option value="Mbour">Mbour</option>
//                       <option value="Touba">Touba</option>
//                     </select>
//                     {errors.agence && <p className="text-red-500 text-sm mt-1">{errors.agence}</p>}
//                   </div>
//                 </>
//               )}

//               <div className="flex justify-end space-x-3 mt-6">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowEditModal(false);
//                     setCurrentUser(null);
//                     setErrors({});
//                   }}
//                   className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
//                   disabled={formLoading}
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
//                   disabled={formLoading}
//                 >
//                   {formLoading ? 'Modification...' : 'Modifier'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Utilisateurs;



import React, { useState, useEffect } from 'react';

const Utilisateurs = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    dateNaissance: '',
    adresse: '',
    numPieceIdentite: '',
    role: 'client',
    matricule: '',
    agence: ''
  });
  
  const [errors, setErrors] = useState({});
  const [formLoading, setFormLoading] = useState(false);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `/api/agent/dashboard/users?page=${currentPage}&limit=5&search=${searchTerm}&archived=false`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Erreur chargement utilisateurs:', error);
    } finally {
      setLoading(false);
    }
  };

  const mapBackendErrors = (errorsArray) => {
    const errorMap = {
      'nom': 'nom',
      'prénom': 'prenom', 
      'email': 'email',
      'téléphone': 'telephone',
      'date de naissance': 'dateNaissance',
      'adresse': 'adresse',
      'pièce d\'identité': 'numPieceIdentite',
      'rôle': 'role',
      'matricule': 'matricule',
      'agence': 'agence'
    };

    const errorObj = {};
    
    errorsArray.forEach(error => {
      let found = false;
      for (const [key, value] of Object.entries(errorMap)) {
        if (error.toLowerCase().includes(key)) {
          errorObj[value] = error;
          found = true;
          break;
        }
      }
      if (!found) {
        errorObj.general = errorObj.general ? `${errorObj.general}, ${error}` : error;
      }
    });

    return errorObj;
  };

  // CORRECTION : Validation en temps réel simplifiée
  // const validateField = (name, value, allData = formData) => {
  //   switch (name) {
  //     case 'nom':
  //       if (!value.trim()) return 'Le nom est obligatoire';
  //       if (value.length < 2) return 'Le nom doit contenir au moins 2 caractères';
  //       return null;
        
  //     case 'prenom':
  //       if (!value.trim()) return 'Le prénom est obligatoire';
  //       if (value.length < 2) return 'Le prénom doit contenir au moins 2 caractères';
  //       return null;
        
  //     case 'email':
  //       if (!value.trim()) return 'L\'email est obligatoire';
  //       if (!/\S+@\S+\.\S+/.test(value)) return 'Email invalide';
  //       return null;
        
  //     case 'telephone':
  //       if (!value.trim()) return 'Le téléphone est obligatoire';
  //       if (!/^\+221[567][0-9]{7}$/.test(value)) return 'Format téléphone invalide (+2217XXXXXXX)';
  //       return null;
        
  //     case 'dateNaissance':
  //       if (!value) return 'La date de naissance est obligatoire';
  //       const birthDate = new Date(value);
  //       const today = new Date();
  //       const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  //       if (birthDate > minAgeDate) return 'L\'utilisateur doit avoir au moins 18 ans';
  //       return null;
        
  //     case 'adresse':
  //       if (!value.trim()) return 'L\'adresse est obligatoire';
  //       if (value.length < 10) return 'L\'adresse doit contenir au moins 10 caractères';
  //       return null;
        
  //     case 'numPieceIdentite':
  //       if (!value.trim()) return 'Le numéro de pièce d\'identité est obligatoire';
  //       if (!/^[A-Z0-9]{6,15}$/.test(value.toUpperCase())) return 'Le numéro doit contenir 6-15 caractères alphanumériques';
  //       return null;
        
  //     case 'role':
  //       if (!value) return 'Le rôle est obligatoire';
  //       return null;
        
  //     case 'matricule':
  //       if (allData.role === 'agent') {
  //         if (!value.trim()) return 'Le matricule est obligatoire pour un agent';
  //         if (!/^[A-Z0-9]{6,10}$/.test(value.toUpperCase())) return 'Le matricule doit contenir 6-10 caractères alphanumériques';
  //       }
  //       return null;
        
  //     case 'agence':
  //       if (allData.role === 'agent' && !value) return 'L\'agence est obligatoire pour un agent';
  //       return null;
        
  //     default:
  //       return null;
  //   }
  // };
  const validateField = (name, value, allData = formData) => {
  // S'assurer que value est une string pour les champs qui utilisent trim()
  const stringValue = value != null ? String(value) : '';
  
  switch (name) {
    case 'nom':
      if (!stringValue.trim()) return 'Le nom est obligatoire';
      if (stringValue.length < 2) return 'Le nom doit contenir au moins 2 caractères';
      return '';
        
    case 'prenom':
      if (!stringValue.trim()) return 'Le prénom est obligatoire';
      if (stringValue.length < 2) return 'Le prénom doit contenir au moins 2 caractères';
      return '';
        
    case 'email':
      if (!stringValue.trim()) return 'L\'email est obligatoire';
      if (!/\S+@\S+\.\S+/.test(stringValue)) return 'Email invalide';
      return '';
        
    case 'telephone':
      if (!stringValue.trim()) return 'Le téléphone est obligatoire';
      if (!/^\+221[567][0-9]{7}$/.test(stringValue)) return 'Format téléphone invalide (+2217XXXXXXX)';
      return '';
        
    case 'dateNaissance':
      if (!value) return 'La date de naissance est obligatoire';
      try {
        const birthDate = new Date(value);
        const today = new Date();
        const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        if (birthDate > minAgeDate) return 'L\'utilisateur doit avoir au moins 18 ans';
      } catch (error) {
        return 'Date de naissance invalide';
      }
      return '';
        
    case 'adresse':
      if (!stringValue.trim()) return 'L\'adresse est obligatoire';
      if (stringValue.length < 5) return 'L\'adresse doit contenir au moins 5 caractères';
      return '';
        
    case 'numPieceIdentite':
      if (!stringValue.trim()) return 'Le numéro de pièce d\'identité est obligatoire';
      if (!/^[A-Z0-9]{6,15}$/.test(stringValue.toUpperCase())) return 'Le numéro doit contenir 6-15 caractères alphanumériques';
      return '';
        
    case 'role':
      if (!value) return 'Le rôle est obligatoire';
      return '';
        
    case 'matricule':
      if (allData.role === 'agent') {
        const matriculeValue = value != null ? String(value) : '';
        if (!matriculeValue.trim()) return 'Le matricule est obligatoire pour un agent';
        if (!/^[A-Z0-9]{6,10}$/.test(matriculeValue.toUpperCase())) return 'Le matricule doit contenir 6-10 caractères alphanumériques';
      }
      return '';
        
    case 'agence':
      if (allData.role === 'agent' && !value) return 'L\'agence est obligatoire pour un agent';
      return '';
        
    default:
      return '';
  }
};

  // CORRECTION : Validation complète du formulaire
  const validateForm = (data) => {
    const newErrors = {};
    
    // Valider chaque champ important
    const fieldsToValidate = ['nom', 'prenom', 'email', 'telephone', 'dateNaissance', 'adresse', 'numPieceIdentite', 'role'];
    
    fieldsToValidate.forEach(field => {
      const error = validateField(field, data[field], data);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Validation conditionnelle pour les agents
    if (data.role === 'agent') {
      const matriculeError = validateField('matricule', data.matricule, data);
      const agenceError = validateField('agence', data.agence, data);
      
      if (matriculeError) newErrors.matricule = matriculeError;
      if (agenceError) newErrors.agence = agenceError;
    }
    
    return newErrors;
  };

  // CORRECTION : Gestion améliorée des changements de champs
  const handleFieldChange = (fieldName, value) => {
    const newFormData = { ...formData, [fieldName]: value };
    setFormData(newFormData);
    
    // Marquer le champ comme touché
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    // Validation en temps réel
    const error = validateField(fieldName, value, newFormData);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[fieldName] = error;
      } else {
        delete newErrors[fieldName];
      }
      return newErrors;
    });

    // CORRECTION : Si le rôle change, revalider les champs conditionnels
    if (fieldName === 'role') {
      if (value !== 'agent') {
        // Si le rôle n'est plus agent, supprimer les erreurs des champs agents
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.matricule;
          delete newErrors.agence;
          return newErrors;
        });
      } else {
        // Si le rôle devient agent, valider les champs agents
        const matriculeError = validateField('matricule', newFormData.matricule, newFormData);
        const agenceError = validateField('agence', newFormData.agence, newFormData);
        
        setErrors(prev => {
          const newErrors = { ...prev };
          if (matriculeError) newErrors.matricule = matriculeError;
          if (agenceError) newErrors.agence = agenceError;
          return newErrors;
        });
      }
    }
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      const allIds = users.map(user => user._id);
      setSelectedUsers(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleBulkAction = async (action) => {
    if (selectedUsers.length === 0) {
      alert('Veuillez sélectionner au moins un utilisateur');
      return;
    }

    const actionText = {
      'bloquer': 'bloquer',
      'debloquer': 'débloquer', 
      'supprimer': 'supprimer'
    }[action];

    let confirmMessage = '';
    if (action === 'bloquer') {
      confirmMessage = `Voulez-vous bloquer les utilisateurs actifs sélectionnés ?\n(Les utilisateurs déjà bloqués ne seront pas affectés)`;
    } else if (action === 'debloquer') {
      confirmMessage = `Voulez-vous débloquer les utilisateurs bloqués sélectionnés ?\n(Les utilisateurs actifs ne seront pas affectés)`;
    } else {
      confirmMessage = `Voulez-vous vraiment archiver ${selectedUsers.length} utilisateur(s) ?`;
    }

    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/agent/utilisateurs/bulk-action', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userIds: selectedUsers,
          action: action
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchUsers();
        setSelectedUsers([]);
        setSelectAll(false);
      } else {
        alert(`Erreur: ${data.error}`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'action groupée:', error);
      alert('Erreur lors de l\'opération');
    }
  };

  // CORRECTION : Fonction de création améliorée
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    // Marquer tous les champs comme touchés pour afficher toutes les erreurs
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Validation finale avant soumission
    const finalErrors = validateForm(formData);
    
    // CORRECTION : Vérifier si le formulaire est valide
    const isValid = Object.keys(finalErrors).length === 0;
    
    if (!isValid) {
      setErrors(finalErrors);
      setFormLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      const dataToSend = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        telephone: formData.telephone,
        dateNaissance: formData.dateNaissance,
        adresse: formData.adresse,
        numPieceIdentite: formData.numPieceIdentite,
        role: formData.role
      };
   
      if (formData.role === 'agent') {
        dataToSend.matricule = formData.matricule;
        dataToSend.agence = formData.agence;
      }

      console.log('Données envoyées:', dataToSend);

      const response = await fetch('/api/agent/comptes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Le serveur a retourné une réponse non-JSON');
      }

      const data = await response.json();

      if (response.ok) {
        alert('Utilisateur créé avec succès!');
        setShowCreateModal(false);
        setFormData({
          nom: '', prenom: '', email: '', telephone: '',
          dateNaissance: '', adresse: '', numPieceIdentite: '', role: 'client',
          matricule: '', agence: ''
        });
        setErrors({});
        setTouched({});
        fetchUsers();
      } else {
        console.log('Erreur backend:', data);
        if (data.details && Array.isArray(data.details)) {
          const errorObj = mapBackendErrors(data.details);
          setErrors(errorObj);
        } else if (data.error) {
          setErrors({ general: data.error });
        } else {
          setErrors({ general: 'Erreur inconnue du serveur' });
        }
      }
    } catch (error) {
      console.error('Erreur fetch:', error);
      if (error.message.includes('non-JSON')) {
        setErrors({ general: 'Erreur de communication avec le serveur. Veuillez réessayer.' });
      } else {
        setErrors({ general: 'Erreur de connexion au serveur' });
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setFormData({
      nom: user.nom || '',
      prenom: user.prenom || '',
      email: user.email || '',
      telephone: user.telephone || '',
      dateNaissance: user.dateNaissance ? user.dateNaissance.split('T')[0] : '',
      adresse: user.adresse || '',
      numPieceIdentite: user.numPieceIdentite || '',
      role: user.role || 'client',
      matricule: user.matricule || '',
      agence: user.agence || ''
    });
    setErrors({});
    setTouched({});
    setShowEditModal(true);
  };

  // CORRECTION : Fonction de modification améliorée
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setFormLoading(true);

    // Marquer tous les champs comme touchés
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Validation finale avant soumission
    const finalErrors = validateForm(formData);
    
    // CORRECTION : Vérifier si le formulaire est valide
    const isValid = Object.keys(finalErrors).length === 0;
    
    if (!isValid) {
      setErrors(finalErrors);
      setFormLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      const dataToSend = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        telephone: formData.telephone,
        dateNaissance: formData.dateNaissance,
        adresse: formData.adresse,
        numPieceIdentite: formData.numPieceIdentite,
        role: formData.role
      };

      if (formData.role === 'agent') {
        dataToSend.matricule = formData.matricule;
        dataToSend.agence = formData.agence;
      }

      console.log('Données envoyées pour modification:', dataToSend);

      const response = await fetch(`/api/agent/comptes/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Le serveur a retourné une réponse non-JSON');
      }

      const data = await response.json();

      if (response.ok) {
        alert('Utilisateur modifié avec succès!');
        setShowEditModal(false);
        setCurrentUser(null);
        setFormData({
          nom: '', prenom: '', email: '', telephone: '',
          dateNaissance: '', adresse: '', numPieceIdentite: '', role: 'client',
          matricule: '', agence: ''
        });
        setErrors({});
        setTouched({});
        fetchUsers();
      } else {
        console.log('Erreur backend modification:', data);
        if (data.details && Array.isArray(data.details)) {
          const errorObj = mapBackendErrors(data.details);
          setErrors(errorObj);
        } else if (data.error) {
          setErrors({ general: data.error });
        } else {
          setErrors({ general: 'Erreur inconnue du serveur' });
        }
      }
    } catch (error) {
      console.error('Erreur fetch modification:', error);
      if (error.message.includes('non-JSON')) {
        setErrors({ general: 'Erreur de communication avec le serveur. Veuillez réessayer.' });
      } else {
        setErrors({ general: 'Erreur de connexion au serveur' });
      }
    } finally {
      setFormLoading(false);
    }
  };

  const toggleBlockUser = async (userId, currentStatus) => {
    if (!confirm(`Voulez-vous vraiment ${currentStatus === 'actif' ? 'bloquer' : 'débloquer'} cet utilisateur ?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/agent/comptes/${userId}/toggle-block`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        alert('Statut mis à jour avec succès!');
        fetchUsers();
      } else {
        alert('Erreur lors de la mise à jour');
      }
    } catch (error) {
      alert('Erreur lors de la mise à jour');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!confirm(`Voulez-vous vraiment archiver l'utilisateur ${userName} ?\n\nL'utilisateur sera archivé et ne sera plus visible dans la liste, mais ses données seront conservées.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/agent/comptes/${userId}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Le serveur a retourné une réponse non-JSON');
      }

      const data = await response.json();

      if (response.ok) {
        alert('Utilisateur archivé avec succès!');
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
        setSelectedUsers(prev => prev.filter(id => id !== userId));
      } else {
        alert(`Erreur lors de l'archivage: ${data.error || 'Erreur inconnue'}`);
      }
    } catch (error) {
      console.error('Erreur archivage:', error);
      if (error.message.includes('non-JSON')) {
        alert('Erreur de communication avec le serveur. Veuillez réessayer.');
      } else {
        alert('Erreur lors de l\'archivage');
      }
    }
  };

  // CORRECTION : Calcul du statut du formulaire
  const isFormValid = () => {
    const formErrors = validateForm(formData);
    return Object.keys(formErrors).length === 0;
  };

  // Compteurs en temps réel
  const clientCount = users.filter(user => user.role === 'client').length;
  const agentCount = users.filter(user => user.role === 'agent').length;
  const distributeurCount = users.filter(user => user.role === 'distributeur').length;

  return (
    <div>
      {/* En-tête avec recherche et boutons - Version compacte */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div className="flex-1 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 max-w-md w-full">
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <span className="text-gray-400 text-sm">🔍</span>
            </div>
          </div>
          
          <button
            onClick={() => {
              setShowCreateModal(true);
              setErrors({});
              setTouched({});
            }}
            className="bg-green-500 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors whitespace-nowrap text-sm"
          >
            + Ajouter
          </button>
        </div>
      </div>

      {/* Statistiques en temps réel */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">{clientCount}</div>
          <div className="text-sm text-blue-700 dark:text-blue-200">Clients</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-300">{agentCount}</div>
          <div className="text-sm text-green-700 dark:text-green-200">Agents</div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-300">{distributeurCount}</div>
          <div className="text-sm text-orange-700 dark:text-orange-200">Distributeurs</div>
        </div>
      </div>

      {/* Barre d'actions groupées */}
      {selectedUsers.length > 0 && (
        <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <span className="text-blue-800 dark:text-blue-200 font-medium mb-2 sm:mb-0 text-sm">
              {selectedUsers.length} utilisateur(s) sélectionné(s)
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleBulkAction('bloquer')}
                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs transition-colors"
              >
                🔒 Bloquer
              </button>
              <button
                onClick={() => handleBulkAction('debloquer')}
                className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs transition-colors"
              >
                🔓 Débloquer
              </button>
              <button
                onClick={() => handleBulkAction('supprimer')}
                className="bg-red-800 hover:bg-red-900 text-white px-2 py-1 rounded text-xs transition-colors"
              >
                🗑️ Archiver
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tableau - Version compacte */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Téléphone
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Compte
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Solde
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-3 py-2 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => toggleUserSelection(user._id)}
                      className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-2">
                        <span className="text-blue-600 dark:text-blue-300 text-xs font-semibold">
                          {user.prenom[0]}{user.nom[0]}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.prenom} {user.nom}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {user.telephone}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      user.role === 'distributeur' 
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                        : user.role === 'agent'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {user.compte.numeroCompte}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {user.compte.solde.toLocaleString()} FCFA
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      user.compte.statut === 'actif'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {user.compte.statut}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => toggleBlockUser(user._id, user.compte.statut)}
                        className={`text-sm ${
                          user.compte.statut === 'actif'
                            ? 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300'
                            : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                        }`}
                        title={user.compte.statut === 'actif' ? 'Bloquer' : 'Débloquer'}
                      >
                        {user.compte.statut === 'actif' ? '🔒' : '🔓'}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id, `${user.prenom} ${user.nom}`)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 text-sm"
                        title="Archiver"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination compacte */}
        {totalPages > 1 && (
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Page <span className="font-medium">{currentPage}</span> sur{' '}
                <span className="font-medium">{totalPages}</span>
              </p>
              <div className="flex space-x-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2 py-1 rounded text-xs bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300 disabled:opacity-50"
                >
                  Précédent
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-2 py-1 rounded text-xs ${
                      currentPage === index + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 rounded text-xs bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300 disabled:opacity-50"
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Création Utilisateur - Version compacte */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
              Créer un Utilisateur
            </h2>
            
            {errors.general && (
              <div className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleCreateUser} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="text"
                    placeholder="Nom"
                    value={formData.nom}
                    onChange={(e) => handleFieldChange('nom', e.target.value)}
                    onBlur={() => setTouched(prev => ({ ...prev, nom: true }))}
                    className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.nom ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    required
                  />
                  {touched.nom && errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={formData.prenom}
                    onChange={(e) => handleFieldChange('prenom', e.target.value)}
                    onBlur={() => setTouched(prev => ({ ...prev, prenom: true }))}
                    className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.prenom ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    required
                  />
                  {touched.prenom && errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                  className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                />
                {touched.email && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Téléphone (+2217XXXXXXX)"
                  value={formData.telephone}
                  onChange={(e) => handleFieldChange('telephone', e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, telephone: true }))}
                  className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.telephone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                />
                {touched.telephone && errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
              </div>

              <div>
                <input
                  type="date"
                  placeholder="Date de naissance"
                  value={formData.dateNaissance}
                  onChange={(e) => handleFieldChange('dateNaissance', e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, dateNaissance: true }))}
                  className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.dateNaissance ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                />
                {touched.dateNaissance && errors.dateNaissance && <p className="text-red-500 text-xs mt-1">{errors.dateNaissance}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Adresse complète"
                  value={formData.adresse}
                  onChange={(e) => handleFieldChange('adresse', e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, adresse: true }))}
                  className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.adresse ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                />
                {touched.adresse && errors.adresse && <p className="text-red-500 text-xs mt-1">{errors.adresse}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Numéro pièce identité"
                  value={formData.numPieceIdentite}
                  onChange={(e) => handleFieldChange('numPieceIdentite', e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, numPieceIdentite: true }))}
                  className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.numPieceIdentite ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                />
                {touched.numPieceIdentite && errors.numPieceIdentite && <p className="text-red-500 text-xs mt-1">{errors.numPieceIdentite}</p>}
              </div>

              <div>
                <select
                  value={formData.role}
                  onChange={(e) => handleFieldChange('role', e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, role: true }))}
                  className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.role ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <option value="client">Client</option>
                  <option value="distributeur">Distributeur</option>
                  <option value="agent">Agent</option>
                </select>
                {touched.role && errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
              </div>

              {formData.role === 'agent' && (
                <>
                  <div>
                    <input
                      type="text"
                      placeholder="Matricule"
                      value={formData.matricule}
                      onChange={(e) => handleFieldChange('matricule', e.target.value)}
                      onBlur={() => setTouched(prev => ({ ...prev, matricule: true }))}
                      className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors.matricule ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {touched.matricule && errors.matricule && <p className="text-red-500 text-xs mt-1">{errors.matricule}</p>}
                  </div>
                  <div>
                    <select
                      value={formData.agence}
                      onChange={(e) => handleFieldChange('agence', e.target.value)}
                      onBlur={() => setTouched(prev => ({ ...prev, agence: true }))}
                      className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors.agence ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
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
                    {touched.agence && errors.agence && <p className="text-red-500 text-xs mt-1">{errors.agence}</p>}
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setErrors({});
                    setTouched({});
                  }}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  disabled={formLoading}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                  disabled={formLoading || !isFormValid()}
                >
                  {formLoading ? 'Création...' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Modification Utilisateur - Version compacte */}
      {showEditModal && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
              Modifier l'Utilisateur
            </h2>
            
            {errors.general && (
              <div className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleUpdateUser} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="text"
                    placeholder="Nom"
                    value={formData.nom}
                    onChange={(e) => handleFieldChange('nom', e.target.value)}
                    onBlur={() => setTouched(prev => ({ ...prev, nom: true }))}
                    className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.nom ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    required
                  />
                  {touched.nom && errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={formData.prenom}
                    onChange={(e) => handleFieldChange('prenom', e.target.value)}
                    onBlur={() => setTouched(prev => ({ ...prev, prenom: true }))}
                    className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.prenom ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    required
                  />
                  {touched.prenom && errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                  className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                />
                {touched.email && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Téléphone (+2217XXXXXXX)"
                  value={formData.telephone}
                  onChange={(e) => handleFieldChange('telephone', e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, telephone: true }))}
                  className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.telephone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                />
                {touched.telephone && errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
              </div>

              <div>
                <input
                  type="date"
                  placeholder="Date de naissance"
                  value={formData.dateNaissance}
                  onChange={(e) => handleFieldChange('dateNaissance', e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, dateNaissance: true }))}
                  className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.dateNaissance ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                />
                {touched.dateNaissance && errors.dateNaissance && <p className="text-red-500 text-xs mt-1">{errors.dateNaissance}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Adresse complète"
                  value={formData.adresse}
                  onChange={(e) => handleFieldChange('adresse', e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, adresse: true }))}
                  className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.adresse ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                />
                {touched.adresse && errors.adresse && <p className="text-red-500 text-xs mt-1">{errors.adresse}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Numéro pièce identité"
                  value={formData.numPieceIdentite}
                  onChange={(e) => handleFieldChange('numPieceIdentite', e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, numPieceIdentite: true }))}
                  className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.numPieceIdentite ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  required
                />
                {touched.numPieceIdentite && errors.numPieceIdentite && <p className="text-red-500 text-xs mt-1">{errors.numPieceIdentite}</p>}
              </div>

              <div>
                <select
                  value={formData.role}
                  onChange={(e) => handleFieldChange('role', e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, role: true }))}
                  className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.role ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <option value="client">Client</option>
                  <option value="distributeur">Distributeur</option>
                  <option value="agent">Agent</option>
                </select>
                {touched.role && errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
              </div>

              {formData.role === 'agent' && (
                <>
                  <div>
                    <input
                      type="text"
                      placeholder="Matricule"
                      value={formData.matricule}
                      onChange={(e) => handleFieldChange('matricule', e.target.value)}
                      onBlur={() => setTouched(prev => ({ ...prev, matricule: true }))}
                      className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors.matricule ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {touched.matricule && errors.matricule && <p className="text-red-500 text-xs mt-1">{errors.matricule}</p>}
                  </div>
                  <div>
                    <select
                      value={formData.agence}
                      onChange={(e) => handleFieldChange('agence', e.target.value)}
                      onBlur={() => setTouched(prev => ({ ...prev, agence: true }))}
                      className={`w-full p-2 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors.agence ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
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
                    {touched.agence && errors.agence && <p className="text-red-500 text-xs mt-1">{errors.agence}</p>}
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setCurrentUser(null);
                    setErrors({});
                    setTouched({});
                  }}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  disabled={formLoading}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                  disabled={formLoading || !isFormValid()}
                >
                  {formLoading ? 'Modification...' : 'Modifier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Utilisateurs;