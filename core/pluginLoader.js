// core/pluginLoader.js
const fs = require('fs');
const path = require('path');

module.exports = function loadPlugins(app) {
  const pluginsDir = path.join(__dirname, '..', 'plugins');
  const plugins = fs.readdirSync(pluginsDir);

  const pluginMetaList = [];

  plugins.forEach(pluginName => {
    const pluginPath = path.join(pluginsDir, pluginName);
    const entry = path.join(pluginPath, 'index.js');
    const metaPath = path.join(pluginPath, 'plugin.json');

    let meta = { name: pluginName };

    if (fs.existsSync(metaPath)) {
      try {
        meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
      } catch (err) {
        console.warn(`⚠️ Failed to parse metadata for plugin ${pluginName}`);
      }
    }

    if (fs.existsSync(entry)) {
      const plugin = require(entry);
      if (typeof plugin === 'function') {
        plugin(app, { pluginPath, meta });
        pluginMetaList.push(meta);
        console.log(`✅ Loaded plugin: ${meta.name}`);
      }
    }
  });

  // Return loaded plugins for dashboard
  return pluginMetaList;
};
