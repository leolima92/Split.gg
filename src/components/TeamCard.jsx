export function TeamCard({ title, players, score }) {
  return (
    <article className="team-card">
      <header>
        <h4>{title}</h4>
        <span>Score {score}</span>
      </header>

      <div className="team-players">
        {players.map((player) => (
          <div key={player.id} className="team-player">
            <strong>{player.nickname}</strong>
            <span>{player.role} • Rank {player.rank}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
