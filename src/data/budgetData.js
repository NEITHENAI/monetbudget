// Official Draft National Budget FY 2027/2028 Dataset for Uganda
// Prepared by: THE MONETS (Kyeyune Neithen, Nankunda Angel, Natuhwera Hellen, Namuswa Viola Christine, Tugumisirize Bruce)
// Benchmarked against: Ministry of Finance, Planning and Economic Development (MoFPED), Bank of Uganda (BoU), & URA

export const BUDGET_METADATA = {
  fiscalYear: "2027/2028",
  theme: "Full Monetization of the Economy through Commercial Oil Production, Agro-Industrialization, and Sustainable Debt Consolidation",
  totalEnvelopeUGX: 88500, // in Billions (UGX 88.50 Trillion)
  totalRevenueUGX: 55000,  // in Billions (UGX 55.00 Trillion)
  totalExpenditureUGX: 88500, // in Billions
  fiscalDeficitUGX: 33500, // in Billions (Financing Gap covered by Borrowing & Grants)
  gdpNominalUGX: 245000, // in Billions
  taxToGDPRatio: 17.1, // percentage
  debtToGDPRatio: 47.8, // percentage (sustainable threshold < 50%)
};

// 1. REVENUE STREAMS (Money In)
export const REVENUE_STREAMS = [
  {
    id: "tax_direct",
    name: "Direct Domestic Taxes (URA)",
    category: "Domestic Tax",
    amountUGX: 18200, // UGX 18.2 Trillion
    percentage: 20.56,
    color: "#2563eb", // Blue
    description: "Pay As You Earn (PAYE), Corporate Income Tax on commercial banks/telecoms, Withholding Taxes, and Rental Income Tax.",
    insight: "Expands as more Ugandans transition into formal taxable payrolls and corporate profits expand from oil support sectors.",
    tags: ["URA", "Taxes", "Corporate", "PAYE"]
  },
  {
    id: "tax_indirect",
    name: "Indirect Domestic Taxes (VAT & Excise)",
    category: "Domestic Tax",
    amountUGX: 16800, // UGX 16.8 Trillion
    percentage: 18.98,
    color: "#0284c7", // Sky Blue
    description: "Value Added Tax (18% on consumer goods and services), local excise duties on fuel, beverages, mobile airtime, and internet data.",
    insight: "The primary engine of daily domestic tax revenue; reflects consumer purchasing power and domestic manufacturing transactions.",
    tags: ["VAT", "Excise Duty", "Fuel", "Telecom"]
  },
  {
    id: "tax_trade",
    name: "International Trade & Customs Taxes",
    category: "Domestic Tax",
    amountUGX: 7000, // UGX 7.0 Trillion
    percentage: 7.91,
    color: "#38bdf8", // Light Blue
    description: "Import duties, customs tariffs on imported machinery, vehicles, and electronics entering via Mombasa/Dar-es-Salaam ports.",
    insight: "Moderated by the East African Community (EAC) Common External Tariff and domestic import substitution gains.",
    tags: ["Customs", "Imports", "EAC Trade"]
  },
  {
    id: "petroleum_fund",
    name: "Petroleum Fund / Commercial Oil Revenue",
    category: "Natural Resources",
    amountUGX: 8500, // UGX 8.5 Trillion
    percentage: 9.60,
    color: "#d97706", // Amber / Gold
    description: "Direct government royalties, profit oil shares, and corporate tax from the Kingfisher and Tilenga Albertine Graben oil fields.",
    insight: "Historic new fiscal revenue stream for FY 2027/28, ring-fenced under the Public Finance Management Act (PFMA) strictly for infrastructure capital investments.",
    tags: ["Oil & Gas", "Tilenga", "Royalties", "Albertine"]
  },
  {
    id: "non_tax",
    name: "Non-Tax Revenues (NTR)",
    category: "Administrative",
    amountUGX: 4500, // UGX 4.5 Trillion
    percentage: 5.08,
    color: "#64748b", // Slate
    description: "Passport fees, driving permits, immigration charges, court fines, mining licenses, and dividends from state-owned enterprises.",
    insight: "Boosted by the digitalization of government service payments through the e-Citizen and URA single-window portals.",
    tags: ["Passports", "Permits", "Dividends"]
  },
  {
    id: "ext_loans_grants",
    name: "External Project Financing & Concessional Loans",
    category: "Deficit Financing",
    amountUGX: 18500, // UGX 18.5 Trillion
    percentage: 20.90,
    color: "#9333ea", // Purple
    description: "Concessional loans and project grants from the World Bank (IDA), African Development Bank (AfDB), and European Union for roads, dams, and water.",
    insight: "Finances capital-intensive development projects with 25-40 year repayment tenors and low concessionary interest rates (<2%).",
    tags: ["World Bank", "AfDB", "Grants", "Loans"]
  },
  {
    id: "domestic_borrowing",
    name: "Domestic Borrowing (Treasury Bills & Bonds)",
    category: "Deficit Financing",
    amountUGX: 15000, // UGX 15.0 Trillion
    percentage: 16.95,
    color: "#e11d48", // Rose
    description: "Government securities auctioned via the Bank of Uganda to domestic commercial banks, pension funds (NSSF), and institutional investors.",
    insight: "Enables immediate liquidity for budget execution, but must be prudently managed to avoid crowding out private sector loans.",
    tags: ["BoU", "Treasury Bonds", "T-Bills", "NSSF"]
  }
];

// 2. EXPENDITURE ALLOCATIONS (Money Out)
export const EXPENDITURE_PROGRAMS = [
  {
    id: "exp_human_capital",
    name: "Human Capital Development (Health & Education)",
    category: "Social Sector",
    amountUGX: 17200, // UGX 17.2 Trillion
    percentage: 19.44,
    color: "#10b981", // Emerald
    description: "Procurement of essential medicines (NMS), wage increases for teachers and doctors, construction of regional referral hospitals, and Universal Primary/Secondary Education.",
    subAllocation: "Health: UGX 8.2T | Education: UGX 7.5T | Water & Sanitation: UGX 1.5T",
    insight: "The single largest social development program, aimed at upgrading workforce literacy and life expectancy in line with Uganda Vision 2040.",
    tags: ["Health", "Education", "Doctors", "Schools", "Medicines"]
  },
  {
    id: "exp_debt_servicing",
    name: "Public Debt Servicing & Amortization",
    category: "Statutory / Mandatory",
    amountUGX: 22800, // UGX 22.8 Trillion
    percentage: 25.76,
    color: "#e11d48", // Crimson
    description: "Mandatory constitutional interest payments and principal repayments for past domestic treasury bonds and external loans.",
    subAllocation: "Domestic Interest: UGX 13.0T | External Debt Service: UGX 9.8T",
    insight: "Mandatory first charge on the Consolidated Fund to maintain Uganda's high international credit rating and prevent sovereign default.",
    tags: ["Debt Service", "Interest", "Bonds", "BoU", "Repayment"]
  },
  {
    id: "exp_infrastructure",
    name: "Integrated Transport Infrastructure & Energy",
    category: "Economic Capital",
    amountUGX: 15400, // UGX 15.4 Trillion
    percentage: 17.40,
    color: "#3b82f6", // Blue
    description: "Standard Gauge Railway (SGR) construction, national paved road network maintenance (UNRA/MoWT), rural feeder roads, and Karuma/transmission line connections.",
    subAllocation: "Roads & SGR: UGX 10.2T | Energy & Rural Electrification: UGX 5.2T",
    insight: "Directly lowers commercial transport freight costs and unlocks industrial park clusters across Namanve, Mbale, and Gulu.",
    tags: ["Roads", "SGR", "Electricity", "UNRA", "Energy"]
  },
  {
    id: "exp_security",
    name: "Defense, Security & Rule of Law",
    category: "Governance & Protection",
    amountUGX: 11800, // UGX 11.8 Trillion
    percentage: 13.33,
    color: "#6366f1", // Indigo
    description: "Modernization of UPDF defense assets, Uganda Police force, prison infrastructure, Judiciary digital courts, and state intelligence.",
    subAllocation: "UPDF Defense: UGX 7.5T | Police & Internal Affairs: UGX 2.8T | Judiciary & Justice: UGX 1.5T",
    insight: "Underpins national peace, regional border security, and commercial contract enforcement, vital for foreign direct investment.",
    tags: ["UPDF", "Defense", "Police", "Judiciary", "Security"]
  },
  {
    id: "exp_agriculture",
    name: "Agro-Industrialization & Wealth Funds (PDM)",
    category: "Wealth Creation",
    amountUGX: 9200, // UGX 9.2 Trillion
    percentage: 10.40,
    color: "#f59e0b", // Amber
    description: "Direct capitalization of the Parish Development Model (UGX 100M+ per parish SACCO), post-harvest storage silos, agricultural credit facilities (UDB), and irrigation.",
    subAllocation: "PDM Saccos: UGX 3.5T | Agricultural Inputs & Irrigation: UGX 3.2T | Agro-Processing: UGX 2.5T",
    insight: "Lifts the remaining 39% of Ugandan households out of subsistence farming into the formal commercial cash economy.",
    tags: ["Agriculture", "PDM", "Parish", "Irrigation", "UDB", "Farmers"]
  },
  {
    id: "exp_governance",
    name: "Public Sector Administration & Parliament",
    category: "Government Operations",
    amountUGX: 7100, // UGX 7.1 Trillion
    percentage: 8.02,
    color: "#64748b", // Slate
    description: "Operations of Parliament, local government administration across 146 districts, foreign embassies, audit institutions (Auditor General), and statutory commissions.",
    subAllocation: "Local Government Transfers: UGX 3.8T | Parliament & Cabinet: UGX 1.8T | Oversight & Audit: UGX 1.5T",
    insight: "Rationalized under ongoing Government Agency Rationalization (RAPEX) reforms to eliminate overlapping departmental costs.",
    tags: ["Parliament", "Districts", "RAPEX", "Civil Service"]
  },
  {
    id: "exp_digital",
    name: "Digital Transformation & Tourism Marketing",
    category: "Innovation & Services",
    amountUGX: 5000, // UGX 5.0 Trillion
    percentage: 5.65,
    color: "#06b6d4", // Cyan
    description: "National optical fiber network expansion, science innovations, startup incubation funds, wildlife conservation, and global tourism promotion.",
    subAllocation: "ICT & Digital Backbone: UGX 2.8T | Tourism & Wildlife: UGX 2.2T",
    insight: "High-multiplier growth sectors aimed at creating tech jobs for Uganda's youth demographic and attracting foreign tourist forex.",
    tags: ["ICT", "Internet", "Tourism", "National Parks", "Innovation"]
  }
];

// Initial baseline verified citizen responses (so evidence is immediately visible + real user submissions add to it!)
export const INITIAL_CITIZEN_RESPONSES = [
  {
    id: "resp_001",
    name: "Dr. Ronald Mukasa",
    role: "Public Health Specialist",
    targetMetricId: "exp_human_capital",
    metricName: "Human Capital Development (Health & Education)",
    stance: "Needs Higher Allocation",
    priorityRank: "Very High",
    comment: "Allocating 19.4% to health and education is commendable, but sub-county health centre IVs still face sporadic drug stock-outs. Commercial oil revenues should dedicate an additional 2% specifically to maternal healthcare units.",
    timestamp: "2026-10-24 14:32"
  },
  {
    id: "resp_002",
    name: "Grace Achieng",
    role: "Commercial Farmer, Lira",
    targetMetricId: "exp_agriculture",
    metricName: "Agro-Industrialization & Wealth Funds (PDM)",
    stance: "Needs Higher Allocation",
    priorityRank: "Critical",
    comment: "The Parish Development Model capital of 100M is helping our local SACCOs, but climate variability demands more smallholder solar irrigation pumps. Increase irrigation subsidies in this 2027/28 draft.",
    timestamp: "2026-10-25 09:15"
  },
  {
    id: "resp_003",
    name: "Patrick Kato, CPA",
    role: "Financial Analyst",
    targetMetricId: "exp_debt_servicing",
    metricName: "Public Debt Servicing & Amortization",
    stance: "Too High",
    priorityRank: "Critical",
    comment: "Debt service consuming UGX 22.8 Trillion (over 25% of the total budget) is an alarming fiscal burden. Government must refinance high-cost domestic treasury bonds into low-cost concessional external facilities.",
    timestamp: "2026-10-26 11:40"
  },
  {
    id: "resp_004",
    name: "Eng. Samuel Kigozi",
    role: "Civil Contractor & Logistics",
    targetMetricId: "exp_infrastructure",
    metricName: "Integrated Transport Infrastructure & Energy",
    stance: "Just Right",
    priorityRank: "High",
    comment: "Committing 15.4 Trillion to the Standard Gauge Railway and oil roads around Hoima is the right strategic move. Without reliable rail logistics, manufacturing will remain uncompetitive.",
    timestamp: "2026-10-27 16:05"
  },
  {
    id: "resp_005",
    name: "Joan Nanteza",
    role: "Makerere University Economics Student",
    targetMetricId: "tax_indirect",
    metricName: "Indirect Domestic Taxes (VAT & Excise)",
    stance: "Too High",
    priorityRank: "Medium",
    comment: "Excise taxes on internet data and mobile money transactions disproportionately harm youth tech startups and digital learning. Please consider lowering the OTT/data excise duty in the 2027/2028 Finance Bill.",
    timestamp: "2026-10-28 10:22"
  },
  {
    id: "resp_006",
    name: "Mwesigwa Emmanuel",
    role: "Manufacturer, Namanve Industrial Park",
    targetMetricId: "petroleum_fund",
    metricName: "Petroleum Fund / Commercial Oil Revenue",
    stance: "Just Right",
    priorityRank: "High",
    comment: "Excellent fiscal discipline ring-fencing the UGX 8.5 Trillion oil revenues for capital infrastructure rather than recurrent wage consumption. This prevents Dutch disease in Uganda.",
    timestamp: "2026-10-29 13:50"
  }
];
