import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import TicketsPage from './pages/TicketsPage';
import ScratchCardPage from './pages/ScratchCardPage';
import './styles/index.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-pop-dark-800 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/scratch/:id" element={<ScratchCardPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;