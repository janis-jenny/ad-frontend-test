// Code to fetch games from the API

export async function fetchGames(genre?: string, page: number = 1) {
  const params = new URLSearchParams();
  if (genre) params.append('genre', genre);
  params.append('page', page.toString());
  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/games?${params.toString()}`
  );
  if (!response.ok) throw new Error('Failed to fetch games');
  return response.json();
}