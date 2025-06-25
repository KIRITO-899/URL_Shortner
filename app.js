const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// File path for storing URLs
const dataFile = path.join(__dirname, 'data', 'urls.json');

// Utility functions
function loadUrls() {
    try {
        if (!fs.existsSync(dataFile)) {
            return {};
        }
        const data = fs.readFileSync(dataFile, 'utf8');
        
        // Handle empty file
        if (!data.trim()) {
            return {};
        }
        
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading URLs:', error);
        return {};
    }
}

function saveUrls(urls) {
    try {
        const dataDir = path.join(__dirname, 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.writeFileSync(dataFile, JSON.stringify(urls, null, 2));
    } catch (error) {
        console.error('Error saving URLs:', error);
    }
}

function generateShortId() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Routes
app.get('/', (req, res) => {
    const urls = loadUrls();
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    res.render('index', { urls, baseUrl });
});

app.post('/shorten', (req, res) => {
    const { originalUrl } = req.body;
    
    if (!originalUrl || !isValidUrl(originalUrl)) {
        return res.status(400).render('index', { 
            urls: loadUrls(), 
            baseUrl: `${req.protocol}://${req.get('host')}`,
            error: 'Please enter a valid URL'
        });
    }

    const urls = loadUrls();
    let shortId;
    
    // Generate a unique short ID
    do {
        shortId = generateShortId();
    } while (urls[shortId]);

    // Store the mapping
    urls[shortId] = {
        originalUrl,
        shortId,
        createdAt: new Date().toISOString(),
        clicks: 0
    };

    saveUrls(urls);

    res.redirect('/');
});

app.get('/:shortId', (req, res) => {
    const { shortId } = req.params;
    const urls = loadUrls();

    if (!urls[shortId]) {
        return res.status(404).render('error', { 
            message: 'Short URL not found',
            shortId 
        });
    }

    // Increment click count
    urls[shortId].clicks++;
    saveUrls(urls);

    // Redirect to original URL
    res.redirect(urls[shortId].originalUrl);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
