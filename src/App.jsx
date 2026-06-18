import { useMemo, useState } from 'react';
import { Trophy, Users, History, Shuffle } from 'lucide-react';

import { PlayerForm } from './components/PlayerForm.jsx';
import { PlayerList } from './components/PlayerList.jsx';
import { Matchmaking } from './components/Matchmaking.jsx';
import { MatchHistory } from './components/MatchHistory.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';

const tabs = [
  { id: 'players', label: 'Jogadores', icon: Users },
  { id: 'matchmaking', label: 'Balancear', icon: Shuffle },
  { id: 'history', label: 'Histórico', icon: History },
];

export default function App() {
  const [players, setPlayers] = useLocalStorage('splitgg:players', []);
  const [matches, setMatches] = useLocalStorage('splitgg:matches', []);
  const [activeTab, setActiveTab] = useState('players');

  const totalPlayers = players.length;
  const totalMatches = matches.length;
  const averageRank = useMemo(() => {
    if (!players.length) return 0;
    const total = players.reduce((sum, player) => sum + Number(player.rank), 0);
    return (total / players.length).toFixed(1);
  }, [players]);

  function addPlayer(player) {
    const newPlayer = {
      id: crypto.randomUUID(),
      nickname: player.nickname.trim(),
      rank: Number(player.rank),
      role: player.role,
      createdAt: new Date().toISOString(),
    };

    setPlayers((current) => [newPlayer, ...current]);
  }

  function removePlayer(playerId) {
    setPlayers((current) => current.filter((player) => player.id !== playerId));
  }

  function createMatch(match) {
    setMatches((current) => [
      {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...match,
      },
      ...current,
    ]);
    setActiveTab('history');
  }

  function clearHistory() {
    setMatches([]);
  }

  const ActiveIcon = tabs.find((tab) => tab.id === activeTab)?.icon ?? Trophy;

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div>
          <h1>Split.gg</h1>
          <p>
            Cadastre jogadores, informe nível e função, selecione a galera da partida
            e gere dois times equilibrados automaticamente.
          </p>
        </div>

        <div className="hero-icon">
          <Trophy size={42} />
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Jogadores</span>
          <strong>{totalPlayers}</strong>
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
            <span className="eyebrow">Split.gg</span>
            <h2>
              <ActiveIcon size={22} />
              {tabs.find((tab) => tab.id === activeTab)?.label}
            </h2>
          </div>
        </header>

        {activeTab === 'players' && (
          <div className="two-columns">
            <PlayerForm onAddPlayer={addPlayer} />
            <PlayerList players={players} onRemovePlayer={removePlayer} />
          </div>
        )}

        {activeTab === 'matchmaking' && (
          <Matchmaking players={players} onCreateMatch={createMatch} />
        )}

        {activeTab === 'history' && (
          <MatchHistory matches={matches} onClearHistory={clearHistory} />
        )}
      </section>
    </main>
  );
}
