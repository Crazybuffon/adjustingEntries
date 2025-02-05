/***********************************************************
 * main.js
 * 
 * The main entry point:
 *  - On DOMContentLoaded, render scenarios & trial balance
 *  - "Next Scenario" button
 ***********************************************************/

/**
 * Reload or re-init for a new random scenario set.
 */
function goToNextScenario() {
    window.location.reload();
  }
  
  /**
   * Set up everything once the page is loaded.
   */
  document.addEventListener('DOMContentLoaded', () => {
    renderScenarios();
    renderTrialBalance(); 
    renderClosingEntries(); 
  
    // Force the initial tab to be the Trial Balance
    openTab('trialBalanceTab', document.querySelector('.tab'));
  });
  
  