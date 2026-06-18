import { useMemo, useState } from 'react';
import { Shuffle } from 'lucide-react';

import { balanceTeams } from '../utils/balanceTeams.js';
import { TeamCard } from './TeamCard.jsx';

export function Matchmaking({ players, onCreateMatch }) {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [balancedMatch, setBalancedMatch] = useState(null);
  const [error, setError] = useState('');

  const selectedObjects = useMemo(() => {
    return players.filter((player) => selectedPlayers.includes(player.id));
  }, [players, selectedPlayers]);

  function togglePlayer(playerId) {
    setSelectedPlayers((current) => {
      if (current.includes(playerId)) {
        return current.filter((id) => id !== playerId);
      }

      return [...current, playerId];
    });
    setBalancedMatch(null);
    setError('');
  }

  function handleBalance() {
    try {
      const result = balanceTeams(selectedObjects);
      setBalancedMatch(result);
      setError('');
    } catch (exception) {
      setError(exception.message);
    }
  }

  function handleSaveMatch() {
    if (!balancedMatch) return;

    onCreateMatch({
      teamA: balancedMatch.teamA,
      teamB: balancedMatch.teamB,
      scoreA: balancedMatch.scoreA,
      scoreB: balancedMatch.scoreB,
      difference: balancedMatch.difference,
    });

    setSelectedPlayers([]);
    setBalancedMatch(null);
  }

  return (
    <div className="matchmaking-layout">
      <section className="panel">
        <div className="panel-header">
          <h3>Selecionar jogadores</h3>
          <p>Escolha quem vai participar da próxima partida.</p>
        </div>

        {players.length === 0 ? (
          <div className="empty-state">
            Cadastre jogadores antes de balancear.
          </div>
        ) : (
          <div className="selection-list">
            {players.map((player) => (
              <button
                key={player.id}
                type="button"
                className={
                  selectedPlayers.includes(player.id)
                    ? 'selection-card selected'
                    : 'selection-card'
                }
                onClick={() => togglePlayer(player.id)}
              >
                <span>
                  <strong>{player.nickname}</strong>
                  <small>{player.role}</small>
                </span>

                <span className="rank-badge">Rank {player.rank}</span>
              </button>
            ))}
          </div>
        )}

        {error && <p className="form-error">{error}</p>}

        <button
          className="primary-button"
          type="button"
          onClick={handleBalance}
          disabled={selectedPlayers.length < 2}
        >
          <Shuffle size={18} />
          Balancear times
        </button>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>Resultado</h3>
          <p>
            {balancedMatch
              ? `Diferença entre os times: ${balancedMatch.difference}`
              : 'O resultado aparecerá aqui.'}
          </p>
        </div>

        {!balancedMatch ? (
          <div className="empty-state">
            Selecione os jogadores e clique em balancear.
          </div>
        ) : (
          <>
            <div className="teams-grid">
              <TeamCard title="Time A" players={balancedMatch.teamA} score={balancedMatch.scoreA} />
              <TeamCard title="Time B" players={balancedMatch.teamB} score={balancedMatch.scoreB} />
            </div>

            <button className="secondary-button" type="button" onClick={handleSaveMatch}>
              Salvar no histórico
            </button>
          </>
        )}
      </section>
    </div>
  );
}
