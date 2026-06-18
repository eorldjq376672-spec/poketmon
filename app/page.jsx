'use client';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';
import { fetchTrendingCards, searchCards } from '../lib/api';

export default function Home() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadInitial() {
      try {
        const trending = await fetchTrendingCards();
        setCards(trending);
      } catch (err) {
        setError('Failed to load trending cards');
      } finally {
        setLoading(false);
      }
    }
    loadInitial();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    setIsSearching(true);
    setError(null);
    try {
      const results = await searchCards(query);
      setCards(results);
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '10px' }}>당신의 포켓몬 카드 가치를 확인하세요</h2>
        <p style={{ fontSize: '18px', opacity: 0.8 }}>실시간 시세와 상세 정보를 한눈에!</p>
      </div>

      <SearchBar onSearch={handleSearch} />

      <h3 style={{ marginTop: '40px', marginBottom: '20px', fontSize: '24px', borderBottom: '2px solid var(--border-light)', paddingBottom: '10px' }}>
        {isSearching ? '검색 결과' : '🔥 실시간 트렌딩 카드'}
      </h3>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--red)' }}>{error}</div>
      ) : cards.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          {cards.map(card => (
            <PokemonCard key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px' }}>검색 결과가 없습니다.</div>
      )}
    </div>
  );
}
