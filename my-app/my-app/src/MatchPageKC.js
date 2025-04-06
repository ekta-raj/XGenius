import React, { useState } from 'react';
import './MatchPage.css';

const kcLogo = "/kc_current_logo.png";
const ncLogo = "/nc_courage_logo.png";
const matchImage = "/match1_kc_nc.png"; // the center field image

const playerStats = {
  18897: { name: "Ryan Williams", total_oris: 70.59, avg_risk: 61.29 },
  22541: { name: "Débora Cristiane de Oliveira", total_oris: 32.34, avg_risk: 63.52 },
  22687: { name: "Narumi Miura", total_oris: -5.09, avg_risk: 48.02 },
  22731: { name: "Nichelle Prince", total_oris: 1.87, avg_risk: 54.85 },
  52566: { name: "Alana Simone Cook", total_oris: -5.43, avg_risk: 68.17 },
  57135: { name: "Casey Murphy", total_oris: -0.1, avg_risk: 65.54 },
  57136: { name: "Denise O'Sullivan", total_oris: 52.13, avg_risk: 53.69 },
  57140: { name: "Kaleigh Kurtz", total_oris: 11.93, avg_risk: 63.45 },
  57142: { name: "Meredith Speck", total_oris: 3.28, avg_risk: 58.22 },
  57144: { name: "Hailie Mace", total_oris: 2.67, avg_risk: 53.04 },
  62480: { name: "Kerolin", total_oris: 45.83, avg_risk: 56.07 },
  63353: { name: "Bianca St-Georges", total_oris: -3.63, avg_risk: 61.69 },
  63796: { name: "Felicitas Rauch", total_oris: 38.88, avg_risk: 63.8 },
  75099: { name: "Ashley Sanchez", total_oris: 17.11, avg_risk: 59.35 },
  143889: { name: "Cortnee Vine", total_oris: 11.72, avg_risk: 68.3 },
  151115: { name: "Bailey Feist", total_oris: 3.23, avg_risk: 48.21 },
  151129: { name: "Kayla Sharples", total_oris: 6.02, avg_risk: 60.27 },
  151129: { name: "Vanessa Sue DiBernardo", total_oris: 14.23, avg_risk: 50.79 },
  151139: { name: "Lo’eau LaBonta", total_oris: 5.95, avg_risk: 62.32 },
  188178: { name: "Michelle Cooper", total_oris: 32.2, avg_risk: 60.52 },
  186262: { name: "Manaka Matsukubo", total_oris: 21.56, avg_risk: 57.37 },
  188659: { name: "Aline Gomes Amaro", total_oris: 37.94, avg_risk: 61.85 },
  617125: { name: "Olivia Wingate", total_oris: 15.6, avg_risk: 53.51 },
  617127: { name: "Haley Hopkins", total_oris: 4.7, avg_risk: 2.35 },
  816480: { name: "Temwa Chaŵinga", total_oris: 44.95, avg_risk: 64.28 },
  816482: { name: "Claire Hutton", total_oris: 14.44, avg_risk: 59.06 },
  816481: { name: "Ellie Wheeler", total_oris: 20.9, avg_risk: 59.49 },
};

const MatchPage = ({ selectedMatch, onBack }) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const handleClick = (playerId) => {
    setSelectedPlayerId(playerId);
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

      {/* Team Layout */}
      <div className="field-layout">
        <div className="team-col left">
          <h3>KC Current (4-3-3)</h3>
          <ul>
            {renderPlayer(0, "1 Almuth Schult")}
            {renderPlayer(57144, "4 Hailie Mace")}
            {renderPlayer(816481, "5 Ellie Wheeler")}
            {renderPlayer(816480, "6 Temwa Chaŵinga")}
            {renderPlayer(151139, "10 Lo’eau LaBonta")}
            {renderPlayer(816482, "14 Claire Hutton")}
            {renderPlayer(52566, "15 Alana Cook")}
            {renderPlayer(151129, "16 Vanessa DiBernardo")}
            {renderPlayer(188178, "17 Michelle Cooper")}
            {renderPlayer(151129, "27 Kayla Sharples")}
            {renderPlayer(22541, "99 Debinha")}
            <li><strong>BENCH</strong></li>
            {renderPlayer(0, "21 Adrianna Franch")}
            {renderPlayer(0, "7 Elizabeth Ball")}
            {renderPlayer(22731, "8 Nichelle Prince")}
            {renderPlayer(0, "11 Desiree Scott")}
            {renderPlayer(0, "12 Stine Pedersen")}
            {renderPlayer(0, "18 Isabel Rodriguez")}
            {renderPlayer(151115, "22 Bayley Feist")}
            {renderPlayer(0, "25 Kristen Hamilton")}
            {renderPlayer(0, "33 Mwanalima Jereko")}
          </ul>
        </div>

        <div className="formation-image">
        <img src="/match1_kc_nc.png" alt="Formation Overview" />
    </div>

        <div className="team-col right">
          <h3>NC Courage (4-3-3)</h3>
          <ul>
            {renderPlayer(57135, "1 Casey Murphy")}
            {renderPlayer(75099, "2 Ashley Sanchez")}
            {renderPlayer(57140, "3 Kaleigh Kurtz")}
            {renderPlayer(22687, "6 Narumi Miura")}
            {renderPlayer(0, "7 Malia Berkely")}
            {renderPlayer(62480, "9 Kerolin")}
            {renderPlayer(57136, "10 Denise O’Sullivan")}
            {renderPlayer(63796, "11 Felicitas Rauch")}
            {renderPlayer(18897, "13 Ryan Williams")}
            {renderPlayer(186262, "34 Manaka Matsukubo")}
            {renderPlayer(188659, "77 Aline")}
            <li><strong>BENCH</strong></li>
            {renderPlayer(0, "51 Hensley Hancuff")}
            {renderPlayer(617127, "5 Haley Hopkins")}
            {renderPlayer(0, "14 Tyler Lussi")}
            {renderPlayer(0, "16 Riley Jackson")}
            {renderPlayer(0, "17 Dani Weatherholt")}
            {renderPlayer(617125, "20 Olivia Wingate")}
            {renderPlayer(143889, "22 Cortnee Vine")}
            {renderPlayer(63353, "23 Bianca St-Georges")}
            {renderPlayer(57142, "25 Meredith Speck")}
          </ul>
        </div>
      </div>

      <div className="logos">
        <img src={kcLogo} alt="KC Current" />
        <img src={ncLogo} alt="NC Courage" />
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
            src="/plot_kc_nc.html"
            width="100%"
            height="600"
            style={{ border: 'none', marginTop: '20px', borderRadius: '10px' }}
            title="ORIS vs Risk Scatter"
        ></iframe>
    </div>


    <div className="heatmaps">
        <div className="heatmap">
            <img src="/heatmap_kc_vs_nc.png" alt="KC vs NC Heatmap" />
            <p className="caption">🔍 KC's Off-Ball Impact vs NC – Shows where KC's runs led to high shot probability.</p>
        </div>
        <div className="heatmap">
            <img src="/heatmap_nc_vs_kc.png" alt="NC vs KC Heatmap" />
            <p className="caption">🔍 NC's Off-Ball Impact vs KC – Highlights how NC created opportunities with off-ball runs.</p>
        </div>
    </div>


        <div className="oris-comparison">
            <div className="oris-plot">
                <img src="/bar_avg_oris_kc_vs_nc.png" alt="KC ORIS Comparison" />
                <p className="caption">📊 KC's Off-Ball Impact vs. Shots – Higher ORIS scores are strongly associated with shots taken.</p>
            </div>
            <div className="oris-plot">
                <img src="/bar_avg_oris_nc_vs_kc.png" alt="NC ORIS Comparison" />
                <p className="caption">📊 NC's Off-Ball Impact vs. Shots – Highlights how off-ball efforts translate to shot outcomes.</p>
            </div>
        </div>


      {/* Interactive Top Influencers */}
      <section className="viz-section">
        <h4>🌟 Top 5 Off-Ball Influencers</h4>
        <p>This interactive chart compares the top 5 players by total ORIS, average ORIS, and success rate. Use this to identify key tactical influencers in the match.</p>
        <iframe src="/top5_oris_kc_nc.html" title="Top 5 Influencers" width="100%" height="500" frameBorder="0" />
      </section>

      {/* Player Info Popup */}
      {selectedPlayerId && playerStats[selectedPlayerId] && (
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
