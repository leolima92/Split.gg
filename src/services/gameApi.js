const BASE_URL = 'https://api.rawg.io/api';

export async function searchGames(query) {
  const apiKey = import.meta.env.VITE_RAWG_API_KEY;

  if (!apiKey) {
    throw new Error('API Key da RAWG não configurada.');
  }

  if (!query.trim()) {
    return [];
  }

  const url = `${BASE_URL}/games?key=${apiKey}&search=${encodeURIComponent(
    query
  )}&page_size=12`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Erro ao buscar jogos na RAWG.');
  }

  const data = await response.json();

  return data.results.map((game) => ({
    id: game.id,
    slug: game.slug,
    name: game.name,
    image: game.background_image,
    rating: game.rating,
    released: game.released,
    platforms:
      game.platforms?.map((item) => item.platform.name).slice(0, 3) ?? [],
  }));
}