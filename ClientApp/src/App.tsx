import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardOverview from './pages/dashboard/DashboardOverview';
import CareCoordinationPage from './pages/dashboard/CareCoordinationPage';
import VaccinesPage from './pages/dashboard/VaccinesPage';
import PatientProfilePage from './pages/dashboard/PatientProfilePage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
export function App() {
  return <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="care-coordination" element={<CareCoordinationPage />} />
            <Route path="vaccines" element={<VaccinesPage />} />
            <Route path="patients/:patientId" element={<PatientProfilePage />} />
          </Route>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>;
}