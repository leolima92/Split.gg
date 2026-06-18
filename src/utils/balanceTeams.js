function getTeamScore(team) {
  return team.reduce((sum, player) => sum + Number(player.rank), 0);
}

export function balanceTeams(players) {
  if (players.length < 2) {
    throw new Error('Selecione pelo menos 2 jogadores.');
  }

  const sortedPlayers = [...players].sort((a, b) => Number(b.rank) - Number(a.rank));

  const teamA = [];
  const teamB = [];

  sortedPlayers.forEach((player) => {
    const scoreA = getTeamScore(teamA);
    const scoreB = getTeamScore(teamB);

    if (scoreA <= scoreB) {
      teamA.push(player);
    } else {
      teamB.push(player);
    }
  });

  return {
    teamA,
    teamB,
    scoreA: getTeamScore(teamA),
    scoreB: getTeamScore(teamB),
    difference: Math.abs(getTeamScore(teamA) - getTeamScore(teamB)),
  };
}
