import { useState } from 'react';
import { Search } from 'lucide-react';

import { searchGames } from '../services/gameApi.js';

export function GameSearch({ onSelectGame }) {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch(event) {
    event.preventDefault();

    if (!query.trim()) {
      setError('Digite o nome de um jogo.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const results = await searchGames(query);
      setGames(results);
    } catch (exception) {
      setError(exception.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel full-width">
      <div className="panel-header">
        <h3>Escolha o jogo</h3>
        <p>Pesquise um jogo online para começar o balanceamento dos times.</p>
      </div>

      <form className="game-search-form" onSubmit={handleSearch}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ex: Valorant, League of Legends, Counter-Strike"
        />

        <button className="primary-button" type="submit">
          <Search size={18} />
          Buscar
        </button>
      </form>

      {loading && <div className="empty-state">Buscando jogos...</div>}

      {error && <p className="form-error">{error}</p>}

      {!loading && games.length > 0 && (
        <div className="games-grid">
          {games.map((game) => (
            <button
              className="game-card"
              type="button"
              key={game.id}
              onClick={() => onSelectGame(game)}
            >
              {game.image ? (
                <img src={game.image} alt={game.name} />
              ) : (
                <div className="game-card-placeholder">Sem imagem</div>
              )}

              <div>
                <strong>{game.name}</strong>

                <span>
                  {game.released ? `Lançamento: ${game.released}` : 'Sem data'}
                </span>

                <small>
                  {game.platforms.length > 0
                    ? game.platforms.join(', ')
                    : 'Plataformas não informadas'}
                </small>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}