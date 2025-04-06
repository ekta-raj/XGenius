import React, { useState } from 'react';
import './MatchPage.css';

const orlandoLogo = "/orlando_pride_logo.png";
const chicagoLogo = "/chicago_red_stars_logo.png";
const heatmapOrlando = "/heatmap_orlando_vs_chicago.png";
const heatmapChicago = "/heatmap_chicago_vs_orlando.png";
const barChart = "/bar_avg_oris_Orlando_Pride_vs_Chicago_RS_4_1.png";
const barChartChicago = "bar_avg_oris_Chicago_RS_vs_Orlando_Pride_1_4.png";
const interactiveHTML = "/top5_oris_interactive.html";

const playerStats = {
  149873: { name: "Anna Moorhouse", total_oris: -0.11, avg_risk: 67.42 },
  441597: { name: "Emily Sams", total_oris: 11.88, avg_risk: 64.75 },
  149954: { name: "Kylie Strom", total_oris: 3.03, avg_risk: 63.4 },
  22542: { name: "Marta", total_oris: 15.17, avg_risk: 50.34 },
  151602: { name: "Ally Watt", total_oris: 47.52, avg_risk: 55.67 },
  62389: { name: "Angelina", total_oris: 34.8, avg_risk: 58.9 },
  62445: { name: "Barbra Banda", total_oris: 88.58, avg_risk: 54.62 },
  149882: { name: "Kerry Abello", total_oris: 37.18, avg_risk: 57.76 },
  610122: { name: "Summer Yates", total_oris: 10.47, avg_risk: 55.44 },
  817541: { name: "Cori Dyke", total_oris: 30.43, avg_risk: 61.45 },
  57138: { name: "Carson Pickett", total_oris: 9.95, avg_risk: 39.06 },
  63540: { name: "Adriana", total_oris: 48.18, avg_risk: 52.29 },
  156934: { name: "Viviana Villacorta", total_oris: -0.53, avg_risk: 48.74 },
  22814: { name: "Morgan Gautrat", total_oris: 13.62, avg_risk: 54.19 },
  151077: { name: "Julie Doyle", total_oris: 19.22, avg_risk: 52.42 },
  817610: { name: "Jameese Joseph", total_oris: 21.32, avg_risk: 54.54 },
  22809: { name: "Alyssa Naeher", total_oris: 25.94, avg_risk: 66.82 },
  57146: { name: "Cari Roccaro", total_oris: 7.39, avg_risk: 63.88 },
  22810: { name: "Mallory Swanson", total_oris: 25.94, avg_risk: 53.35 },
  151149: { name: "Shea Groom", total_oris: 13.07, avg_risk: 52.58 },
  57112: { name: "Natalia Kuikka", total_oris: 17.71, avg_risk: 66.46 },
  817547: { name: "Bea Franklin", total_oris: 1.17, avg_risk: 71.27 },
  22723: { name: "Julia Grosso", total_oris: 13.54, avg_risk: 62.59 },
  151186: { name: "Taylor Malham", total_oris: 20.3, avg_risk: 68.51 },
  627434: { name: "Ally Schlegel", total_oris: 4.39, avg_risk: 62.87 },
  816413: { name: "Hannah Anderson", total_oris: -0.23, avg_risk: 68.49 },
};

const MatchPage = ({ selectedMatch, onBack }) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const handleClick = (playerId) => {
    setSelectedPlayerId(playerId === selectedPlayerId ? null : playerId);
  };

  const renderPlayer = (id, label) => (
    <li onClick={() => handleClick(id)} key={id}>
      {label}
    </li>
  );

  return (
    <div className="match-page">
      <button className="back-button" onClick={onBack}>← Back</button>
      <h1>{selectedMatch}</h1>

      <div className="field-layout">
        <div className="team-col left">
          <h3>Pride (4-4-2)</h3>
          <ul>
            {renderPlayer(149873, "1 Anna Moorhouse")}
            {renderPlayer(441597, "2 Haley Hanson")}
            {renderPlayer(149954, "3 Kylie Strom")}
            {renderPlayer(22542, "6 Emily Sams")}
            {renderPlayer(22542, "10 Marta")}
            {renderPlayer(151602, "11 Ally Watt")}
            {renderPlayer(62389, "12 Angelina")}
            {renderPlayer(62445, "22 Barbra Banda")}
            {renderPlayer(149882, "25 Kerry Abello")}
            {renderPlayer(610122, "28 Summer Yates")}
            {renderPlayer(817541, "31 Cori Dyke")}
            <li><strong>BENCH</strong></li>
            {renderPlayer(57138, "19 Carson Pickett")}
            {renderPlayer(63540, "9 Adriana")}
            {renderPlayer(22814, "16 Morgan Gautrat")}
            {renderPlayer(156934, "14 Viviana Villacorta")}
            {renderPlayer(151077, "20 Julie Doyle")}
            {renderPlayer(817610, "33 Ally Lemos")}
          </ul>
        </div>

    <div className="formation-image">
        <img src="/match1.png" alt="Formation Overview" />
    </div>


        <div className="team-col right">
          <h3>Red Stars (4-2-3-1)</h3>
          <ul>
            {renderPlayer(22809, "1 Alyssa Naeher")}
            {renderPlayer(57146, "4 Cari Roccaro")}
            {renderPlayer(817610, "8 Jameese Joseph ⚽")}
            {renderPlayer(22810, "9 Mallory Swanson")}
            {renderPlayer(151149, "10 Shea Groom")}
            {renderPlayer(57112, "12 Natalia Kuikka")}
            {renderPlayer(817547, "20 Bea Franklin")}
            {renderPlayer(22723, "21 Julia Grosso")}
            {renderPlayer(151186, "32 Taylor Malham")}
            {renderPlayer(627434, "34 Ally Schlegel")}
            {renderPlayer(816413, "41 Hannah Anderson")}
            <li><strong>BENCH</strong></li>
            {renderPlayer(62385, "5 Julia Bianchi")}
            {renderPlayer(22814, "13 Leilanni Nesbeth")}
            {renderPlayer(340954, "24 Jenna Bike")}
            {renderPlayer(817614, "33 Ally Cook")}
          </ul>
        </div>
      </div>

      <div className="logos">
          <img src={orlandoLogo} alt="Orlando Pride" />
          <img src={chicagoLogo} alt="Chicago Red Stars" />
      </div>

      <div className="graph-section">
        <h2>🧠 ORIS vs Risk Score: Player Scouting Quadrants</h2>
        <p>
            This interactive visualization maps <strong>each player's average risk score</strong> against their
            <strong> total ORIS (off-ball impact)</strong>. 
            The plot is divided into quadrants to help coaches and analysts identify players who are both 
            <em>high-impact</em> and <em>high-risk-tolerant</em> — ideal traits for creating match-changing plays.
        </p>

        <iframe
            src="/plot.html"
            width="100%"
            height="600"
            style={{ border: 'none', marginTop: '20px', borderRadius: '10px' }}
            title="ORIS vs Risk Scatter"
        ></iframe>
    </div>

      <div className="heatmaps">
        <div className="heatmap">
            <img src="/heatmap_orlando_vs_chicago.png" alt="Orlando vs Chicago Heatmap" />
            <p className="caption">🔍 Orlando's Off-Ball Impact vs Chicago – Shows where Orlando's runs led to high shot probability.</p>
        </div>
        <div className="heatmap">
            <img src="/heatmap_chicago_vs_orlando.png" alt="Chicago vs Orlando Heatmap" />
            <p className="caption">🔍 Chicago's Off-Ball Impact vs Orlando – Highlights how Chicago created opportunities with off-ball runs.</p>
        </div>
    </div>


        <div className="oris-comparison">
            <div className="oris-plot">
                <img src="/bar_avg_oris_Orlando_Pride_vs_Chicago_RS_4_1.png" alt="Orlando ORIS Comparison" />
                <p className="caption">📊 Orlando's Off-Ball Impact vs. Shots – Higher ORIS scores are strongly associated with shots taken.</p>
            </div>
            <div className="oris-plot">
                <img src="/bar_avg_oris_Chicago_RS_vs_Orlando_Pride_1_4.png" alt="Chicago ORIS Comparison" />
                <p className="caption">📊 Chicago's Off-Ball Impact vs. Shots – Highlights how off-ball efforts translate to shot outcomes.</p>
            </div>
        </div>


      <div className="interactive-section">
        <h3>Top 5 Off-Ball Influencers</h3>
        <iframe
          src={interactiveHTML}
          title="Top ORIS Influencers"
          width="100%"
          height="600px"
          frameBorder="0"
        />
        <p className="plot-desc">
          This interactive chart compares the total ORIS, average ORIS, and pass reception success rates
          of the top 5 players across the match. It’s a great tool for scouts or coaches evaluating influence.
        </p>
      </div>


      {selectedPlayerId && (
        <div className="popup">
          <div className="popup-content">
            <h4>{playerStats[selectedPlayerId].name}</h4>
            <p><strong>Total ORIS:</strong> {playerStats[selectedPlayerId].total_oris}</p>
            <p><strong>Avg Risk Score:</strong> {playerStats[selectedPlayerId].avg_risk}</p>
            <button className="close-button" onClick={() => setSelectedPlayerId(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchPage;
