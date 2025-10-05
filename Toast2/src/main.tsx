import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App.tsx';
import NewProfile from './pages/NewProfile';
import Dashboard from './pages/Dashboard';
import TestProfile from './pages/TestProfile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProfileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/new-profile" element={<NewProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test-profile" element={<TestProfile />} />
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  </StrictMode>,
);
