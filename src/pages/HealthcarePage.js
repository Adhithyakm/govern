import React from 'react';
import ServicePage from '../components/ServicePage';

const HealthcarePage = () => {
  const categories = [
    'Hospital Appointments',
    'Vaccination Services',
    'Health Insurance',
    'Medical Records',
    'Emergency Services',
    'Mental Health',
    'Public Health Programs',
    'Telemedicine'
  ];

  return (
    <ServicePage
      title="Healthcare Services"
      description="Access comprehensive healthcare services including hospital appointments, vaccination programs, and health insurance. Get information about medical facilities, emergency services, and public health initiatives."
      categories={categories}
      officialWebsite="https://mohfw.gov.in/"
    />
  );
};

export default HealthcarePage;
