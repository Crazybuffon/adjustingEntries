/***********************************************************
 * balanceSheet.js
 *
 * The Balance Sheet tab now shows the post-closing trial
 * balance (i.e., 'window.postClosingTB') so all temporary
 * accounts are removed, and Retained Earnings is updated.
 ***********************************************************/

// Initialize an object to hold dropped accounts for each subcategory
let droppedBSAccounts = {
  currentAssets: new Set(),
  nonCurrentAssets: new Set(),
  currentLiabilities: new Set(),
  longTermLiabilities: new Set(),
  equity: new Set()
};


/**
 * Render the "Adjusted Trial Balance" (actually post-closing TB)
 * in the top section of the Balance Sheet tab. 
 */
function renderReadOnlyTB_BalanceSheet() {
  const container = document.getElementById('readOnlyTB_BS');
  // If user hasn't completed closing, postClosingTB is empty.
  if (!window.postClosingTB || window.postClosingTB.length === 0) {
    container.innerHTML = `
      <p style="color:red;">
        (No Post-Closing TB found. Complete the Closing Entries tab first.)
      </p>
    `;
    return;
  }

  // Use the post-closing data
  let dataForDrag = window.postClosingTB;
  let dt = 0, ct = 0;
  dataForDrag.forEach(item => {
    dt += item.debit;
    ct += item.credit;
  });

  let html = `
    <table>
      <thead>
        <tr>
          <th>Account Name</th>
          <th>Debit</th>
          <th>Credit</th>
        </tr>
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
  container.innerHTML = html;
}


function getAdjustedTBMap_BS() {
  let map = {};
  let rows = document.querySelectorAll('#readOnlyTB_BS tbody tr');
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



/**
 * Drop an account onto the correct subcategory of the Balance Sheet.
 */
function dropOnBSZone(ev, zoneType) {
  ev.preventDefault();
  ev.currentTarget.classList.remove('over');

  const accountName = ev.dataTransfer.getData("text");
  if (!accountName) return;

  // Net value from the TB
  const tbMap = getAdjustedTBMap_BS();
  const netVal = tbMap[accountName.toLowerCase()] || 0;
  
  let disp = "";
  // For liability & equity zones, display the absolute value
  if (zoneType === "currentLiabilities" || zoneType === "longTermLiabilities" || zoneType === "equity") {
    disp = formatNumberForTB(Math.abs(netVal));
  } else {
    // For asset zones (or any other), keep the original formatting
    disp = netVal >= 0
      ? formatNumberForTB(netVal)
      : `(${formatNumberForTB(Math.abs(netVal))})`;
  }

  // Create a row to show the dropped account
  const tr = document.createElement('tr');
  tr.className = "bs-account-row";
  tr.dataset.zone = zoneType;
  tr.dataset.accLc = accountName.toLowerCase();

  tr.innerHTML = `
    <td class="bs-acc-name">${accountName}</td>
    <td class="bs-acc-amount">
      ${disp}
      <span class="remove-button" onclick="removeDroppedBSAccount(event)">✖</span>
    </td>
  `;

  // Identify which tbody to append to
  let tableBodyId = "";
  let placeholderId = "";
  if (zoneType === "currentAssets") {
    tableBodyId = "bsCurrentAssetsAccounts";
    placeholderId = "bsCurrentAssetsPlaceholder";
  } else if (zoneType === "nonCurrentAssets") {
    tableBodyId = "bsNonCurrentAssetsAccounts";
    placeholderId = "bsNonCurrentAssetsPlaceholder";
  } else if (zoneType === "currentLiabilities") {
    tableBodyId = "bsCurrentLiabAccounts";
    placeholderId = "bsCurrentLiabPlaceholder";
  } else if (zoneType === "longTermLiabilities") {
    tableBodyId = "bsLongTermLiabAccounts";
    placeholderId = "bsLongTermLiabPlaceholder";
  } else if (zoneType === "equity") {
    tableBodyId = "bsEquityAccounts";
    placeholderId = "bsEquityPlaceholder";
  }

  const tbody = document.getElementById(tableBodyId);
  tbody.appendChild(tr);

  // Hide placeholder
  let ph = document.getElementById(placeholderId);
  if (ph) ph.style.display = 'none';

  // Update sets
  droppedBSAccounts[zoneType].add(accountName.toLowerCase());
  // Remove from other sets if it was incorrectly placed before
  for (let z in droppedBSAccounts) {
    if (z !== zoneType) {
      droppedBSAccounts[z].delete(accountName.toLowerCase());
    }
  }

  updateBSTotals();
}


/**
 * Remove an account from a BS subcategory row.
 */
function removeDroppedBSAccount(ev) {
  const btn = ev.currentTarget;
  const row = btn.closest('tr');
  const zone = row.dataset.zone;
  const accLc = row.dataset.accLc;

  row.remove();
  droppedBSAccounts[zone].delete(accLc);

  // If the subcategory is empty, show placeholder
  if (droppedBSAccounts[zone].size === 0) {
    let placeholderId = "";
    if (zone === "currentAssets") placeholderId = "bsCurrentAssetsPlaceholder";
    else if (zone === "nonCurrentAssets") placeholderId = "bsNonCurrentAssetsPlaceholder";
    else if (zone === "currentLiabilities") placeholderId = "bsCurrentLiabPlaceholder";
    else if (zone === "longTermLiabilities") placeholderId = "bsLongTermLiabPlaceholder";
    else if (zone === "equity") placeholderId = "bsEquityPlaceholder";

    const ph = document.getElementById(placeholderId);
    if (ph) ph.style.display = 'inline';
  }
  updateBSTotals();
}

/***********************************************************
 * Summation & Checking
 ***********************************************************/

/**
 * Recalculate the user’s subtotals on the Balance Sheet UI
 * and display them in the right-hand total fields.
 */
function updateBSTotals() {
  let tbMap = getAdjustedTBMap_BS();

  function sumSet(accSet, sign) {
    let s = 0;
    accSet.forEach(a => {
      s += tbMap[a] || 0;
    });
    return s * sign;
  }

  let ca = sumSet(droppedBSAccounts.currentAssets, +1);
  let nca = sumSet(droppedBSAccounts.nonCurrentAssets, +1);
  let cl = sumSet(droppedBSAccounts.currentLiabilities, -1);
  let ltl = sumSet(droppedBSAccounts.longTermLiabilities, -1);
  let eq = sumSet(droppedBSAccounts.equity, -1);

  let ta = ca + nca;
  let tl = cl + ltl;
  let tle = tl + eq;

  document.getElementById('bsCurrentAssetsTotal').textContent = formatNumberForTB(ca);
  document.getElementById('bsNonCurrentAssetsTotal').textContent = formatNumberForTB(nca);
  document.getElementById('bsCurrentLiabTotal').textContent = formatNumberForTB(cl);
  document.getElementById('bsLongTermLiabTotal').textContent = formatNumberForTB(ltl);
  document.getElementById('bsEquityTotal').textContent = formatNumberForTB(eq);

  document.getElementById('bsTotalAssets').textContent = formatNumberForTB(ta);
  document.getElementById('bsTotalLiab').textContent = formatNumberForTB(tl);
  document.getElementById('bsTotalLiabEquity').textContent = formatNumberForTB(tle);

  return { ca, nca, cl, ltl, eq, ta, tl, tle };
}

/**
 * Validate that all accounts dropped in each zone match the correct classification
 * based on statementCategories in scenarioData.js.
 */
function validateDraggedBSAccounts(tbMap) {
  let corrCA = new Set(), corrNCA = new Set();
  let corrCL = new Set(), corrLTL = new Set(), corrEQ = new Set();

  for (let accName in tbMap) {
    let lc = accName.toLowerCase();
    let amt = tbMap[accName];
    if (Math.abs(amt) < 0.0001) continue;

    if (statementCategories.currentAssetAccounts.includes(lc)) {
      corrCA.add(lc);
    } else if (statementCategories.nonCurrentAssetAccounts.includes(lc)) {
      corrNCA.add(lc);
    } else if (statementCategories.currentLiabilityAccounts.includes(lc) ||
               statementCategories.currentLiabilityUnearned.includes(lc)) {
      corrCL.add(lc);
    } else if (statementCategories.longTermLiabilityAccounts.includes(lc)) {
      corrLTL.add(lc);
    } else if (statementCategories.equityAccounts.includes(lc)) {
      corrEQ.add(lc);
    }
  }

  function setsMatch(uSet, cSet) {
    if (uSet.size !== cSet.size) return false;
    for (let item of uSet) {
      if (!cSet.has(item)) return false;
    }
    return true;
  }

  let okCA = setsMatch(droppedBSAccounts.currentAssets, corrCA);
  let okNCA = setsMatch(droppedBSAccounts.nonCurrentAssets, corrNCA);
  let okCL = setsMatch(droppedBSAccounts.currentLiabilities, corrCL);
  let okLTL = setsMatch(droppedBSAccounts.longTermLiabilities, corrLTL);
  let okEQ = setsMatch(droppedBSAccounts.equity, corrEQ);

  return (okCA && okNCA && okCL && okLTL && okEQ);
}

/**
 * Check if the user’s BS equals the correct classification
 * and totals from the adjusted TB.
 */
function checkBalanceSheet() {
  const bsRes = document.getElementById('bsResult');
  bsRes.className = "result";
  bsRes.innerHTML = "";

  // Clear previous highlights on drop zones and totals
  const zoneIds = [
    'bsCurrentAssetsDropZone','bsNonCurrentAssetsDropZone',
    'bsCurrentLiabDropZone','bsLongTermLiabDropZone','bsEquityDropZone'
  ];
  zoneIds.forEach(z => {
    const el = document.getElementById(z);
    if (el) el.classList.remove('invalid-field');
  });

  const totalIds = [
    'bsCurrentAssetsTotal','bsNonCurrentAssetsTotal','bsCurrentLiabTotal',
    'bsLongTermLiabTotal','bsEquityTotal','bsTotalAssets','bsTotalLiab','bsTotalLiabEquity'
  ];
  totalIds.forEach(tid => {
    const el = document.getElementById(tid);
    if (el) el.classList.remove('invalid-field');
  });

  // Get the trial balance map
  let tbMap = getAdjustedTBMap_BS();

  // Determine the correct classification for each category by going through tbMap
  let corrCA = new Set(), corrNCA = new Set();
  let corrCL = new Set(), corrLTL = new Set(), corrEQ = new Set();

  for (let accName in tbMap) {
    let lc = accName.toLowerCase();
    let amt = tbMap[accName];
    if (Math.abs(amt) < 0.0001) continue;

    if (statementCategories.currentAssetAccounts.includes(lc)) {
      corrCA.add(lc);
    } else if (statementCategories.nonCurrentAssetAccounts.includes(lc)) {
      corrNCA.add(lc);
    } else if (
      statementCategories.currentLiabilityAccounts.includes(lc) ||
      statementCategories.currentLiabilityUnearned.includes(lc)
    ) {
      corrCL.add(lc);
    } else if (statementCategories.longTermLiabilityAccounts.includes(lc)) {
      corrLTL.add(lc);
    } else if (statementCategories.equityAccounts.includes(lc)) {
      corrEQ.add(lc);
    }
  }

  // Helper function to compare sets
  function setsMatch(uSet, cSet) {
    if (uSet.size !== cSet.size) return false;
    for (let item of uSet) {
      if (!cSet.has(item)) return false;
    }
    return true;
  }

  // Check each classification zone individually.
  let classificationIsCorrect = true;

  if (!setsMatch(droppedBSAccounts.currentAssets, corrCA)) {
    document.getElementById('bsCurrentAssetsDropZone').classList.add('invalid-field');
    classificationIsCorrect = false;
  }
  if (!setsMatch(droppedBSAccounts.nonCurrentAssets, corrNCA)) {
    document.getElementById('bsNonCurrentAssetsDropZone').classList.add('invalid-field');
    classificationIsCorrect = false;
  }
  if (!setsMatch(droppedBSAccounts.currentLiabilities, corrCL)) {
    document.getElementById('bsCurrentLiabDropZone').classList.add('invalid-field');
    classificationIsCorrect = false;
  }
  if (!setsMatch(droppedBSAccounts.longTermLiabilities, corrLTL)) {
    document.getElementById('bsLongTermLiabDropZone').classList.add('invalid-field');
    classificationIsCorrect = false;
  }
  if (!setsMatch(droppedBSAccounts.equity, corrEQ)) {
    document.getElementById('bsEquityDropZone').classList.add('invalid-field');
    classificationIsCorrect = false;
  }

  // If any classification is wrong, display a message and stop.
  if (!classificationIsCorrect) {
    bsRes.classList.add("incorrect-block");
    bsRes.innerHTML = "<h4>❌ Some accounts are in the wrong category.</h4>";
    return;
  }

  // Check the numeric totals for each subcategory.
  let correct = getBalanceSheetValuesFromTB(tbMap);
  let userTotals = updateBSTotals();

  let pass = true;
  function approx(a, b) {
    return Math.abs(a - b) < 0.5; // tolerance – adjust if needed
  }
  function highlightBS(id) {
    document.getElementById(id).classList.add('invalid-field');
    pass = false;
  }

  if (!approx(userTotals.ca, correct.currentAssets)) highlightBS('bsCurrentAssetsTotal');
  if (!approx(userTotals.nca, correct.nonCurrentAssets)) highlightBS('bsNonCurrentAssetsTotal');
  if (!approx(userTotals.cl, correct.currentLiab)) highlightBS('bsCurrentLiabTotal');
  if (!approx(userTotals.ltl, correct.longTermLiab)) highlightBS('bsLongTermLiabTotal');
  if (!approx(userTotals.eq, correct.totalEquity)) highlightBS('bsEquityTotal');
  if (!approx(userTotals.ta, correct.totalAssets)) highlightBS('bsTotalAssets');
  if (!approx(userTotals.tl, correct.totalLiab)) highlightBS('bsTotalLiab');
  if (!approx(userTotals.tle, correct.totalLiabEquity)) highlightBS('bsTotalLiabEquity');

  if (!pass) {
    bsRes.classList.add("incorrect-block");
    bsRes.innerHTML = "<h4>❌ Your Balance Sheet does not match the adjusted TB totals.</h4>";
    return;
  }

  // If everything is correct:
  bsRes.classList.add("correct-block");
  bsRes.innerHTML = "<h4>✅ Balance Sheet is correct!</h4>";

  // Enable the next scenario button and notify the user.
  const nextScenarioBtn = document.getElementById('nextScenarioBtn');
  nextScenarioBtn.disabled = false;
  alert("Congratulations on completing all the challenges! You can now practice 5 more scenarios if you'd like.");
}


/**
 * Summarize the correct BS amounts from the adjusted TB map.
 */
function getBalanceSheetValuesFromTB(tbMap) {
  let ca = 0, nca = 0, cl = 0, ltl = 0, eq = 0;
  for (let accName in tbMap) {
    let lc = accName.toLowerCase();
    let amt = tbMap[accName];

    if (statementCategories.currentAssetAccounts.includes(lc)) {
      ca += amt;
    } else if (statementCategories.nonCurrentAssetAccounts.includes(lc)) {
      nca += amt;
    } else if (statementCategories.currentLiabilityAccounts.includes(lc) ||
               statementCategories.currentLiabilityUnearned.includes(lc)) {
      cl += (-1 * amt);
    } else if (statementCategories.longTermLiabilityAccounts.includes(lc)) {
      ltl += (-1 * amt);
    } else if (statementCategories.equityAccounts.includes(lc)) {
      eq += (-1 * amt);
    }
  }
  let totalAssets = ca + nca;
  let totalLiab = cl + ltl;
  let totalLiabEquity = totalLiab + eq;
  return {
    currentAssets: ca,
    nonCurrentAssets: nca,
    totalAssets,
    currentLiab: cl,
    longTermLiab: ltl,
    totalLiab,
    totalEquity: eq,
    totalLiabEquity
  };
}

/***********************************************************
 * Show Correct BS (Modal)
 ***********************************************************/
function showCorrectBS() {
  const modalDiv = document.getElementById('correctBSOutput');
  modalDiv.innerHTML = "";

  const tbMap = getAdjustedTBMap_BS();

  // Partition accounts into the correct subcats
  let arrCA = [], arrNCA = [], arrCL = [], arrLTL = [], arrEQ = [];
  for (let accName in tbMap) {
    let lc = accName.toLowerCase();
    let val = tbMap[accName];
    if (Math.abs(val) < 0.0001) continue;

    if (statementCategories.currentAssetAccounts.includes(lc)) {
      arrCA.push({ name: accName, val: val });
    } else if (statementCategories.nonCurrentAssetAccounts.includes(lc)) {
      arrNCA.push({ name: accName, val: val });
    } else if (statementCategories.currentLiabilityAccounts.includes(lc) ||
               statementCategories.currentLiabilityUnearned.includes(lc)) {
      arrCL.push({ name: accName, val: -val });
    } else if (statementCategories.longTermLiabilityAccounts.includes(lc)) {
      arrLTL.push({ name: accName, val: -val });
    } else if (statementCategories.equityAccounts.includes(lc)) {
      arrEQ.push({ name: accName, val: -val });
    }
  }

  // Helper to build subcat HTML
  function buildBSSubcatHTML(subcatName, items) {
    let sum = 0;
    let lines = items.map(it => {
      sum += it.val;
      let disp = it.val >= 0
        ? formatNumberForTB(it.val)
        : `(${formatNumberForTB(Math.abs(it.val))})`;
      return `
        <tr>
          <td style="padding-left:30px;">${it.name}</td>
          <td style="text-align:right;">${disp}</td>
        </tr>
      `;
    }).join("");
    return `
      <tr>
        <td colspan="2"><strong>${subcatName}</strong></td>
      </tr>
      ${lines}
      <tr>
        <td style="padding-left:10px;"><em>${subcatName} Total</em></td>
        <td style="text-align:right;"><strong>${formatNumberForTB(sum)}</strong></td>
      </tr>
    `;
  }

  let bsVals = getBalanceSheetValuesFromTB(tbMap);
  let html = `
    <table class="compact-table">
      <tbody>
        <tr><td colspan="2" style="text-align:center;"><strong>ASSETS</strong></td></tr>
        ${arrCA.length > 0 ? buildBSSubcatHTML("Current Assets", arrCA) : ""}
        ${arrNCA.length > 0 ? buildBSSubcatHTML("Non-Current Assets", arrNCA) : ""}
        <tr>
          <td><strong>Total Assets</strong></td>
          <td style="text-align:right;"><strong>${bsVals.totalAssets.toFixed(2)}</strong></td>
        </tr>

        <tr><td colspan="2" style="padding-top:1em; text-align:center;"><strong>LIABILITIES</strong></td></tr>
        ${arrCL.length > 0 ? buildBSSubcatHTML("Current Liabilities", arrCL) : ""}
        ${arrLTL.length > 0 ? buildBSSubcatHTML("Long-Term Liabilities", arrLTL) : ""}
        <tr>
          <td><strong>Total Liabilities</strong></td>
          <td style="text-align:right;"><strong>${bsVals.totalLiab.toFixed(2)}</strong></td>
        </tr>

        <tr><td colspan="2" style="padding-top:1em; text-align:center;"><strong>EQUITY</strong></td></tr>
        ${arrEQ.length > 0 ? buildBSSubcatHTML("Equity", arrEQ) : ""}
        <tr>
          <td><strong>Total Liabilities &amp; Equity</strong></td>
          <td style="text-align:right;"><strong>${bsVals.totalLiabEquity.toFixed(2)}</strong></td>
        </tr>
      </tbody>
    </table>
  `;
  modalDiv.innerHTML = html;
  document.getElementById('correctBSModal').style.display = 'block';
}

function closeCorrectBSModal() {
  document.getElementById('correctBSModal').style.display = 'none';
}
