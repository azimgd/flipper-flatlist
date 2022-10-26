const path = require('path');

module.exports = {
  babel: {
    plugins: [
      [path.resolve(__dirname, '../babel-plugin-flatlist/index.js'), {
        environment: 'web',
      }],
    ],
  },
};
