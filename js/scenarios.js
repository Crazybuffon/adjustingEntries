/***********************************************************
 * scenarios.js
 * 
 * Handles selection of random scenarios from allScenarios
 * (which comes from scenarioData.js), and displays them.
 ***********************************************************/

const scenariosPerPage = 5;
let chosenScenarioIndices = [];

/**
 * Render 5 random scenarios in the #scenariosRow container.
 */
function renderScenarios() {
  const row = document.getElementById('scenariosRow');
  row.innerHTML = "";

  // Create array of all scenario indices
  let indices = allScenarios.map((_, i) => i);
  // Shuffle
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Pick the first 5
  chosenScenarioIndices = indices.slice(0, scenariosPerPage);

  // Render each chosen scenario
  chosenScenarioIndices.forEach(idx => {
    let sc = allScenarios[idx];
    let card = document.createElement('div');
    card.className = "scenario-card";
    card.innerHTML = `
      <h4>${sc.title}</h4>
      <p>${sc.description}</p>
      <button class="scenario-hint-btn" onclick="showScenarioHint(${idx})">Hint</button>
    `;
    row.appendChild(card);
  });
}

/**
 * Show a hint for a particular scenario in an alert.
 */
function showScenarioHint(idx) {
  alert(allScenarios[idx].hint || "No hint available.");
}
