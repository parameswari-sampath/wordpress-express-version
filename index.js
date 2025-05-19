const express = require('express');
const path = require('path');
const loadPlugins = require('./core/pluginLoader');

const app = express();
const PORT = 3000;

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Load plugins and get metadata
const pluginsList = loadPlugins(app);

// Home
app.get('/', (req, res) => {
  res.render('home'); // Render a simple EJS view (views/home.ejs)
});

// Admin Dashboard
app.get('/admin', (req, res) => {
  res.render('admin', { plugins: pluginsList });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
