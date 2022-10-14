const template = require('@babel/template');
const fs = require('fs');
const p = require('path');

const connectionWeb = fs.readFileSync(p.join(__dirname, './babel/connection-web.ast'), {encoding:'utf8', flag:'r'});
const flipperConnectionAST = template.default.ast(connectionWeb);

const plugin = function ({types: t}) {
  return {
    visitor: {
      Program: {
        enter(path, state) {
          /**
           * Initialize flipper connection 
           */
          if (state.filename.includes('VirtualizeUtils') || state.filename.includes('VirtualizeUtils/index.js')) {
            path.unshiftContainer('body', flipperConnectionAST);
          }
        },
      },
    },
  };
};

module.exports = plugin;
