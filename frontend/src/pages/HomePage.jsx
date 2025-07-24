import React from 'react';
import { Link } from 'react-router-dom';

// Import required components and assets
import LiveWinners from '../components/LiveWinners';
import GameCard from '../components/GameCard';

function HomePage() {
  // Mock game data (will come from API later)
  const games = [
    {
      id: 1, 
      name: 'Centavo da Sorte',
      price: 'Grátis (VIP 1)',
      maxPrize: 'R$1.000,00',
      image: '/assets/images/scratch-1.jpg'
    },
    {
      id: 2, 
      name: 'Sorte Instantânea',
      price: 'Grátis (VIP 2)',
      maxPrize: 'R$2.500,00',
      image: '/assets/images/scratch-2.jpg'
    },
    {
      id: 3, 
      name: 'Raspadinha Suprema',
      price: 'Grátis (Bet R$1.000)',
      maxPrize: 'R$5.000,00',
      image: '/assets/images/scratch-3.jpg'
    },
    {
      id: 4, 
      name: 'Raspa Relâmpago',
      price: 'Grátis (Bet R$5.000)',
      maxPrize: 'R$15.000,00',
      image: '/assets/images/scratch-4.jpg'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-8">
        <div className="bg-gradient-to-r from-pop-dark-800 to-pop-dark-900 rounded-2xl p-6 md:p-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Raspadinha <span className="text-pop-green-500">Digital</span>
          </h1>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Ache 3 símbolos iguais e ganhe na hora! Troque suas conquistas VIP por tickets gratuitos.
          </p>
          <Link to="/login" className="btn-primary text-lg inline-block">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Começar a Jogar
          </Link>
        </div>
      </section>

      {/* Live Winners Ticker */}
      <section className="my-6">
        <div className="bg-pop-dark-800 rounded-xl p-4">
          <h2 className="text-pop-green-500 text-lg font-bold mb-3 flex items-center">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            Ganhadores ao Vivo
          </h2>
          
          {/* Este componente seria um ticker de ganhadores recentes */}
          <LiveWinners />
        </div>
      </section>

      {/* Games Grid */}
      <section className="my-8">
        <h2 className="section-title">Escolha sua Raspadinha</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {games.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="my-12">
        <h2 className="section-title">Como Funciona</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="bg-pop-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Login via Telegram</h3>
            <p className="text-gray-300">Faça login com sua conta do Telegram de forma rápida e segura.</p>
          </div>
          
          <div className="card text-center">
            <div className="bg-pop-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Solicite seus Tickets</h3>
            <p className="text-gray-300">Ganhe tickets grátis ao atingir VIP ou bater metas de apostas.</p>
          </div>
          
          <div className="card text-center">
            <div className="bg-pop-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Raspe e Ganhe</h3>
            <p className="text-gray-300">Use seus tickets para jogar e ganhe prêmios incríveis na hora!</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="my-10">
        <div className="bg-gradient-to-r from-pop-green-700 to-pop-green-500 rounded-2xl p-6 md:p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Pronto para Ganhar?
          </h2>
          <p className="text-white text-lg mb-6 max-w-2xl mx-auto">
            Faça login agora e comece a colecionar seus tickets gratuitos!
          </p>
          <Link to="/login" className="btn-secondary text-lg inline-block">
            Login via Telegram
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;