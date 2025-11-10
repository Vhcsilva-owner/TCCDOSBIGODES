const About = () => {
  const timeline = [
    { year: '2021', title: 'Fundação', description: 'Iniciamos nossa jornada acolhendo 10 pessoas em situação de rua' },
    { year: '2023', title: 'Expansão', description: 'Ampliamos para atender famílias vulneráveis e crianças' },
    { year: '2014', title: 'Programas Especializados', description: 'Lançamento de programas para dependentes químicos' },
    { year: '2025', title: 'Reconhecimento', description: 'Premiados como melhor ONG social da região' }
  ]

  return (
    <section className="about" id="sobre">
      <div className="about-container">
        <h2>Sobre a Estação Aconchego</h2>
        
        <div className="mission-vision-values">
          <div className="card">
            <h3>Nossa Missão</h3>
            <p>Acolher e apoiar pessoas em vulnerabilidade social, oferecendo ferramentas para transformação e reinserção na sociedade.</p>
          </div>
          
          <div className="card">
            <h3>Nossa Visão</h3>
            <p>Ser referência em acolhimento social, promovendo dignidade e oportunidades para todos que buscam um recomeço.</p>
          </div>
          
          <div className="card">
            <h3>Nossos Valores</h3>
            <p>Respeito, amor ao próximo, transparência, compromisso social e crença no potencial de transformação de cada pessoa.</p>
          </div>
        </div>

        <div className="timeline">
          <h3>Nossa Trajetória</h3>
          {timeline.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="year">{item.year}</div>
              <div className="title">{item.title}</div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About