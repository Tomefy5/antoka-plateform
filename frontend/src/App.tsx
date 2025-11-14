import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import DocumentCreatePage from './pages/documents/DocumentCreatePage'
import DocumentDetailPage from './pages/documents/DocumentDetailPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/documents/create" element={<DocumentCreatePage />} />
        <Route path="/documents/:id" element={<DocumentDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
