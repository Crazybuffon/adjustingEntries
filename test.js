const a = [
    "Salaries Payable",
    "Interest Payable",
    "Rent Payable",
    "Advertising Payable",
    "Dividends Payable",
    "Taxes Payable",
    "Utilities Payable",
    "Commissions Payable",
    "Legal Payable",
    "Supplies Payable",
    "Employee Benefits Payable",
    "Professional Fees Payable",
    "Shipping Payable",
    "Research Payable",
    "Repairs Payable",
    "Benefits Payable",
    "Warranty Payable",
    "Marketing Payable",
    "Data Services Payable",
    "Customer Support Payable",
    "Training Payable",
    "IT Support Payable",
    "Event Planning Payable",
    "Freelance Payable",
    "Translation Payable",
    "Software Licensing Payable",
    "Catering Payable",
    "HR Payable",
    "Transportation Payable",
    "Cleaning Payable",
    "Subscription Payable",
    "Security Payable",
    "Mortgage Payable",
    "Audit Payable"
  ];
  
  const b = [
    "accounts payable","salaries payable","interest payable","rent payable","advertising payable",
    "dividends payable","commissions payable","legal payable","employee benefits payable","professional fees payable",
    "shipping payable","repairs payable","benefits payable","warranty payable","marketing payable",
    "data services payable","customer support payable","training payable","it support payable",
    "event planning payable","freelance payable","translation payable","software licensing payable",
    "catering payable","hr payable","transportation payable","cleaning payable","research payable",
    "supplies payable","utilities payable","audit payable","taxes payable","subscription payable","security payable",
    "mortgage payable"
  ];
  
  function checkAccounts(a, b) {
    // For each account in `a`, convert it to lowercase and check if it exists in `b`
    const missing = a.filter(account => !b.includes(account.toLowerCase()));
    
    if (missing.length === 0) {
      console.log("All accounts in a are present in b.");
    } else {
      console.log("The following accounts from a are missing in b:", missing);
    }
  }
  
  checkAccounts(a, b);
  