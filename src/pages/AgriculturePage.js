import React from 'react';
import ServicePage from '../components/ServicePage';

const AgriculturePage = () => {
  const categories = [
    'Crop Management',
    'Agricultural Subsidies',
    'Rural Development',
    'Farming Equipment',
    'Weather Updates',
    'Market Prices',
    'Organic Farming',
    'Agricultural Loans'
  ];

  return (
    <ServicePage
      title="Agriculture & Rural Development"
      description="Access comprehensive agricultural services and rural development programs. Get information about farming techniques, subsidies, market prices, and various government schemes designed to support farmers and rural communities."
      categories={categories}
      officialWebsite="https://www.agrifarming.in/agriculture-rural-development-challenges-in-india"
    />
  );
};

export default AgriculturePage;
