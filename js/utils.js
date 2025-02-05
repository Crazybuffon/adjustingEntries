/***********************************************************
 * utils.js
 * 
 * Contains shared helper functions used across modules.
 ***********************************************************/

/**
 * Format a number for display in the Trial Balance or FS.
 * Removes trailing decimals if .00.
 */
function formatNumberForTB(num) {
    if (Math.abs(num) < 0.000001) return "0";
    let str = num.toFixed(2);
    if (str.endsWith(".00")) str = str.slice(0, -3);
    return str;
  }
  
  /**
   * Balances the trial balance array by adjusting the 'Revenue' account
   * so that total debits = total credits.
   */
  /**
 * Balances the TB via the revenue account and then normalizes each account line.
 * This normalization ensures that if an account’s debit equals its credit,
 * only one side shows the net (which would be 0).
 */
function balanceViaRevenue(tbArr) {
    // Calculate current totals
    let totalDebit = tbArr.reduce((sum, item) => sum + item.debit, 0);
    let totalCredit = tbArr.reduce((sum, item) => sum + item.credit, 0);
    let diff = totalDebit - totalCredit;
  
    // Adjust the 'Revenue' account to balance the TB.
    // (Assuming the revenue account is named exactly "Revenue".)
    let revenueItem = tbArr.find(item => item.account.toLowerCase() === 'revenue');
    if (revenueItem) {
      if (diff > 0) {
        revenueItem.credit += diff;
      } else if (diff < 0) {
        revenueItem.debit += Math.abs(diff);
      }
    } else {
      // If there is no revenue account, add one.
      if (diff > 0) {
        tbArr.push({ account: 'Revenue', debit: 0, credit: diff });
      } else if (diff < 0) {
        tbArr.push({ account: 'Revenue', debit: Math.abs(diff), credit: 0 });
      }
    }
  
    // Now, normalize each account line:
    tbArr.forEach(item => {
      const net = item.debit - item.credit;
      if (Math.abs(net) < 0.0001) {
        // If the net is zero (or very close), zero out both sides.
        item.debit = 0;
        item.credit = 0;
      } else if (net > 0) {
        // Only debit should show a value.
        item.debit = net;
        item.credit = 0;
      } else {
        // Only credit should show a value.
        item.debit = 0;
        item.credit = -net;
      }
    });
  }
  