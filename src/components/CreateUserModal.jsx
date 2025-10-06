import React, { useState, useEffect } from 'react';

const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
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
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Réinitialiser le formulaire quand le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      setFormData({
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
      setErrors({});
      setSubmitError('');
    }
  }, [isOpen]);

  // Validations individuelles
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'nom':
      case 'prenom':
        if (!value.trim()) {
          newErrors[name] = 'Ce champ est obligatoire';
        } else if (value.trim().length < 2) {
          newErrors[name] = 'Doit contenir au moins 2 caractères';
        } else if (value.trim().length > 50) {
          newErrors[name] = 'Ne peut pas dépasser 50 caractères';
        } else if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(value)) {
          newErrors[name] = 'Caractères non autorisés';
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email obligatoire';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Format email invalide';
        } else if (value.length > 100) {
          newErrors.email = 'Email trop long';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'telephone':
        if (!value.trim()) {
          newErrors.telephone = 'Téléphone obligatoire';
        } else if (!/^\+221[567][0-9]{7}$/.test(value)) {
          newErrors.telephone = 'Format: +2217XXXXXXX, +2216XXXXXXX ou +2215XXXXXXX';
        } else {
          delete newErrors.telephone;
        }
        break;
        
      case 'dateNaissance':
        if (!value) {
          newErrors.dateNaissance = 'Date de naissance obligatoire';
        } else {
          const birthDate = new Date(value);
          const today = new Date();
          const minAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
          if (birthDate > minAge) {
            newErrors.dateNaissance = 'Doit avoir au moins 18 ans';
          } else if (birthDate < new Date('1900-01-01')) {
            newErrors.dateNaissance = 'Date invalide';
          } else {
            delete newErrors.dateNaissance;
          }
        }
        break;
        
      case 'adresse':
        if (!value.trim()) {
          newErrors.adresse = 'Adresse obligatoire';
        } else if (value.trim().length < 10) {
          newErrors.adresse = 'Doit contenir au moins 10 caractères';
        } else if (value.trim().length > 200) {
          newErrors.adresse = 'Ne peut pas dépasser 200 caractères';
        } else {
          delete newErrors.adresse;
        }
        break;
        
      case 'numPieceIdentite':
        if (!value.trim()) {
          newErrors.numPieceIdentite = 'Numéro de pièce obligatoire';
        } else if (!/^[A-Z0-9]{8,15}$/.test(value.toUpperCase())) {
          newErrors.numPieceIdentite = '8-15 caractères alphanumériques';
        } else {
          delete newErrors.numPieceIdentite;
        }
        break;
        
      case 'matricule':
        if (formData.role === 'agent' && !value.trim()) {
          newErrors.matricule = 'Matricule obligatoire pour agent';
        } else if (value && !/^[A-Z0-9]{6,10}$/.test(value.toUpperCase())) {
          newErrors.matricule = '6-10 caractères alphanumériques';
        } else {
          delete newErrors.matricule;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'telephone' ? value : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Validation en temps réel
    validateField(name, newValue);
    setSubmitError('');
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setFormData(prev => ({
      ...prev,
      role,
      matricule: role !== 'agent' ? '' : prev.matricule,
      agence: role !== 'agent' ? '' : prev.agence
    }));
    
    // Re-valider les champs conditionnels
    if (role === 'agent') {
      validateField('matricule', formData.matricule);
      validateField('agence', formData.agence);
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.matricule;
        delete newErrors.agence;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validation de tous les champs
    Object.keys(formData).forEach(key => {
      if (key !== 'matricule' && key !== 'agence') {
        validateField(key, formData[key]);
      }
    });
    
    // Validation conditionnelle pour les agents
    if (formData.role === 'agent') {
      if (!formData.matricule.trim()) {
        newErrors.matricule = 'Matricule obligatoire pour agent';
      }
      if (!formData.agence) {
        newErrors.agence = 'Agence obligatoire pour agent';
      }
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys({ ...errors, ...newErrors }).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) {
      setSubmitError('Veuillez corriger les erreurs dans le formulaire');
      return;
    }
    
    setLoading(true);
    
    try {
      await onCreate(formData);
      onClose();
    } catch (error) {
      console.error('Erreur création:', error);
      setSubmitError(error.message || 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        {/* En-tête */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Créer un Utilisateur
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Remplissez les informations de l'utilisateur
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
              <p className="text-red-800 dark:text-red-400 text-sm">{submitError}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prénom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.prenom 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
                placeholder="Entrez le prénom"
              />
              {errors.prenom && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <span className="mr-1">⚠</span> {errors.prenom}
                </p>
              )}
            </div>

            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom *
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.nom 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
                placeholder="Entrez le nom"
              />
              {errors.nom && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <span className="mr-1">⚠</span> {errors.nom}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.email 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
                placeholder="exemple@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <span className="mr-1">⚠</span> {errors.email}
                </p>
              )}
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Téléphone *
              </label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.telephone 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
                placeholder="+221701234567"
              />
              {errors.telephone && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <span className="mr-1">⚠</span> {errors.telephone}
                </p>
              )}
            </div>

            {/* Date de naissance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date de naissance *
              </label>
              <input
                type="date"
                name="dateNaissance"
                value={formData.dateNaissance}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.dateNaissance 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              />
              {errors.dateNaissance && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <span className="mr-1">⚠</span> {errors.dateNaissance}
                </p>
              )}
            </div>

            {/* Rôle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rôle *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleRoleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="client">Client</option>
                <option value="distributeur">Distributeur</option>
                <option value="agent">Agent</option>
              </select>
            </div>

            {/* Matricule (conditionnel) */}
            {formData.role === 'agent' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Matricule *
                </label>
                <input
                  type="text"
                  name="matricule"
                  value={formData.matricule}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.matricule 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="AGENT001"
                  style={{ textTransform: 'uppercase' }}
                />
                {errors.matricule && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <span className="mr-1">⚠</span> {errors.matricule}
                  </p>
                )}
              </div>
            )}

            {/* Agence (conditionnelle) */}
            {formData.role === 'agent' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Agence *
                </label>
                <select
                  name="agence"
                  value={formData.agence}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.agence 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
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
                {errors.agence && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <span className="mr-1">⚠</span> {errors.agence}
                  </p>
                )}
              </div>
            )}

            {/* Adresse */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Adresse *
              </label>
              <textarea
                name="adresse"
                value={formData.adresse}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.adresse 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
                placeholder="Entrez l'adresse complète"
              />
              {errors.adresse && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <span className="mr-1">⚠</span> {errors.adresse}
                </p>
              )}
            </div>

            {/* Numéro pièce identité */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Numéro de pièce d'identité *
              </label>
              <input
                type="text"
                name="numPieceIdentite"
                value={formData.numPieceIdentite}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.numPieceIdentite 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
                placeholder="AB123456"
                style={{ textTransform: 'uppercase' }}
              />
              {errors.numPieceIdentite && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <span className="mr-1">⚠</span> {errors.numPieceIdentite}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading || Object.keys(errors).length > 0}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors font-medium shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Création...
                </span>
              ) : (
                'Créer l\'utilisateur'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;