// import { useState, useEffect } from "react";

// const Depot = () => {
//   const [clients, setClients] = useState([]);
//   const [formData, setFormData] = useState({
//     clientId: "",
//     montant: "",
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchClients();
//   }, []);

//   const fetchClients = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "/api/agent/dashboard/users?role=client&limit=100",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const data = await response.json();
//       setClients(data.users);
//     } catch (error) {
//       console.error("Erreur chargement clients:", error);
//     }
//   };

//   const handleDepot = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("/api/agent/transactions/depot", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         alert(
//           `✅ Dépôt réussi!\n\n💰 Nouveau solde: ${result.nouveauSolde.toLocaleString()} FCFA\n📌 Frais: ${result.frais.toLocaleString()} FCFA\n🏦 Commission: ${result.commission.toLocaleString()} FCFA`
//         );
//         setFormData({ clientId: "", montant: "" });
//         fetchClients();
//       } else {
//         const error = await response.json();
//         alert(`❌ Erreur: ${error.error}`);
//       }
//     } catch (error) {
//       alert("❌ Erreur lors du dépôt");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       {/* Titre */}
//       <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
//         💵 Effectuer un Dépôt
//       </h1>

//       {/* Carte principale */}
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-500 to-emerald-600">
//           <h2 className="text-lg font-semibold text-white">Formulaire de Dépôt</h2>
//         </div>

//         <div className="p-6">
//           <form onSubmit={handleDepot} className="space-y-6">
//             {/* Select client */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 👤 Sélectionner le Client
//               </label>
//               <select
//                 value={formData.clientId}
//                 onChange={(e) =>
//                   setFormData({ ...formData, clientId: e.target.value })
//                 }
//                 className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//                 required
//               >
//                 <option value="">-- Choisir un client --</option>
//                 {clients.map((client) => (
//                   <option key={client._id} value={client._id}>
//                     {client.prenom} {client.nom} - {client.compte.numeroCompte}{" "}
//                     {client.compte.statut === "bloque" && " (🚫 BLOQUÉ)"}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Input montant */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 💰 Montant du Dépôt (FCFA)
//               </label>
//               <input
//                 type="number"
//                 placeholder="Ex: 50 000"
//                 value={formData.montant}
//                 onChange={(e) =>
//                   setFormData({ ...formData, montant: e.target.value })
//                 }
//                 className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//                 min="1"
//                 required
//               />
//             </div>

//             {/* Récapitulatif */}
//             {formData.montant && (
//               <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg shadow-inner">
//                 <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">
//                   📊 Récapitulatif
//                 </h3>
//                 <div className="space-y-1 text-sm text-green-800 dark:text-green-200">
//                   <p>
//                     Montant:{" "}
//                     {parseFloat(formData.montant).toLocaleString()} FCFA
//                   </p>
//                   <p>
//                     Frais (1%):{" "}
//                     {(parseFloat(formData.montant) * 0.01).toLocaleString()} FCFA
//                   </p>
//                   <p>
//                     Commission (1%):{" "}
//                     {(parseFloat(formData.montant) * 0.01).toLocaleString()} FCFA
//                   </p>
//                   <p className="font-bold">
//                     ✅ Total crédité:{" "}
//                     {parseFloat(formData.montant).toLocaleString()} FCFA
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Bouton */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 disabled:opacity-50 text-white py-3 px-4 rounded-lg shadow-lg transition font-semibold"
//             >
//               {loading ? "⏳ Traitement..." : "✅ Effectuer le Dépôt"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Depot;

// import { useState, useEffect } from "react";

// const Depot = () => {
//   const [distributeurs, setDistributeurs] = useState([]);
//   const [formData, setFormData] = useState({
//     distributeurId: "",
//     montant: "",
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchDistributeurs();
//   }, []);

//   const fetchDistributeurs = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "/api/agent/dashboard/users?role=distributeur&limit=100",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const data = await response.json();
//       setDistributeurs(data.users);
//     } catch (error) {
//       console.error("Erreur chargement distributeurs:", error);
//     }
//   };

//   const handleDepot = async (e) => {
//     e.preventDefault();
    
//     if (!formData.distributeurId) {
//       alert("❌ Veuillez sélectionner un distributeur");
//       return;
//     }

//     if (!formData.montant || parseFloat(formData.montant) <= 0) {
//       alert("❌ Veuillez saisir un montant valide");
//       return;
//     }

//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("/api/agent/distributeurs/credit", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           distributeurId: formData.distributeurId,
//           montant: parseFloat(formData.montant)
//         }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         alert(
//           `✅ Dépôt réussi!\n\n💰 Nouveau solde: ${result.nouveauSolde.toLocaleString()} FCFA\n📌 Transaction ID: ${result.transactionId}`
//         );
//         setFormData({ distributeurId: "", montant: "" });
//         fetchDistributeurs(); // Recharger la liste pour mettre à jour les soldes
//       } else {
//         const error = await response.json();
//         alert(`❌ Erreur: ${error.error}`);
//       }
//     } catch (error) {
//       console.error("Erreur lors du dépôt:", error);
//       alert("❌ Erreur lors du dépôt");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Trouver le distributeur sélectionné pour afficher son solde actuel
//   const selectedDistributeur = distributeurs.find(
//     (dist) => dist._id === formData.distributeurId
//   );

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       {/* Titre */}
//       <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
//         🏪 Créditer un Distributeur
//       </h1>

//       {/* Carte principale */}
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-500 to-amber-600">
//           <h2 className="text-lg font-semibold text-white">Formulaire de Crédit</h2>
//         </div>

//         <div className="p-6">
//           <form onSubmit={handleDepot} className="space-y-6">
//             {/* Select distributeur */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 🏪 Sélectionner le Distributeur
//               </label>
//               <select
//                 value={formData.distributeurId}
//                 onChange={(e) =>
//                   setFormData({ ...formData, distributeurId: e.target.value })
//                 }
//                 className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
//                 required
//               >
//                 <option value="">-- Choisir un distributeur --</option>
//                 {distributeurs.map((distributeur) => (
//                   <option key={distributeur._id} value={distributeur._id}>
//                     {distributeur.prenom} {distributeur.nom} - {distributeur.compte.numeroCompte} 
//                     {distributeur.compte.statut === "bloque" && " (🚫 BLOQUÉ)"}
//                     {distributeur.compte.statut === "actif" && ` - Solde: ${distributeur.compte.solde.toLocaleString()} FCFA`}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Affichage du solde actuel si distributeur sélectionné */}
//             {selectedDistributeur && (
//               <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
//                 <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
//                   📊 Informations du Distributeur
//                 </h3>
//                 <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
//                   <p><strong>Nom:</strong> {selectedDistributeur.prenom} {selectedDistributeur.nom}</p>
//                   <p><strong>Compte:</strong> {selectedDistributeur.compte.numeroCompte}</p>
//                   <p><strong>Solde actuel:</strong> {selectedDistributeur.compte.solde.toLocaleString()} FCFA</p>
//                   <p><strong>Statut:</strong> 
//                     <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
//                       selectedDistributeur.compte.statut === 'actif' 
//                         ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                         : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
//                     }`}>
//                       {selectedDistributeur.compte.statut.toUpperCase()}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Input montant */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 💰 Montant du Crédit (FCFA)
//               </label>
//               <input
//                 type="number"
//                 placeholder="Ex: 500 000"
//                 value={formData.montant}
//                 onChange={(e) =>
//                   setFormData({ ...formData, montant: e.target.value })
//                 }
//                 className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
//                 min="1"
//                 step="1000"
//                 required
//               />
//             </div>

//             {/* Récapitulatif */}
//             {formData.montant && selectedDistributeur && (
//               <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg shadow-inner">
//                 <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
//                   📊 Récapitulatif du Crédit
//                 </h3>
//                 <div className="space-y-2 text-sm text-orange-800 dark:text-orange-200">
//                   <div className="flex justify-between">
//                     <span>Solde actuel:</span>
//                     <span>{selectedDistributeur.compte.solde.toLocaleString()} FCFA</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Montant à créditer:</span>
//                     <span>+ {parseFloat(formData.montant).toLocaleString()} FCFA</span>
//                   </div>
//                   <hr className="border-orange-300 dark:border-orange-600" />
//                   <div className="flex justify-between font-bold text-lg">
//                     <span>Nouveau solde:</span>
//                     <span className="text-green-600 dark:text-green-400">
//                       {(selectedDistributeur.compte.solde + parseFloat(formData.montant)).toLocaleString()} FCFA
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Avertissement si distributeur bloqué */}
//             {selectedDistributeur && selectedDistributeur.compte.statut === "bloque" && (
//               <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-700">
//                 <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
//                   <span className="text-lg">⚠️</span>
//                   <p className="font-medium">Ce distributeur est bloqué. Vous ne pouvez pas effectuer de crédit.</p>
//                 </div>
//               </div>
//             )}

//             {/* Bouton */}
//             <button
//               type="submit"
//               disabled={loading || (selectedDistributeur && selectedDistributeur.compte.statut === "bloque")}
//               className="w-full bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg shadow-lg transition font-semibold"
//             >
//               {loading ? "⏳ Traitement..." : "🏪 Créditer le Distributeur"}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Liste des distributeurs */}
//       <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-500 to-gray-600">
//           <h2 className="text-lg font-semibold text-white">Liste des Distributeurs</h2>
//         </div>
        
//         <div className="p-6">
//           {distributeurs.length === 0 ? (
//             <p className="text-gray-500 dark:text-gray-400 text-center py-4">
//               Aucun distributeur trouvé
//             </p>
//           ) : (
//             <div className="grid gap-4 md:grid-cols-2">
//               {distributeurs.map((distributeur) => (
//                 <div 
//                   key={distributeur._id}
//                   className={`p-4 rounded-lg border ${
//                     distributeur.compte.statut === 'actif' 
//                       ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
//                       : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
//                   }`}
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-semibold text-gray-900 dark:text-white">
//                         {distributeur.prenom} {distributeur.nom}
//                       </h3>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">
//                         {distributeur.compte.numeroCompte}
//                       </p>
//                       <p className={`text-lg font-bold ${
//                         distributeur.compte.statut === 'actif' 
//                           ? 'text-green-600 dark:text-green-400'
//                           : 'text-red-600 dark:text-red-400'
//                       }`}>
//                         {distributeur.compte.solde.toLocaleString()} FCFA
//                       </p>
//                     </div>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       distributeur.compte.statut === 'actif' 
//                         ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                         : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
//                     }`}>
//                       {distributeur.compte.statut.toUpperCase()}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Depot;
// https://docs.google.com/forms/d/e/1FAIpQLSewVdic1KY7qwcey5PjVGAcvzUhw866LTUe30vbJM_Rya-kOQ/viewform
// https://fr.linkedin.com/posts/senstartup_hackathon-innovation-dakarslushd-activity-7378751069469749248-PJew

// import { useState, useEffect } from "react";

// const Depot = () => {
//   const [distributeurs, setDistributeurs] = useState([]);
//   const [agentInfo, setAgentInfo] = useState(null);
//   const [formData, setFormData] = useState({
//     distributeurId: "",
//     montant: "",
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchDistributeurs();
//     fetchAgentInfo();
//   }, []);

//   const fetchDistributeurs = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "/api/agent/dashboard/users?role=distributeur&limit=100",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const data = await response.json();
//       setDistributeurs(data.users);
//     } catch (error) {
//       console.error("Erreur chargement distributeurs:", error);
//     }
//   };

//   const fetchAgentInfo = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("/api/agent/info", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setAgentInfo(data);
//       }
//     } catch (error) {
//       console.error("Erreur chargement info agent:", error);
//     }
//   };

//   const handleDepot = async (e) => {
//     e.preventDefault();
    
//     if (!formData.distributeurId) {
//       alert("❌ Veuillez sélectionner un distributeur");
//       return;
//     }

//     const montant = parseFloat(formData.montant);
//     if (!montant || montant < 5000) {
//       alert("❌ Le montant minimum est de 5 000 FCFA");
//       return;
//     }

//     if (agentInfo && agentInfo.solde && montant > agentInfo.solde) {
//       alert(`❌ Montant insuffisant. Votre solde est de ${agentInfo.solde.toLocaleString()} FCFA`);
//       return;
//     }

//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("/api/agent/distributeurs/credit", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           distributeurId: formData.distributeurId,
//           montant: montant
//         }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         alert(
//           `✅ Dépôt réussi!\n\n💰 Nouveau solde distributeur: ${result.nouveauSolde.toLocaleString()} FCFA\n📌 Transaction ID: ${result.transactionId}`
//         );
//         setFormData({ distributeurId: "", montant: "" });
//         fetchDistributeurs();
//         fetchAgentInfo(); // Mettre à jour le solde de l'agent
//       } else {
//         const error = await response.json();
//         alert(`❌ Erreur: ${error.error}`);
//       }
//     } catch (error) {
//       console.error("Erreur lors du dépôt:", error);
//       alert("❌ Erreur lors du dépôt");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Trouver le distributeur sélectionné pour afficher son solde actuel
//   const selectedDistributeur = distributeurs.find(
//     (dist) => dist._id === formData.distributeurId
//   );

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       {/* Titre */}
//       <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
//         🏪 Créditer un Distributeur
//       </h1>

//       {/* Info Agent */}
//       {agentInfo && (
//         <div className="mb-6 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="font-semibold text-blue-700 dark:text-blue-300">
//                 👨‍💼 Informations Agent
//               </h3>
//               <p className="text-sm text-blue-600 dark:text-blue-400">
//                 {agentInfo.prenom} {agentInfo.nom} - {agentInfo.matricule}
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
//                 Solde: {agentInfo.solde ? agentInfo.solde.toLocaleString() : '0'} FCFA
//               </p>
//               <p className="text-xs text-blue-600 dark:text-blue-400">
//                 Montant min: 5 000 FCFA
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Carte principale */}
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-500 to-amber-600">
//           <h2 className="text-lg font-semibold text-white">Formulaire de Crédit</h2>
//         </div>

//         <div className="p-6">
//           <form onSubmit={handleDepot} className="space-y-6">
//             {/* Select distributeur */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 🏪 Sélectionner le Distributeur
//               </label>
//               <select
//                 value={formData.distributeurId}
//                 onChange={(e) =>
//                   setFormData({ ...formData, distributeurId: e.target.value })
//                 }
//                 className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
//                 required
//               >
//                 <option value="">-- Choisir un distributeur --</option>
//                 {distributeurs.map((distributeur) => (
//                   <option key={distributeur._id} value={distributeur._id}>
//                     {distributeur.prenom} {distributeur.nom} - {distributeur.compte.numeroCompte} 
//                     {distributeur.compte.statut === "bloque" && " (🚫 BLOQUÉ)"}
//                     {distributeur.compte.statut === "actif" && ` - Solde: ${distributeur.compte.solde.toLocaleString()} FCFA`}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Affichage du solde actuel si distributeur sélectionné */}
//             {selectedDistributeur && (
//               <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
//                 <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
//                   📊 Informations du Distributeur
//                 </h3>
//                 <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
//                   <p><strong>Nom:</strong> {selectedDistributeur.prenom} {selectedDistributeur.nom}</p>
//                   <p><strong>Compte:</strong> {selectedDistributeur.compte.numeroCompte}</p>
//                   <p><strong>Solde actuel:</strong> {selectedDistributeur.compte.solde.toLocaleString()} FCFA</p>
//                   <p><strong>Statut:</strong> 
//                     <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
//                       selectedDistributeur.compte.statut === 'actif' 
//                         ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                         : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
//                     }`}>
//                       {selectedDistributeur.compte.statut.toUpperCase()}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Input montant */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 💰 Montant du Crédit (FCFA)
//               </label>
//               <input
//                 type="number"
//                 placeholder="Minimum 5 000 FCFA"
//                 value={formData.montant}
//                 onChange={(e) =>
//                   setFormData({ ...formData, montant: e.target.value })
//                 }
//                 className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
//                 min="5000"
//                 step="1000"
//                 required
//               />
//               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                 Montant minimum: 5 000 FCFA
//                 {agentInfo && agentInfo.solde && ` • Votre solde: ${agentInfo.solde.toLocaleString()} FCFA`}
//               </p>
//             </div>

//             {/* Récapitulatif */}
//             {formData.montant && selectedDistributeur && (
//               <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg shadow-inner">
//                 <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
//                   📊 Récapitulatif du Crédit
//                 </h3>
//                 <div className="space-y-2 text-sm text-orange-800 dark:text-orange-200">
//                   <div className="flex justify-between">
//                     <span>Solde actuel:</span>
//                     <span>{selectedDistributeur.compte.solde.toLocaleString()} FCFA</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Montant à créditer:</span>
//                     <span>+ {parseFloat(formData.montant).toLocaleString()} FCFA</span>
//                   </div>
//                   <hr className="border-orange-300 dark:border-orange-600" />
//                   <div className="flex justify-between font-bold text-lg">
//                     <span>Nouveau solde:</span>
//                     <span className="text-green-600 dark:text-green-400">
//                       {(selectedDistributeur.compte.solde + parseFloat(formData.montant)).toLocaleString()} FCFA
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Avertissement si distributeur bloqué */}
//             {selectedDistributeur && selectedDistributeur.compte.statut === "bloque" && (
//               <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-700">
//                 <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
//                   <span className="text-lg">⚠️</span>
//                   <p className="font-medium">Ce distributeur est bloqué. Vous ne pouvez pas effectuer de crédit.</p>
//                 </div>
//               </div>
//             )}

//             {/* Bouton */}
//             <button
//               type="submit"
//               disabled={loading || (selectedDistributeur && selectedDistributeur.compte.statut === "bloque")}
//               className="w-full bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg shadow-lg transition font-semibold"
//             >
//               {loading ? "⏳ Traitement..." : "🏪 Créditer le Distributeur"}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Liste des distributeurs */}
//       <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-500 to-gray-600">
//           <h2 className="text-lg font-semibold text-white">Liste des Distributeurs</h2>
//         </div>
        
//         <div className="p-6">
//           {distributeurs.length === 0 ? (
//             <p className="text-gray-500 dark:text-gray-400 text-center py-4">
//               Aucun distributeur trouvé
//             </p>
//           ) : (
//             <div className="grid gap-4 md:grid-cols-2">
//               {distributeurs.map((distributeur) => (
//                 <div 
//                   key={distributeur._id}
//                   className={`p-4 rounded-lg border ${
//                     distributeur.compte.statut === 'actif' 
//                       ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
//                       : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
//                   }`}
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-semibold text-gray-900 dark:text-white">
//                         {distributeur.prenom} {distributeur.nom}
//                       </h3>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">
//                         {distributeur.compte.numeroCompte}
//                       </p>
//                       <p className={`text-lg font-bold ${
//                         distributeur.compte.statut === 'actif' 
//                           ? 'text-green-600 dark:text-green-400'
//                           : 'text-red-600 dark:text-red-400'
//                       }`}>
//                         {distributeur.compte.solde.toLocaleString()} FCFA
//                       </p>
//                     </div>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       distributeur.compte.statut === 'actif' 
//                         ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                         : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
//                     }`}>
//                       {distributeur.compte.statut.toUpperCase()}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Depot;

import { useState, useEffect } from "react";

const Depot = () => {
  const [distributeurs, setDistributeurs] = useState([]);
  const [agentInfo, setAgentInfo] = useState(null);
  const [formData, setFormData] = useState({
    numeroCompte: "",
    montant: "",
  });
  const [loading, setLoading] = useState(false);
  const [distributeurTrouve, setDistributeurTrouve] = useState(null);

  useEffect(() => {
    fetchDistributeurs();
    fetchAgentInfo();
  }, []);

  const fetchDistributeurs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "/api/agent/dashboard/users?role=distributeur&limit=100",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      setDistributeurs(data.users);
    } catch (error) {
      console.error("Erreur chargement distributeurs:", error);
    }
  };

  const fetchAgentInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/agent/info", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAgentInfo(data);
      }
    } catch (error) {
      console.error("Erreur chargement info agent:", error);
    }
  };

  // Rechercher le distributeur par numéro de compte
  const rechercherDistributeur = (numeroCompte) => {
    const distributeur = distributeurs.find(
      (dist) => dist.compte.numeroCompte === numeroCompte
    );
    setDistributeurTrouve(distributeur || null);
  };

  const handleDepot = async (e) => {
    e.preventDefault();
    
    if (!distributeurTrouve) {
      alert("❌ Veuillez saisir un numéro de compte distributeur valide");
      return;
    }

    const montant = parseFloat(formData.montant);
    if (!montant || montant < 5000) {
      alert("❌ Le montant minimum est de 5 000 FCFA");
      return;
    }

    if (agentInfo && agentInfo.solde && montant > agentInfo.solde) {
      alert(`❌ Montant insuffisant. Votre solde est de ${agentInfo.solde.toLocaleString()} FCFA`);
      return;
    }

    if (distributeurTrouve.compte.statut === "bloque") {
      alert("❌ Ce distributeur est bloqué. Impossible d'effectuer un dépôt.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/agent/distributeurs/credit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          distributeurId: distributeurTrouve._id,
          montant: montant
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(
          `✅ Dépôt réussi!\n\n💰 Nouveau solde distributeur: ${result.nouveauSolde.toLocaleString()} FCFA\n📌 Transaction ID: ${result.transactionId}`
        );
        setFormData({ numeroCompte: "", montant: "" });
        setDistributeurTrouve(null);
        fetchDistributeurs();
        fetchAgentInfo();
      } else {
        const error = await response.json();
        alert(`❌ Erreur: ${error.error}`);
      }
    } catch (error) {
      console.error("Erreur lors du dépôt:", error);
      alert("❌ Erreur lors du dépôt");
    } finally {
      setLoading(false);
    }
  };

  // Boutons de montant prédéfinis
  const montantsPredefinis = [10000, 20000, 50000, 100000, 200000, 500000];

  const selectionnerMontant = (montant) => {
    setFormData({ ...formData, montant: montant.toString() });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Titre */}
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        🏪 Créditer un Distributeur
      </h1>

      {/* Info Agent */}
      {agentInfo && (
        <div className="mb-6 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-blue-700 dark:text-blue-300">
                👨‍💼 Informations Agent
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                {agentInfo.prenom} {agentInfo.nom} - {agentInfo.matricule}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                Solde: {agentInfo.solde ? agentInfo.solde.toLocaleString() : '0'} FCFA
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Montant min: 5 000 FCFA
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Carte principale */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-500 to-amber-600">
          <h2 className="text-lg font-semibold text-white">Formulaire de Crédit</h2>
        </div>

        <div className="p-6">
          <form onSubmit={handleDepot} className="space-y-6">
            {/* Input numéro de compte distributeur */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🔢 Numéro de Compte Distributeur
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Saisir le numéro de compte"
                  value={formData.numeroCompte}
                  onChange={(e) => {
                    setFormData({ ...formData, numeroCompte: e.target.value });
                    if (e.target.value.length > 3) {
                      rechercherDistributeur(e.target.value);
                    } else {
                      setDistributeurTrouve(null);
                    }
                  }}
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => rechercherDistributeur(formData.numeroCompte)}
                  className="px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  🔍
                </button>
              </div>
            </div>

            {/* Affichage du distributeur trouvé */}
            {distributeurTrouve && (
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-700">
                <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                  ✅ Distributeur Trouvé
                </h3>
                <div className="space-y-1 text-sm text-green-800 dark:text-green-200">
                  <p><strong>Nom:</strong> {distributeurTrouve.prenom} {distributeurTrouve.nom}</p>
                  <p><strong>Compte:</strong> {distributeurTrouve.compte.numeroCompte}</p>
                  <p><strong>Solde actuel:</strong> {distributeurTrouve.compte.solde.toLocaleString()} FCFA</p>
                  <p><strong>Statut:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      distributeurTrouve.compte.statut === 'actif' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {distributeurTrouve.compte.statut.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {formData.numeroCompte && !distributeurTrouve && (
              <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-700">
                <p className="text-red-700 dark:text-red-300 font-medium">
                  ❌ Aucun distributeur trouvé avec ce numéro de compte
                </p>
              </div>
            )}

            {/* Input montant avec boutons prédéfinis */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                💰 Montant du Crédit (FCFA)
              </label>
              
              {/* Boutons de montant rapide */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                {montantsPredefinis.map((montant) => (
                  <button
                    key={montant}
                    type="button"
                    onClick={() => selectionnerMontant(montant)}
                    className={`p-2 rounded-lg border transition-colors ${
                      formData.montant === montant.toString()
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-orange-100 dark:hover:bg-orange-900/30'
                    }`}
                  >
                    {montant.toLocaleString()}
                  </button>
                ))}
              </div>

              <input
                type="number"
                placeholder="Ou saisir un montant personnalisé"
                value={formData.montant}
                onChange={(e) =>
                  setFormData({ ...formData, montant: e.target.value })
                }
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                min="5000"
                step="1000"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Montant minimum: 5 000 FCFA
                {agentInfo && agentInfo.solde && ` • Votre solde: ${agentInfo.solde.toLocaleString()} FCFA`}
              </p>
            </div>

            {/* Récapitulatif */}
            {formData.montant && distributeurTrouve && (
              <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg shadow-inner">
                <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                  📊 Récapitulatif du Crédit
                </h3>
                <div className="space-y-2 text-sm text-orange-800 dark:text-orange-200">
                  <div className="flex justify-between">
                    <span>Solde actuel:</span>
                    <span>{distributeurTrouve.compte.solde.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Montant à créditer:</span>
                    <span>+ {parseFloat(formData.montant).toLocaleString()} FCFA</span>
                  </div>
                  <hr className="border-orange-300 dark:border-orange-600" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Nouveau solde:</span>
                    <span className="text-green-600 dark:text-green-400">
                      {(distributeurTrouve.compte.solde + parseFloat(formData.montant)).toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Avertissement si distributeur bloqué */}
            {distributeurTrouve && distributeurTrouve.compte.statut === "bloque" && (
              <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-700">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                  <span className="text-lg">⚠️</span>
                  <p className="font-medium">Ce distributeur est bloqué. Vous ne pouvez pas effectuer de crédit.</p>
                </div>
              </div>
            )}

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={loading || !distributeurTrouve || (distributeurTrouve && distributeurTrouve.compte.statut === "bloque")}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg shadow-lg transition font-semibold"
            >
              {loading ? "⏳ Traitement..." : "🏪 Créditer le Distributeur"}
            </button>
          </form>
        </div>
      </div>

      {/* Liste des distributeurs disponibles */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-500 to-gray-600">
          <h2 className="text-lg font-semibold text-white">📋 Liste des Distributeurs Disponibles</h2>
        </div>
        
        <div className="p-6">
          {distributeurs.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              Aucun distributeur trouvé
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {distributeurs.map((distributeur) => (
                <div 
                  key={distributeur._id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    distributeur.compte.statut === 'actif' 
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30'
                      : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  }`}
                  onClick={() => {
                    setFormData({ ...formData, numeroCompte: distributeur.compte.numeroCompte });
                    setDistributeurTrouve(distributeur);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {distributeur.prenom} {distributeur.nom}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {distributeur.compte.numeroCompte}
                      </p>
                      <p className={`text-lg font-bold ${
                        distributeur.compte.statut === 'actif' 
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {distributeur.compte.solde.toLocaleString()} FCFA
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      distributeur.compte.statut === 'actif' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {distributeur.compte.statut.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Depot;