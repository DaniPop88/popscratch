import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ScratchCardPage from './pages/ScratchCardPage';
import TicketsPage from './pages/TicketsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/scratch/:ticketId" element={<ScratchCardPage />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;