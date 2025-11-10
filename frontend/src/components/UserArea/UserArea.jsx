import { useState } from 'react'
import authService from '../Services/api.js';

const UserArea = ({ onClose, onAdminLogin, onUserLogin }) => {
  const [activeTab, setActiveTab] = useState('login')
  const [loginData, setLoginData] = useState({ 
    email: '', 
    password: '', 
    remember: false 
  })
  const [registerData, setRegisterData] = useState({ 
    nome: '', 
    email: '', 
    telefone: '',
    cpf: '',
    senha: '', 
    confirmarsenha: '' 
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('Tentando login com:', loginData)

      // Tenta login como admin primeiro
      if (loginData.email === 'admin@estacaoaconchego.org' && loginData.password === 'admin123') {
        console.log('Tentando login como admin')
        await authService.adminLogin(loginData.email, loginData.password)
        onAdminLogin()
        alert('Login administrativo realizado com sucesso!')
        onClose()
        return
      }

      // Login como usuário normal
      console.log('Tentando login como usuário normal')
      const usuario = await authService.login(loginData.email, loginData.password)
      console.log('Usuário logado:', usuario)
      onUserLogin(usuario)
      alert(`Bem-vindo, ${usuario.nome}!`)
      onClose()
    } catch (error) {
      console.error('Erro no login:', error)
      setError('Email ou senha incorretos')
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validações
    if (registerData.senha !== registerData.confirmarsenha) {
      setError('As senhas não coincidem')
      setLoading(false)
      return
    }

    if (registerData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      console.log('Tentando cadastrar:', registerData)

      // Prepara os dados para a API
      const usuarioData = {
        nome: registerData.nome,
        email: registerData.email,
        telefone: registerData.telefone || '',
        cpf: registerData.cpf || '',
        senha: registerData.senha,
        confirmarsenha: registerData.confirmarsenha
      }

      // Cadastra o usuário no banco de dados
      const resultado = await cadastroService.cadastrar(usuarioData)
      console.log('Cadastro realizado:', resultado)
      
      alert('Cadastro realizado com sucesso! Você já pode fazer login.')
      setActiveTab('login')
      setRegisterData({ 
        nome: '', 
        email: '', 
        telefone: '',
        cpf: '',
        senha: '', 
        confirmarsenha: '' 
      })
    } catch (error) {
      console.error('Erro no cadastro:', error)
      setError('Erro ao cadastrar. Verifique se a API está rodando.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="user-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Área do Usuário</h2>
          <button className="close-btn" onClick={onClose} type="button" disabled={loading}>
            ×
          </button>
        </div>

        <div className="form-tabs">
          <button 
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
            type="button"
            disabled={loading}
          >
            Login
          </button>
          <button 
            className={`tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
            type="button"
            disabled={loading}
          >
            Cadastro
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                name="email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                placeholder="seu@email.com"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Senha</label>
              <input
                type="password"
                id="login-password"
                name="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                placeholder="Sua senha"
                required
                disabled={loading}
              />
            </div>

            <div className="admin-info">
              <p><strong>Login de teste para Admin:</strong></p>
              <p>Email: admin@estacaoaconchego.org</p>
              <p>Senha: admin123</p>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        )}

        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label htmlFor="register-name">Nome Completo *</label>
              <input
                type="text"
                id="register-name"
                name="nome"
                value={registerData.nome}
                onChange={(e) => setRegisterData({...registerData, nome: e.target.value})}
                placeholder="Seu nome completo"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-email">Email *</label>
              <input
                type="email"
                id="register-email"
                name="email"
                value={registerData.email}
                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                placeholder="seu@email.com"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-phone">Telefone</label>
              <input
                type="tel"
                id="register-phone"
                name="telefone"
                value={registerData.telefone}
                onChange={(e) => setRegisterData({...registerData, telefone: e.target.value})}
                placeholder="(11) 99999-9999"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-cpf">CPF</label>
              <input
                type="text"
                id="register-cpf"
                name="cpf"
                value={registerData.cpf}
                onChange={(e) => setRegisterData({...registerData, cpf: e.target.value})}
                placeholder="000.000.000-00"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-password">Senha *</label>
              <input
                type="password"
                id="register-password"
                name="senha"
                value={registerData.senha}
                onChange={(e) => setRegisterData({...registerData, senha: e.target.value})}
                placeholder="Sua senha (mín. 6 caracteres)"
                required
                minLength="6"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-confirm-password">Confirmar Senha *</label>
              <input
                type="password"
                id="register-confirm-password"
                name="confirmarsenha"
                value={registerData.confirmarsenha}
                onChange={(e) => setRegisterData({...registerData, confirmarsenha: e.target.value})}
                placeholder="Confirme sua senha"
                required
                minLength="6"
                disabled={loading}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default UserArea