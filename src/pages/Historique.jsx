
// import React, { useState, useEffect } from 'react';

// const Historique = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [filters, setFilters] = useState({
//     type: '',
//     dateDebut: '',
//     dateFin: ''
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchTransactions();
//   }, [currentPage, filters]);

//   const fetchTransactions = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const queryParams = new URLSearchParams({
//         page: currentPage,
//         limit: '10',
//         ...filters
//       }).toString();

//       const response = await fetch(`/api/agent/transactions/historique?${queryParams}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       setTransactions(data.transactions);
//       setTotalPages(data.totalPages);
//     } catch (error) {
//       console.error('Erreur chargement historique:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//     setCurrentPage(1);
//   };

//   const exportHistorique = () => {
//     // Simuler l'export CSV
//     const headers = ['ID', 'Type', 'Montant', 'Frais', 'Commission', 'Statut', 'Date', 'Description'];
//     const csvData = transactions.map(t => [
//       t._id,
//       t.type,
//       t.montant,
//       t.frais,
//       t.commission,
//       t.statut,
//       new Date(t.dateTransaction).toLocaleString(),
//       t.description
//     ].join(','));

//     const csv = [headers.join(','), ...csvData].join('\n');
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `historique-transactions-${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Historique des Transactions</h1>
//         <button
//           onClick={exportHistorique}
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
//         >
//           📊 Exporter CSV
//         </button>
//       </div>

//       {/* Filtres */}
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Type
//             </label>
//             <select
//               value={filters.type}
//               onChange={(e) => handleFilterChange('type', e.target.value)}
//               className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//             >
//               <option value="">Tous les types</option>
//               <option value="depot">Dépôt</option>
//               <option value="retrait">Retrait</option>
//               <option value="transfert">Transfert</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Date Début
//             </label>
//             <input
//               type="date"
//               value={filters.dateDebut}
//               onChange={(e) => handleFilterChange('dateDebut', e.target.value)}
//               className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Date Fin
//             </label>
//             <input
//               type="date"
//               value={filters.dateFin}
//               onChange={(e) => handleFilterChange('dateFin', e.target.value)}
//               className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//             />
//           </div>
//           <div className="flex items-end">
//             <button
//               onClick={() => setFilters({ type: '', dateDebut: '', dateFin: '' })}
//               className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
//             >
//               Réinitialiser
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Tableau */}
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Type
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Montant
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Frais
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Commission
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Compte Source
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Compte Dest.
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Statut
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Description
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//               {transactions.map((transaction) => (
//                 <tr key={transaction._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                     {new Date(transaction.dateTransaction).toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       transaction.type === 'depot'
//                         ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                         : transaction.type === 'retrait'
//                         ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
//                         : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
//                     }`}>
//                       {transaction.type}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
//                     {transaction.montant.toLocaleString()} FCFA
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                     {transaction.frais.toLocaleString()} FCFA
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                     {transaction.commission.toLocaleString()} FCFA
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                     {transaction.compteSource?.compte.numeroCompte || 'N/A'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                     {transaction.compteDestinataire?.compte.numeroCompte || 'N/A'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       transaction.statut === 'complete'
//                         ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
//                         : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
//                     }`}>
//                       {transaction.statut}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
//                     {transaction.description}
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

//       {loading && (
//         <div className="text-center py-4">
//           <p className="text-gray-600 dark:text-gray-400">Chargement de l'historique...</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Historique;

import React, { useState, useEffect } from 'react';

const Historique = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    dateDebut: '',
    dateFin: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, filters]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: '10',
        ...filters
      }).toString();

      const response = await fetch(`https://backend-tp-km23.onrender.com/api/agent/transactions/historique?${queryParams}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setTransactions(data.transactions);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Erreur chargement historique:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const exportHistorique = () => {
    const headers = ['ID', 'Type', 'Montant', 'Frais', 'Commission', 'Statut', 'Date', 'Description'];
    const csvData = transactions.map(t => [
      t._id,
      t.type,
      t.montant,
      t.frais,
      t.commission,
      t.statut,
      new Date(t.dateTransaction).toLocaleString(),
      t.description
    ].join(','));

    const csv = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historique-transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div>
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Historique des Transactions</h1>
        <button
          onClick={exportHistorique}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm transition-colors whitespace-nowrap"
        >
          📊 Exporter CSV
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full p-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Tous les types</option>
              <option value="depot">Dépôt</option>
              <option value="retrait">Retrait</option>
              <option value="transfert">Transfert</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date Début
            </label>
            <input
              type="date"
              value={filters.dateDebut}
              onChange={(e) => handleFilterChange('dateDebut', e.target.value)}
              className="w-full p-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date Fin
            </label>
            <input
              type="date"
              value={filters.dateFin}
              onChange={(e) => handleFilterChange('dateFin', e.target.value)}
              className="w-full p-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({ type: '', dateDebut: '', dateFin: '' })}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-1.5 px-3 rounded text-sm transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Frais
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Commission
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Compte Source
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Compte Dest.
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900 dark:text-white">
                    {new Date(transaction.dateTransaction).toLocaleString()}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      transaction.type === 'depot'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : transaction.type === 'retrait'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs font-semibold text-gray-900 dark:text-white">
                    {transaction.montant.toLocaleString()} FCFA
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900 dark:text-white">
                    {transaction.frais.toLocaleString()} FCFA
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900 dark:text-white">
                    {transaction.commission.toLocaleString()} FCFA
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900 dark:text-white">
                    {transaction.compteSource?.compte.numeroCompte || 'N/A'}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900 dark:text-white">
                    {transaction.compteDestinataire?.compte.numeroCompte || 'N/A'}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      transaction.statut === 'complete'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {transaction.statut}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-900 dark:text-white max-w-xs truncate">
                    {transaction.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
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

      {loading && (
        <div className="text-center py-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">Chargement de l'historique...</p>
        </div>
      )}

      {!loading && transactions.length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-500 dark:text-gray-400">Aucune transaction trouvée</p>
        </div>
      )}
    </div>
  );
};


export default Historique;
