import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import EducationPage from './pages/EducationPage';
import TaxPage from './pages/TaxPage';
import HealthcarePage from './pages/HealthcarePage';
import MunicipalPage from './pages/MunicipalPage';
import './App.css';

function App() {
  const services = [
    {
      title: 'Education',
      path: '/education',
      description: 'Access educational services and resources',
      icon: '🎓'
    },
    {
      title: 'Tax',
      path: '/tax',
      description: 'Manage your tax filings and payments',
      icon: '📊'
    },
    {
      title: 'Healthcare',
      path: '/healthcare',
      description: 'Access healthcare services and information',
      icon: '🏥'
    },
    {
      title: 'Municipal',
      path: '/municipal',
      description: 'Access local government services',
      icon: '🏛️'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.05,
      boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="logo">
          <h1>Government Services Portal</h1>
        </Link>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <main className="main-content">
              <motion.div
                className="services-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {services.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className="service-link"
                  >
                    <motion.div
                      className="service-card"
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <span className="service-icon">{service.icon}</span>
                      <h2>{service.title}</h2>
                      <p>{service.description}</p>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            </main>
          }
        />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/tax" element={<TaxPage />} />
        <Route path="/healthcare" element={<HealthcarePage />} />
        <Route path="/municipal" element={<MunicipalPage />} />
      </Routes>

      <footer className="app-footer">
        <p>© 2025 Government Services Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
