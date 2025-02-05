/***********************************************************
 * trialBalance.js
 * 
 * All logic related to:
 *  - Building and rendering the Trial Balance
 *  - Adding rows and selecting accounts via dropright
 *  - Checking the TB against the correct final version
 *  - Showing the correct TB (modal)
 ***********************************************************/

// In-memory variables
let storedOriginalTB = [];       // The final correct TB after scenario
let usedAccountsSet = new Set(); // Track used accounts in TB dropright

/**
 * Build & render the user's initial Trial Balance,
 * and store the final correct TB in storedOriginalTB.
 */
function renderTrialBalance() {
  usedAccountsSet.clear();
  const tbody = document.getElementById('trialBalanceRows');
  tbody.innerHTML = "";

  // Step 1: Build the user's initial TB (excluding prepaids/unearneds)
  let userStartingTB = buildInitialTBWithOppositePreUnearned();

  // Render each line
  userStartingTB.forEach(item => {
    usedAccountsSet.add(item.account.toLowerCase());
    const tr = document.createElement('tr');
    tr.setAttribute('data-fixed', 'true');
    tr.innerHTML = `
      <td>${item.account}</td>
      <td contenteditable="true">${formatNumberForTB(item.debit)}</td>
      <td contenteditable="true">${formatNumberForTB(item.credit)}</td>
    `;
    tr.addEventListener('input', updateTotals);
    tbody.appendChild(tr);
  });

  updateTotals();

  // Step 2: Build the final correct TB after scenario adjustments
  let finalCorrect = JSON.parse(JSON.stringify(userStartingTB));
  finalCorrect = applyScenarioEffectsAndRebalance(finalCorrect);
  storedOriginalTB = finalCorrect;
}

/**
 * Build initial TB that excludes explicit prepaids/unearneds,
 * but offsets them with opposite side if the scenario involves them.
 */
function buildInitialTBWithOppositePreUnearned() {
  let initTB = [];

  // Copy all originalTB lines except the ones starting with "Prepaid" or "Unearned"
  originalTB.forEach(item => {
    let lc = item.account.toLowerCase();
    if (lc.startsWith("prepaid") || lc.startsWith("unearned")) {
      // skip
    } else {
      initTB.push({
        account: item.account,
        debit: item.debit,
        credit: item.credit
      });
    }
  });

  // Gather net effect for all scenarios for "prepaid"/"unearned"
  let scenarioPreUnearnedTotals = {};
  chosenScenarioIndices.forEach(idx => {
    let sc = allScenarios[idx];
    sc.netEffect.forEach(line => {
      let lc = line.account.toLowerCase();
      if (lc.startsWith("prepaid") || lc.startsWith("unearned")) {
        let net = line.debit - line.credit;
        if (!scenarioPreUnearnedTotals[lc]) {
          scenarioPreUnearnedTotals[lc] = { account: line.account, net: 0 };
        }
        scenarioPreUnearnedTotals[lc].net += net;
      }
    });
  });

  // For each Prepaid/Unearned net sum, put it on the opposite side
  for (let accLC in scenarioPreUnearnedTotals) {
    let netSum = scenarioPreUnearnedTotals[accLC].net;
    let accName = scenarioPreUnearnedTotals[accLC].account;
    if (Math.abs(netSum) > 0.0001) {
      let debitVal = 0, creditVal = 0;
      if (netSum > 0) {
        creditVal = netSum;
      } else {
        debitVal = Math.abs(netSum);
      }
      initTB.push({
        account: accName,
        debit: debitVal,
        credit: creditVal
      });
    }
  }

  // Balance via revenue
  balanceViaRevenue(initTB);
  return initTB;
}

/**
 * After building the initial TB, apply the chosen scenarios' net effects
 * and then rebalance via 'Revenue'.
 */
function applyScenarioEffectsAndRebalance(tbArr) {
  let map = {};
  tbArr.forEach(item => {
    map[item.account.toLowerCase()] = item;
  });

  chosenScenarioIndices.forEach(idx => {
    let sc = allScenarios[idx];
    sc.netEffect.forEach(line => {
      let key = line.account.toLowerCase();
      if (!map[key]) {
        tbArr.push({
          account: line.account,
          debit: line.debit,
          credit: line.credit
        });
        map[key] = tbArr[tbArr.length - 1];
      } else {
        map[key].debit += line.debit;
        map[key].credit += line.credit;
      }
    });
  });

  // Rebalance
  balanceViaRevenue(tbArr);
  return tbArr;
}

/**
 * Update the debit/credit totals in the TB UI, 
 * plus re-render the read-only TB for IS/BS.
 */
function updateTotals() {
  let rows = document.querySelectorAll('#trialBalanceRows tr');
  let totD = 0, totC = 0;
  rows.forEach(r => {
    let tds = r.querySelectorAll('td');
    if (tds.length < 3) return;
    let d = parseFloat(tds[1].textContent) || 0;
    let c = parseFloat(tds[2].textContent) || 0;
    totD += d;
    totC += c;
  });
  document.getElementById('tbTotalDebit').textContent = formatNumberForTB(totD);
  document.getElementById('tbTotalCredit').textContent = formatNumberForTB(totC);

  // Re-render read-only TB for Income Statement
  renderReadOnlyTB_IncomeStatement();

  // Re-render read-only TB for Balance Sheet
  renderReadOnlyTB_BalanceSheet();
}

/**
 * Add a new blank row to the TB with a dropright account selector.
 */
function addTrialBalanceRow() {
  const tr = document.createElement('tr');
  tr.setAttribute('data-fixed', 'false');
  tr.innerHTML = `
    <td>${createDroprightHTML()}</td>
    <td contenteditable="true">0</td>
    <td contenteditable="true">0</td>
  `;
  tr.addEventListener('input', updateTotals);
  document.getElementById('trialBalanceRows').appendChild(tr);
  updateTotals();
}

/**
 * Revert the Trial Balance to the initial rendered state.
 */
function redoTrialBalance() {
  renderTrialBalance();
}

/**
 * Check the user’s TB vs. the final 'storedOriginalTB'.
 */
function checkTrialBalance() {
  const tbRes = document.getElementById('tbResult');
  tbRes.className = "result";
  tbRes.innerHTML = "";

  clearTrialBalanceHighlights();

  // Build map from correct TB
  let correctMap = buildMapFromTB(storedOriginalTB);
  // Build map from user TB
  let { userMap, rowRef } = getUserTBMapAndRowRefs();

  let allMatch = true;
  // Check if user’s net for each account matches correct net
  for (let acc in correctMap) {
    const needed = correctMap[acc];
    const userVal = userMap[acc] || 0;
    if (Math.abs(needed - userVal) > 0.0001) {
      allMatch = false;
      if (rowRef[acc]) rowRef[acc].classList.add('invalid-row');
    }
  }
  // Check if user has extra accounts that are not in correct
  for (let acc in userMap) {
    if (correctMap[acc] === undefined) {
      allMatch = false;
      if (rowRef[acc]) rowRef[acc].classList.add('invalid-row');
    }
  }

  // Check if balanced at least
  let dt = parseFloat(document.getElementById('tbTotalDebit').textContent) || 0;
  let ct = parseFloat(document.getElementById('tbTotalCredit').textContent) || 0;
  if (Math.abs(dt - ct) > 0.0001) {
    tbRes.classList.add("incorrect-block");
    tbRes.innerHTML = "<h4>❌ Oops not balanced, please check the numbers!</h4>";
    return;
  }

  if (!allMatch) {
    tbRes.classList.add("incorrect-block");
    tbRes.innerHTML = "<h4>❌ Your debits/credits don't match the final scenario-adjusted TB, please check your account names and numbers.</h4>";
    return;
  }

  tbRes.classList.add("correct-block");
  tbRes.innerHTML = "<h4>✅ Excellent! Your TB is correct! Now you can do the Income Statement.</h4>";

  // *** ENABLE THE NEXT TABS ***
  const isBtn = document.getElementById('isTabBtn');
  if (isBtn) {
    isBtn.disabled = false;
  }
  const ceBtn = document.getElementById('ceTabBtn');
  if (ceBtn) {
    ceBtn.disabled = false;
  }
}

/** Remove highlight from all TB rows. */
function clearTrialBalanceHighlights() {
  let rows = document.querySelectorAll('#trialBalanceRows tr');
  rows.forEach(r => r.classList.remove('invalid-row'));
}

/** Build a map of account -> (debit - credit) from a given TB array. */
function buildMapFromTB(tbArray) {
  let map = {};
  tbArray.forEach(it => {
    map[it.account.toLowerCase()] = it.debit - it.credit;
  });
  return map;
}

/** Build a map of account -> (debit - credit) from user’s on-screen TB. */
function getUserTBMapAndRowRefs() {
  let userMap = {}, rowRef = {};
  let rows = document.querySelectorAll('#trialBalanceRows tr');
  rows.forEach(r => {
    let tds = r.querySelectorAll('td');
    if (tds.length < 3) return;

    let accName = "";
    // If data-fixed = true, the account name is just text
    if (r.getAttribute('data-fixed') === "true") {
      accName = tds[0].textContent.trim().toLowerCase();
    } else {
      // else it's using the dropright
      const hidden = tds[0].querySelector('.accHiddenVal');
      accName = hidden ? hidden.value.trim().toLowerCase() : "";
    }
    if (!accName) return;

    let d = parseFloat(tds[1].textContent) || 0;
    let c = parseFloat(tds[2].textContent) || 0;
    let net = d - c;

    if (!userMap[accName]) userMap[accName] = 0;
    userMap[accName] += net;
    rowRef[accName] = r;
  });
  return { userMap, rowRef };
}

/***********************************************************
 * Correct TB Modal
 ***********************************************************/

/**
 * Show the correct TB in a modal.
 */
function showCorrectAnswer() {
  const tbody = document.getElementById('correctAnswerTB');
  tbody.innerHTML = "";

  storedOriginalTB.forEach(item => {
    let tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.account}</td>
      <td>${formatNumberForTB(item.debit)}</td>
      <td>${formatNumberForTB(item.credit)}</td>
    `;
    tbody.appendChild(tr);
  });

  let totD = storedOriginalTB.reduce((s, it) => s + it.debit, 0);
  let totC = storedOriginalTB.reduce((s, it) => s + it.credit, 0);

  document.getElementById('correctTBTotalDebit').textContent = formatNumberForTB(totD);
  document.getElementById('correctTBTotalCredit').textContent = formatNumberForTB(totC);

  document.getElementById('correctAnswerModal').style.display = 'block';
}

/**
 * Close the correct TB modal.
 */
function closeCorrectAnswer() {
  document.getElementById('correctAnswerModal').style.display = 'none';
}

/***********************************************************
 * Dropright Account Selection for new rows
 ***********************************************************/

/** Create the dropright HTML for choosing an unused account. */
function createDroprightHTML() {
  let html = `
    <div class="dropright">
      <button class="dropbtn" onclick="toggleDrop(event, this)">Select Account</button>
      <input type="hidden" class="accHiddenVal"/>
      <div class="dropright-content">
  `;
  for (let cat in cats) {
    html += `
      <div class="submenu">
        <button>${cat}</button>
        <div class="submenu-content">
    `;
    cats[cat].forEach(acc => {
      if (!usedAccountsSet.has(acc.toLowerCase())) {
        html += `<div class="menu-item" data-val="${acc}">${acc}</div>`;
      }
    });
    html += `</div></div>`;
  }
  html += `</div></div>`;
  return html;
}

/** Toggle dropright open/closed. */
function toggleDrop(e, btn) {
  e.stopPropagation();
  const content = btn.parentNode.querySelector('.dropright-content');
  if (!content) return;
  content.style.display = (content.style.display === 'block' ? 'none' : 'block');
}

/** Close all dropright menus if user clicks elsewhere. */
function closeAllDropdowns() {
  const ds = document.getElementsByClassName('dropright-content');
  for (let i = 0; i < ds.length; i++) {
    ds[i].style.display = 'none';
  }
}
document.addEventListener('click', closeAllDropdowns);

/** When user picks an account from the dropright menu. */
document.addEventListener('click', e => {
  if (e.target.classList.contains('menu-item')) {
    const val = e.target.getAttribute('data-val');
    const dropright = e.target.closest('.dropright');
    const hidden = dropright.querySelector('.accHiddenVal');
    const oldVal = hidden.value.toLowerCase();

    // Remove old from used set
    if (oldVal) usedAccountsSet.delete(oldVal);
    // Add new selection to used set
    usedAccountsSet.add(val.toLowerCase());

    hidden.value = val;
    dropright.querySelector('.dropbtn').textContent = val;
    dropright.querySelector('.dropright-content').style.display = 'none';
    updateTotals();
  }
});
