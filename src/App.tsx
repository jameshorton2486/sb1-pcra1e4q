import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthForm } from './components/auth/AuthForm';
import { Dashboard } from './components/dashboard/Dashboard';
import { LandingPage } from './components/landing/LandingPage';
import { RoleDetails } from './components/landing/RoleDetails';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MainNavigation } from './components/navigation/MainNavigation';
import { Footer } from './components/navigation/Footer';
import { Sitemap } from './components/navigation/Sitemap';
import { WireframeDisplay } from './components/wireframes/WireframeDisplay';

// Add new route components
import { Calendar } from './components/calendar/Calendar';
import { Messages } from './components/messages/Messages';
import { Resources } from './components/resources/Resources';
import { Settings } from './components/settings/Settings';
import { Support } from './components/support/Support';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <div className="flex min-h-screen bg-gray-50">
            <MainNavigation />
            <div className="flex-1 flex flex-col">
              <div className="flex-grow">
                <Routes>
                  <Route path="/login" element={<AuthForm />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/calendar" element={
                    <ProtectedRoute>
                      <Calendar />
                    </ProtectedRoute>
                  } />
                  <Route path="/messages" element={
                    <ProtectedRoute>
                      <Messages />
                    </ProtectedRoute>
                  } />
                  <Route path="/resources" element={
                    <ProtectedRoute>
                      <Resources />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } />
                  <Route path="/support" element={
                    <ProtectedRoute>
                      <Support />
                    </ProtectedRoute>
                  } />
                  <Route path="/sitemap" element={<Sitemap />} />
                  <Route path="/wireframes" element={<WireframeDisplay />} />
                  <Route path="/roles/:role" element={<RoleDetails />} />
                  <Route path="/" element={<LandingPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;