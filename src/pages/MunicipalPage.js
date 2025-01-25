import React from 'react';
import ServicePage from '../components/ServicePage';

const MunicipalPage = () => {
  const categories = [
    'Water Supply',
    'Waste Management',
    'Building Permits',
    'Property Tax',
    'Street Lighting',
    'Road Maintenance',
    'Public Parks',
    'Business Licenses'
  ];

  return (
    <ServicePage
      title="Municipal Services"
      description="Access essential municipal services including water supply, waste management, and property services. Get information about permits, licenses, and local infrastructure development."
      categories={categories}
      officialWebsite="https://municipalservices.in/home.do"
    />
  );
};

export default MunicipalPage;
