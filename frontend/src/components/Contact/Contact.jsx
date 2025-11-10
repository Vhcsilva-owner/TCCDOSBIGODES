import { useState } from 'react'
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulário enviado:', formData)
    alert('Mensagem enviada com sucesso!')
  }

  return (
    <section className="contact" id="contato">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Entre em Contato</h2>
          <p>Estamos prontos para atender você. Entre em contato para saber mais sobre nossos serviços, fazer doações ou se tornar um voluntário.</p>
          
          <div className="info-item">
            <h3>Endereço</h3>
            <p>Rua da Esperança, 777 - Prox. Metro Recomeço<br />São Paulo - SP, 01234-567</p>
          </div>
          
          <div className="info-item">
            <h3>Telefone</h3>
            <p>(11) 4002-8922</p>
          </div>
          
          <div className="info-item">
            <h3>Email</h3>
            <p>contato@estacaoaconchego.org</p>
          </div>
          
          <div className="info-item">
            <h3>Horário de Atendimento</h3>
            <p>Segunda a Sexta: 8h às 18h<br />Sábado: 8h às 12h</p>
          </div>
        </div>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Telefone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(11) 98765-4321"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Assunto</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Como podemos ajudar?</option>
              <option value="voluntario">Quero ser voluntário</option>
              <option value="doacao">Quero fazer doação</option>
              <option value="servicos">Informações sobre serviços</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Mensagem</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Escreva sua mensagem aqui..."
              required
            />
          </div>
          
          <button type="submit" className="submit-btn">Enviar Mensagem</button>
        </form>
      </div>
    </section>
  )
}

export default Contact