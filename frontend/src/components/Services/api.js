const API_BASE_URL = 'http://localhost:5010';

// Função genérica para fazer requisições
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    // Verifica se a resposta tem conteúdo
    const contentLength = response.headers.get('content-length');
    if (contentLength === '0' || !response.body) {
      return null;
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro na requisição API:', error);
    throw error;
  }
}

// Serviços de Autenticação
export const authService = {
  async login(email, senha) {
    try {
      // Primeiro busca todos os usuários cadastrados
      const usuarios = await apiRequest('/cadastro');
      
      // Procura o usuário pelo email e senha
      const usuario = usuarios.find(user => 
        user.email === email && user.senha === senha
      );
      
      if (usuario) {
        // Salva no localStorage
        localStorage.setItem('user', JSON.stringify(usuario));
        localStorage.setItem('isAuthenticated', 'true');
        return usuario;
      }
      
      throw new Error('Credenciais inválidas');
    } catch (error) {
      throw error;
    }
  },

  async adminLogin(email, senha) {
    try {
      // Verifica se é o admin padrão
      if (email === 'admin@estacaoaconchego.org' && senha === 'admin123') {
        const adminUser = {
          id: 0,
          nome: 'Administrador',
          email: email,
          type: 'admin'
        };
        
        localStorage.setItem('user', JSON.stringify(adminUser));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isAdmin', 'true');
        return adminUser;
      }
      
      throw new Error('Credenciais de admin inválidas');
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  },

  isAdmin() {
    return localStorage.getItem('isAdmin') === 'true';
  }
};

// Serviços de Cadastro (Usuários)
export const cadastroService = {
  async listar() {
    return await apiRequest('/cadastro');
  },

  async buscarPorId(id) {
    return await apiRequest(`/cadastro/${id}`);
  },

  async cadastrar(usuario) {
    return await apiRequest('/cadastro', {
      method: 'POST',
      body: usuario
    });
  },

  async atualizar(id, usuario) {
    return await apiRequest(`/cadastro/${id}`, {
      method: 'PUT',
      body: usuario
    });
  },

  async deletar(id) {
    return await apiRequest(`/cadastro/${id}`, {
      method: 'DELETE'
    });
  }
};

// Serviços de Contato
export const contatoService = {
  async listar() {
    return await apiRequest('/contato');
  },

  async cadastrar(contato) {
    return await apiRequest('/contato', {
      method: 'POST',
      body: contato
    });
  }
};

export default apiRequest;