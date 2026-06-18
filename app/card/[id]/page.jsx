import { getCardDetail } from '../../../lib/api';
import PriceChart from '../../../components/PriceChart';
import PriceBadge from '../../../components/PriceBadge';

export default async function CardDetail({ params }) {
  const card = await getCardDetail(params.id);

  if (!card) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>Card not found</div>;
  }

  // TCGPlayer prices can be under holofoil, normal, reverseHolofoil, 1stEditionHolofoil
  // Let's grab whatever is available
  const prices = card.tcgplayer?.prices;
  const priceType = prices ? Object.keys(prices)[0] : null;
  const currentPrices = priceType ? prices[priceType] : null;
  const marketPrice = currentPrices?.market;
  const lowPrice = currentPrices?.low;
  const highPrice = currentPrices?.high;
  
  // Mock trend calculation (Random +/- for demo since API doesn't provide it)
  const isUp = Math.random() > 0.5;
  const trendPercent = (Math.random() * 15).toFixed(2);

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        {/* Left Column: Image & Info */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={card.images.large} 
            alt={card.name} 
            style={{ width: '100%', maxWidth: '450px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
          />
          <div className="glass" style={{ width: '100%', maxWidth: '450px', marginTop: '24px', padding: '20px', boxSizing: 'border-box' }}>
            <h2>{card.name}</h2>
            <p><strong>Set:</strong> {card.set.name} ({card.set.series})</p>
            <p><strong>Rarity:</strong> {card.rarity || 'N/A'}</p>
            <p><strong>Artist:</strong> {card.artist || 'N/A'}</p>
            {card.flavorText && <p style={{ fontStyle: 'italic', opacity: 0.8 }}>&quot;{card.flavorText}&quot;</p>}
          </div>
        </div>

        {/* Right Column: Price & Chart */}
        <div style={{ flex: '1 1 500px' }}>
          <div className="glass" style={{ padding: '30px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '28px', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', marginBottom: '20px' }}>
              실시간 가격 정보
            </h2>
            
            {marketPrice ? (
              <>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--primary)' }}>
                    ${marketPrice.toFixed(2)}
                  </span>
                  <PriceBadge isUp={isUp} percent={trendPercent} />
                </div>

                <div style={{ display: 'flex', gap: '40px', marginBottom: '30px' }}>
                  <div>
                    <div style={{ fontSize: '14px', opacity: 0.7 }}>최저가 (Low)</div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>${lowPrice?.toFixed(2) || 'N/A'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', opacity: 0.7 }}>최고가 (High)</div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>${highPrice?.toFixed(2) || 'N/A'}</div>
                  </div>
                </div>
              </>
            ) : (
              <p style={{ fontSize: '20px', opacity: 0.7 }}>가격 정보가 없습니다.</p>
            )}

            {card.tcgplayer?.url && (
              <a 
                href={card.tcgplayer.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '16px',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  boxShadow: '0 4px 10px rgba(0, 113, 227, 0.4)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                TCGplayer에서 구매하기
              </a>
            )}
          </div>

          <div className="glass" style={{ padding: '30px' }}>
            <h3 style={{ marginBottom: '20px' }}>실시간 거래가 추이 (30일 - Mock)</h3>
            <PriceChart basePrice={marketPrice || 10} />
          </div>
        </div>
      </div>
    </div>
  );
}
