import React from 'react';
import ServicePage from '../components/ServicePage';

const TaxPage = () => {
  const categories = [
    'Income Tax Returns',
    'Tax Payments',
    'PAN Card Services',
    'TDS Services',
    'GST Services',
    'Tax Refunds'
  ];

  return (
    <ServicePage
      title="Tax Services"
      description="Access comprehensive tax-related services provided by the Income Tax Department of India. File returns, make payments, apply for PAN cards, and manage all your tax-related requirements efficiently."
      categories={categories}
      officialWebsite="https://incometaxindia.gov.in"
      serviceType="tax"
    />
  );
};

export default TaxPage;
