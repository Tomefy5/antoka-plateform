import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import DashboardPage from './pages/DashboardPage'
import DocumentListPage from './pages/documents/DocumentListPage'
import DocumentCreatePage from './pages/documents/DocumentCreatePage'
import DocumentDetailPage from './pages/documents/DocumentDetailPage'
import DocumentEditPage from './pages/documents/DocumentEditPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  // Mock auth state (remplace par vrai context plus tard)
  // const isAuthenticated = !!localStorage.getItem('access_token')
  const isAuthenticated = true;
  const userName = 'Jean Dupont'
  const userEmail = 'jean.dupont@email.com'

  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages (no navbar or custom navbar) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected pages (with navbar) */}
        <Route
          path="/dashboard"
          element={
            <Layout isAuthenticated={isAuthenticated} userName={userName} userEmail={userEmail}>
              <DashboardPage />
            </Layout>
          }
        />
        <Route
          path="/documents"
          element={
            <Layout isAuthenticated={isAuthenticated} userName={userName} userEmail={userEmail}>
              <DocumentListPage />
            </Layout>
          }
        />
        <Route
          path="/documents/create"
          element={
            <Layout isAuthenticated={isAuthenticated} userName={userName} userEmail={userEmail}>
              <DocumentCreatePage />
            </Layout>
          }
        />
        <Route
          path="/documents/:id"
          element={
            <Layout isAuthenticated={isAuthenticated} userName={userName} userEmail={userEmail}>
              <DocumentDetailPage />
            </Layout>
          }
        />
        <Route
          path="/documents/:id/edit"
          element={
            <Layout isAuthenticated={isAuthenticated} userName={userName} userEmail={userEmail}>
              <DocumentEditPage />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout isAuthenticated={isAuthenticated} userName={userName} userEmail={userEmail}>
              <ProfilePage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
