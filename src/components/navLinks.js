// src/components/navLinks.js
// Professional nav links data structure for navbar
export default [
  {
    label: 'News',
    href: '#',
  },
  {
    label: 'Prices',
    href: '#',
  },
  {
    label: 'Data',
    href: '#',
    dropdownTitle: 'Data',
    sublinks: [
      { label: 'Trade Data', href: '#', description: 'Market-leading trade data covering 300,000 digital asset pairs.' },
      { label: 'Derivatives', href: '#', description: 'Real-time futures and options data from major exchanges.' },
      { label: 'Order Book Data', href: '#', description: 'Complete L1/L2 order book data covering 99% of the market.' },
      { label: 'On-Chain Data', href: '#', description: 'Key blockchain metrics and trade data across 10 networks.' },
      { label: 'API', href: '#', description: 'Institutional-grade crypto data streamed live from 300+ exchanges.' },
      { label: 'Research & Insights', href: '#', description: 'Data-driven analysis of key digital asset trends.' },
      { label: 'Data Catalogue', href: '#', description: 'Explore our data solutions and request sample sets.' },
      { label: 'AI & Machine Learning', href: '#', description: 'Data to power AI and algorithmic trading models.' },
    ],
  },
  {
    label: 'Indices',
    href: '#',
    dropdownTitle: 'Indices',
    sublinks: [
      { label: 'Multi-Asset Indices', href: '#', description: 'BMR compliant broad-based, dynamic and thematic benchmarks.' },
      { label: 'Reference Rates', href: '#', description: 'BMR compliant real-time and settlement rates.' },
      { label: 'API', href: '#', description: 'Institutional-grade crypto data streamed live from 300+ exchanges.' },
      { label: 'Strategies and Services', href: '#', description: 'Research-driven strategies, plus a full suite of services.' },
      { label: 'Insights & Announcements', href: '#', description: 'Stay informed through our newsletters and market updates.' },
      { label: 'Documentation & Governance', href: '#', description: 'Index methodologies, policies, announcements and updates.' },
    ],
  },
  {
    label: 'Research',
    href: '#',
  },
  {
    label: 'Events',
    href: '#',
    dropdownTitle: 'Events',
    sublinks: [
      { label: 'Consensus', href: '#', description: 'The world’s largest, longest-running and most influential gathering.' },
      { label: 'Webinars', href: '#', description: 'Live and on-demand educational sessions with industry leaders.' },
      { label: 'Workshops', href: '#', description: 'Hands-on learning and training for digital assets.' },
    ],
  },
  {
    label: 'Sponsored',
    href: '#',
  },
];
