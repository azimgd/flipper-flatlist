const path = require('path');

module.exports = {
  babel: {
    plugins: [
      [path.resolve(__dirname, '../babel-plugin/index.js'), {
        environment: 'web',
      }],
    ],
  },
};
