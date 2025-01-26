import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceUpdates from './ServiceUpdates';
import './ServicePage.css';

const ServicePage = ({ title, description, categories, officialWebsite, serviceType }) => {
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [showUpdates, setShowUpdates] = useState(false);
  const [complaint, setComplaint] = useState({ category: '', description: '' });
  const [submitted, setSubmitted] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...complaint,
          serviceType: serviceType
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setShowComplaintForm(false);
          setSubmitted(false);
          setComplaint({ category: '', description: '' });
        }, 2000);
      } else {
        alert('Failed to submit complaint. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Failed to submit complaint. Please try again.');
    }
  };

  return (
    <div className="service-page">
      <motion.div 
        className="service-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="header-buttons">
          <motion.a
            href={officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="header-btn official-website-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Visit Official Website
          </motion.a>
          <motion.button
            className="header-btn updates-btn"
            onClick={() => setShowUpdates(!showUpdates)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Latest Updates
          </motion.button>
          <motion.button
            className="header-btn complaint-btn"
            onClick={() => setShowComplaintForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register Complaint
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        className="categories-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="category-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <h3>{category}</h3>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {showComplaintForm && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !submitted && setShowComplaintForm(false)}
          >
            <motion.div
              className="modal-content"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
            >
              {submitted ? (
                <div className="success-message">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✅
                  </motion.div>
                  <h3>Complaint Submitted Successfully!</h3>
                </div>
              ) : (
                <>
                  <h2>Register a Complaint</h2>
                  <form onSubmit={handleComplaintSubmit}>
                    <div className="form-group">
                      <label>Category:</label>
                      <select
                        value={complaint.category}
                        onChange={(e) => setComplaint({ ...complaint, category: e.target.value })}
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                          <option key={index} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Description:</label>
                      <textarea
                        value={complaint.description}
                        onChange={(e) => setComplaint({ ...complaint, description: e.target.value })}
                        placeholder="Please describe your complaint..."
                        required
                      />
                    </div>
                    <button type="submit" className="submit-btn">Submit Complaint</button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}

        {showUpdates && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUpdates(false)}
          >
            <motion.div
              className="modal-content updates-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
            >
              <h2>Latest Updates</h2>
              <ServiceUpdates serviceType={serviceType} />
              <button 
                className="close-modal-btn"
                onClick={() => setShowUpdates(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicePage;
