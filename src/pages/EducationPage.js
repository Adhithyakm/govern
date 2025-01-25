import React from 'react';
import ServicePage from '../components/ServicePage';

const EducationPage = () => {
  const categories = [
    'School Education',
    'Higher Education',
    'Scholarships',
    'Digital Learning',
    'Teacher Training',
    'Educational Research'
  ];

  return (
    <ServicePage
      title="Education Services"
      description="Access comprehensive educational services and resources provided by the government. From school education to higher studies, find information about various educational programs, scholarships, and initiatives."
      categories={categories}
      officialWebsite="https://www.education.gov.in"
      serviceType="education"
    />
  );
};

export default EducationPage;
