import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import LoginPage from '../components/ui/gaming-login';
import { supabase } from '../lib/supabaseClient';
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
      className="fixed z-[99999] flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn"
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
        background: 'rgba(0,0,0,0.7)'
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
          className="absolute top-4 right-4 z-50 text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ 
            cursor: 'pointer', 
            border: 'none', 
            background: 'rgba(255,255,255,0.1)', 
            color: 'rgba(255,255,255,0.6)' 
          }}
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
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check for existing Supabase session (handles OAuth redirect callback)
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          localStorage.setItem('reveza_authenticated', 'true');
          setIsAuthenticated(true);
        }
      } catch (err) {
        // Supabase not configured — ignore
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkSession();

    // Listen for auth state changes (e.g., OAuth redirect completing)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        localStorage.setItem('reveza_authenticated', 'true');
        setIsAuthenticated(true);
        // Release scroll & background
        document.body.style.overflow = '';
        document.body.style.backgroundColor = '';
        document.documentElement.style.backgroundColor = '';
      } else if (event === 'SIGNED_OUT') {
        localStorage.setItem('reveza_authenticated', 'false');
        setIsAuthenticated(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
        supabase.auth.signOut().catch(() => {}); // Also sign out from Supabase
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
    document.body.style.backgroundColor = '';
    document.documentElement.style.backgroundColor = '';
  };

  // Render the SigninModal on-demand
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
