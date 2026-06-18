export default function PriceBadge({ isUp, percent }) {
  const color = isUp ? 'var(--green)' : 'var(--red)';
  const bgColor = isUp ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 59, 48, 0.1)';
  const arrow = isUp ? '▲' : '▼';

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '6px 12px',
      borderRadius: '20px',
      backgroundColor: bgColor,
      color: color,
      fontWeight: 'bold',
      fontSize: '16px'
    }}>
      <span>{arrow}</span>
      <span>{percent}%</span>
    </div>
  );
}
