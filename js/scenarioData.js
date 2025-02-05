window.allScenarios = [
  {
    title: "Accrue Salaries",
    description: "Accrued $15,000 in salaries expense at month-end (not yet paid).",
    hint: "Increase Salaries Expense and recognize a liability in Salaries Payable.",
    netEffect: [
      { account: "Salaries Expense", debit: 15000, credit: 0 },
      { account: "Salaries Payable", debit: 0, credit: 15000 }
    ]
  },
  {
    title: "Depreciation on Equipment",
    description: "Recorded $30,000 of depreciation on equipment.",
    hint: "Recognize Depreciation Expense and adjust Accumulated Depreciation - Equipment accordingly.",
    netEffect: [
      { account: "Depreciation Expense", debit: 30000, credit: 0 },
      { account: "Accumulated Depreciation - Equipment", debit: 0, credit: 30000 }
    ]
  },
  {
    title: "Unearned Revenue",
    description: "Recognized $1,500 from unearned revenue as earned revenue.",
    hint: "Decrease Unearned Revenue and record the corresponding Revenue.",
    netEffect: [
      { account: "Unearned Revenue", debit: 1500, credit: 0 },
      { account: "Revenue", debit: 0, credit: 1500 }
    ]
  },
  {
    title: "Prepaid Insurance Expired",
    description: "Amortized $3,000 of prepaid insurance for the period.",
    hint: "Allocate a portion of Prepaid Insurance to Insurance Expense.",
    netEffect: [
      { account: "Insurance Expense", debit: 3000, credit: 0 },
      { account: "Prepaid Insurance", debit: 0, credit: 3000 }
    ]
  },
  {
    title: "Accrued Interest",
    description: "Accrued $2,000 of interest on a note payable.",
    hint: "Record Interest Expense and recognize the liability in Interest Payable.",
    netEffect: [
      { account: "Interest Expense", debit: 2000, credit: 0 },
      { account: "Interest Payable", debit: 0, credit: 2000 }
    ]
  },
  {
    title: "Supplies Used",
    description: "Used $4,000 of office supplies during the month.",
    hint: "Move the cost from Supplies to Supplies Expense.",
    netEffect: [
      { account: "Supplies Expense", debit: 4000, credit: 0 },
      { account: "Supplies", debit: 0, credit: 4000 }
    ]
  },
  {
    title: "Accrued Rent",
    description: "Accrued $12,000 of rent expense for the month.",
    hint: "Increase Rent Expense and recognize a liability in Rent Payable.",
    netEffect: [
      { account: "Rent Expense", debit: 12000, credit: 0 },
      { account: "Rent Payable", debit: 0, credit: 12000 }
    ]
  },
  {
    title: "Deferred Advertising",
    description: "Amortized $6,000 of prepaid advertising for the quarter.",
    hint: "Allocate prepaid advertising to Advertising Expense.",
    netEffect: [
      { account: "Advertising Expense", debit: 6000, credit: 0 },
      { account: "Prepaid Advertising", debit: 0, credit: 6000 }
    ]
  },
  {
    title: "Bad Debt Expense",
    description: "Estimated $2,500 of accounts receivable to be uncollectible.",
    hint: "Record Bad Debt Expense and increase Allowance for Doubtful Accounts.",
    netEffect: [
      { account: "Bad Debt Expense", debit: 2500, credit: 0 },
      { account: "Allowance for Doubtful Accounts", debit: 0, credit: 2500 }
    ]
  },
  {
    title: "Accrued Utilities",
    description: "Accrued $1,500 for utility bills not yet paid.",
    hint: "Increase Utilities Expense and recognize a liability in Utilities Payable.",
    netEffect: [
      { account: "Utilities Expense", debit: 1500, credit: 0 },
      { account: "Utilities Payable", debit: 0, credit: 1500 }
    ]
  },
  {
    title: "Accrued Dividends",
    description: "Declared $8,000 in dividends payable at year-end.",
    hint: "Recognize Dividends and a liability in Dividends Payable.",
    netEffect: [
      { account: "Dividends", debit: 8000, credit: 0 },
      { account: "Dividends Payable", debit: 0, credit: 8000 }
    ]
  },
  {
    title: "Deferred Subscription Revenue",
    description: "Earned $700 from a previously recorded subscription.",
    hint: "Decrease Unearned Subscription Revenue and recognize Subscription Revenue.",
    netEffect: [
      { account: "Unearned Subscription Revenue", debit: 700, credit: 0 },
      { account: "Subscription Revenue", debit: 0, credit: 700 }
    ]
  },
  {
    title: "Inventory Shrinkage",
    description: "Adjusted for $3,000 of inventory shrinkage.",
    hint: "Increase Cost of Goods Sold and decrease Inventory.",
    netEffect: [
      { account: "Cost of Goods Sold", debit: 3000, credit: 0 },
      { account: "Inventory", debit: 0, credit: 3000 }
    ]
  },
  {
    title: "Accrued Taxes",
    description: "Accrued $5,000 for income taxes payable.",
    hint: "Record Tax Expense and recognize the liability in Taxes Payable.",
    netEffect: [
      { account: "Tax Expense", debit: 5000, credit: 0 },
      { account: "Taxes Payable", debit: 0, credit: 5000 }
    ]
  },
  {
    title: "Depreciation on Building",
    description: "Recorded $30,000 of depreciation on building.",
    hint: "Recognize Depreciation Expense and adjust Accumulated Depreciation - Building.",
    netEffect: [
      { account: "Depreciation Expense", debit: 30000, credit: 0 },
      { account: "Accumulated Depreciation - Building", debit: 0, credit: 30000 }
    ]
  },
  {
    title: "Accrued Commissions",
    description: "Accrued $4,500 in sales commissions payable.",
    hint: "Increase Commissions Expense and recognize a liability in Commissions Payable.",
    netEffect: [
      { account: "Commissions Expense", debit: 4500, credit: 0 },
      { account: "Commissions Payable", debit: 0, credit: 4500 }
    ]
  },
  {
    title: "Deferred Maintenance Expense",
    description: "Allocated $6,000 for maintenance services received in advance.",
    hint: "Decrease Prepaid Maintenance and recognize Maintenance Expense.",
    netEffect: [
      { account: "Prepaid Maintenance", debit: 0, credit: 6000 },
      { account: "Maintenance Expense", debit: 6000, credit: 0 }
    ]
  },
  {
    title: "Accrued Advertising",
    description: "Accrued $2,500 for advertising services received but not yet billed.",
    hint: "Increase Advertising Expense and recognize a liability in Advertising Payable.",
    netEffect: [
      { account: "Advertising Expense", debit: 2500, credit: 0 },
      { account: "Advertising Payable", debit: 0, credit: 2500 }
    ]
  },
  {
    title: "Unearned Service Revenue",
    description: "Earned $10,000 from previously unearned service revenue.",
    hint: "Decrease Unearned Service Revenue and recognize Service Revenue.",
    netEffect: [
      { account: "Unearned Service Revenue", debit: 10000, credit: 0 },
      { account: "Service Revenue", debit: 0, credit: 10000 }
    ]
  },
  {
    title: "Accrued Utilities",
    description: "Accrued $2,750 for utility expenses not yet paid.",
    hint: "Increase Utilities Expense and recognize a liability in Utilities Payable.",
    netEffect: [
      { account: "Utilities Expense", debit: 2750, credit: 0 },
      { account: "Utilities Payable", debit: 0, credit: 2750 }
    ]
  },
  {
    title: "Prepaid Rent Amortization",
    description: "Amortized $8,000 of prepaid rent for the period.",
    hint: "Allocate prepaid rent to Rent Expense.",
    netEffect: [
      { account: "Rent Expense", debit: 8000, credit: 0 },
      { account: "Prepaid Rent", debit: 0, credit: 8000 }
    ]
  },
  {
    title: "Depreciation on Vehicles",
    description: "Recorded $15,000 of depreciation on company vehicles.",
    hint: "Recognize Depreciation Expense and adjust Accumulated Depreciation - Vehicles.",
    netEffect: [
      { account: "Depreciation Expense", debit: 15000, credit: 0 },
      { account: "Accumulated Depreciation - Vehicles", debit: 0, credit: 15000 }
    ]
  },
  {
    title: "Accrued Legal Fees",
    description: "Accrued $9,000 for legal services received but not yet paid.",
    hint: "Increase Legal Expense and recognize a liability in Legal Payable.",
    netEffect: [
      { account: "Legal Expense", debit: 9000, credit: 0 },
      { account: "Legal Payable", debit: 0, credit: 9000 }
    ]
  },
  {
    title: "Deferred Subscription Fees",
    description: "Recognized $12,000 from unearned subscription revenue as earned.",
    hint: "Decrease Unearned Subscription Revenue and recognize Subscription Revenue.",
    netEffect: [
      { account: "Unearned Subscription Revenue", debit: 12000, credit: 0 },
      { account: "Subscription Revenue", debit: 0, credit: 12000 }
    ]
  },
  {
    title: "Accrued Employee Benefits",
    description: "Accrued $7,000 for employee benefits earned but not yet paid.",
    hint: "Increase Employee Benefits Expense and recognize a liability in Benefits Payable.",
    netEffect: [
      { account: "Employee Benefits Expense", debit: 7000, credit: 0 },
      { account: "Benefits Payable", debit: 0, credit: 7000 }
    ]
  },
  {
    title: "Accrued Commissions",
    description: "Accrued $5,500 in sales commissions payable at month-end.",
    hint: "Increase Commissions Expense and recognize a liability in Commissions Payable.",
    netEffect: [
      { account: "Commissions Expense", debit: 5500, credit: 0 },
      { account: "Commissions Payable", debit: 0, credit: 5500 }
    ]
  },
  {
    title: "Depreciation on Furniture",
    description: "Recorded $7,500 of depreciation on office furniture.",
    hint: "Recognize Depreciation Expense and adjust Accumulated Depreciation - Furniture.",
    netEffect: [
      { account: "Depreciation Expense", debit: 7500, credit: 0 },
      { account: "Accumulated Depreciation - Furniture", debit: 0, credit: 7500 }
    ]
  },
  {
    title: "Accrued Repairs",
    description: "Accrued $3,000 for repairs services received but not yet billed.",
    hint: "Increase Repairs Expense and recognize a liability in Repairs Payable.",
    netEffect: [
      { account: "Repairs Expense", debit: 3000, credit: 0 },
      { account: "Repairs Payable", debit: 0, credit: 3000 }
    ]
  },
  {
    title: "Deferred Rent Revenue",
    description: "Earned $9,500 from previously recorded rent revenue.",
    hint: "Decrease Unearned Rent Revenue and recognize Rent Revenue.",
    netEffect: [
      { account: "Unearned Rent Revenue", debit: 9500, credit: 0 },
      { account: "Rent Revenue", debit: 0, credit: 9500 }
    ]
  },
  {
    title: "Accrued Warranty Expense",
    description: "Accrued $4,000 for warranty claims expected.",
    hint: "Increase Warranty Expense and recognize a liability in Warranty Payable.",
    netEffect: [
      { account: "Warranty Expense", debit: 4000, credit: 0 },
      { account: "Warranty Payable", debit: 0, credit: 4000 }
    ]
  },
  {
    title: "Prepaid Utilities Amortization",
    description: "Amortized $1,800 of prepaid utilities for the period.",
    hint: "Allocate prepaid utilities to Utilities Expense.",
    netEffect: [
      { account: "Utilities Expense", debit: 1800, credit: 0 },
      { account: "Prepaid Utilities", debit: 0, credit: 1800 }
    ]
  },
  {
    title: "Depreciation on Machinery",
    description: "Recorded $25,000 of depreciation on machinery.",
    hint: "Recognize Depreciation Expense and adjust Accumulated Depreciation - Machinery.",
    netEffect: [
      { account: "Depreciation Expense", debit: 25000, credit: 0 },
      { account: "Accumulated Depreciation - Machinery", debit: 0, credit: 25000 }
    ]
  },
  {
    title: "Accrued Advertising Fees",
    description: "Accrued $6,000 for advertising services not yet paid.",
    hint: "Increase Advertising Expense and recognize a liability in Advertising Payable.",
    netEffect: [
      { account: "Advertising Expense", debit: 6000, credit: 0 },
      { account: "Advertising Payable", debit: 0, credit: 6000 }
    ]
  },
  {
    title: "Unearned Consulting Revenue",
    description: "Recognized $15,000 from unearned consulting revenue.",
    hint: "Decrease Unearned Consulting Revenue and recognize Consulting Revenue.",
    netEffect: [
      { account: "Unearned Consulting Revenue", debit: 15000, credit: 0 },
      { account: "Consulting Revenue", debit: 0, credit: 15000 }
    ]
  },
  {
    title: "Accrued Utilities Expense",
    description: "Accrued $2,750 for utilities used but not yet billed.",
    hint: "Increase Utilities Expense and recognize a liability in Utilities Payable.",
    netEffect: [
      { account: "Utilities Expense", debit: 2750, credit: 0 },
      { account: "Utilities Payable", debit: 0, credit: 2750 }
    ]
  },
  {
    title: "Prepaid Advertising Amortization",
    description: "Amortized $5,000 of prepaid advertising for the month.",
    hint: "Allocate prepaid advertising to Advertising Expense.",
    netEffect: [
      { account: "Advertising Expense", debit: 5000, credit: 0 },
      { account: "Prepaid Advertising", debit: 0, credit: 5000 }
    ]
  },
  {
    title: "Depreciation on Computers",
    description: "Recorded $1,200 of depreciation on computer equipment.",
    hint: "Recognize Depreciation Expense and adjust Accumulated Depreciation - Computers.",
    netEffect: [
      { account: "Depreciation Expense", debit: 1200, credit: 0 },
      { account: "Accumulated Depreciation - Computers", debit: 0, credit: 1200 }
    ]
  },
  {
    title: "Accrued Office Supplies",
    description: "Accrued $3,500 for office supplies used but not yet billed.",
    hint: "Increase Supplies Expense and recognize a liability in Supplies Payable.",
    netEffect: [
      { account: "Supplies Expense", debit: 3500, credit: 0 },
      { account: "Supplies Payable", debit: 0, credit: 3500 }
    ]
  },
  {
    title: "Accrued Employee Salaries",
    description: "Accrued $15,000 in employee salaries payable.",
    hint: "Increase Salaries Expense and recognize a liability in Salaries Payable.",
    netEffect: [
      { account: "Salaries Expense", debit: 15000, credit: 0 },
      { account: "Salaries Payable", debit: 0, credit: 15000 }
    ]
  },
  {
    title: "Accrued Professional Fees",
    description: "Accrued $6,500 for professional services rendered but not yet billed.",
    hint: "Increase Professional Fees Expense and recognize a liability in Professional Fees Payable.",
    netEffect: [
      { account: "Professional Fees Expense", debit: 6500, credit: 0 },
      { account: "Professional Fees Payable", debit: 0, credit: 6500 }
    ]
  },
  {
    title: "Deferred Membership Fees",
    description: "Earned $11,000 from previously unearned membership fees.",
    hint: "Decrease Unearned Membership Fees and recognize Membership Revenue.",
    netEffect: [
      { account: "Unearned Membership Fees", debit: 11000, credit: 0 },
      { account: "Membership Revenue", debit: 0, credit: 11000 }
    ]
  },
  {
    title: "Accrued Shipping Expenses",
    description: "Accrued $4,000 for shipping costs incurred but not yet paid.",
    hint: "Increase Shipping Expense and recognize a liability in Shipping Payable.",
    netEffect: [
      { account: "Shipping Expense", debit: 4000, credit: 0 },
      { account: "Shipping Payable", debit: 0, credit: 4000 }
    ]
  },
  {
    title: "Accrued Marketing Expenses",
    description: "Accrued $5,000 for marketing services received but not yet paid.",
    hint: "Increase Marketing Expense and recognize a liability in Marketing Payable.",
    netEffect: [
      { account: "Marketing Expense", debit: 5000, credit: 0 },
      { account: "Marketing Payable", debit: 0, credit: 5000 }
    ]
  },
  {
    title: "Unearned Event Revenue",
    description: "Recognized $14,000 from unearned event revenue.",
    hint: "Decrease Unearned Event Revenue and recognize Event Revenue.",
    netEffect: [
      { account: "Unearned Event Revenue", debit: 14000, credit: 0 },
      { account: "Event Revenue", debit: 0, credit: 14000 }
    ]
  },
  {
    title: "Accrued Security Expenses",
    description: "Accrued $3,000 for security services not yet billed.",
    hint: "Increase Security Expense and recognize a liability in Security Payable.",
    netEffect: [
      { account: "Security Expense", debit: 3000, credit: 0 },
      { account: "Security Payable", debit: 0, credit: 3000 }
    ]
  },
  {
    title: "Prepaid Legal Fees Amortization",
    description: "Amortized $2,500 of prepaid legal fees for the period.",
    hint: "Allocate prepaid legal fees to Legal Expense.",
    netEffect: [
      { account: "Legal Expense", debit: 2500, credit: 0 },
      { account: "Prepaid Legal Fees", debit: 0, credit: 2500 }
    ]
  },
  {
    title: "Depreciation on Leasehold Improvements",
    description: "Recorded $10,000 of depreciation on leasehold improvements.",
    hint: "Recognize Depreciation Expense and adjust Accumulated Depreciation - Leasehold Improvements.",
    netEffect: [
      { account: "Depreciation Expense", debit: 10000, credit: 0 },
      { account: "Accumulated Depreciation - Leasehold Improvements", debit: 0, credit: 10000 }
    ]
  },
  {
    title: "Accrued Research Expenses",
    description: "Accrued $7,500 for research and development expenses incurred.",
    hint: "Increase Research Expense and recognize a liability in Research Payable.",
    netEffect: [
      { account: "Research Expense", debit: 7500, credit: 0 },
      { account: "Research Payable", debit: 0, credit: 7500 }
    ]
  },
  {
    title: "Deferred Training Revenue",
    description: "Recognized $9,000 from unearned training revenue.",
    hint: "Decrease Unearned Training Revenue and recognize Training Revenue.",
    netEffect: [
      { account: "Unearned Training Revenue", debit: 9000, credit: 0 },
      { account: "Training Revenue", debit: 0, credit: 9000 }
    ]
  },
  {
    title: "Accrued IT Support Expenses",
    description: "Accrued $5,000 for IT support services received but not yet paid.",
    hint: "Increase IT Support Expense and recognize a liability in IT Support Payable.",
    netEffect: [
      { account: "IT Support Expense", debit: 5000, credit: 0 },
      { account: "IT Support Payable", debit: 0, credit: 5000 }
    ]
  },
  {
    title: "Accrued Cleaning Expenses",
    description: "Accrued $2,200 for cleaning services used but not yet billed.",
    hint: "Increase Cleaning Expense and recognize a liability in Cleaning Payable.",
    netEffect: [
      { account: "Cleaning Expense", debit: 2200, credit: 0 },
      { account: "Cleaning Payable", debit: 0, credit: 2200 }
    ]
  },
  {
    title: "Accrued Audit Fees",
    description: "Accrued $10,000 for audit services not yet paid.",
    hint: "Increase Audit Expense and recognize a liability in Audit Payable.",
    netEffect: [
      { account: "Audit Expense", debit: 10000, credit: 0 },
      { account: "Audit Payable", debit: 0, credit: 10000 }
    ]
  },
  {
    title: "Prepaid Marketing Amortization",
    description: "Amortized $4,500 of prepaid marketing expenses.",
    hint: "Allocate prepaid marketing to Marketing Expense.",
    netEffect: [
      { account: "Marketing Expense", debit: 4500, credit: 0 },
      { account: "Prepaid Marketing", debit: 0, credit: 4500 }
    ]
  },
  {
    title: "Depreciation on Land Improvements",
    description: "Recorded $6,000 of depreciation on land improvements.",
    hint: "Recognize Depreciation Expense and adjust Accumulated Depreciation - Land Improvements.",
    netEffect: [
      { account: "Depreciation Expense", debit: 6000, credit: 0 },
      { account: "Accumulated Depreciation - Land Improvements", debit: 0, credit: 6000 }
    ]
  },
  {
    title: "Accrued Training Expenses",
    description: "Accrued $3,500 for training services received but not yet billed.",
    hint: "Increase Training Expense and recognize a liability in Training Payable.",
    netEffect: [
      { account: "Training Expense", debit: 3500, credit: 0 },
      { account: "Training Payable", debit: 0, credit: 3500 }
    ]
  },
  {
    title: "Unearned Webinar Revenue",
    description: "Recognized $13,000 from unearned webinar revenue.",
    hint: "Decrease Unearned Webinar Revenue and recognize Webinar Revenue.",
    netEffect: [
      { account: "Unearned Webinar Revenue", debit: 13000, credit: 0 },
      { account: "Webinar Revenue", debit: 0, credit: 13000 }
    ]
  },
  {
    title: "Accrued Subscription Fees",
    description: "Accrued $8,000 for subscription services not yet billed.",
    hint: "Increase Subscription Expense and recognize a liability in Subscription Payable.",
    netEffect: [
      { account: "Subscription Expense", debit: 8000, credit: 0 },
      { account: "Subscription Payable", debit: 0, credit: 8000 }
    ]
  },
  {
    title: "Prepaid Security Services Amortization",
    description: "Amortized $3,000 of prepaid security services.",
    hint: "Allocate prepaid security services to Security Expense.",
    netEffect: [
      { account: "Security Expense", debit: 3000, credit: 0 },
      { account: "Prepaid Security Services", debit: 0, credit: 3000 }
    ]
  },

  {
    title: "Accrued Transportation Expenses",
    description: "Accrued $5,000 for transportation services used but not yet billed.",
    hint: "Increase Transportation Expense and recognize a liability in Transportation Payable.",
    netEffect: [
      { account: "Transportation Expense", debit: 5000, credit: 0 },
      { account: "Transportation Payable", debit: 0, credit: 5000 }
    ]
  },
  {
    title: "Unearned Licensing Revenue",
    description: "Recognized $20,000 from unearned licensing revenue.",
    hint: "Decrease Unearned Licensing Revenue and recognize Licensing Revenue.",
    netEffect: [
      { account: "Unearned Licensing Revenue", debit: 20000, credit: 0 },
      { account: "Licensing Revenue", debit: 0, credit: 20000 }
    ]
  },
  {
    title: "Accrued Event Planning Expenses",
    description: "Accrued $4,500 for event planning services not yet paid.",
    hint: "Increase Event Planning Expense and recognize a liability in Event Planning Payable.",
    netEffect: [
      { account: "Event Planning Expense", debit: 4500, credit: 0 },
      { account: "Event Planning Payable", debit: 0, credit: 4500 }
    ]
  },
  {
    title: "Prepaid IT Services Amortization",
    description: "Amortized $3,500 of prepaid IT services.",
    hint: "Allocate prepaid IT services to IT Support Expense.",
    netEffect: [
      { account: "IT Support Expense", debit: 3500, credit: 0 },
      { account: "Prepaid IT Services", debit: 0, credit: 3500 }
    ]
  },
  {
    title: "Depreciation on Equipment Lease",
    description: "Recorded $17,000 of depreciation on leased equipment.",
    hint: "Recognize Depreciation Expense and adjust Accumulated Depreciation - Leased Equipment.",
    netEffect: [
      { account: "Depreciation Expense", debit: 17000, credit: 0 },
      { account: "Accumulated Depreciation - Leased Equipment", debit: 0, credit: 17000 }
    ]
  },
  {
    title: "Accrued HR Expenses",
    description: "Accrued $4,000 for human resources services rendered but not yet paid.",
    hint: "Increase HR Expense and recognize a liability in HR Payable.",
    netEffect: [
      { account: "HR Expense", debit: 4000, credit: 0 },
      { account: "HR Payable", debit: 0, credit: 4000 }
    ]
  },
  {
    title: "Unearned Maintenance Contracts",
    description: "Recognized $18,000 from unearned maintenance contracts.",
    hint: "Decrease Unearned Maintenance Contracts and recognize Maintenance Revenue.",
    netEffect: [
      { account: "Unearned Maintenance Contracts", debit: 18000, credit: 0 },
      { account: "Maintenance Revenue", debit: 0, credit: 18000 }
    ]
  },
  {
    title: "Accrued Software Licensing Fees",
    description: "Accrued $6,000 for software licensing fees not yet billed.",
    hint: "Increase Software Licensing Expense and recognize a liability in Software Licensing Payable.",
    netEffect: [
      { account: "Software Licensing Expense", debit: 6000, credit: 0 },
      { account: "Software Licensing Payable", debit: 0, credit: 6000 }
    ]
  },
  {
    title: "Prepaid Employee Training Amortization",
    description: "Amortized $4,000 of prepaid employee training costs.",
    hint: "Allocate prepaid training costs to Training Expense.",
    netEffect: [
      { account: "Training Expense", debit: 4000, credit: 0 },
      { account: "Prepaid Employee Training", debit: 0, credit: 4000 }
    ]
  },
  {
    title: "Depreciation on Production Equipment",
    description: "Recorded $22,000 of depreciation on production equipment.",
    hint: "Recognize Depreciation Expense and adjust Accumulated Depreciation - Production Equipment.",
    netEffect: [
      { account: "Depreciation Expense", debit: 22000, credit: 0 },
      { account: "Accumulated Depreciation - Production Equipment", debit: 0, credit: 22000 }
    ]
  },
  {
    title: "Accrued Customer Support Expenses",
    description: "Accrued $5,000 for customer support services not yet paid.",
    hint: "Increase Customer Support Expense and recognize a liability in Customer Support Payable.",
    netEffect: [
      { account: "Customer Support Expense", debit: 5000, credit: 0 },
      { account: "Customer Support Payable", debit: 0, credit: 5000 }
    ]
  },
  {
    title: "Unearned Subscription Boxes Revenue",
    description: "Recognized $17,000 from unearned subscription boxes revenue.",
    hint: "Decrease Unearned Subscription Boxes Revenue and recognize Subscription Boxes Revenue.",
    netEffect: [
      { account: "Unearned Subscription Boxes Revenue", debit: 17000, credit: 0 },
      { account: "Subscription Boxes Revenue", debit: 0, credit: 17000 }
    ]
  },
  {
    title: "Accrued Catering Expenses",
    description: "Accrued $3,500 for catering services received but not yet paid.",
    hint: "Increase Catering Expense and recognize a liability in Catering Payable.",
    netEffect: [
      { account: "Catering Expense", debit: 3500, credit: 0 },
      { account: "Catering Payable", debit: 0, credit: 3500 }
    ]
  },
  {
      title: "Mortgage Payment",
      description: "Paid $5,000 on the monthly mortgage. Of this amount, $1,000 is interest, and $4,000 is a principal reduction.",
      hint: "Record the interest portion as an expense, reduce the mortgage payable by the principal portion, and credit Cash for the total payment.",
      netEffect: [
        { account: "Interest Expense", debit: 1000, credit: 0 },
        { account: "Mortgage Payable", debit: 4000, credit: 0 },
        { account: "Cash", debit: 0, credit: 5000 }
      ]
    },
  {
    title: "Prepaid Transportation Amortization",
    description: "Amortized $3,000 of prepaid transportation services.",
    hint: "Allocate prepaid transportation to Transportation Expense.",
    netEffect: [
      { account: "Transportation Expense", debit: 3000, credit: 0 },
      { account: "Prepaid Transportation", debit: 0, credit: 3000 }
    ]
  },
  {
    title: "Accrued Translation Services Expenses",
    description: "Accrued $4,500 for translation services not yet paid.",
    hint: "Increase Translation Expense and recognize a liability in Translation Payable.",
    netEffect: [
      { account: "Translation Expense", debit: 4500, credit: 0 },
      { account: "Translation Payable", debit: 0, credit: 4500 }
    ]
  },
  {
    title: "Unearned Technical Support Revenue",
    description: "Recognized $20,000 from unearned technical support revenue.",
    hint: "Decrease Unearned Technical Support Revenue and recognize Technical Support Revenue.",
    netEffect: [
      { account: "Unearned Technical Support Revenue", debit: 20000, credit: 0 },
      { account: "Technical Support Revenue", debit: 0, credit: 20000 }
    ]
  },
  {
    title: "Accrued Freelance Expenses",
    description: "Accrued $5,000 for freelance services rendered but not yet paid.",
    hint: "Increase Freelance Expense and recognize a liability in Freelance Payable.",
    netEffect: [
      { account: "Freelance Expense", debit: 5000, credit: 0 },
      { account: "Freelance Payable", debit: 0, credit: 5000 }
    ]
  },
  {
    title: "Depreciation on HVAC Systems",
    description: "Recorded $16,000 of depreciation on HVAC systems.",
    hint: "Recognize Depreciation Expense and adjust Accumulated Depreciation - HVAC Systems.",
    netEffect: [
      { account: "Depreciation Expense", debit: 16000, credit: 0 },
      { account: "Accumulated Depreciation - HVAC Systems", debit: 0, credit: 16000 }
    ]
  },
  {
    title: "Accrued Data Services Expenses",
    description: "Accrued $4,000 for data services used but not yet billed.",
    hint: "Increase Data Services Expense and recognize a liability in Data Services Payable.",
    netEffect: [
      { account: "Data Services Expense", debit: 4000, credit: 0 },
      { account: "Data Services Payable", debit: 0, credit: 4000 }
    ]
  }
];

window.cats = {
  "Assets": [
    // Current Assets
    "Cash",
    "Accounts Receivable",
    "Interest Receivable",
    "Supplies",
    "Prepaid Insurance",
    "Prepaid Advertising",
    "Prepaid Marketing",
    "Prepaid Maintenance",
    "Prepaid Rent",
    "Prepaid Utilities",
    "Prepaid Legal Fees",
    "Prepaid Employee Training",
    "Prepaid Security Services",
    "Prepaid IT Services",
    "Prepaid Transportation",
    "Inventory",

    // Property, Plant & Equipment
    "Equipment",
    "Furniture",
    "Vehicles",
    "Machinery",
    "Production Equipment",
    "Leasehold Improvements",
    "Land Improvements",

    // Contra-Assets
    "Accumulated Depreciation - Building",
    "Accumulated Depreciation - Equipment",
    "Accumulated Depreciation - Vehicles",
    "Accumulated Depreciation - Furniture",
    "Accumulated Depreciation - Machinery",
    "Accumulated Depreciation - Computers",
    "Accumulated Depreciation - Production Equipment",
    "Accumulated Depreciation - Leasehold Improvements",
    "Accumulated Depreciation - Land Improvements",
    "Accumulated Depreciation - Leased Equipment",
    "Accumulated Depreciation - HVAC Systems",
    "Allowance for Doubtful Accounts"
  ],
  "Liabilities": [
    // Current Liabilities
    "Accounts Payable",
    "Unearned Revenue",
    "Unearned Subscription Revenue",
    "Unearned Service Revenue",
    "Unearned Maintenance Contracts",
    "Unearned Rent Revenue",
    "Unearned Consulting Revenue",
    "Unearned Membership Fees",
    "Unearned Event Revenue",
    "Unearned Training Revenue",
    "Unearned Webinar Revenue",
    "Unearned Technical Support Revenue",
    "Unearned Subscription Boxes Revenue",
    "Unearned Licensing Revenue",
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
  ],
  "Equity & Others": [
    // Equity
    "Retained Earnings",
    "Dividends",

    // Revenues
    "Revenue",
    "Subscription Revenue",
    "Service Revenue",
    "Consulting Revenue",
    "Event Revenue",
    "Membership Revenue",
    "Maintenance Revenue",
    "Warranty Revenue",
    "Technical Support Revenue",
    "Training Revenue",
    "Catering Revenue",
    "Shipping Revenue",
    "Freelance Revenue",
    "Data Services Revenue",
    "Rent Revenue",
    "Event Planning Revenue",
    "Webinar Revenue",
    "Licensing Revenue",
    "Subscription Boxes Revenue",

    // Expenses
    "Depreciation Expense",
    "Insurance Expense",
    "Salaries Expense",
    "Interest Expense",
    "Bad Debt Expense",
    "Advertising Expense",
    "Rent Expense",
    "Utilities Expense",
    "Amortization Expense",
    "Legal Expense",
    "Cost of Goods Sold",
    "Tax Expense",
    "Commissions Expense",
    "Maintenance Expense",
    "Shipping Expense",
    "Warranty Expense",
    "Repairs Expense",
    "Customer Support Expense",
    "Software Licensing Expense",
    "Research Expense",
    "IT Support Expense",
    "Data Services Expense",
    "Catering Expense",
    "Translation Expense",
    "Audit Expense",
    "HR Expense",
    "Marketing Expense",
    "Event Planning Expense",
    "Security Expense",
    "Cleaning Expense",
    "Supplies Expense",
    "Employee Benefits Expense",
    "Subscription Expense",
    "Transportation Expense",
    "Freelance Expense",
    "Professional Fees Expense",
    "Training Expense",
  ]
};

// Original Trial Balance (TB)
window.originalTB = [
// ─────────────────────────────────────
// ASSETS (Debits)
// ─────────────────────────────────────
{ account: "Cash", debit: 120000, credit: 0 },
{ account: "Accounts Receivable", debit: 50000, credit: 0 },
{ account: "Allowance for Doubtful Accounts", debit: 0, credit: 6000 }, // contra asset
{ account: "Inventory", debit: 60000, credit: 0 },
{ account: "Supplies", debit: 15000, credit: 0 },
{ account: "Prepaid Insurance", debit: 0, credit: 0 },
{ account: "Prepaid Advertising", debit: 0, credit: 0 },
{ account: "Prepaid Rent", debit: 0, credit: 0 },
{ account: "Prepaid Maintenance", debit: 0, credit: 0 },
{ account: "Prepaid Utilities", debit: 0, credit: 0 },
{ account: "Prepaid Security Services", debit: 0, credit: 0 },
{ account: "Prepaid IT Services", debit: 0, credit: 0 },
{ account: "Prepaid Employee Training", debit: 0, credit: 0 },
{ account: "Prepaid Marketing", debit: 0, credit: 0 },
{ account: "Prepaid Legal Fees", debit: 0, credit: 0 },
{ account: "Prepaid Transportation", debit: 0, credit: 0 },
{ account: "Patent", debit: 12000, credit: 0 },
{ account: "Building", debit: 150000, credit: 0 },
{ account: "Equipment", debit: 30000, credit: 0 },
{ account: "Vehicles", debit: 136000, credit: 0 },
{ account: "Leased Equipment", debit: 30000, credit: 0 },

// ─────────────────────────────────────
// ACCUMULATED DEPRECIATION (Credits)
// ─────────────────────────────────────
{ account: "Accumulated Depreciation - Equipment", debit: 0, credit: 600 },
{ account: "Accumulated Depreciation - Vehicles", debit: 0, credit: 700 },

// ─────────────────────────────────────
// LIABILITIES (Credits)
// ─────────────────────────────────────
{ account: "Accounts Payable", debit: 0, credit: 12000 },
{ account: "Unearned Revenue", debit: 0, credit: 0 },
{ account: "Unearned Subscription Revenue", debit: 0, credit: 0 },
{ account: "Unearned Maintenance Contracts", debit: 0, credit: 0 },
{ account: "Unearned Rent Revenue", debit: 0, credit: 0 },
{ account: "Unearned Consulting Revenue", debit: 0, credit: 0 },
{ account: "Unearned Service Revenue", debit: 0, credit: 0 },
{ account: "Unearned Webinar Revenue", debit: 0, credit: 0 },
{ account: "Unearned Licensing Revenue", debit: 0, credit: 0 },
{ account: "Unearned Technical Support Revenue", debit: 0, credit: 0 },
{ account: "Unearned Training Revenue", debit: 0, credit: 0 },
{ account: "Unearned Membership Fees", debit: 0, credit: 0 },
{ account: "Unearned Subscription Boxes Revenue", debit: 0, credit: 0 },
{ account: "Taxes Payable", debit: 0, credit: 10000 },
{ account: "Mortgage Payable", debit: 0, credit: 100000 }, 

// ─────────────────────────────────────
// EQUITY (Credits)
// ─────────────────────────────────────
// (Adjusted so the entire TB balances)
{ account: "Retained Earnings", debit: 0, credit: 408000 },

// ─────────────────────────────────────
// EXPENSE ACCOUNTS (Debits)
// ─────────────────────────────────────
{ account: "Salaries Expense", debit: 20000, credit: 0 },
{ account: "Utilities Expense", debit: 5000, credit: 0 },
{ account: "Rent Expense", debit: 7500, credit: 0 },
{ account: "Interest Expense", debit: 2500, credit: 0 },
{ account: "Tax Expense", debit: 30000, credit: 0 },
{ account: "Cost of Goods Sold", debit: 15000, credit: 0 },

// ─────────────────────────────────────
// DEPRECIATION & AMORTIZATION EXPENSE
// ─────────────────────────────────────
// Split to match the respective Accumulated accounts
{ account: "Depreciation Expense", debit: 1300, credit: 0 },

// ─────────────────────────────────────
// REVENUE ACCOUNTS (Credits)
// ─────────────────────────────────────
{ account: "Revenue", debit: 0, credit: 350000 },
];

// Define your categories for Income Statement & Balance Sheet
window.statementCategories = {
// Income Statement subcategories
revenueAccounts: [
    "revenue","service revenue","subscription revenue","consulting revenue","event revenue",
    "membership revenue","maintenance revenue","warranty revenue","technical support revenue",
    "training revenue","catering revenue","shipping revenue","freelance revenue","data services revenue",
    "event planning revenue","subscription boxes revenue","rent revenue","licensing revenue",
    "webinar revenue"
],
cogsAccounts: [
    "cost of goods sold"
],
interestExpenseAccounts: [
    "interest expense"
],
taxExpenseAccounts: [
    "tax expense"
],


// Balance Sheet subcategories
currentAssetAccounts: [
    "cash","accounts receivable","interest receivable","inventory","supplies",
    "prepaid insurance","prepaid advertising","prepaid maintenance","prepaid rent",
    "prepaid utilities","prepaid security services","prepaid it services",
    "prepaid transportation","prepaid marketing","prepaid legal fees","prepaid employee training","allowance for doubtful accounts"
],
nonCurrentAssetAccounts: [
    "equipment","furniture","vehicles","production equipment",
    "land improvements","leased equipment","building","software","patent",
    "leasehold improvements",
    "accumulated depreciation - building","accumulated depreciation - equipment","accumulated depreciation - furniture",
    "accumulated depreciation - vehicles","accumulated depreciation - machinery","accumulated depreciation - computers",
    "accumulated depreciation - production equipment","accumulated depreciation - land improvements",
    "accumulated depreciation - leased equipment","accumulated depreciation - hvac systems"
    
],
currentLiabilityAccounts: [
    "accounts payable","salaries payable","interest payable","rent payable","advertising payable",
    "dividends payable","commissions payable","legal payable","employee benefits payable","professional fees payable",
    "shipping payable","repairs payable","benefits payable","warranty payable","marketing payable",
    "data services payable","customer support payable","training payable","it support payable",
    "event planning payable","freelance payable","translation payable","software licensing payable",
    "catering payable","hr payable","transportation payable","cleaning payable","research payable",
    "supplies payable","utilities payable","audit payable","taxes payable","subscription payable","security payable"
],
longTermLiabilityAccounts: [
    "mortgage payable"
],
currentLiabilityUnearned: [
    "unearned revenue","unearned subscription revenue","unearned maintenance contracts","unearned rent revenue",
    "unearned event revenue","unearned consulting revenue","unearned service revenue",
    "unearned webinar revenue","unearned licensing revenue",
    "unearned technical support revenue","unearned training revenue","unearned membership fees",
    "unearned subscription boxes revenue"
],
equityAccounts: [
    "retained earnings","dividends"
]
};

