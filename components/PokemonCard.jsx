import Link from 'next/link';

export default function PokemonCard({ card }) {
  const marketPrice = card.tcgplayer?.prices?.holofoil?.market 
    || card.tcgplayer?.prices?.normal?.market 
    || card.tcgplayer?.prices?.reverseHolofoil?.market
    || 'N/A';

  return (
    <Link href={`/card/${card.id}`}>
      <div 
        className="glass" 
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
          borderRadius: '16px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          height: '100%',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{ position: 'relative', width: '100%', paddingTop: '140%', marginBottom: '12px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={card.images.large || card.images.small} 
            alt={card.name}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
            loading="lazy"
          />
        </div>
        <div style={{ marginTop: 'auto' }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{card.name}</h3>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', opacity: 0.7 }}>{card.supertype} - {card.subtypes?.join(', ')}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--primary)' }}>
              {marketPrice !== 'N/A' ? `$${marketPrice}` : 'Price N/A'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
