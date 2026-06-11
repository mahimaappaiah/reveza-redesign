import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import LoginPage from '../components/ui/gaming-login';
import '../index.css';

// Expose Supabase credentials to static vanilla scripts
if (typeof window !== 'undefined') {
  (window as any).SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
  (window as any).SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
}

interface SigninModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const SigninModal: React.FC<SigninModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box'
      }}
    >
      {/* Click outside to close */}
      <div 
        className="absolute inset-0" 
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} 
        onClick={onClose} 
      />
      
      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-md bg-transparent rounded-2xl overflow-hidden shadow-2xl animate-scaleUp">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-50 text-xl font-bold hover:bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ cursor: 'pointer', border: 'none' }}
          aria-label="Close modal"
        >
          &times;
        </button>

        <LoginPage.LoginForm onSubmit={() => onLoginSuccess()} onGoogleLogin={() => onLoginSuccess()} />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('reveza_authenticated') === 'true';
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Sync navbar link text depending on authentication state
    const triggers = document.querySelectorAll('.trigger-signin');
    triggers.forEach(trigger => {
      const el = trigger as HTMLElement;
      if (isAuthenticated) {
        el.innerText = 'Sign Out';
        el.style.color = '#e11d48'; // Rose red for Sign Out
      } else {
        el.innerText = 'Sign In';
        el.style.color = ''; // Reset color
      }
    });

    const handleTrigger = (e: Event) => {
      e.preventDefault();
      if (isAuthenticated) {
        // Sign Out action
        localStorage.setItem('reveza_authenticated', 'false');
        setIsAuthenticated(false);
        window.location.reload();
      } else {
        // Sign In modal action
        setIsModalOpen(true);
      }
    };

    triggers.forEach(trigger => {
      trigger.addEventListener('click', handleTrigger);
    });

    return () => {
      triggers.forEach(trigger => {
        trigger.removeEventListener('click', handleTrigger);
      });
    };
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    localStorage.setItem('reveza_authenticated', 'true');
    setIsAuthenticated(true);
    setIsModalOpen(false);
    // Release scroll block
    document.body.style.overflow = '';
  };

  // If not authenticated, block the screen with full-screen login card and video background
  if (!isAuthenticated) {
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = '#020617';
    document.documentElement.style.backgroundColor = '#020617';

    return (
      <div 
        className="fixed z-[99999] flex items-center justify-center px-4 py-12 font-sans bg-slate-950 select-none"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          backgroundColor: '#020617' // slate-950
        }}
      >
        <LoginPage.VideoBackground videoUrl="https://videos.pexels.com/video-files/8128311/8128311-uhd_2560_1440_25fps.mp4" />
        <div className="relative z-20 w-full max-w-md animate-fadeIn">
          <LoginPage.LoginForm onSubmit={handleLoginSuccess} onGoogleLogin={handleLoginSuccess} />
        </div>
        <footer 
          className="absolute bottom-4 left-0 right-0 text-center text-white/55 text-xs z-20 font-medium tracking-wide"
          style={{ width: '100%', pointerEvents: 'none' }}
        >
          © 2026 Reveza Technologies. All rights reserved.
        </footer>
      </div>
    );
  }

  // Release scroll block if authenticated
  document.body.style.overflow = '';
  document.body.style.backgroundColor = '';
  document.documentElement.style.backgroundColor = '';

  return (
    <SigninModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
      onLoginSuccess={handleLoginSuccess} 
    />
  );
};

// Find or create container and mount React App
let container = document.getElementById('signin-modal-container');
if (!container) {
  container = document.createElement('div');
  container.id = 'signin-modal-container';
  document.body.appendChild(container);
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
