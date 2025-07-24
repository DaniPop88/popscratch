import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  // This will handle the Telegram login widget initialization
  useEffect(() => {
    // Create script for Telegram login widget
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?21';
    script.setAttribute('data-telegram-login', 'PopScratchBot'); // Replace with your bot name
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '8');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-userpic', 'true');
    script.setAttribute('data-auth-url', `${window.location.origin}/api/auth/telegram`);
    script.async = true;
    
    // Find the container and append the script
    const container = document.getElementById('telegram-login-container');
    if (container) {
      container.innerHTML = '';
      container.appendChild(script);
    }
    
    return () => {
      // Cleanup if needed
      if (container && script.parentNode === container) {
        container.removeChild(script);
      }
    };
  }, []);
  
  return (
    <div className="max-w-md mx-auto my-10">
      <div className="card p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Entrar no PopScratch
        </h1>
        
        <p className="text-gray-300 text-center mb-8">
          Faça login com Telegram para acessar sua conta e começar a jogar!
        </p>
        
        {/* Telegram login widget will be inserted here */}
        <div 
          id="telegram-login-container" 
          className="flex justify-center mb-6"
        >
          <div className="bg-gray-800 rounded-lg p-4 text-center animate-pulse">
            <p className="text-gray-400">Carregando login Telegram...</p>
          </div>
        </div>
        
        <div className="space-y-4 text-center">
          <p className="text-sm text-gray-400">
            Ao fazer login, você concorda com nossos{' '}
            <Link to="/terms" className="text-pop-green-500 hover:underline">
              Termos de Uso
            </Link>{' '}
            e{' '}
            <Link to="/privacy" className="text-pop-green-500 hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>
          
          <p className="text-sm text-gray-400">
            Não tem Telegram?{' '}
            <a 
              href="https://telegram.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pop-green-500 hover:underline"
            >
              Baixe aqui
            </a>
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/" className="text-gray-400 hover:text-white transition-colors">
          ← Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;