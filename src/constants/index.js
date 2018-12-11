export const STUDENT_PROFILE_TYPE = 'student';
export const BUSINESS_PROFILE_TYPE = 'business';
export const DATA_SIDE_BAR = [
  {
    label: 'My Stints',
    type: 'both',
    goto: 'MyStintList',
  },
  {
    label: 'Settings',
    type: 'both',
    goto: 'Settings'
  },
  {
    label: 'Create A Business',
    type: 'business',
    goto: 'CreateBusiness'
  },
  {
    label: 'Invite Team Members',
    type: 'business',
    goto: 'InviteMember'
  },
  {
    label: 'Switch Profile',
    type: 'business',
    goto: 'SwitchProfile'
  },
  {
    label: 'Share App',
    type: 'both',
    goto: 'ShareApp'
  }
];

export const STINT_TYPE = [
  'Bar Back',
  'Cashier',
  'Cleaning',
  'Cloakroom',
  'Customer Servcie',
  'Delivery',
  'Door Person',
  'Errands',
  'Host/Hostess',
  'Kitchen Porter',
  'Leafleting',
  'Runner',
  'Sampling',
  'Steaming',
  'Stock',
  'Waiter/Waitress'
]

export const POST_LOCATION = [
  'Park Lane, London, UK',
  'The Beijing Chinese Restaurant, Manchester, UK',
  'Goldhawk Road, London, UK',
  'Golders Green Road, London, UK',
  'Goldsmiths Row, London, UK',
  'Hopstical Street, Birmingham, UK'
]

export const EUROPE_COUNTRIES = {  
  AT: {
    label: 'Austria',
    name: 'AUSTRIA',
    flag: require('../assets/images/countries/Austria.png')
  },
  BE: {
    label: 'Belgium',
    name: 'BELGIUM',
    flag: require('../assets/images/countries/Belgium.png')
  },
  BG: {
    label: 'Bulgaria',
    name: 'BULGARIA',
    flag: require('../assets/images/countries/Bulgaria.png')
  },
  HR: {
    label: 'Croatia',
    name: 'CROATIA',
    flag: require('../assets/images/countries/Croatia.png')
  },
  CY: {
    label: 'Cyprus',
    name: 'CYPRUS',
    flag: require('../assets/images/countries/Cyprus.png')
  },
  CZ: {
    label: 'Czech Republic',
    name: 'CZECH REPUBLIC',
    flag: require('../assets/images/countries/Czech_Republic.png')
  },
  DK: {
    label: 'Denmark',
    name: 'DENMARK',
    flag: require('../assets/images/countries/Denmark.png')
  },
  EE: {
    label: 'Estonia',
    name: 'ESTONIA',
    flag: require('../assets/images/countries/Estonia.png')
  },
  FR: {
    label: 'France',
    name: 'FRANCE',
    flag: require('../assets/images/countries/France.png')
  },
  DE: {
    label: 'Germany',
    name: 'GERMANY',
    flag: require('../assets/images/countries/Germany.png')
  },
  EL: {
    label: 'Greece',
    name: 'GREECE',
    flag: require('../assets/images/countries/Greece.png')
  },
  HU: {
    label: 'Hungary',
    name: 'HUNGRAY',
    flag: require('../assets/images/countries/Hungary.png')
  },
  IE: {
    label: 'Ireland',
    name: 'IRELAND',
    flag: require('../assets/images/countries/Ireland.png')
  },
  IT: {
    label: 'Italy',
    name: 'ITALY',
    flag: require('../assets/images/countries/Italy.png')
  },
  LV: {
    label: 'Latvia',
    name: 'LATVIA',
    flag: require('../assets/images/countries/Latvia.png')
  },
  LT: {
    label: 'Lithuania',
    name: 'LITHUANIA',
    flag: require('../assets/images/countries/Lithuania.png')
  },
  LU: {
    label: 'Luxembourg',
    name: 'LUXEMBOURG',
    flag: require('../assets/images/countries/Luxembourg.png')
  },
  MT: {
    label: 'Malta',
    name: 'MALTA',
    flag: require('../assets/images/countries/Malta.png')
  },
  NL: {
    label: 'Netherlands',
    name: 'NETHERLANDS',
    flag: require('../assets/images/countries/Netherlands.png')
  },
  PL: {
    label: 'Poland',
    name: 'POLAND',
    flag: require('../assets/images/countries/Poland.png')
  },
  PT: {
    label: 'Portugal',
    name: 'PORTUGAL',
    flag: require('../assets/images/countries/Portugal.png')
  },
  RO: {
    label: 'Romania',
    name: 'ROMANIA',
    flag: require('../assets/images/countries/Romania.png')
  },
  SK: {
    label: 'Slovakia',
    name: 'SLOVAKIA',
    flag: require('../assets/images/countries/Slovakia.png')
  },
  ES: {
    label: 'Spain',
    name: 'SPAIN',
    flag: require('../assets/images/countries/Spain.png')
  },
  SE: {
    label: 'Sweden',
    name: 'SWEDEN',
    flag: require('../assets/images/countries/Sweden.png')
  },
  UK: {
    label: 'United Kingdom',
    name: 'UNITED KINGDOM',
    flag: require('../assets/images/countries/United-Kingdom.png')
  },
}