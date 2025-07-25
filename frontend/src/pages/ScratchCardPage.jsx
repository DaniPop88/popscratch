import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  // Memilih cover kartu secara random
  const randomCardNumber = Math.floor(Math.random() * 6) + 1;
  const coverImage = `/assets/images/cards/cover-${randomCardNumber}.png`;
  const scratchPattern = '/assets/images/cards/scratch-pattern.png';
  const backgroundImage = '/assets/images/cards/background.png';
  
  // Update window size when resized
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Log gambar yang digunakan
  useEffect(() => {
    console.log("Gambar yang digunakan:", {
      coverImage,
      scratchPattern,
      backgroundImage,
      randomCardNumber
    });
  }, []);
  
  // Mock ticket data - in a real app, this would come from API
  const ticketData = {
    id: ticketId,
    type: 'VIP 1',
    coverImage: coverImage,
    prizeImage: backgroundImage,
    prize: {
      id: 1,
      name: 'Bonus Rp 50.000',
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
        setError('Tiket tidak ditemukan atau sudah digunakan');
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
    
    // Debugging info
    console.log("Canvas dimensions:", { width: rect.width, height: rect.height, dpr });
    
    // Total pixels for percentage calculation
    const totalPixels = canvas.width * canvas.height / 4; // Divided by 4 because RGBA
    
    // Load the cover image (what user will scratch off)
    const coverImg = new Image();
    
    coverImg.onload = () => {
      console.log("Cover image loaded successfully");
      ctx.drawImage(coverImg, 0, 0, rect.width, rect.height);
      
      // Add text overlay
      ctx.font = 'bold 24px "Poppins", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.strokeText('GOSOK DI SINI', rect.width/2, rect.height/2 - 10);
      ctx.fillText('GOSOK DI SINI', rect.width/2, rect.height/2 - 10);
      ctx.font = 'bold 16px "Montserrat", sans-serif';
      ctx.strokeText('UNTUK MELIHAT HADIAH', rect.width/2, rect.height/2 + 20);
      ctx.fillText('UNTUK MELIHAT HADIAH', rect.width/2, rect.height/2 + 20);
      
      setImageLoaded(true);
    };
    
    coverImg.onerror = () => {
      console.error("Failed to load cover image:", coverImg.src);
      // Fallback to color
      ctx.fillStyle = '#3182ce';
      ctx.fillRect(0, 0, rect.width, rect.height);
      
      // Add text overlay
      ctx.font = 'bold 24px "Poppins", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.strokeText('GOSOK DI SINI', rect.width/2, rect.height/2 - 10);
      ctx.fillText('GOSOK DI SINI', rect.width/2, rect.height/2 - 10);
      ctx.font = 'bold 16px "Montserrat", sans-serif';
      ctx.strokeText('UNTUK MELIHAT HADIAH', rect.width/2, rect.height/2 + 20);
      ctx.fillText('UNTUK MELIHAT HADIAH', rect.width/2, rect.height/2 + 20);
      
      setImageLoaded(true);
    };
    
    // Set cover image source
    coverImg.src = ticketData.coverImage;
    
    // Event listeners for scratching
    const startScratching = (e) => {
      e.preventDefault(); // Prevent scrolling on mobile
      console.log("Mulai menggosok");
      setIsScratching(true);
      scratch(e);
    };
    
    const stopScratching = () => {
      console.log("Berhenti menggosok");
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
      
      // Calculate revealed percentage (less often to improve performance)
      if (Math.random() < 0.1) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let revealed = 0;
        
        // Check alpha channel (every 4th value in data array is alpha)
        for (let i = 3; i < imageData.data.length; i += 40) { // Sample every 10 pixels for performance
          if (imageData.data[i] < 50) { // If mostly transparent
            revealed += 10; // Count as 10 since we're sampling
          }
        }
        
        const percentage = (revealed / totalPixels) * 100 * 10; // Multiply by 10 because of sampling
        setRevealPercentage(percentage);
        
        // Auto-reveal when enough is scratched
        if (percentage > 40 && !isRevealed) {
          console.log("40% tercapai, mengungkapkan hadiah");
          setIsRevealed(true);
          revealAll();
        }
      }
    };
    
    const revealAll = () => {
      console.log("Mengungkap semua");
      // Clear the entire canvas to reveal prize
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Play confetti animation if prize is valuable
      if (prize && prize.value >= 10) {
        setShowConfetti(true);
        
        // Hide confetti after 5 seconds
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }
      
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
  }, [loading, error, prize, isRevealed, isScratching]);
  
  // Submit result to backend
  const submitResult = () => {
    // In a real app, this would be an API call
    console.log('Mengirim hasil untuk tiket:', ticketId);
    // The prize is already in the state from initial load
  };
  
  // Handle "Play Again" button
  const handlePlayAgain = () => {
    navigate('/tickets');
  };
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-300 font-medium">Memuat tiket Anda...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-8 text-center shadow-lg border border-red-700">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-red-300 mb-2">Kesalahan</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/tickets')}
          >
            Kembali ke Tiket Saya
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-lg mx-auto">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      
      <div className="bg-gradient-to-br from-pop-dark-800 to-gray-900 rounded-lg p-6 shadow-lg border border-gray-700">
        <div className="relative mb-6">
          {/* Decorative yellow strip */}
          <div className="h-4 bg-gradient-to-r from-yellow-300 to-yellow-500 mb-4 rounded-md"></div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Kartu Gosok #{ticketId}
          </h1>
          
          <div className="mb-4 text-center">
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-red-800 to-red-700 rounded-full text-sm font-medium">
              Tipe Tiket: {ticketData.type}
            </span>
          </div>
          
          {/* Scratch Card Container */}
          <div className="relative mb-6 rounded-xl overflow-hidden shadow-xl border-4 border-red-800">
            {/* The Canvas for scratching */}
            <canvas 
              ref={canvasRef}
              className="w-full touch-none cursor-pointer"
              style={{ 
                aspectRatio: '3/2', 
                background: 'linear-gradient(to bottom right, #1e293b, #0f172a)'
              }}
            />
            
            {/* Prize reveal overlay */}
            {isRevealed && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pop-dark-900 to-pop-dark-800 bg-opacity-90 transition-opacity opacity-0 animate-fade-in">
                <div className="text-center p-6">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-yellow-300 to-yellow-500 p-4 rounded-full flex items-center justify-center">
                    <img 
                      src={prize.image || `https://via.placeholder.com/200/22c55e/ffffff?text=${prize.name}`} 
                      alt={prize.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        console.error("Failed to load prize image");
                        e.target.src = `https://via.placeholder.com/200/22c55e/ffffff?text=${prize.name}`;
                      }}
                    />
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-2 text-yellow-400">
                    {prize.name}
                  </h2>
                  
                  <p className="text-gray-300 mb-4 text-lg">
                    {prize.type === 'saldo_bonus' 
                      ? `Bonus Rp${prize.value.toFixed(2).replace('.', ',')}` 
                      : 'Hadiah Fisik'
                    }
                  </p>
                  
                  <div className="animate-bounce mt-4">
                    <svg className="w-12 h-12 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Decorative yellow strip */}
          <div className="h-4 bg-gradient-to-r from-yellow-300 to-yellow-500 mt-4 mb-6 rounded-md"></div>
          
          {/* Instructions & Progress */}
          {!isRevealed ? (
            <div className="text-center mb-6">
              <p className="text-gray-300 mb-3">
                Geser jari atau mouse Anda di atas area untuk menggosok dan melihat hadiah!
              </p>
              <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-400 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(revealPercentage, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400">
                {revealPercentage < 40 
                  ? `${Math.floor(revealPercentage)}% tergosok (lanjutkan hingga 40%)`
                  : 'Hampir selesai!'
                }
              </p>
            </div>
          ) : (
            <div className="text-center mb-6 bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg">
              <p className="text-gray-300 mb-4">
                Hadiah Anda telah terungkap! Tim kami akan memverifikasi dan mengkreditkannya segera.
              </p>
              
              <div className="bg-yellow-900 bg-opacity-50 p-3 rounded-lg inline-block border border-yellow-800">
                <p className="text-sm text-gray-400">Status Hadiah:</p>
                <p className="text-yellow-500 font-medium">Menunggu Verifikasi</p>
              </div>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="flex space-x-4">
            <button 
              className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-md transition-colors flex items-center justify-center"
              onClick={() => navigate('/tickets')}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali
            </button>
            
            {isRevealed && (
              <button 
                className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium rounded-md transition-all flex items-center justify-center"
                onClick={handlePlayAgain}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Main Lagi
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Add tailwind animation class for fade-in */}
      <style dangerouslySetInnerHTML={{ __html: `
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </div>
  );
}

export default ScratchCardPage;