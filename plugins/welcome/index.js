module.exports = function (app, { pluginPath, meta }) {
  const path = require('path');
  const viewsPath = path.join(pluginPath, 'views');

  app.set('views', [app.get('views'), viewsPath]);

  app.get('/welcome', (req, res) => {
    res.render('welcome', { title: meta.name || 'Welcome to ExpressPress!' });
  });
};
