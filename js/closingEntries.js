/***********************************************************
 * closingEntries.js
 *
 * 1) Renders a "Closing Entries" table that rearranges
 *    the user's adjusted TB (from #trialBalanceRows).
 *    - Retained Earnings is highlighted in red.
 *    - Temporary accounts (Revenue, Expenses, Dividends)
 *      are at the bottom.
 *
 * 2) Only the amounts of temporary accounts + Retained Earnings
 *    can be edited. Other permanent accounts are read-only.
 *
 * 3) If correct, create a global 'postClosingTB' and enable
 *    the Balance Sheet tab.
 ***********************************************************/

// A global array that holds the final post-closing TB
window.postClosingTB = [];

/**
 * Render the "Closing Entries" table. 
 * Permanent accounts are read-only, 
 * Retained Earnings & temporary accounts are editable.
 */
function renderClosingEntries() {
  const tbody = document.querySelector('#closingEntriesTable tbody');
  tbody.innerHTML = "";

  // 1) Gather the user's final (adjusted) TB from #trialBalanceRows
  const rows = document.querySelectorAll('#trialBalanceRows tr');
  let data = [];
  rows.forEach(r => {
    const tds = r.querySelectorAll('td');
    if (tds.length < 3) return;

    let accName = "";
    if (r.getAttribute('data-fixed') === "true") {
      // Built-in account row
      accName = tds[0].textContent.trim();
    } else {
      // Dropright account
      const hidden = tds[0].querySelector('.accHiddenVal');
      accName = hidden ? hidden.value.trim() : "";
    }
    if (!accName) return;

    let d = parseFloat(tds[1].textContent) || 0;
    let c = parseFloat(tds[2].textContent) || 0;

    data.push({ account: accName, debit: d, credit: c });
  });

  // 2) Separate out Retained Earnings & temporary vs permanent
  let reIndex = data.findIndex(item => item.account.toLowerCase() === "retained earnings");
  let retainedEarnings = null;
  if (reIndex >= 0) {
    retainedEarnings = data.splice(reIndex, 1)[0]; // remove it
  }

  let temporaryAccs = [];
  let permanentAccs = [];

  data.forEach(item => {
    let lc = item.account.toLowerCase();
    let isRevenue = statementCategories.revenueAccounts.includes(lc);
    let isExpense = (
      lc.endsWith("expense") ||
      lc === "cost of goods sold" ||
      lc === "dividends"
    );
    if (isRevenue || isExpense) {
      temporaryAccs.push(item);
    } else {
      permanentAccs.push(item);
    }
  });

  // 3) Build a new display array: 
  //    a) permanent accounts (read-only)
  //    b) retained earnings (editable, in red)
  //    c) temporary accounts (editable)
  let displayArr = [...permanentAccs];
  if (retainedEarnings) displayArr.push(retainedEarnings);
  displayArr.push(...temporaryAccs);

  // 4) Render each row
  displayArr.forEach(item => {
    let lc = item.account.toLowerCase();

    // Determine if user can edit
    let isRevenue = statementCategories.revenueAccounts.includes(lc);
    let isExpense = (
      lc.endsWith("expense") ||
      lc === "cost of goods sold" ||
      lc === "dividends"
    );
    let isRetEarnings = (lc === "retained earnings");

    // If it's a temporary account or retained earnings => editable
    let canEdit = (isRevenue || isExpense || isRetEarnings);

    // Inline style for Retained Earnings
    const reStyle = isRetEarnings ? 'style="color:red;font-weight:bold;"' : '';

    // Build the row
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td ${reStyle}>${item.account}</td>
      <td ${canEdit ? 'contenteditable="true"' : ''}>${formatNumberForTB(item.debit)}</td>
      <td ${canEdit ? 'contenteditable="true"' : ''}>${formatNumberForTB(item.credit)}</td>
    `;
    // If cells are editable, recalc totals on input
    if (canEdit) {
      tr.addEventListener('input', updateCETotals);
    }
    tbody.appendChild(tr);
  });

  // Initial totals
  updateCETotals();
}

/**
 * Update the totals in the Closing Entries table's footer.
 */
function updateCETotals() {
  let rows = document.querySelectorAll('#closingEntriesTable tbody tr');
  let totD = 0, totC = 0;
  rows.forEach(r => {
    let tds = r.querySelectorAll('td');
    if (tds.length < 3) return;
    let d = parseFloat(tds[1].textContent) || 0;
    let c = parseFloat(tds[2].textContent) || 0;
    totD += d;
    totC += c;
  });
  document.getElementById('ceTotalDebit').textContent = formatNumberForTB(totD);
  document.getElementById('ceTotalCredit').textContent = formatNumberForTB(totC);
}

/**
 * Check if user closed accounts correctly:
 *  - Balanced
 *  - All temporary accounts zero
 *  - Net difference in Retained Earnings
 * If correct, generate postClosingTB & enable Balance Sheet tab.
 */
function checkClosingEntries() {
  const ceRes = document.getElementById('ceResult');
  ceRes.className = "result";
  ceRes.innerHTML = "";

  let rows = document.querySelectorAll('#closingEntriesTable tbody tr');
  let totalDebit = 0, totalCredit = 0;
  let newArr = [];

  // Gather user data from the table
  rows.forEach(r => {
    const tds = r.querySelectorAll('td');
    if (tds.length < 3) return;
    const accName = tds[0].textContent.trim();
    const lc = accName.toLowerCase();
    const d = parseFloat(tds[1].textContent) || 0;
    const c = parseFloat(tds[2].textContent) || 0;

    totalDebit += d;
    totalCredit += c;

    newArr.push({ account: accName, debit: d, credit: c });
  });

  // 1) Must be balanced
  if (Math.abs(totalDebit - totalCredit) > 0.5) {
    ceRes.classList.add("incorrect-block");
    ceRes.innerHTML = "<h4>❌ Not balanced. Debits must equal Credits!</h4>";
    return;
  }

  // 2) Check if all temporary accounts are zero
  let anyTempNotZero = false;
  for (let item of newArr) {
    let lc = item.account.toLowerCase();
    let isRevenue = statementCategories.revenueAccounts.includes(lc);
    let isExpense = (
      lc.endsWith("expense") ||
      lc === "cost of goods sold" ||
      lc === "dividends"
    );
    if (isRevenue || isExpense) {
      // Should be zero if properly closed
      if (Math.abs(item.debit) > 0.01 || Math.abs(item.credit) > 0.01) {
        anyTempNotZero = true;
        break;
      }
    }
  }
  if (anyTempNotZero) {
    ceRes.classList.add("incorrect-block");
    ceRes.innerHTML = "<h4>❌ One or more temporary accounts is not zeroed out.</h4>";
    return;
  }

  // 3) Build postClosingTB => omit lines that are effectively zero
  let finalArr = [];
  for (let item of newArr) {
    let net = Math.abs(item.debit) + Math.abs(item.credit);
    if (net < 0.01) {
      continue; // skip
    }
    finalArr.push({
      account: item.account,
      debit: item.debit,
      credit: item.credit
    });
  }

  // Save globally
  window.postClosingTB = finalArr;

  // Enable the BS tab
  let bsTabBtn = document.getElementById('bsTabBtn');
  if (bsTabBtn) {
    bsTabBtn.disabled = false;
  }

  ceRes.classList.add("correct-block");
  ceRes.innerHTML = "<h4>✅ Woo hoo! You've got this. The Balance Sheet tab is now unlocked.</h4>";
}

/**
 * Show a basic hint about closing entries.
 */
function showClosingHint() {
  alert(
    "Closing steps:\n" +
    "1) Zero out all revenue, expense, and dividends.\n" +
    "2) The net effect goes into Retained Earnings.\n" +
    "3) Ensure Debits = Credits after closing."
  );
}
