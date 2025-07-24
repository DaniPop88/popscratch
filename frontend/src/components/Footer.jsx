import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-pop-dark-900 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-pop-green-500 text-xl font-bold">
              Pop<span className="text-white">Scratch</span>
            </Link>
            <p className="text-gray-400 text-sm mt-1">
              © {currentYear} Todos os direitos reservados.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm">
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/responsible" className="text-gray-400 hover:text-white transition-colors">
              Jogo Responsável
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>PopScratch é uma plataforma de entretenimento. Jogue com responsabilidade.</p>
          <p className="mt-1">Proibido para menores de 18 anos.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;