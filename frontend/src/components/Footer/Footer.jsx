const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Estação Aconchego</h3>
          <p>Transformando vidas através do acolhimento e do amor ao próximo.</p>
        </div>
        
        <div className="footer-section">
          <h3>Links Rápidos</h3>
          <ul>
            <li><a href="#inicio">Início</a></li>
            <li><a href="#sobre">Sobre Nós</a></li>
            <li><a href="#servicos">Nossos Serviços</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Nossos Programas</h3>
          <ul>
            <li><a href="#alcolicos-anonimos">Alcoólicos Anônimos</a></li>
            <li><a href="#apoio-drogas">Apoio a Usuários de Drogas</a></li>
            <li><a href="#acolhimento-rua">Acolhimento de Rua</a></li>
            <li><a href="#apoio-familias">Apoio a Famílias</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contato</h3>
          <div className="contact-info">
            <p>Rua da Esperança, 777</p>
            <p>São Paulo - SP</p>
            <p>(11) 4000-8922</p>
            <p>contato@estacaoaconchego.org</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Estação Aconchego. Todos os direitos reservados.</p>
        <p>Feito com ❤️ para um mundo melhor</p>
      </div>
    </footer>
  )
}

export default Footer