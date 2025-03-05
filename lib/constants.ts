export const pageLimit = 9;

export const searchTabs = [
  "VIEW FULL LIST OF SOLUTIONS",
  "SEARCH BY FREE TEXT",
  "SEARCH BY REGION",
];
export const detailTabs = [
  "SUMMARY",
  // "SCORE CARD",
  'DETAILS & DOCUMENTS',
  // "LESSONS LEARNED",
  // 'RECOMMENDATIONS'
];
export const evidenceTabs = [
  "EVIDENCE", 
  "TRANSLATIONS", 
  "ANALYSIS"
];

export const issueOptions = [
  'agricultural practices',
  'biodiversity',
  'cisterns',
  'climate change',
  'coastal zone management',
  'disaster risks',
  'drought early warning systems',
  'drought resilience',
  'ecosystem management',
  'feedback mechanisms',
  'financial sustainability planning',
  'flood management',
  'groundwater pumping',
  'improving water quality',
  'irrigation',
  'land degradation',
  'monitoring and evaluation system',
  'monitoring systems',
  'pollution',
  'pollution reduction',
  'promotion of nature-based solutions',
  'safe handling and disposal',
  'solar-powered water pumps',
  'sustainable land management',
  'sustainable practices',
  'vulnerability of rural livelihoods',
  'waste management',
  'water distribution',
  'water efficiency',
  'water resource management strategies',
  'water resources management',
  'water scarcity',
  'watershed and livelihood improvements'
];

export const challenges = [
  'climate change',
  'biodiversity', // biodiversity
  // 'coastal zone management',
  'disasters', //disasters
  'drought',
  'ecosystem degradation', //ecosystem
  "emergency response conditions",
  // 'financial sustainability planning',
  'floods', //floods
  "fragile states and conflict conditions",
  'land degradation',
  "LDC - least developed countries",
  'pollution',
  // 'water resource',
  'water scarcity',
  // 'vulnerability of rural livelihoods',
];

export const solutions = [
  'agricultural practices',
  'biodiversity',
  'capacity development', //Test returns on this
  'cisterns',
  'data',
  'digitalization',
  'early warning systems',
  'ecosystem management',
  // 'feedback mechanisms',
  'financing',
  'governance', // government
  'innovation',
  'irrigation',
  'IT',
  'land management',
  'monitoring',
  'policy and regulatory innovation',
  'pumping',
  'nature-based solution',
  'non-conventional water sources',
  'renewable energy', // power
  'sustainable practices',
  'technical innovation',
  'waste management',
  'water efficiency',
  'water energy food nexus',
  'water quality',
  // 'watershed and livelihood improvements',
  // 'water pumps',
];

export const issueGroups = [
  // {
  //   name:"Coastal",
  //   items:['coastal zone management'],
  //   image:"/images/issues/coast/1.jpg"
  // },
  {
    name:"Drought",
    items: ['drought', 'early warning systems', 'drought resilience', 'disaster risks', 'water scarcity'],
    image:"/images/issues/droughts/3.jpg"
  },
  {
    name:"Floods",
    items: ['flood management','monitoring and evaluation system', 'monitoring systems', 'disaster risks', 'early warning systems'],
    image:"/images/issues/floods/1.jpg"
  },
  {
    name:"Irrigation",
    items: ['cisterns', 'irrigation', 'agricultural practices','water pumps'],  
    image:"/images/issues/irrigation/1.jpg"
  },
  {
    name:"Pollution",
    items: ['pollution', 'pollution reduction', 'safe handling and disposal', 'water quality'],
    image:"/images/issues/pollution/1.jpg"
  },
  {
    name:"Water Ecology",
    items: ['sustainable land management', 'sustainable practices', 'biodiversity', 'solar-powered water pumps'],
    image:"/images/issues/sustainability/1.jpg"
  },
  {
    name:"Water Management",
    items: ['water management, water distribution, water efficiency, water resource management, groundwater pumping'], 
    image:"/images/issues/water-management/1.jpg"
  }
]

export const geographicGroups = [
  {
    name:"Human Settlements",
    image:"/images/geographies/settlement.jpg",
    items: [
      "agricultural areas",
      "periurban communities",
      "rural areas",
      "small towns/villages",
      "urban areas",
      "groundwater",
      "transboundary basin",
      "transboundary resources"
    ]
  },
  {
    name:"Arid Areas",
    image:"/images/geographies/arid.jpg",
    items: [
      "arid areas"
    ]
  },
  {
    name:"Coastal Areas & Islands",
    image:"/images/geographies/island.jpg",
    items: [
      "coastal areas",
      "islands (including SIDS)"
    ]
  },
  {
    name:"Heavily Forested",
    image:"/images/geographies/forest.jpg",
    items: [
      "heavily forested areas"
    ]
  },
  {
    name:"Mountains & Valleys",
    image:"/images/geographies/mountainous.jpg",
    items: [
      "mountainous areas", "valleys"
    ]
  },
  {
    name:"Plains",
    image:"/images/geographies/plain.jpg",
    items: [
      "plains"
    ]
  },
  {
    name:"Wetlands",
    image:"/images/geographies/wetlands.jpg",
    items: [
      "wetland areas"
    ]
  },
  {
    name:"Remote Areas",
    image:"/images/geographies/remote.jpg",
    items: [
      "remote areas"
    ]
  },
]

export const  specialSituations =[
  {
    name:"Emergency Response Conditions",
    image:"/images/special/emergency.jpg",
    items: [
      "emergency response conditions"
    ]
  },
  {
    name:"Fragile States and Conflict Conditions",
    image:"/images/special/conflict.jpg",
    items: [
      "fragile states and conflict conditions"
    ]
  },
  {
    name:"LDCs - Least Developed Countries",
    image:"/images/issues/droughts/2.jpg",
    items: [
      "LDC - least developed countries"
    ]
  },
  {
    name:"None of the above",
    image:"/images/issues/sustainability/1.jpg",
    items: ["none"]
  },
]

export const  specialSituationsArray =[
  "emergency response conditions",
  "fragile states and conflict conditions",
  "LDC - least developed countries",
]


export const waterCategories = [
  "Water for Nature",
  "Water for Peace and Security",
  "Water for Resilience",
]

export const waterUserCategories = {
  "Water Quality": "Water for Nature",
  "Water Quantity": "Water for Resilience",
  "Water Security": "Water for Peace and Security",
};


export const geographicOptions = [
  "agricultural areas",
  "arid areas",
  "coastal areas",
  "groundwater",
  "heavily forested areas",
  "islands (including SIDS)",
  "mountainous areas",
  "periurban communities",
  "plains",
  "remote areas",
  "rural areas",
  "small towns/villages",
  "transboundary",
  "urban areas",
  "valleys",
  "wetland area",
];

export const budgetOptions = [
    "1- 10K",
    "11K- 50K",
    "50K- 100K",
    "100K- 250K",
    "More than 250K",
]

export const characteristicOptions = [{ label: "", value: "" }];

export const filters = [
  // { 
  //   title: "Water Focused", 
  //   filterId: "waterFocused", 
  //   options: [
  //     "Yes",
  //     "No"
  //   ] 
  // },
  // {
  //   title: "UNDP Water Category",
  //   filterId: "category",
  //   options: waterCategories,
  //   description: "Filter by the categories of Water projects as defined by the UNDP Water & Oceans Team"
  // },
  // {
  //   title: "Issues Covered",
  //   filterId: "issues",
  //   options: issueOptions,
  //   description: "Filter by the specific issue that is addressed by the solution"
  // },
  {
    title: "Challenges",
    filterId: "challenges",
    options: challenges,
    description: "Filter by the specific challenge faced by the local area"
  },
  {
    title: "Solutions",
    filterId: "solutions",
    options: solutions,
    description: "Filter by the specific solution to a water-related challenge"
  },
  {
    title: "Geographic Characteristics",
    filterId: "geographic",
    options: geographicOptions,
    description: "Filter by the specific characteristics of the geography of the local area"
  },
  {
    title: "Special Situations",
    filterId: "special",
    options: specialSituationsArray,
    description: "Filter by the special situations (if any) affecting the local area"
  },
  {
    title: "Budget Required",
    filterId: "budget",
    options: budgetOptions,
    description: "Filter by the expected budget required by the project"
  },
  // {
  //   title: "Expertise Required", // human_resources_cols = ['expertise_needed_for_replication', 'additional_expertise_needed']
  //   filterId: "expertise",
  //   options: [
  //     'crisis response',
  //     'digital and information management',
  //     'ecologist',
  //     'economist',
  //     'flood risk management',
  //     'gender mainstreaming',
  //     'ground water',
  //     'hydro chemist',
  //     'hydrogeologist',
  //     'hydrologist',
  //     'hygiene',
  //     'industrial pollution reduction',
  //     'integrated water resources management',
  //     'irrigation',
  //     'municipal water',
  //     'programme development and implementation',
  //     'socio-economic',
  //     'stakeholder engagement',
  //     'storm water management',
  //     'transboundary water',
  //     'WASH',
  //     'water education',
  //     'water institutions',
  //     'water law',
  //     'water quality',
  //     'water quantity',
  //     'water resource',
  //     'wetlands'
  //   ]
  // },
  {
    title: "SDGs Addressed",
    filterId: "sdgs",
    options: [
      "1. No Poverty",
      "2. Zero Hunger",
      "3. Good Health and Well-being",
      "4. Quality Education",
      "5. Gender Equality",
      "6. Clean Water and Sanitation",
      "7. Affordable and Clean Energy",
      "8. Decent Work and Economic Growth",
      "9. Industry, Innovation, and Infrastructure",
      "10. Reduced Inequalities",
      "11. Sustainable Cities and Communities",
      "12. Responsible Consumption and Production",
      "13. Climate Action",
      "14. Life Below Water",
      "15. Life on Land",
      "16. Peace, Justice, and Strong Institutions",
      "17. Partnerships for the Goals",
    ],
    description: "Filter by the specific Sustainable Development Goals (SDG) that are addressed by the solution"
  },
  // {
  //   title: "SDG 6 Targets Involved",
  //   filterId: "sdgTargets",
  //   options: [
  //     "6.1: Safe and affordable drinking water",
  //     "6.2: End open defecation and provide access to sanitation and hygiene",
  //     "6.3: Improve water quality, wastewater treatment, and safe reuse",
  //     "6.4: Increase water-use efficiency and ensure freshwater supplies",
  //     "6.5: Implement Integrated Water Resources Management",
  //     "6.6: Protect and restore water-related ecosystems",
  //   ],
  // },
  // { title: "EVALUATION STANDARD", filterId: "filter4", options: ["Satisfactory", "Very Good", "Exemplary"] },
];


export const UNDP_REGIONS = {
  RBA: {
    name: "Regional Bureau for Africa",
    countries: ["AGO","SDS", "BEN", "BWA", "BFA","BDI", "CMR", "CPV", "CAF", "COM", "TCD", "COG", "CIV", "COD", "GNQ", "ERI", "ETH", "GAB", "GMB", "GHA", "GIN", "GNB", "KEN", "LSO", "LBR", "MDG", "MWI", "MLI", "MRT", "MUS", "MOZ", "NAM", "NER", "NGA", "RWA", "STP", "SEN", "SYC", "SLE", "ZAF", "SSD", "SWZ", "TZA", "TGO", "UGA", "ZMB", "ZWE"],    
    region:"Africa"
  },
  RBAS: {
    name: "Regional Bureau for Arab States",
    countries: ["DZA", "BHR", "DJI", "EGY", "IRQ", "JOR", "KWT", "LBN", "LBY", "MAR", "OMN", "QAT", "SAU", "SOM", "PSE", "SDN", "SYR", "TUN", "ARE", "YEM"],    
    region:"Arab States"
  },
  RBAP: {
    name: "Regional Bureau for Asia and the Pacific",
    countries: ["AFG", "BGD", "BTN", "BRN", "KHM", "CHN", "COK", "PRK", "FJI", "IND", "IDN", "IRN", "KIR", "LAO", "MYS", "MDV", "MHL", "FSM", "MNG", "MMR", "NRU", "NPL", "NIU", "PAK", "PLW", "PNG", "PHL", "WSM", "SGP", "SLB", "LKA", "THA", "TLS", "TKL", "TON", "TUV", "VUT", "VNM","KOR"] ,   
    region:"Asia and the Pacific"
  },
  RBEC: {
    name: "Regional Bureau for Europe and Central Asia",
    countries: ["ALB", "ARM", "AZE", "BLR", "BIH", "GEO", "KAZ", "XKX", "KGZ", "MNE", "MKD", "MDA", "SRB", "TJK", "TUR", "TKM", "UKR", "UZB"],
    region:"Europe and Central Asia"
  },
  RBLAC: {
    name: "Regional Bureau for Latin America and the Caribbean",
    countries: ["AIA", "ATG", "ARG", "ABW", "BHS", "BRB", "BLZ", "BMU", "BOL", "BRA", "VGB", "CYM", "CHL", "COL", "CRI", "CUB", "CUW", "DMA", "DOM", "ECU", "SLV", "GRD", "GTM", "GUY", "HTI", "HND", "JAM", "MEX", "MSR", "NIC", "PAN", "PRY", "PER", "KNA", "LCA", "VCT", "SXM", "SUR", "TTO", "TCA", "URY", "VEN"],    
    region:"Latin America and the Caribbean"
  },
};