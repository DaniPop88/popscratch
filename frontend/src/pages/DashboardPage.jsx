import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TicketIcon from '../components/icons/TicketIcon';
import PrizeIcon from '../components/icons/PrizeIcon';

function DashboardPage() {
  // Mock user data
  const user = {
    telegramId: '12345678',
    username: '@joaopedro',
    gameIds: {
      POPBRA: '123456',
      POP888: '789012',
      POP678: ''
    },
    tickets: 3,
    pendingRequests: 1
  };

  // Mock recent request history
  const recentRequests = [
    { id: 1, platform: 'POPBRA', gameId: '123456', type: 'VIP 1', status: 'approved', date: '2025-07-23', tickets: 2 },
    { id: 2, platform: 'POP888', gameId: '789012', type: 'BET 1000', status: 'pending', date: '2025-07-24', tickets: 1 }
  ];

  // Form state for ticket request
  const [platform, setPlatform] = useState('POPBRA');
  const [claimType, setClaimType] = useState('VIP1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState(null);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage(null);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormMessage({
        type: 'success',
        text: 'Solicitação enviada com sucesso! Em breve nossa equipe irá verificar.'
      });
      
      // Reset form or redirect
      // setPlatform('POPBRA');
      // setClaimType('VIP1');
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - User Info & Quick Stats */}
        <div className="md:col-span-1">
          <div className="card mb-6">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-pop-green-600 flex items-center justify-center mr-3">
                <span className="text-2xl font-bold">{user.username.charAt(1).toUpperCase()}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">{user.username}</h2>
                <p className="text-gray-400 text-sm">ID: {user.telegramId}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-4 mt-4">
              <h3 className="text-lg font-semibold mb-3">Seus IDs de Jogo</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">POPBRA:</span>
                  <span className="font-mono bg-pop-dark-900 px-3 py-1 rounded">
                    {user.gameIds.POPBRA || 'Não configurado'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">POP888:</span>
                  <span className="font-mono bg-pop-dark-900 px-3 py-1 rounded">
                    {user.gameIds.POP888 || 'Não configurado'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">POP678:</span>
                  <span className="font-mono bg-pop-dark-900 px-3 py-1 rounded">
                    {user.gameIds.POP678 || 'Não configurado'}
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <Link to="/profile" className="text-pop-green-500 text-sm hover:underline">
                  Atualizar IDs de Jogo →
                </Link>
              </div>
            </div>
          </div>
          
          <div className="card mb-6">
            <h3 className="text-lg font-semibold mb-3">Status da Conta</h3>
            
            <div className="flex justify-between items-center p-3 bg-pop-dark-900 rounded-lg mb-3">
              <div className="flex items-center">
                <TicketIcon className="w-6 h-6 text-pop-green-500 mr-2" />
                <span>Tickets Disponíveis</span>
              </div>
              <span className="font-bold text-xl">{user.tickets}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-pop-dark-900 rounded-lg">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Solicitações Pendentes</span>
              </div>
              <span className="font-bold text-xl">{user.pendingRequests}</span>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Link to="/tickets" className="btn-primary py-2 w-full flex items-center justify-center">
                <TicketIcon className="w-5 h-5 mr-2" />
                Ver Meus Tickets
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right Column - Request Form & History */}
        <div className="md:col-span-2">
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">Solicitar Tickets</h2>
            
            {formMessage && (
              <div className={`p-3 rounded-lg mb-4 ${
                formMessage.type === 'success' ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'
              }`}>
                {formMessage.text}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Plataforma</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    className={`p-3 rounded-lg border-2 flex items-center justify-center ${
                      platform === 'POPBRA' 
                        ? 'border-pop-green-500 bg-pop-dark-800' 
                        : 'border-gray-700 bg-pop-dark-900 hover:border-gray-500'
                    }`}
                    onClick={() => setPlatform('POPBRA')}
                  >
                    POPBRA
                  </button>
                  
                  <button
                    type="button"
                    className={`p-3 rounded-lg border-2 flex items-center justify-center ${
                      platform === 'POP888' 
                        ? 'border-pop-green-500 bg-pop-dark-800' 
                        : 'border-gray-700 bg-pop-dark-900 hover:border-gray-500'
                    }`}
                    onClick={() => setPlatform('POP888')}
                  >
                    POP888
                  </button>
                  
                  <button
                    type="button"
                    className={`p-3 rounded-lg border-2 flex items-center justify-center ${
                      platform === 'POP678' 
                        ? 'border-pop-green-500 bg-pop-dark-800' 
                        : 'border-gray-700 bg-pop-dark-900 hover:border-gray-500'
                    }`}
                    onClick={() => setPlatform('POP678')}
                  >
                    POP678
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Critério para Ganhar Tickets</label>
                <div className="space-y-3">
                  <button
                    type="button"
                    className={`p-3 rounded-lg border-2 w-full flex items-center ${
                      claimType === 'VIP1' 
                        ? 'border-pop-green-500 bg-pop-dark-800' 
                        : 'border-gray-700 bg-pop-dark-900 hover:border-gray-500'
                    }`}
                    onClick={() => setClaimType('VIP1')}
                  >
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center mr-3">
                      <span className="text-sm font-bold">VIP1</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">Atingiu VIP 1</p>
                      <p className="text-sm text-gray-400">Receba 2 tickets</p>
                    </div>
                    <div className="ml-2">
                      <span className="bg-pop-green-600 text-white text-xs py-1 px-2 rounded-full">2 Tickets</span>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    className={`p-3 rounded-lg border-2 w-full flex items-center ${
                      claimType === 'VIP2' 
                        ? 'border-pop-green-500 bg-pop-dark-800' 
                        : 'border-gray-700 bg-pop-dark-900 hover:border-gray-500'
                    }`}
                    onClick={() => setClaimType('VIP2')}
                  >
                    <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center mr-3">
                      <span className="text-sm font-bold">VIP2</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">Atingiu VIP 2</p>
                      <p className="text-sm text-gray-400">Receba 5 tickets</p>
                    </div>
                    <div className="ml-2">
                      <span className="bg-pop-green-600 text-white text-xs py-1 px-2 rounded-full">5 Tickets</span>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    className={`p-3 rounded-lg border-2 w-full flex items-center ${
                      claimType === 'BET1000' 
                        ? 'border-pop-green-500 bg-pop-dark-800' 
                        : 'border-gray-700 bg-pop-dark-900 hover:border-gray-500'
                    }`}
                    onClick={() => setClaimType('BET1000')}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                      <span className="text-sm font-bold">R$</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">Apostou mais de R$1.000</p>
                      <p className="text-sm text-gray-400">Receba 1 ticket</p>
                    </div>
                    <div className="ml-2">
                      <span className="bg-pop-green-600 text-white text-xs py-1 px-2 rounded-full">1 Ticket</span>
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">
                  Game ID selecionado: <span className="font-mono">{user.gameIds[platform] || 'Não configurado'}</span>
                </p>
                {!user.gameIds[platform] && (
                  <p className="text-sm text-yellow-500">
                    Por favor, configure seu Game ID na <Link to="/profile" className="underline">página de perfil</Link> primeiro!
                  </p>
                )}
              </div>
              
              <div>
                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={isSubmitting || !user.gameIds[platform]}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processando...
                    </>
                  ) : (
                    'Solicitar Tickets'
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Últimas Solicitações</h2>
              <Link to="/history" className="text-pop-green-500 text-sm hover:underline">
                Ver Todas →
              </Link>
            </div>
            
            {recentRequests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-2 text-left text-gray-400">Data</th>
                      <th className="px-4 py-2 text-left text-gray-400">Plataforma</th>
                      <th className="px-4 py-2 text-left text-gray-400">Tipo</th>
                      <th className="px-4 py-2 text-left text-gray-400">Tickets</th>
                      <th className="px-4 py-2 text-left text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRequests.map(request => (
                      <tr key={request.id} className="border-b border-gray-800">
                        <td className="px-4 py-3">{request.date}</td>
                        <td className="px-4 py-3">{request.platform}</td>
                        <td className="px-4 py-3">{request.type}</td>
                        <td className="px-4 py-3">{request.tickets}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                            request.status === 'approved' 
                              ? 'bg-green-900 text-green-100' 
                              : request.status === 'pending'
                                ? 'bg-yellow-900 text-yellow-100'
                                : 'bg-red-900 text-red-100'
                          }`}>
                            {request.status === 'approved' 
                              ? 'Aprovado' 
                              : request.status === 'pending'
                                ? 'Pendente'
                                : 'Rejeitado'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400">
                <p>Nenhuma solicitação encontrada</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;