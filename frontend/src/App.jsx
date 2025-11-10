import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Stats from './components/Stats/Stats'
import About from './components/About/About'
import Services from './components/Services/Services'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import UserArea from './components/UserArea/UserArea'
import AdminPainel from './components/AdminPainel/AdminPainel'
import { authService } from './components/Services/api.js'
import './styles/main.scss'

function App() {
  const [showUserArea, setShowUserArea] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  // Verifica autenticação ao carregar
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated()
      const admin = authService.isAdmin()
      const user = authService.getCurrentUser()
      
      setIsAuthenticated(authenticated)
      setIsAdmin(admin)
      setCurrentUser(user)
    }

    checkAuth()
  }, [])

  const handleAdminLogin = () => {
    setIsAdmin(true)
    setIsAuthenticated(true)
  }

  const handleUserLogin = (user) => {
    setIsAuthenticated(true)
    setCurrentUser(user)
  }

  const handleLogout = () => {
    authService.logout()
    setIsAdmin(false)
    setIsAuthenticated(false)
    setCurrentUser(null)
  }

  // Se o admin está logado, mostra apenas o painel administrativo
  if (isAdmin) {
    return <AdminPainel onLogout={handleLogout} />
  }

  // Site normal para usuários comuns
  return (
    <div className="App">
      <Header 
        onUserAreaClick={() => setShowUserArea(true)}
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
      
      {showUserArea && (
        <UserArea 
          onClose={() => setShowUserArea(false)} 
          onAdminLogin={handleAdminLogin}
          onUserLogin={handleUserLogin}
        />
      )}
    </div>
  )
}

export default App