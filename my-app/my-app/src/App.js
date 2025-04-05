import React, { useState } from 'react';
import './App.css';

function App() {
  const [showPlayerSearch, setShowPlayerSearch] = useState(false);
  const [showTeamSearch, setShowTeamSearch] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [teamName, setTeamName] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <img src="/xGenius.png" className="App-logo" alt="XGenius Banner" />

        <div className="button-group">
          <button onClick={() => setShowPlayerSearch(!showPlayerSearch)}>Player Profile</button>
          <button onClick={() => setShowTeamSearch(!showTeamSearch)}>Team Profile</button>
        </div>

        {showPlayerSearch && (
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter player name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </div>
        )}

        {showTeamSearch && (
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
