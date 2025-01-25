import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CircularProgress, Alert, TextField, Button, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './ServiceUpdates.css';

const ServiceUpdates = ({ serviceType }) => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [complaint, setComplaint] = useState({
    name: '',
    email: '',
    subject: '',
    description: ''
  });
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const getUpdateUrl = () => {
    switch (serviceType) {
      case 'education':
        return 'https://www.education.gov.in/updates';
      case 'tax':
        return 'https://incometaxindia.gov.in/Pages/communications/index.aspx';
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        const url = getUpdateUrl();
        if (!url) {
          // If no URL is available, use default updates
          setUpdates(getDefaultUpdates());
          setLoading(false);
          return;
        }

        const response = await axios.get(url, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        // Process and format the updates based on the service type
        const formattedUpdates = processUpdates(response.data, serviceType);
        setUpdates(formattedUpdates);
        setError(null);
      } catch (err) {
        console.error('Error fetching updates:', err);
        setError('Unable to fetch live updates. Showing default updates.');
        setUpdates(getDefaultUpdates());
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, [serviceType]);

  const processUpdates = (data, type) => {
    // This would normally process the actual API response
    // For now, returning default updates
    return getDefaultUpdates();
  };

  const getDefaultUpdates = () => {
    switch (serviceType) {
      case 'education':
        return [
          {
            id: 1,
            title: 'New Education Policy Updates',
            date: '2025-01-26',
            content: 'Implementation guidelines for NEP 2024 released',
            link: 'https://www.education.gov.in/updates'
          },
          {
            id: 2,
            title: 'Scholarship Applications Open',
            date: '2025-01-25',
            content: 'Applications for national merit scholarships now open',
            link: 'https://www.education.gov.in/updates'
          },
          {
            id: 3,
            title: 'Digital Learning Initiative',
            date: '2025-01-24',
            content: 'New online learning platforms integrated with schools',
            link: 'https://www.education.gov.in/updates'
          }
        ];
      case 'tax':
        return [
          {
            id: 1,
            title: 'Income Tax Return Filing Deadline',
            date: '2025-01-26',
            content: 'Last date for ITR filing extended to March 31, 2025',
            link: 'https://incometaxindia.gov.in/Pages/communications/index.aspx'
          },
          {
            id: 2,
            title: 'New Tax Slabs Announced',
            date: '2025-01-25',
            content: 'Updated tax slabs for FY 2025-26 released',
            link: 'https://incometaxindia.gov.in/Pages/communications/index.aspx'
          },
          {
            id: 3,
            title: 'E-Filing Portal Maintenance',
            date: '2025-01-24',
            content: 'Scheduled maintenance of e-filing portal this weekend',
            link: 'https://incometaxindia.gov.in/Pages/communications/index.aspx'
          }
        ];
      default:
        return [];
    }
  };

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: 'info', message: 'Submitting complaint...' });

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus({ type: 'success', message: 'Complaint submitted successfully! We will get back to you soon.' });
      setComplaint({ name: '', email: '', subject: '', description: '' });
      setTimeout(() => {
        setShowComplaintForm(false);
        setSubmitStatus(null);
      }, 3000);
    } catch (err) {
      setSubmitStatus({ type: 'error', message: 'Failed to submit complaint. Please try again.' });
    }
  };

  return (
    <div className="service-updates">
      {error && (
        <motion.div 
          className="error-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}
      
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading updates...</p>
        </div>
      ) : (
        <motion.div 
          className="updates-container"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {updates.map((update) => (
            <motion.div
              key={update.id}
              className="update-card"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <div className="update-header">
                <h3>{update.title}</h3>
                <span className="update-date">{update.date}</span>
              </div>
              <p>{update.content}</p>
              <motion.a
                href={update.link}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read More →
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowComplaintForm(!showComplaintForm)}
          style={{ marginBottom: '1rem' }}
        >
          {showComplaintForm ? 'Hide Complaint Form' : 'Register Complaint'}
        </Button>

        {showComplaintForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Paper elevation={3} style={{ padding: '2rem', marginTop: '1rem' }}>
              <form onSubmit={handleComplaintSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  value={complaint.name}
                  onChange={(e) => setComplaint({ ...complaint, name: e.target.value })}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={complaint.email}
                  onChange={(e) => setComplaint({ ...complaint, email: e.target.value })}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Subject"
                  value={complaint.subject}
                  onChange={(e) => setComplaint({ ...complaint, subject: e.target.value })}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  value={complaint.description}
                  onChange={(e) => setComplaint({ ...complaint, description: e.target.value })}
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<SendIcon />}
                  style={{ marginTop: '1rem' }}
                >
                  Submit Complaint
                </Button>
              </form>
            </Paper>
          </motion.div>
        )}

        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert severity={submitStatus.type} style={{ marginTop: '1rem' }}>
              {submitStatus.message}
            </Alert>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ServiceUpdates;
