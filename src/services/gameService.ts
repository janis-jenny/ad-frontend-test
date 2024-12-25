// Code to fetch games from the API

export async function fetchGames(genre?: string, page: number = 1) {
  const params = new URLSearchParams();
  if (genre) params.append('genre', genre);
  params.append('page', page.toString());
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const url = `${baseUrl.replace(/\/+$/, '')}/api/games?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch games');
  return response.json();
}