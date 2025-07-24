import React, { useState, useEffect } from 'react';

function ProfilePage() {
  // Mock user data - in a real app, this would come from API
  const [userData, setUserData] = useState({
    telegramId: '12345678',
    username: '@joaopedro',
    firstName: 'João',
    lastName: 'Pedro',
    photoUrl: null,
    joinDate: '2025-07-15T10:30:00Z',
    gameIds: {
      POPBRA: '123456',
      POP888: '789012',
      POP678: ''
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  
  // Form state
  const [gameIdPOPBRA, setGameIdPOPBRA] = useState('');
  const [gameIdPOP888, setGameIdPOP888] = useState('');
  const [gameIdPOP678, setGameIdPOP678] = useState('');
  
  // Load user data
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setGameIdPOPBRA(userData.gameIds.POPBRA || '');
      setGameIdPOP888(userData.gameIds.POP888 || '');
      setGameIdPOP678(userData.gameIds.POP678 || '');
      setLoading(false);
    }, 1000);
  }, [userData.gameIds]);
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    
    // Validate input (simple numeric check)
    if (gameIdPOPBRA && !/^\d+$/.test(gameIdPOPBRA)) {
      setMessage({ type: 'error', text: 'Game ID POPBRA deve conter apenas números' });
      setSaving(false);
      return;
    }
    
    if (gameIdPOP888 && !/^\d+$/.test(gameIdPOP888)) {
      setMessage({ type: 'error', text: 'Game ID POP888 deve conter apenas números' });
      setSaving(false);
      return;
    }
    
    if (gameIdPOP678 && !/^\d+$/.test(gameIdPOP678)) {
      setMessage({ type: 'error', text: 'Game ID POP678 deve conter apenas números' });
      setSaving(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      // Update local state with new values
      setUserData(prev => ({
        ...prev,
        gameIds: {
          POPBRA: gameIdPOPBRA,
          POP888: gameIdPOP888,
          POP678: gameIdPOP678
        }
      }));
      
      setMessage({ type: 'success', text: 'Game IDs atualizados com sucesso!' });
      setSaving(false);
      
      // Hide message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }, 1500);
  };
  
  // Format date helper
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-16 h-16 border-4 border-pop-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-300">Carregando perfil...</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Meu Perfil</h1>
      
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          <div className="w-24 h-24 rounded-full bg-pop-green-600 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
            {userData.photoUrl ? (
              <img 
                src={userData.photoUrl} 
                alt={userData.firstName} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-4xl font-bold">
                {userData.firstName ? userData.firstName.charAt(0) : userData.username.charAt(1).toUpperCase()}
              </span>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-center sm:text-left">
              {userData.firstName && userData.lastName 
                ? `${userData.firstName} ${userData.lastName}` 
                : userData.username
              }
            </h2>
            
            <p className="text-gray-400 text-center sm:text-left">
              {userData.username}
            </p>
            
            <div className="mt-2 text-center sm:text-left">
              <span className="inline-block px-3 py-1 bg-pop-dark-900 rounded-full text-sm">
                Telegram ID: {userData.telegramId}
              </span>
            </div>
            
            <p className="text-sm text-gray-400 mt-3 text-center sm:text-left">
              Membro desde {formatDate(userData.joinDate)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Game IDs</h2>
        
        {message && (
          <div className={`p-3 rounded-lg mb-4 ${
            message.type === 'success' ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'
          }`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="gameIdPOPBRA">
                Game ID POPBRA
              </label>
              <input 
                type="text"
                id="gameIdPOPBRA"
                className="input-field"
                value={gameIdPOPBRA}
                onChange={(e) => setGameIdPOPBRA(e.target.value)}
                placeholder="Seu Game ID na plataforma POPBRA"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="gameIdPOP888">
                Game ID POP888
              </label>
              <input 
                type="text"
                id="gameIdPOP888"
                className="input-field"
                value={gameIdPOP888}
                onChange={(e) => setGameIdPOP888(e.target.value)}
                placeholder="Seu Game ID na plataforma POP888"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="gameIdPOP678">
                Game ID POP678
              </label>
              <input 
                type="text"
                id="gameIdPOP678"
                className="input-field"
                value={gameIdPOP678}
                onChange={(e) => setGameIdPOP678(e.target.value)}
                placeholder="Seu Game ID na plataforma POP678"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={saving}
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Salvando...
                </>
              ) : (
                'Salvar Alterações'
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Conta Telegram</h2>
        
        <p className="text-gray-300 mb-4">
          Sua conta está conectada via Telegram. Você pode desconectar a qualquer momento.
        </p>
        
        <button className="btn-secondary text-red-500 w-full">
          Desconectar Conta
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;