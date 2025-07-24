import React, { useEffect, useState } from 'react';

function LiveWinners() {
  // Mock winners data (will come from API later)
  const initialWinners = [
    { id: 1, name: 'João P.', prize: 'R$50 Bonus', time: '2 minutos atrás' },
    { id: 2, name: 'Maria S.', prize: 'iPhone Case', time: '5 minutos atrás' },
    { id: 3, name: 'Carlos R.', prize: 'R$100 Bonus', time: '10 minutos atrás' },
    { id: 4, name: 'Ana L.', prize: 'AirPods', time: '15 minutos atrás' },
    { id: 5, name: 'Pedro M.', prize: 'R$25 Bonus', time: '20 minutos atrás' },
  ];
  
  const [winners, setWinners] = useState(initialWinners);
  const [tickerPosition, setTickerPosition] = useState(0);
  
  // Simulate ticker movement
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerPosition(prev => {
        if (prev < winners.length - 1) {
          return prev + 1;
        } else {
          return 0;
        }
      });
    }, 3000); // Change winner every 3 seconds
    
    return () => clearInterval(interval);
  }, [winners.length]);
  
  // Simulate new winner coming in occasionally
  useEffect(() => {
    const newWinnerInterval = setInterval(() => {
      const randomNames = ['Gabriel', 'Lucas', 'Julia', 'Fernanda', 'Thiago', 'Marcelo'];
      const randomPrizes = ['R$10 Bonus', 'R$20 Bonus', 'R$30 Bonus', 'T-Shirt', 'Phone Holder'];
      
      const newWinner = {
        id: Date.now(),
        name: `${randomNames[Math.floor(Math.random() * randomNames.length)]} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}.`,
        prize: randomPrizes[Math.floor(Math.random() * randomPrizes.length)],
        time: 'agora mesmo'
      };
      
      setWinners(prev => [newWinner, ...prev.slice(0, 4)]);
    }, 20000); // Add new winner every 20 seconds
    
    return () => clearInterval(newWinnerInterval);
  }, []);
  
  return (
    <div className="overflow-hidden">
      <div className="flex items-center space-x-4 animate-pulse">
        {winners.map((winner, index) => (
          <div 
            key={winner.id}
            className={`flex-shrink-0 ${index === tickerPosition ? 'opacity-100' : 'opacity-40'}`}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-pop-green-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">{winner.name.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm font-medium">{winner.name}</p>
                <div className="flex items-center">
                  <span className="text-xs text-pop-green-500 font-medium">{winner.prize}</span>
                  <span className="mx-1 text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{winner.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveWinners;