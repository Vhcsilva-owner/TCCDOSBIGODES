import { useState, useEffect } from 'react'

const AdminPanel = ({ onLogout }) => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [editingUser, setEditingUser] = useState(null)
  const [newUser, setNewUser] = useState({ 
    name: '', 
    email: '', 
    type: 'user', 
    status: 'active' 
  })

  // Dados de exemplo
  const initialUsers = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', type: 'user', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', type: 'volunteer', status: 'active', joinDate: '2024-02-20' },
    { id: 3, name: 'Pedro Oliveira', email: 'pedro@email.com', type: 'user', status: 'inactive', joinDate: '2024-03-10' },
    { id: 4, name: 'Ana Costa', email: 'ana@email.com', type: 'admin', status: 'active', joinDate: '2024-01-05' }
  ]

  useEffect(() => {
    setUsers(initialUsers)
  }, [])

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddUser = (e) => {
    e.preventDefault()
    const user = {
      id: users.length + 1,
      ...newUser,
      joinDate: new Date().toISOString().split('T')[0]
    }
    setUsers([...users, user])
    setNewUser({ name: '', email: '', type: 'user', status: 'active' })
    alert('Usuário adicionado com sucesso!')
  }

  const handleUpdateUser = (e) => {
    e.preventDefault()
    setUsers(users.map(user => 
      user.id === editingUser.id ? { ...user, ...editingUser } : user
    ))
    setEditingUser(null)
    alert('Usuário atualizado com sucesso!')
  }

  const handleDeleteUser = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(users.filter(user => user.id !== id))
      alert('Usuário excluído com sucesso!')
    }
  }

  const getStatusText = (status) => {
    return status === 'active' ? 'Ativo' : 'Inativo'
  }

  const getTypeText = (type) => {
    const types = {
      user: 'Usuário',
      volunteer: 'Voluntário',
      admin: 'Administrador'
    }
    return types[type] || type
  }

  return (
    <div className="admin-panel">
      {/* Header Simples */}
      <div className="admin-header">
        <div>
          <h1>Painel Administrativo</h1>
          <p>Estacao Aconchego - Gerenciamento de Usuários</p>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          Sair
        </button>
      </div>

      <div className="admin-content">
        {/* Estatísticas Básicas */}
        <div className="admin-stats">
          <div className="stat-card">
            <h3>{users.length}</h3>
            <p>Total de Usuários</p>
          </div>
          <div className="stat-card">
            <h3>{users.filter(u => u.status === 'active').length}</h3>
            <p>Usuários Ativos</p>
          </div>
          <div className="stat-card">
            <h3>{users.filter(u => u.type === 'volunteer').length}</h3>
            <p>Voluntários</p>
          </div>
        </div>

        {/* Adicionar Usuário */}
        <div className="admin-section">
          <h2>Adicionar Novo Usuário</h2>
          <form onSubmit={handleAddUser} className="user-form">
            <div className="form-row">
              <input 
                type="text" 
                placeholder="Nome completo" 
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})} 
                required 
              />
              <input 
                type="email" 
                placeholder="Email" 
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})} 
                required 
              />
              <select 
                value={newUser.type} 
                onChange={(e) => setNewUser({...newUser, type: e.target.value})}
              >
                <option value="user">Usuário</option>
                <option value="volunteer">Voluntário</option>
                <option value="admin">Administrador</option>
              </select>
              <button type="submit" className="btn-primary">
                Adicionar
              </button>
            </div>
          </form>
        </div>

        {/* Lista de Usuários */}
        <div className="admin-section">
          <div className="search-header">
            <h2>Gerenciar Usuários</h2>
            <input 
              type="text" 
              placeholder="Buscar usuários..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="search-input" 
            />
          </div>

          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Tipo</th>
                  <th>Status</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge badge-${user.type}`}>
                        {getTypeText(user.type)}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${user.status}`}>
                        {getStatusText(user.status)}
                      </span>
                    </td>
                    <td>{new Date(user.joinDate).toLocaleDateString('pt-BR')}</td>
                    <td className="actions">
                      <button 
                        className="btn-edit" 
                        onClick={() => setEditingUser({...user})}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn-delete" 
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Edição */}
        {editingUser && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Editar Usuário</h2>
                <button onClick={() => setEditingUser(null)} className="close-btn">×</button>
              </div>
              <form onSubmit={handleUpdateUser}>
                <div className="form-group">
                  <label>Nome:</label>
                  <input 
                    type="text" 
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input 
                    type="email" 
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Tipo:</label>
                  <select 
                    value={editingUser.type}
                    onChange={(e) => setEditingUser({...editingUser, type: e.target.value})}
                  >
                    <option value="user">Usuário</option>
                    <option value="volunteer">Voluntário</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status:</label>
                  <select 
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                  >
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button 
                    type="button" 
                    onClick={() => setEditingUser(null)} 
                    className="btn-cancel"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary">Salvar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel