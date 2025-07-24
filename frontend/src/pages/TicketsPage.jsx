import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('unused');
  
  // Mock tickets data - in a real app, this would come from API
  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      const mockTickets = [
        { 
          id: '12345', 
          type: 'VIP 1', 
          status: 'unused', 
          platform: 'POPBRA',
          createdAt: '2025-07-22T14:30:00Z'
        },
        { 
          id: '12346', 
          type: 'BET 1000', 
          status: 'unused', 
          platform: 'POP888',
          createdAt: '2025-07-23T10:15:00Z'
        },
        { 
          id: '12347', 
          type: 'VIP 2', 
          status: 'used', 
          platform: 'POPBRA',
          createdAt: '2025-07-20T09:45:00Z',
          usedAt: '2025-07-21T16:20:00Z',
          prize: {
            name: 'Bônus de R$25',
            status: 'verified'
          }
        },
        { 
          id: '12348', 
          type: 'VIP 1', 
          status: 'used', 
          platform: 'POP678',
          createdAt: '2025-07-19T11:30:00Z',
          usedAt: '2025-07-19T18:10:00Z',
          prize: {
            name: 'Sem prêmio',
            status: 'verified'
          }
        }
      ];
      
      setTickets(mockTickets);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Filter tickets by status
  const filteredTickets = tickets.filter(ticket => {
    if (activeFilter === 'all') return true;
    return ticket.status === activeFilter;
  });
  
  // Format date helper
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-16 h-16 border-4 border-pop-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-300">Carregando seus tickets...</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Meus Tickets</h1>
        
        <Link to="/dashboard" className="btn-primary py-2">
          Obter Mais Tickets
        </Link>
      </div>
      
      {/* Filter tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeFilter === 'unused' 
              ? 'border-b-2 border-pop-green-500 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveFilter('unused')}
        >
          Não Usados
        </button>
        
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeFilter === 'used' 
              ? 'border-b-2 border-pop-green-500 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveFilter('used')}
        >
          Usados
        </button>
        
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeFilter === 'all' 
              ? 'border-b-2 border-pop-green-500 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveFilter('all')}
        >
          Todos
        </button>
      </div>
      
      {filteredTickets.length === 0 ? (
        <div className="card p-8 text-center">
          <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold mb-2">Nenhum ticket encontrado</h2>
          <p className="text-gray-400 mb-6">
            {activeFilter === 'unused' 
              ? 'Você não possui tickets não utilizados no momento.' 
              : activeFilter === 'used' 
                ? 'Você ainda não utilizou nenhum ticket.'
                : 'Você não possui nenhum ticket.'
            }
          </p>
          <Link to="/dashboard" className="btn-primary">
            Solicitar Tickets
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTickets.map(ticket => (
            <div 
              key={ticket.id}
              className={`card transition-transform duration-200 ${
                ticket.status === 'unused' ? 'hover:-translate-y-1 cursor-pointer' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold">Ticket #{ticket.id}</h3>
                  <p className="text-sm text-gray-400">Tipo: {ticket.type}</p>
                </div>
                
                <div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    ticket.status === 'unused' 
                      ? 'bg-pop-green-900 text-pop-green-100' 
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {ticket.status === 'unused' ? 'Não Usado' : 'Usado'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2" 
                  style={{
                    backgroundColor: 
                      ticket.platform === 'POPBRA' ? '#3b82f6' : 
                      ticket.platform === 'POP888' ? '#8b5cf6' : 
                      '#10b981'
                  }}
                >
                  <span className="text-xs font-bold">P</span>
                </div>
                <span className="text-sm">Plataforma: {ticket.platform}</span>
              </div>
              
              <div className="mb-4">
                <p className="text-xs text-gray-400">
                  Obtido em: {formatDate(ticket.createdAt)}
                </p>
                
                {ticket.status === 'used' && (
                  <>
                    <p className="text-xs text-gray-400 mt-1">
                      Usado em: {formatDate(ticket.usedAt)}
                    </p>
                    <div className="mt-2 p-2 bg-pop-dark-900 rounded">
                      <p className="text-sm font-medium">Resultado: {ticket.prize.name}</p>
                      <p className="text-xs text-gray-400">
                        Status: {
                          ticket.prize.status === 'verified' ? 'Verificado' :
                          ticket.prize.status === 'pending' ? 'Pendente' :
                          'Entregue'
                        }
                      </p>
                    </div>
                  </>
                )}
              </div>
              
              {ticket.status === 'unused' ? (
                <Link to={`/scratch/${ticket.id}`} className="btn-primary w-full py-2">
                  Jogar Agora
                </Link>
              ) : (
                <button className="btn-secondary w-full py-2 opacity-75 cursor-not-allowed" disabled>
                  Já Utilizado
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TicketsPage;