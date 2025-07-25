import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="PopScratch" className="h-10" />
            <span className="font-display text-2xl font-bold text-white">PopScratch</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavItem to="/" label="Beranda" isActive={isActive('/')} />
            <NavItem to="/tickets" label="Tiket Saya" isActive={isActive('/tickets')} />
            <NavItem to="/profile" label="Profil" isActive={isActive('/profile')} />
            <Link 
              to="/dashboard" 
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full transition-colors"
            >
              Dapatkan Tiket
            </Link>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <div className="flex flex-col space-y-2">
              <MobileNavItem to="/" label="Beranda" isActive={isActive('/')} />
              <MobileNavItem to="/tickets" label="Tiket Saya" isActive={isActive('/tickets')} />
              <MobileNavItem to="/profile" label="Profil" isActive={isActive('/profile')} />
              <Link 
                to="/dashboard" 
                className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg w-full text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Dapatkan Tiket
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function NavItem({ to, label, isActive }) {
  return (
    <Link 
      to={to} 
      className={`font-medium hover:text-yellow-300 transition-colors ${
        isActive ? 'text-yellow-300' : 'text-white'
      }`}
    >
      {label}
    </Link>
  );
}

function MobileNavItem({ to, label, isActive }) {
  return (
    <Link 
      to={to} 
      className={`block px-3 py-2 rounded-md ${
        isActive 
          ? 'bg-red-800 text-white' 
          : 'text-white hover:bg-red-800 hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
}

export default Header;