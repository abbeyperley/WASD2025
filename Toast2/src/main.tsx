import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App.tsx';
import NewProfile from './pages/NewProfile';
import Dashboard from './pages/Dashboard';
import TestProfile from './pages/TestProfile';
import Profiles from './pages/Profiles';
import ProfileDetail from './pages/ProfileDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import { Toaster } from 'sonner';

// Commented out StrictMode to avoid double-mounting in development
// <StrictMode>
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ProfileProvider>
      <BrowserRouter>
        <Toaster position="top-center" richColors closeButton={false} />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/new-profile" element={<NewProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test-profile" element={<TestProfile />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profile/:name" element={<ProfileDetail />} />
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  // </StrictMode>
);
