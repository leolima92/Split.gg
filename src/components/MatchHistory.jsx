import { TeamCard } from './TeamCard.jsx';

export function MatchHistory({ matches, onClearHistory }) {
  return (
    <section className="panel full-width">
      <div className="panel-header horizontal">
        <div>
          <h3>Histórico de partidas</h3>
          <p>Veja os times gerados anteriormente.</p>
        </div>

        {matches.length > 0 && (
          <button className="ghost-button" type="button" onClick={onClearHistory}>
            Limpar histórico
          </button>
        )}
      </div>

      {matches.length === 0 ? (
        <div className="empty-state">
          Nenhuma partida salva ainda.
        </div>
      ) : (
        <div className="history-list">
          {matches.map((match) => (
            <article className="history-card" key={match.id}>
              <header>
                <strong>{new Date(match.createdAt).toLocaleString('pt-BR')}</strong>
                <span>
                  {match.scoreA} x {match.scoreB} • diferença {match.difference}
                </span>
              </header>

              <div className="teams-grid">
                <TeamCard title="Time A" players={match.teamA} score={match.scoreA} />
                <TeamCard title="Time B" players={match.teamB} score={match.scoreB} />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
