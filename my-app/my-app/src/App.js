import React, { useState } from 'react';
import './App.css';
import MatchPageOrlando from './MatchPageOrlando'; // 🟣 Orlando vs Chicago
import MatchPageKC from './MatchPageKC';           // 🔵 KC vs NC

function App() {
  const [showMatchDropdown, setShowMatchDropdown] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState('');
  const [redirect, setRedirect] = useState(false);

  const matches = [
    "Orlando Pride vs Chicago RS",
    "KC Current vs NC Courage",
    "Washington vs Bay",
    "Gotham vs Portland Thorns",
    "Orlando Pride vs KC Current",
    "Orlando Pride vs Washington"
  ];

  const handleMatchSelect = (e) => {
    setSelectedMatch(e.target.value);
    setRedirect(true);
  };

  const handleBack = () => {
    setRedirect(false);
    setSelectedMatch('');
  };

  // 🔁 Show correct page depending on match
  if (redirect) {
    if (selectedMatch === "Orlando Pride vs Chicago RS") {
      return <MatchPageOrlando selectedMatch={selectedMatch} onBack={handleBack} />;
    } else if (selectedMatch === "KC Current vs NC Courage") {
      return <MatchPageKC selectedMatch={selectedMatch} onBack={handleBack} />;
    } else {
      return (
        <div className="App">
          <button className="back-button" onClick={handleBack}>← Back</button>
          <h2>🚧 Coming Soon</h2>
          <p>Match analysis for "{selectedMatch}" is not available yet.</p>
        </div>
      );
    }
  }

  // Default homepage
  return (
    <div className="App">
      <header className="App-header">
        <img src="/xGenius.png" className="App-logo" alt="XGenius Banner" />

        <div className="button-group">
          <button onClick={() => setShowMatchDropdown(!showMatchDropdown)}>
            Game Analysis
          </button>
        </div>

        {showMatchDropdown && (
          <div className="input-group">
            <select
              value={selectedMatch}
              onChange={handleMatchSelect}
            >
              <option value="">Select a match</option>
              {matches.map((match, index) => (
                <option key={index} value={match}>
                  {match}
                </option>
              ))}
            </select>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
