// Code to fetch games from the API

export async function fetchGames(genre?: string, page: number = 1) {
  const params = new URLSearchParams();
  if (genre) params.append('genre', genre);
  params.append('page', page.toString());
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || '';
  const url = `${baseUrl}/api/games?${params.toString()}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}