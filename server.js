const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Initialize complaints.json if it doesn't exist
const complaintsFile = path.join(__dirname, 'complaints.json');
if (!fs.existsSync(complaintsFile)) {
    fs.writeFileSync(complaintsFile, JSON.stringify([], null, 2));
}

app.post('/api/complaints', (req, res) => {
    try {
        const { category, description, serviceType } = req.body;
        
        // Read existing complaints
        const complaints = JSON.parse(fs.readFileSync(complaintsFile));
        
        // Add new complaint with timestamp
        const newComplaint = {
            id: Date.now(),
            category,
            description,
            serviceType,
            timestamp: new Date().toISOString()
        };
        
        complaints.push(newComplaint);
        
        // Write back to file
        fs.writeFileSync(complaintsFile, JSON.stringify(complaints, null, 2));
        
        res.status(201).json({ success: true, complaint: newComplaint });
    } catch (error) {
        console.error('Error saving complaint:', error);
        res.status(500).json({ success: false, error: 'Failed to save complaint' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
