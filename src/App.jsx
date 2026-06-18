import { useMemo, useState } from 'react';
import { Trophy, Users, History, Shuffle, Gamepad2 } from 'lucide-react';

import { PlayerForm } from './components/PlayerForm.jsx';
import { PlayerList } from './components/PlayerList.jsx';
import { Matchmaking } from './components/Matchmaking.jsx';
import { MatchHistory } from './components/MatchHistory.jsx';
import { GameSearch } from './components/GameSearch.jsx';
import { CreateMatchmaking } from './components/CreateMatchmaking.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';

const tabs = [
  { id: 'players', label: 'Jogadores', icon: Users },
  { id: 'matchmaking', label: 'Balancear', icon: Shuffle },
  { id: 'history', label: 'Histórico', icon: History },
];

export default function App() {
  const [players, setPlayers] = useLocalStorage('splitgg:players', []);
  const [matches, setMatches] = useLocalStorage('splitgg:matches', []);
  const [selectedGame, setSelectedGame] = useLocalStorage('splitgg:selectedGame', null);
  const [currentMatchmaking, setCurrentMatchmaking] = useLocalStorage(
    'splitgg:currentMatchmaking',
    null
  );

  const [activeTab, setActiveTab] = useState('players');

  const matchmakingPlayers = useMemo(() => {
    if (!currentMatchmaking) return [];

    return players.filter((player) => {
      return player.matchmakingId === currentMatchmaking.id;
    });
  }, [players, currentMatchmaking]);

  const matchmakingMatches = useMemo(() => {
    if (!currentMatchmaking) return [];

    return matches.filter((match) => {
      return match.matchmakingId === currentMatchmaking.id;
    });
  }, [matches, currentMatchmaking]);

  const totalPlayers = matchmakingPlayers.length;
  const totalMatches = matchmakingMatches.length;

  const averageRank = useMemo(() => {
    if (!matchmakingPlayers.length) return 0;

    const total = matchmakingPlayers.reduce((sum, player) => {
      return sum + Number(player.rank);
    }, 0);

    return (total / matchmakingPlayers.length).toFixed(1);
  }, [matchmakingPlayers]);

  function handleSelectGame(game) {
    setSelectedGame(game);
    setCurrentMatchmaking(null);
    setActiveTab('players');
  }

  function handleChangeGame() {
    setSelectedGame(null);
    setCurrentMatchmaking(null);
    setActiveTab('players');
  }

  function handleCreateMatchmaking(matchmaking) {
    setCurrentMatchmaking(matchmaking);
    setActiveTab('players');
  }

  function handleChangeMatchmaking() {
    setCurrentMatchmaking(null);
    setActiveTab('players');
  }

  function addPlayer(player) {
    if (!selectedGame || !currentMatchmaking) return;

    const newPlayer = {
      id: crypto.randomUUID(),
      gameId: selectedGame.id,
      gameName: selectedGame.name,
      matchmakingId: currentMatchmaking.id,
      matchmakingName: currentMatchmaking.name,
      nickname: player.nickname.trim(),
      rank: Number(player.rank),
      role: player.role,
      createdAt: new Date().toISOString(),
    };

    setPlayers((current) => [newPlayer, ...current]);
  }

  function removePlayer(playerId) {
    setPlayers((current) => {
      return current.filter((player) => player.id !== playerId);
    });
  }

  function createMatch(match) {
    if (!selectedGame || !currentMatchmaking) return;

    const newMatch = {
      id: crypto.randomUUID(),
      gameId: selectedGame.id,
      gameName: selectedGame.name,
      gameImage: selectedGame.image,
      matchmakingId: currentMatchmaking.id,
      matchmakingName: currentMatchmaking.name,
      matchmakingMode: currentMatchmaking.mode,
      teamSize: currentMatchmaking.teamSize,
      createdAt: new Date().toISOString(),
      ...match,
    };

    setMatches((current) => [newMatch, ...current]);
    setActiveTab('history');
  }

  function clearHistory() {
    if (!currentMatchmaking) return;

    setMatches((current) => {
      return current.filter((match) => {
        return match.matchmakingId !== currentMatchmaking.id;
      });
    });
  }

  const ActiveIcon = tabs.find((tab) => tab.id === activeTab)?.icon ?? Trophy;

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div>
          <span className="eyebrow">Projeto pessoal</span>
          <h1>Split.gg</h1>
          <p>
            Escolha um jogo, crie uma matchmaking, cadastre os jogadores da sala
            e gere times equilibrados automaticamente.
          </p>
        </div>

        <div className="hero-icon">
          <Trophy size={42} />
        </div>
      </section>

      {!selectedGame && (
        <section className="content-card">
          <header className="section-header">
            <div>
              <span className="eyebrow">Primeiro passo</span>
              <h2>
                <Gamepad2 size={22} />
                Escolher jogo
              </h2>
            </div>
          </header>

          <GameSearch onSelectGame={handleSelectGame} />
        </section>
      )}

      {selectedGame && !currentMatchmaking && (
        <CreateMatchmaking
          selectedGame={selectedGame}
          onCreateMatchmaking={handleCreateMatchmaking}
          onBack={handleChangeGame}
        />
      )}

      {selectedGame && currentMatchmaking && (
        <>
          <section className="selected-game-banner">
            <div className="selected-game-info">
              {selectedGame.image && (
                <img src={selectedGame.image} alt={selectedGame.name} />
              )}

              <div>
                <span className="eyebrow">Matchmaking ativa</span>
                <h2>{currentMatchmaking.name}</h2>

                <p>
                  {selectedGame.name} • {currentMatchmaking.mode} •{' '}
                  {currentMatchmaking.teamSize}v{currentMatchmaking.teamSize}
                </p>
              </div>
            </div>

            <div className="banner-actions">
              <button
                className="secondary-button compact"
                type="button"
                onClick={handleChangeMatchmaking}
              >
                Nova matchmaking
              </button>

              <button
                className="ghost-button"
                type="button"
                onClick={handleChangeGame}
              >
                Trocar jogo
              </button>
            </div>
          </section>

          <section className="stats-grid">
            <article className="stat-card">
              <span>Jogadores na sala</span>
              <strong>
                {totalPlayers}/{currentMatchmaking.totalPlayers}
              </strong>
            </article>

            <article className="stat-card">
              <span>Partidas</span>
              <strong>{totalMatches}</strong>
            </article>

            <article className="stat-card">
              <span>Média de rank</span>
              <strong>{averageRank}</strong>
            </article>
          </section>

          <nav className="tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  className={activeTab === tab.id ? 'tab active' : 'tab'}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <section className="content-card">
            <header className="section-header">
              <div>
                <span className="eyebrow">{selectedGame.name}</span>
                <h2>
                  <ActiveIcon size={22} />
                  {tabs.find((tab) => tab.id === activeTab)?.label}
                </h2>
              </div>
            </header>

            {activeTab === 'players' && (
              <div className="two-columns">
                <PlayerForm onAddPlayer={addPlayer} />
                <PlayerList
                  players={matchmakingPlayers}
                  onRemovePlayer={removePlayer}
                />
              </div>
            )}

            {activeTab === 'matchmaking' && (
              <Matchmaking
                players={matchmakingPlayers}
                matchmaking={currentMatchmaking}
                onCreateMatch={createMatch}
              />
            )}

            {activeTab === 'history' && (
              <MatchHistory
                matches={matchmakingMatches}
                onClearHistory={clearHistory}
              />
            )}
          </section>
        </>
      )}
    </main>
  );
}