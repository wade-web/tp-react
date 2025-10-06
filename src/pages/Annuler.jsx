// import React, { useState, useEffect } from 'react';

// export default function AnnulerPage() {
//   const [compte, setCompte] = useState('');
//   const [txId, setTxId] = useState('');
//   const [users, setUsers] = useState([]);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const saved = localStorage.getItem('users');
//     if (saved) setUsers(JSON.parse(saved));
//   }, []);

//   const handleAnnuler = () => {
//     const u = [...users];
//     const idx = u.findIndex(user => user.numeroCompte === compte);
//     if (idx === -1) {
//       setMessage('Compte non trouvé.');
//       return;
//     }
//     const user = u[idx];
//     if (!user.transactions || user.transactions.length === 0) {
//       setMessage('Aucune transaction à annuler.');
//       return;
//     }
//     const txIndex = user.transactions.findIndex(tx => String(tx.id) === txId);
//     if (txIndex === -1) {
//       setMessage('Transaction non trouvée.');
//       return;
//     }
//     const tx = user.transactions[txIndex];
//     if (tx.statut === 'annulé') {
//       setMessage('Transaction déjà annulée.');
//       return;
//     }
//     // procéder à l’annulation
//     // débiter le montant
//     user.solde = (user.solde || 0) - tx.montant;
//     // marquer le statut
//     user.transactions[txIndex].statut = 'annulé';

//     setUsers(u);
//     localStorage.setItem('users', JSON.stringify(u));
//     setMessage('Transaction annulée avec succès.');
//     setCompte('');
//     setTxId('');
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Annuler une transaction</h1>
//       <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
//         <div>
//           <label className="block mb-1">Numéro de compte</label>
//           <input
//             type="text"
//             value={compte}
//             onChange={e => setCompte(e.target.value)}
//             className="w-full border p-2 rounded"
//             placeholder="MBK-XXXXXXX"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">ID Transaction</label>
//           <input
//             type="text"
//             value={txId}
//             onChange={e => setTxId(e.target.value)}
//             className="w-full border p-2 rounded"
//             placeholder="ID de la transaction"
//           />
//         </div>
//         <button onClick={handleAnnuler} className="px-4 py-2 bg-red-600 text-white rounded">
//           Annuler
//         </button>
//         {message && <p className="mt-4 text-sm text-blue-700">{message}</p>}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';

const Annuler = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecentTransactions();
  }, []);

  const fetchRecentTransactions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/agent/transactions/historique?limit=20', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Erreur chargement transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const annulerTransaction = async (transactionId) => {
    if (!confirm('Êtes-vous sûr de vouloir annuler cette transaction ?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/agent/transactions/annuler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ transactionId })
      });

      if (response.ok) {
        alert('Transaction annulée avec succès!');
        fetchRecentTransactions();
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.error}`);
      }
    } catch (error) {
      alert('Erreur lors de l\'annulation');
    }
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction._id.includes(searchTerm) ||
    transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.compteSource?.compte.numeroCompte.includes(searchTerm) ||
    transaction.compteDestinataire?.compte.numeroCompte.includes(searchTerm)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Annuler une Transaction</h1>
      
      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Rechercher une transaction..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
        </div>
      </div>

      {/* Tableau des transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  ID Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Compte Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Compte Dest.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTransactions.map((transaction) => {
                const transactionDate = new Date(transaction.dateTransaction);
                const now = new Date();
                const diffHours = (now - transactionDate) / (1000 * 60 * 60);
                const canCancel = diffHours <= 24 && transaction.statut === 'complete';

                return (
                  <tr key={transaction._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">
                      {transaction._id.toString().substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === 'depot'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : transaction.type === 'retrait'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {transaction.montant.toLocaleString()} FCFA
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {transaction.compteSource?.compte.numeroCompte || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {transaction.compteDestinataire?.compte.numeroCompte || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {transactionDate.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.statut === 'complete'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {transaction.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {canCancel ? (
                        <button
                          onClick={() => annulerTransaction(transaction._id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Annuler
                        </button>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">
                          {diffHours > 24 ? '> 24h' : 'Déjà annulée'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {loading && (
        <div className="text-center py-4">
          <p className="text-gray-600 dark:text-gray-400">Chargement des transactions...</p>
        </div>
      )}
    </div>
  );
};

export default Annuler;