'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

// Generate mock 30-day data based on a base price
function generateMockData(basePrice) {
  const data = [];
  let current = basePrice;
  const today = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    
    // Random fluctuation between -5% and +5%
    const change = current * (Math.random() * 0.1 - 0.05);
    current = Math.max(0.5, current + change); // Keep above 0.5
    
    data.push({
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      price: parseFloat(current.toFixed(2))
    });
  }
  
  // Set last day to exact base price to match current market
  data[data.length - 1].price = basePrice;
  return data;
}

export default function PriceChart({ basePrice }) {
  const [data, setData] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setData(generateMockData(basePrice));
    setMounted(true);
  }, [basePrice]);

  if (!mounted) return <div style={{ height: 300 }}>Loading chart...</div>;

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="var(--text-light)" opacity={0.5} tick={{ fill: 'currentColor' }} />
          <YAxis 
            domain={['dataMin - 5', 'dataMax + 5']} 
            stroke="var(--text-light)" 
            opacity={0.5} 
            tick={{ fill: 'currentColor' }} 
            tickFormatter={(val) => `$${val}`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: 'var(--card-bg-light)', borderRadius: '8px', border: '1px solid var(--border-light)' }}
            itemStyle={{ color: 'var(--primary)', fontWeight: 'bold' }}
            formatter={(value) => [`$${value}`, 'Price']}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="var(--primary)" 
            strokeWidth={3} 
            dot={false}
            activeDot={{ r: 8 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
