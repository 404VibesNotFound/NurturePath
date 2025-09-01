import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardOverview from './pages/dashboard/DashboardOverview';
import CareCoordinationPage from './pages/dashboard/CareCoordinationPage';
import VaccinesPage from './pages/dashboard/VaccinesPage';
import PatientProfilePage from './pages/dashboard/PatientProfilePage';
import MessagesPage from './pages/MessagesPage';
import { SmsPage } from './pages/SmsPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardOverview />} />
              <Route path="care-coordination" element={<CareCoordinationPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="sms" element={<SmsPage />} />
              <Route path="vaccines" element={<VaccinesPage />} />
              <Route path="patients/:patientId" element={<PatientProfilePage />} />
            </Route>
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
            <Route path="/help" element={
              <ProtectedRoute>
                <HelpPage />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}