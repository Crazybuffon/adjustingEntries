/***********************************************************
 * tabs.js
 * 
 * Manages switching between the 3 tabs (Trial Balance,
 * Income Statement, Balance Sheet).
 ***********************************************************/

/**
 * Open a tab by ID, and highlight the clicked button.
 */
// tabs.js

function openTab(tabId, btn) {
  if (btn.disabled) {
    alert("Please complete the previous step first!");
    return;
  }

  // Hide all content
  const contents = document.getElementsByClassName('content');
  for (let c of contents) {
    c.classList.remove('active');
  }

  // Remove .active from all tab buttons
  const tabs = document.getElementsByClassName('tab');
  for (let t of tabs) {
    t.classList.remove('active');
  }

  // Show the chosen tab
  document.getElementById(tabId).classList.add('active');
  btn.classList.add('active');

  // Trigger rendering functions when specific tabs are opened
  if (tabId === 'balanceSheetTab') {
    renderReadOnlyTB_BalanceSheet(); 
  } else if (tabId === 'incomeStatementTab') {
    renderReadOnlyTB_IncomeStatement(); 
  } else if (tabId === 'closingEntriesTab') {
    renderClosingEntries(); 
  }
}
  
  
  