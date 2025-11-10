const Stats = () => {
  const stats = [
    { number: '5000+', label: 'Vidas Impactadas' },
    { number: '100+', label: 'Voluntários' },
    { number: '4', label: 'Programas Ativos' }
  ]

  return (
    <section className="stats">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <h3>{stat.number}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats