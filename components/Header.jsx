'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    if (prefersDark) {
      document.body.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <header style={{
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid var(--border-light)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'var(--card-bg-light)'
    }} className="glass">
      <Link href="/">
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: 'var(--primary)' }}>
          Pokémon Value Check
        </h1>
      </Link>
      <button 
        onClick={toggleDarkMode}
        style={{
          background: 'transparent',
          border: '1px solid var(--primary)',
          color: 'var(--primary)',
          padding: '8px 16px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.3s'
        }}
      >
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  );
}
