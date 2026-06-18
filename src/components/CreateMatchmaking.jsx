import { useState } from 'react';
import { Swords } from 'lucide-react';

export function CreateMatchmaking({ selectedGame, onCreateMatchmaking, onBack }) {
  const [matchName, setMatchName] = useState(`${selectedGame.name} - Lobby`);
  const [teamSize, setTeamSize] = useState(5);
  const [mode, setMode] = useState('Competitivo');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!matchName.trim()) {
      setError('Informe um nome para a matchmaking.');
      return;
    }

    const matchmaking = {
      id: crypto.randomUUID(),
      gameId: selectedGame.id,
      gameName: selectedGame.name,
      gameImage: selectedGame.image,
      name: matchName.trim(),
      teamSize: Number(teamSize),
      totalPlayers: Number(teamSize) * 2,
      mode,
      createdAt: new Date().toISOString(),
    };

    onCreateMatchmaking(matchmaking);
  }

  return (
    <section className="content-card">
      <header className="section-header">
        <div>
          <span className="eyebrow">Criar matchmaking</span>
          <h2>
            <Swords size={22} />
            {selectedGame.name}
          </h2>
        </div>
      </header>

      <div className="matchmaking-create-layout">
        <section className="selected-game-preview">
          {selectedGame.image && (
            <img src={selectedGame.image} alt={selectedGame.name} />
          )}

          <div>
            <span className="eyebrow">Jogo escolhido</span>
            <h3>{selectedGame.name}</h3>

            <p>
              {selectedGame.platforms?.length > 0
                ? selectedGame.platforms.join(', ')
                : 'Plataformas não informadas'}
            </p>
          </div>
        </section>

        <form className="panel" onSubmit={handleSubmit}>
          <div className="panel-header">
            <h3>Configurar lobby</h3>
            <p>Defina como essa partida será montada.</p>
          </div>

          <label>
            Nome da matchmaking
            <input
              value={matchName}
              onChange={(event) => setMatchName(event.target.value)}
              placeholder="Ex: Valorant sexta à noite"
            />
          </label>

          <label>
            Jogadores por time
            <select
              value={teamSize}
              onChange={(event) => setTeamSize(event.target.value)}
            >
              <option value="1">1v1</option>
              <option value="2">2v2</option>
              <option value="3">3v3</option>
              <option value="4">4v4</option>
              <option value="5">5v5</option>
              <option value="6">6v6</option>
            </select>
          </label>

          <label>
            Modo
            <select value={mode} onChange={(event) => setMode(event.target.value)}>
              <option value="Casual">Casual</option>
              <option value="Competitivo">Competitivo</option>
              <option value="Treino">Treino</option>
              <option value="Personalizado">Personalizado</option>
            </select>
          </label>

          {error && <p className="form-error">{error}</p>}

          <button className="primary-button" type="submit">
            Criar matchmaking
          </button>

          <button className="secondary-button" type="button" onClick={onBack}>
            Escolher outro jogo
          </button>
        </form>
      </div>
    </section>
  );
}