import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TicketIcon from './icons/TicketIcon';
import ProfileIcon from './icons/ProfileIcon';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Mock authenticated state (replace with actual auth check)
  const isAuthenticated = true;
  
  return (
    <header className="bg-pop-dark-900 border-b border-gray-800 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/assets/images/logo.png" alt="PopScratch" className="h-8 mr-2" />
            <span className="text-pop-green-500 text-2xl font-bold">
              Pop<span className="text-white">Scratch</span>
            </span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-pop-green-500 transition-colors">
              Início
            </Link>
            <Link to="/tickets" className="text-white hover:text-pop-green-500 transition-colors flex items-center">
              <TicketIcon className="w-5 h-5 mr-1" />
              Meus Tickets
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="text-white hover:text-pop-green-500 transition-colors flex items-center">
                  <ProfileIcon className="w-5 h-5 mr-1" />
                  Perfil
                </Link>
                <Link to="/dashboard" className="btn-primary py-2 px-4">
                  Obter Tickets
                </Link>
              </>
            ) : (
              <Link to="/login" className="btn-primary py-2 px-4">
                Entrar
              </Link>
            )}
          </nav>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-2 flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-white hover:text-pop-green-500 transition-colors py-2 border-b border-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/tickets" 
              className="text-white hover:text-pop-green-500 transition-colors py-2 border-b border-gray-800 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <TicketIcon className="w-5 h-5 mr-2" />
              Meus Tickets
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="text-white hover:text-pop-green-500 transition-colors py-2 border-b border-gray-800 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ProfileIcon className="w-5 h-5 mr-2" />
                  Perfil
                </Link>
                <Link 
                  to="/dashboard" 
                  className="btn-primary mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Obter Tickets
                </Link>
              </>
            ) : (
              <Link 
                to="/login" 
                className="btn-primary mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;