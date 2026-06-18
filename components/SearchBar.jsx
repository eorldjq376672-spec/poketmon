'use client';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
      <input 
        type="text" 
        placeholder="포켓몬 이름 (예: Pikachu, Charizard) 또는 카드 번호" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          flex: 1,
          padding: '16px 20px',
          fontSize: '16px',
          borderRadius: '12px',
          border: '1px solid var(--border-light)',
          backgroundColor: 'var(--card-bg-light)',
          color: 'inherit',
          outline: 'none',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}
        className="glass"
      />
      <button 
        type="submit"
        style={{
          padding: '0 24px',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '12px',
          border: 'none',
          backgroundColor: 'var(--primary)',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 113, 227, 0.3)'
        }}
      >
        검색
      </button>
    </form>
  );
}
