const Services = () => {
  const services = [
    {
      title: 'Alcoólicos Anônimos',
      description: 'Grupos de apoio e acompanhamento para pessoas em recuperação do alcoolismo, com reuniões semanais e suporte psicológico.',
      features: [
        'Reuniões semanais',
        'Apoio psicológico',
        'Acompanhamento individualizado',
        'Programas de 12 passos'
      ]
    },
    {
      title: 'Apoio a Usuários de Drogas',
      description: 'Programa completo de recuperação e reinserção social para dependentes químicos, com acompanhamento multidisciplinar.',
      features: [
        'Tratamento especializado',
        'Acompanhamento médico',
        'Terapia em grupo',
        'Atividades terapêuticas'
      ]
    },
    {
      title: 'Acolhimento de Rua',
      description: 'Abrigo seguro, alimentação, higiene e apoio para reinserção social de pessoas em situação de rua.',
      features: [
        'Abrigo 24h',
        'Alimentação diária',
        'Kit higiene',
        'Encaminhamento profissional'
      ]
    },
    {
      title: 'Apoio a Famílias',
      description: 'Programas educacionais, alimentação e suporte para crianças e famílias em situação de vulnerabilidade.',
      features: [
        'Reforço escolar',
        'Alimentação nutritiva',
        'Atividades recreativas',
        'Apoio às famílias'
      ]
    }
  ]

  return (
    <section className="services" id="servicos">
      <div className="services-container">
        <h2>Nossas Ações e Serviços</h2>
        <p className="section-subtitle">
          Oferecemos um conjunto completo de programas e serviços para atender diferentes necessidades e promover transformação social.
        </p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services