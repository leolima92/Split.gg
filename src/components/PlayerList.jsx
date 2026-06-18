import { Trash2 } from 'lucide-react';

export function PlayerList({ players, onRemovePlayer }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Jogadores cadastrados</h3>
        <p>{players.length} jogador(es) disponível(is) para balanceamento.</p>
      </div>

      {players.length === 0 ? (
        <div className="empty-state">
          Nenhum jogador cadastrado ainda.
        </div>
      ) : (
        <div className="player-list">
          {players.map((player) => (
            <article className="player-card" key={player.id}>
              <div>
                <strong>{player.nickname}</strong>
                <span>{player.role}</span>
              </div>

              <div className="player-actions">
                <span className="rank-badge">Rank {player.rank}</span>
                <button
                  className="icon-button"
                  type="button"
                  onClick={() => onRemovePlayer(player.id)}
                  aria-label={`Remover ${player.nickname}`}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
