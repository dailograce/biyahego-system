function StatCard({ label, value, detail, icon: Icon }) {
  return (
    <section className="stat-card">
      <span className="stat-icon" aria-hidden="true">
        <Icon size={22} />
      </span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{detail}</span>
      </div>
    </section>
  );
}

export default StatCard;
