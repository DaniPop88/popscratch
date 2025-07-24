import React from 'react';
import { Link } from 'react-router-dom';

function GameCard({ game, platform }) {
  const isAuthenticated = false; // Replace with actual auth logic
  const platformLogo = `/assets/images/logos/${platform.toLowerCase()}.png`;

  return (
    <div className="bg-pop-dark-800 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-pop-green-500 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={game.image || 'https://via.placeholder.com/300x200/1e293b/22c55e?text=Raspadinha'} 
          alt={game.name}
          className="w-full h-48 object-cover"
        />

        <div className="absolute top-3 right-3 bg-pop-dark-900 bg-opacity-80 text-white text-sm py-1 px-3 rounded-full">
          {game.price}
        </div>

        {/* Platform logo */}
        <div className="absolute bottom-3 right-3">
          <img src={platformLogo} alt={platform} className="h-6 w-6" />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{game.name}</h3>

        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-sm text-gray-400">Prêmio Máximo</p>
            <p className="text-pop-green-500 font-bold">{game.maxPrize}</p>
          </div>

          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <svg 
                key={star} 
                className={`w-4 h-4 ${star <= 3 ? 'text-yellow-500' : 'text-gray-600'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        {isAuthenticated ? (
          <Link 
            to={`/dashboard?game=${game.id}`} 
            className="btn-primary w-full py-2"
          >
            Obter Ticket
          </Link>
        ) : (
          <Link 
            to="/login" 
            className="btn-primary w-full py-2"
          >
            Login para Jogar
          </Link>
        )}
      </div>
    </div>
  );
}

export default GameCard;