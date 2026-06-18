import { useState } from 'react';
import { Plus } from 'lucide-react';

import { ranks, roles } from '../constants/options.js';

export function PlayerForm({ onAddPlayer }) {
  const [nickname, setNickname] = useState('');
  const [rank, setRank] = useState('5');
  const [role, setRole] = useState('Flex');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!nickname.trim()) {
      setError('Informe o nickname do jogador.');
      return;
    }

    onAddPlayer({ nickname, rank, role });
    setNickname('');
    setRank('5');
    setRole('Flex');
    setError('');
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <div className="panel-header">
        <h3>Cadastrar jogador</h3>
        <p>Adicione nickname, nível de habilidade e função principal.</p>
      </div>

      <label>
        Nickname
        <input
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />
      </label>

      <label>
        Rank
        <select value={rank} onChange={(event) => setRank(event.target.value)}>
          {ranks.map((rankOption) => (
            <option key={rankOption} value={rankOption}>
              {rankOption}
            </option>
          ))}
        </select>
      </label>

      <label>
        Função
        <select value={role} onChange={(event) => setRole(event.target.value)}>
          {roles.map((roleOption) => (
            <option key={roleOption} value={roleOption}>
              {roleOption}
            </option>
          ))}
        </select>
      </label>

      {error && <p className="form-error">{error}</p>}

      <button className="primary-button" type="submit">
        <Plus size={18} />
        Adicionar jogador
      </button>
    </form>
  );
}
