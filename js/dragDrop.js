/***********************************************************
 * dragDrop.js
 * 
 * Shared drag & drop handlers for accounts:
 *  - allowDrop, dragStart, dragleave, etc.
 ***********************************************************/

/**
 * Allow drop if the target is a valid drop-zone.
 */
function allowDrop(ev) {
    ev.preventDefault();
    if (ev.currentTarget.classList.contains('drop-zone')) {
      ev.currentTarget.classList.add('over');
    }
  }
  
  /**
   * On drag start, store the account name in dataTransfer.
   */
  function dragStart(ev) {
    const row = ev.target;
    const account = row.getAttribute('data-account') || "";
    ev.dataTransfer.setData("text", account);
  }
  
  /**
   * Remove the highlight when leaving a drop zone.
   */
  document.addEventListener('dragleave', ev => {
    if (ev.target.classList && ev.target.classList.contains('drop-zone')) {
      ev.target.classList.remove('over');
    }
  });
  
  /**
   * Drop accounts onto the Income Statement zones (Revenue or OpEx).
   * (Specifically for the Income Statement.)
   */
  function dropOnZone(ev, zoneType) {
    ev.preventDefault();
    ev.currentTarget.classList.remove('over');
  
    const accountName = ev.dataTransfer.getData("text");
    if (!accountName) return;
  
    // Determine which container we are dropping into
    let containerId = (zoneType === 'revenue') ? 'revenueAccounts' : 'opExAccounts';
    let container = document.getElementById(containerId);
  
    // Get the net from the Adjusted TB for display
    let tbMap = getAdjustedTBMap(); // from incomeStatement.js
    let netVal = tbMap[accountName.toLowerCase()] || 0;
    let displayVal = Math.abs(netVal).toFixed(2);
  
    // Create the wrapper div for the dropped account
    let item = document.createElement('div');
    item.className = "account-item";
    item.dataset.accLc = accountName.toLowerCase();
    item.textContent = accountName + " - " + displayVal;
  
    // Create a remove (red cross) button
    let removeBtn = document.createElement('span');
    removeBtn.textContent = '✖';
    removeBtn.className = 'remove-button';
    removeBtn.onclick = function () {
      container.removeChild(item);
      droppedAccounts[zoneType].delete(accountName.toLowerCase());
  
      // Show placeholder text if container is empty
      if (container.children.length === 0) {
        let zoneId = (zoneType === 'revenue') ? 'revenueDropZone' : 'opExDropZone';
        let placeholder = document.querySelector('#' + zoneId + ' .placeholder-text');
        if (placeholder) placeholder.style.display = 'inline';
      }
    };
    item.appendChild(removeBtn);
    container.appendChild(item);
  
    // Hide the placeholder text once something is dropped
    let placeholder = ev.currentTarget.querySelector('.placeholder-text');
    if (placeholder) {
      placeholder.style.display = 'none';
    }
  
    // Update the sets
    droppedAccounts[zoneType].add(accountName.toLowerCase());
    // Remove from the other set in case it was there
    if (zoneType === 'revenue') {
      droppedAccounts.opEx.delete(accountName.toLowerCase());
    } else {
      droppedAccounts.revenue.delete(accountName.toLowerCase());
    }
  }
  