/***********************************************************
 * incomeStatement.js
 * 
 * Renders a read-only TB for the Income Statement, allows
 * drag & drop of revenue/expense accounts, lets the user
 * enter numeric lines, and then checks correctness.
 * Also shows the correct Income Statement in a modal.
 ***********************************************************/

// Track which accounts the user has dropped into Revenue vs. OpEx
let droppedAccounts = {
  revenue: new Set(),
  opEx: new Set()
};

/**
 * Render the read-only Adjusted TB table for the Income Statement tab.
 */
function renderReadOnlyTB_IncomeStatement() {
  const rows = document.querySelectorAll('#trialBalanceRows tr');
  let dataForDrag = [], dt = 0, ct = 0;

  rows.forEach(r => {
    let tds = r.querySelectorAll('td');
    if (tds.length < 3) return;
    let acc = "", d = parseFloat(tds[1].textContent) || 0, c = parseFloat(tds[2].textContent) || 0;

    if (r.getAttribute('data-fixed') === "true") {
      acc = tds[0].textContent.trim();
    } else {
      const hid = tds[0].querySelector('.accHiddenVal');
      acc = hid ? hid.value.trim() : "";
    }
    if (!acc) return;

    dataForDrag.push({ account: acc, debit: d, credit: c });
    dt += d; 
    ct += c;
  });

  let html = `
    <table>
      <thead>
        <tr><th>Account Name</th><th>Debit</th><th>Credit</th></tr>
      </thead>
      <tbody>
  `;
  dataForDrag.forEach(item => {
    html += `
      <tr draggable="true" ondragstart="dragStart(event)"
          data-account="${item.account}"
          data-debit="${item.debit}"
          data-credit="${item.credit}">
        <td>${item.account}</td>
        <td>${formatNumberForTB(item.debit)}</td>
        <td>${formatNumberForTB(item.credit)}</td>
      </tr>
    `;
  });
  html += `
      </tbody>
      <tfoot>
        <tr class="totals-row">
          <td>Totals</td>
          <td>${formatNumberForTB(dt)}</td>
          <td>${formatNumberForTB(ct)}</td>
        </tr>
      </tfoot>
    </table>
  `;
  document.getElementById('readOnlyTB').innerHTML = html;
}

/***********************************************************
 * Clearing Input Highlights
 ***********************************************************/

/**
 * Remove highlight from Income Statement input fields.
 */
function clearIncomeStatementHighlights() {
  const fields = [
    "isRevenue", "isCOGS", "isGrossProfit", "isOpEx", "isOpIncome",
    "isInterestExp", "isIncomeBeforeTax", "isTaxExpense", "isNetIncome"
  ];
  fields.forEach(id => {
    let el = document.getElementById(id);
    if (el) el.classList.remove('invalid-field');
  });
}

/***********************************************************
 * Building the Adjusted TB Map
 ***********************************************************/

/**
 * Build a map from the read-only TB on the IS tab:
 * accountName -> net (debit minus credit).
 */
function getAdjustedTBMap() {
  const tableDiv = document.getElementById('readOnlyTB');
  let rows = tableDiv.querySelectorAll('tbody tr');
  let map = {};
  rows.forEach(tr => {
    let acc = tr.getAttribute('data-account') || "";
    let d = parseFloat(tr.getAttribute('data-debit')) || 0;
    let c = parseFloat(tr.getAttribute('data-credit')) || 0;
    let net = d - c;
    if (acc) {
      map[acc.toLowerCase()] = net;
    }
  });
  return map;
}

/***********************************************************
 * Summarizing Income Statement Values from TB
 ***********************************************************/

/**
 * Summarize relevant Income Statement lines from the TB map.
 */
function getIncomeStatementValuesFromTB(tbMap) {
  let totalRevenue = 0, totalCOGS = 0, totalInterestExp = 0, totalTaxExp = 0, totalOtherExp = 0;

  for (let accName in tbMap) {
    let lc = accName.toLowerCase();
    let amt = tbMap[accName];

    if (statementCategories.revenueAccounts.includes(lc)) {
      totalRevenue += Math.abs(amt);
    } else if (statementCategories.cogsAccounts.includes(lc)) {
      totalCOGS += Math.abs(amt);
    } else if (statementCategories.interestExpenseAccounts.includes(lc)) {
      totalInterestExp += Math.abs(amt);
    } else if (statementCategories.taxExpenseAccounts.includes(lc)) {
      totalTaxExp += Math.abs(amt);
    } else {
      // All other "xxx expense" count as operating expenses
      if (lc.endsWith("expense")) {
        totalOtherExp += Math.abs(amt);
      }
    }
  }
  return {
    revenue: totalRevenue,
    cogs: totalCOGS,
    interestExp: totalInterestExp,
    taxExp: totalTaxExp,
    opEx: totalOtherExp
  };
}

/***********************************************************
 * Validate Dragged Accounts (Separate for Revenue and OpEx)
 ***********************************************************/

/**
 * Validate that the revenue drop zone contains exactly the correct revenue accounts.
 * Returns true if correct, false otherwise.
 */
function validateRevenueAccounts(tbMap) {
  let correctRev = new Set();
  // Identify the correct revenue accounts from the TB
  for (let accName in tbMap) {
    let lc = accName.toLowerCase();
    let amt = tbMap[accName];
    if (Math.abs(amt) < 0.0001) continue;
    if (statementCategories.revenueAccounts.includes(lc)) {
      correctRev.add(lc);
    }
  }
  
  // Check that the user dropped exactly these accounts
  if (correctRev.size !== droppedAccounts.revenue.size) return false;
  for (let r of correctRev) {
    if (!droppedAccounts.revenue.has(r)) return false;
  }
  return true;
}

/**
 * Validate that the operating expense drop zone contains exactly the correct expense accounts.
 * Returns true if correct, false otherwise.
 */
function validateOpExAccounts(tbMap) {
  let correctOpEx = new Set();
  // Identify correct operating expense accounts (exclude interest, tax, COGS)
  for (let accName in tbMap) {
    let lc = accName.toLowerCase();
    let amt = tbMap[accName];
    if (Math.abs(amt) < 0.0001) continue;
    // Include only those accounts ending with "expense" that are not interest, tax, or COGS
    if (lc.endsWith("expense") &&
        !statementCategories.interestExpenseAccounts.includes(lc) &&
        !statementCategories.taxExpenseAccounts.includes(lc) &&
        !statementCategories.cogsAccounts.includes(lc)) {
      correctOpEx.add(lc);
    }
  }
  
  // Check that the user dropped exactly these accounts
  if (correctOpEx.size !== droppedAccounts.opEx.size) return false;
  for (let e of correctOpEx) {
    if (!droppedAccounts.opEx.has(e)) return false;
  }
  return true;
}

/***********************************************************
 * Checking the Income Statement
 ***********************************************************/

/**
 * Check the user’s Income Statement vs. the adjusted TB.
 */
function checkIncomeStatement() {
  const isRes = document.getElementById('isResult');
  isRes.className = "result";
  isRes.innerHTML = "";

  // Remove any old highlights
  document.getElementById('revenueDropZone').classList.remove('invalid-field');
  document.getElementById('opExDropZone').classList.remove('invalid-field');
  clearIncomeStatementHighlights();

  let userRevenue = parseFloat(document.getElementById('isRevenue').value) || 0;
  let userCOGS = parseFloat(document.getElementById('isCOGS').value) || 0;
  let userGross = parseFloat(document.getElementById('isGrossProfit').value) || 0;
  let userOpEx = parseFloat(document.getElementById('isOpEx').value) || 0;
  let userOpInc = parseFloat(document.getElementById('isOpIncome').value) || 0;
  let userIntExp = parseFloat(document.getElementById('isInterestExp').value) || 0;
  let userIncBefTx = parseFloat(document.getElementById('isIncomeBeforeTax').value) || 0;
  let userTaxExp = parseFloat(document.getElementById('isTaxExpense').value) || 0;
  let userNetInc = parseFloat(document.getElementById('isNetIncome').value) || 0;

  let tbMap = getAdjustedTBMap();
  let isVals = getIncomeStatementValuesFromTB(tbMap);

  let realRev = isVals.revenue;
  let realCOGS = isVals.cogs;
  let realInt = isVals.interestExp;
  let realTax = isVals.taxExp;
  let realOpEx = isVals.opEx;

  let gross = realRev - realCOGS;
  let opInc = gross - realOpEx;
  let befTax = opInc - realInt;
  let netInc = befTax - realTax;

  // Validate the dragged accounts separately for each drop zone
  let revenueValid = validateRevenueAccounts(tbMap);
  let opExValid = validateOpExAccounts(tbMap);
  let correctPlacement = revenueValid && opExValid;

  if (!correctPlacement) {
    isRes.classList.add("incorrect-block");
    isRes.innerHTML = `<h4>❌ One or more accounts have been placed incorrectly.</h4>`;
    
    // Only highlight the drop zone(s) that are incorrect
    if (!revenueValid) {
      document.getElementById('revenueDropZone').classList.add('invalid-field');
    }
    if (!opExValid) {
      document.getElementById('opExDropZone').classList.add('invalid-field');
    }
  }

  let pass = true;
  function highlight(...ids) {
    pass = false;
    ids.forEach(id => document.getElementById(id)?.classList.add('invalid-field'));
  }
  // Compare user entries with correct numbers
  if (Math.abs(userRevenue - realRev) > 0.5) highlight("isRevenue");
  if (Math.abs(userCOGS - realCOGS) > 0.5) highlight("isCOGS");
  if (Math.abs(userGross - gross) > 0.5) highlight("isGrossProfit");
  if (Math.abs(userOpEx - realOpEx) > 0.5) highlight("isOpEx");
  if (Math.abs(userOpInc - opInc) > 0.5) highlight("isOpIncome");
  if (Math.abs(userIntExp - realInt) > 0.5) highlight("isInterestExp");
  if (Math.abs(userIncBefTx - befTax) > 0.5) highlight("isIncomeBeforeTax");
  if (Math.abs(userTaxExp - realTax) > 0.5) highlight("isTaxExpense");
  if (Math.abs(userNetInc - netInc) > 0.5) highlight("isNetIncome");

  // Check arithmetic continuity -- only highlight the computed totals
  if (Math.abs((userRevenue - userCOGS) - userGross) > 0.5) {
    highlight("isGrossProfit");
  }
  if (Math.abs((userGross - userOpEx) - userOpInc) > 0.5) {
    highlight("isOpIncome");
  }
  if (Math.abs((userOpInc - userIntExp) - userIncBefTx) > 0.5) {
    highlight("isIncomeBeforeTax");
  }
  if (Math.abs((userIncBefTx - userTaxExp) - userNetInc) > 0.5) {
    highlight("isNetIncome");
  }

  if (!pass || !correctPlacement) {
    isRes.classList.add("incorrect-block");
    if (!isRes.innerHTML) {
      isRes.innerHTML = "<h4>❌ Aye, something is wrong...</h4>";
    }
    return;
  }

  isRes.classList.add("correct-block");
  isRes.innerHTML = "<h4>✅ Great job, your Income Statement is correct! Now you can do the Closing Entries.</h4>";
}

/***********************************************************
 * Show Correct Income Statement (Modal)
 ***********************************************************/
function showCorrectIS() {
  const tbMap = getAdjustedTBMap();
  let correctRev = new Set();
  let correctOpEx = new Set();

  // Determine the correct sets for Revenue and OpEx
  for (let accName in tbMap) {
    let lc = accName.toLowerCase();
    let val = tbMap[accName];
    if (Math.abs(val) < 0.0001) continue;

    if (statementCategories.revenueAccounts.includes(lc)) {
      correctRev.add(accName);
    }
    else if (statementCategories.interestExpenseAccounts.includes(lc) ||
             statementCategories.taxExpenseAccounts.includes(lc) ||
             statementCategories.cogsAccounts.includes(lc)) {
      // Skip these accounts
    }
    else if (lc.endsWith("expense")) {
      correctOpEx.add(accName);
    }
  }

  // Fill the correct lists in the modal
  let revList = document.getElementById('correctISRevenueList');
  revList.innerHTML = "";
  correctRev.forEach(a => {
    let li = document.createElement('li');
    li.textContent = a;
    revList.appendChild(li);
  });

  let opExList = document.getElementById('correctISOpExList');
  opExList.innerHTML = "";
  correctOpEx.forEach(a => {
    let li = document.createElement('li');
    li.textContent = a;
    opExList.appendChild(li);
  });

  // Numeric lines based on the TB values
  let isVals = getIncomeStatementValuesFromTB(tbMap);
  let realRev = isVals.revenue;
  let realCogs = isVals.cogs;
  let realOpEx = isVals.opEx;
  let realInt = isVals.interestExp;
  let realTax = isVals.taxExp;

  let gross = realRev - realCogs;
  let opInc = gross - realOpEx;
  let befTax = opInc - realInt;
  let netInc = befTax - realTax;

  document.getElementById('corrISRevenue').textContent = realRev.toFixed(2);
  document.getElementById('corrISCOGS').textContent = realCogs.toFixed(2);
  document.getElementById('corrISGrossProfit').textContent = gross.toFixed(2);
  document.getElementById('corrISOpEx').textContent = realOpEx.toFixed(2);
  document.getElementById('corrISOpIncome').textContent = opInc.toFixed(2);
  document.getElementById('corrISIntExp').textContent = realInt.toFixed(2);
  document.getElementById('corrISIncomeBefTax').textContent = befTax.toFixed(2);
  document.getElementById('corrISTaxExp').textContent = realTax.toFixed(2);
  document.getElementById('corrISNetIncome').textContent = netInc.toFixed(2);

  document.getElementById('correctISModal').style.display = 'block';
}

function closeCorrectISModal() {
  document.getElementById('correctISModal').style.display = 'none';
}

/***********************************************************
 * Hints for Income Statement Lines
 ***********************************************************/
function showFSHint(line) {
  let message = "";
  switch (line) {
    case "isRevenue":
      message = "Sum all revenue/income accounts from the adjusted trial balance. Exclude expenses/liabilities/assets.";
      break;
    case "isCOGS":
      message = "Use the total Cost of Goods Sold from the adjusted trial balance.";
      break;
    case "isGrossProfit":
      message = "Gross Profit = Revenue - COGS.";
      break;
    case "isOpEx":
      message = "Sum all operating expenses (all '... Expense' except interest/tax).";
      break;
    case "isOpIncome":
      message = "Operating Income = Gross Profit - Operating Expenses.";
      break;
    case "isInterestExp":
      message = "Interest Expense is a separate line, taken from the adjusted TB.";
      break;
    case "isIncomeBeforeTax":
      message = "Income Before Tax = Operating Income - Interest Expense.";
      break;
    case "isTaxExpense":
      message = "Tax Expense from the adjusted TB (a separate line as well).";
      break;
    case "isNetIncome":
      message = "Net Income = Income Before Tax - Tax Expense.";
      break;
    default:
      message = "No hint available.";
      break;
  }
  alert(message);
}
