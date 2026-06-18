export const API_URL = 'https://api.pokemontcg.io/v2';

export async function fetchTrendingCards() {
  // Fetch a set of popular cards for the homepage (e.g., sort by high price or popular set)
  // For demonstration, we'll fetch from a popular set and sort by sell price descending if possible, 
  // or just fetch generic high-value cards.
  const res = await fetch(`${API_URL}/cards?q=set.id:swsh11 OR set.id:swsh12&orderBy=-tcgplayer.prices.holofoil.market&pageSize=6`, {
    headers: {
      'X-Api-Key': process.env.POKEMON_TCG_API_KEY || ''
    },
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch trending cards');
  }
  
  const data = await res.json();
  return data.data;
}

export async function searchCards(query) {
  const q = `name:"*${query}*"`;
  const res = await fetch(`${API_URL}/cards?q=${encodeURIComponent(q)}&pageSize=20`, {
    headers: {
      'X-Api-Key': process.env.POKEMON_TCG_API_KEY || ''
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to search cards');
  }
  
  const data = await res.json();
  return data.data;
}

export async function getCardDetail(id) {
  const res = await fetch(`${API_URL}/cards/${id}`, {
    headers: {
      'X-Api-Key': process.env.POKEMON_TCG_API_KEY || ''
    },
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    return null;
  }
  
  const data = await res.json();
  return data.data;
}
