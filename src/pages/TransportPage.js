import React from 'react';
import ServicePage from '../components/ServicePage';

const TransportPage = () => {
  const categories = [
    'Vehicle Registration',
    'Driving License',
    'Transport Permits',
    'Traffic Rules',
    'Road Safety',
    'Public Transport',
    'Vehicle Insurance',
    'Infrastructure Projects'
  ];

  return (
    <ServicePage
      title="Transport & Infrastructure"
      description="Access comprehensive transport and infrastructure services including vehicle registration, license applications, and permits. Stay updated with traffic rules, road safety guidelines, and ongoing infrastructure projects."
      categories={categories}
      officialWebsite="https://legislation.nsw.gov.au/view/html/inforce/current/epi-2021-0732"
    />
  );
};

export default TransportPage;
