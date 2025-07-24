import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ScratchCardPage() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealPercentage, setRevealPercentage] = useState(0);
  const [prize, setPrize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Memilih cover kartu secara random - BAGIAN INI YANG DITANYAKAN
  const randomCardNumber = Math.floor(Math.random() * 6) + 1;
  const coverImage = `/assets/images/cards/cover-${randomCardNumber}.png`;
  const scratchPattern = '/assets/images/cards/scratch-pattern.png';
  const backgroundImage = '/assets/images/cards/background.png';
  
  // Mock ticket data - in a real app, this would come from API
  const ticketData = {
    id: ticketId,
    type: 'VIP 1',
    coverImage: coverImage, // Gunakan variable yang sudah dideklarasikan
    prizeImage: backgroundImage, // Gunakan variable yang sudah dideklarasikan
    prize: {
      id: 1,
      name: 'Bônus de R$50',
      type: 'saldo_bonus',
      value: 50.00,
      image: '/assets/images/prizes/bonus-50.png'
    }
  };
  
  // Load ticket data
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      if (ticketId === 'invalid') {
        setError('Ticket não encontrado ou já utilizado');
      } else {
        // Set ticket data
        setPrize(ticketData.prize);
      }
      setLoading(false);
    }, 1500);
  }, [ticketId]);
  
  // Initialize scratch card canvas
  useEffect(() => {
    if (loading || error || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas dimensions (also handling retina displays)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    // Total pixels for percentage calculation
    const totalPixels = canvas.width * canvas.height;
    
    // Load the cover image (what user will scratch off)
    const coverImg = new Image();
    coverImg.onload = () => {
      ctx.drawImage(coverImg, 0, 0, rect.width, rect.height);
      
      // Add text overlay
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.strokeText('ARRASTE PARA RASPAR', rect.width/2, rect.height/2);
      ctx.fillText('ARRASTE PARA RASPAR', rect.width/2, rect.height/2);
    };
    
    // Set cover image source (placeholder if not available)
    coverImg.src = ticketData.coverImage;
    
    // Event listeners for scratching
    const startScratching = (e) => {
      e.preventDefault(); // Prevent scrolling on mobile
      setIsScratching(true);
      scratch(e);
    };
    
    const stopScratching = () => {
      setIsScratching(false);
    };
    
    const scratch = (e) => {
      if (!isScratching || isRevealed) return;
      
      const rect = canvas.getBoundingClientRect();
      let x, y;
      
      // Handle both mouse and touch events
      if (e.touches && e.touches[0]) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
      
      // "Scratch" by creating a circular transparent area
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
      
      // Calculate revealed percentage
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let revealed = 0;
      
      // Check alpha channel (every 4th value in data array is alpha)
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] < 50) { // If mostly transparent
          revealed++;
        }
      }
      
      const percentage = (revealed / (totalPixels / 4)) * 100;
      setRevealPercentage(percentage);
      
      // Auto-reveal when enough is scratched
      if (percentage > 40 && !isRevealed) {
        setIsRevealed(true);
        revealAll();
      }
    };
    
    const revealAll = () => {
      // Clear the entire canvas to reveal prize
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Submit result to backend
      submitResult();
    };
    
    // Add event listeners
    canvas.addEventListener('mousedown', startScratching);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', stopScratching);
    canvas.addEventListener('mouseleave', stopScratching);
    canvas.addEventListener('touchstart', startScratching);
    canvas.addEventListener('touchmove', scratch);
    canvas.addEventListener('touchend', stopScratching);
    
    // Cleanup function
    return () => {
      canvas.removeEventListener('mousedown', startScratching);
      canvas.removeEventListener('mousemove', scratch);
      canvas.removeEventListener('mouseup', stopScratching);
      canvas.removeEventListener('mouseleave', stopScratching);
      canvas.removeEventListener('touchstart', startScratching);
      canvas.removeEventListener('touchmove', scratch);
      canvas.removeEventListener('touchend', stopScratching);
    };
  }, [loading, error, isRevealed, isScratching]);
  
  // Submit result to backend
  const submitResult = () => {
    // In a real app, this would be an API call
    console.log('Submitting result for ticket:', ticketId);
    // The prize is already in the state from initial load
  };
  
  // Handle "Play Again" button
  const handlePlayAgain = () => {
    navigate('/tickets');
  };
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-16 h-16 border-4 border-pop-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-300">Carregando seu ticket...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="card p-8 text-center">
        <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl font-bold text-red-500 mb-2">Erro</h2>
        <p className="text-gray-300 mb-6">{error}</p>
        <button 
          className="btn-primary"
          onClick={() => navigate('/tickets')}
        >
          Voltar para Meus Tickets
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-lg mx-auto">
      <div className="card p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Raspadinha #{ticketId}</h1>
        
        <div className="mb-4 text-center">
          <span className="inline-block px-3 py-1 bg-pop-dark-900 rounded-full text-sm">
            Ticket tipo: {ticketData.type}
          </span>
        </div>
        
        {/* Scratch Card Container */}
        <div className="relative mb-6 rounded-xl overflow-hidden shadow-lg border-2 border-gray-700">
          {/* The Canvas for scratching */}
          <canvas 
            ref={canvasRef}
            className="w-full touch-none cursor-pointer"
            style={{ aspectRatio: '3/2', background: '#1e293b' }}
          />
          
          {/* Prize reveal overlay */}
          {isRevealed && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-pop-dark-900 bg-opacity-90 animate-fade-in">
              <div className="text-center p-6">
                <div className="w-24 h-24 mx-auto mb-4">
                  <img 
                    src={prize.image || `https://via.placeholder.com/200/22c55e/ffffff?text=${prize.name}`} 
                    alt={prize.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <h2 className="text-2xl font-bold mb-2">
                  {prize.name}
                </h2>
                
                <p className="text-gray-300 mb-4">
                  {prize.type === 'saldo_bonus' 
                    ? `Bônus de R$${prize.value.toFixed(2)}` 
                    : 'Prêmio Físico'
                  }
                </p>
                
                <div className="animate-bounce mt-2">
                  <svg className="w-8 h-8 text-pop-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Instructions & Progress */}
        {!isRevealed ? (
          <div className="text-center mb-6">
            <p className="text-gray-300 mb-2">
              Arraste seu dedo ou mouse sobre a área cinza para raspar e revelar seu prêmio!
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-pop-green-500 h-2.5 rounded-full"
                style={{ width: `${Math.min(revealPercentage, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {revealPercentage < 40 
                ? `${Math.floor(revealPercentage)}% raspado (continue até 40%)`
                : 'Quase lá!'
              }
            </p>
          </div>
        ) : (
          <div className="text-center mb-6">
            <p className="text-gray-300 mb-4">
              Seu prêmio foi revelado! Nossa equipe irá verificar e creditar em breve.
            </p>
            
            <div className="bg-pop-dark-900 p-3 rounded-lg inline-block">
              <p className="text-sm text-gray-400">Status do Prêmio:</p>
              <p className="text-yellow-500 font-medium">Aguardando Verificação</p>
            </div>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex space-x-4">
          <button 
            className="btn-secondary flex-1"
            onClick={() => navigate('/tickets')}
          >
            Voltar
          </button>
          
          {isRevealed && (
            <button 
              className="btn-primary flex-1"
              onClick={handlePlayAgain}
            >
              Jogar Novamente
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScratchCardPage;