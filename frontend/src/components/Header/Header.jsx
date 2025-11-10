const Header = ({ onUserAreaClick, isAuthenticated, currentUser, onLogout }) => {
  return (
    <header className="header">
      <nav className="nav-container">
        <a href="#inicio" className="logo">
          Estação Aconchego
          <span className="tagline">Seu refúgio acolhedor</span>
        </a>
        
        <ul className="nav-links">
          <li><a href="#inicio" className="active">Início</a></li>
          <li><a href="#sobre">Sobre Nós</a></li>
          <li><a href="#servicos">Nossos Serviços</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
        
        <div className="user-section">
          {isAuthenticated ? (
            <div className="user-info">
              <span>Olá, {currentUser?.nome || 'Usuário'}</span>
              <button className="logout-btn" onClick={onLogout}>
                Sair
              </button>
            </div>
          ) : (
            <button className="user-area-btn" onClick={onUserAreaClick}>
              Área do Usuário
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header