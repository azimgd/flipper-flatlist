const template = require('@babel/template');
const fs = require('fs');
const p = require('path');

const connectionWeb = fs.readFileSync(p.join(__dirname, './src/connection-web.ast'), {encoding:'utf8', flag:'r'});
const connectionNative = fs.readFileSync(p.join(__dirname, './src/connection-native.ast'), {encoding:'utf8', flag:'r'});
const itemLogger = fs.readFileSync(p.join(__dirname, './src/item-logger.ast'), {encoding:'utf8', flag:'r'});
const privateState = fs.readFileSync(p.join(__dirname, './src/private-state.ast'), {encoding:'utf8', flag:'r'});

const connectionWebAST = template.default.ast(connectionWeb);
const connectionNativeAST = template.default.ast(connectionNative);
const itemLoggerAST = template.default.ast(itemLogger);
const privateStateAST =  template.default.ast(privateState);

const plugin = function ({types: t}) {
  return {
    visitor: {
      Program: {
        enter(path, state) {
          /**
           * Initialize flipper connection 
           */
          if (!state.filename.includes('VirtualizeUtils.js') && !state.filename.includes('VirtualizeUtils/index.js')) {
            return;
          }

          if (state.opts.environment === 'web') {
            path.unshiftContainer('body', connectionWebAST);
          }

          if (state.opts.environment === 'native') {
            path.unshiftContainer('body', connectionNativeAST);
          }
        },
      },

      ClassMethod(path, state) {
        if (!state.filename.includes('VirtualizedList.js') && !state.filename.includes('VirtualizedList/index.js')) {
          return;
        }

        /**
         * Flatlist data array tracker. Injects into getDerivedStateFromProps 
         * fetches layout and item contents for each rendered list item -> state<first,last>
         */
        if (path.node.key.name !== 'getDerivedStateFromProps') {  
          return;
        }

        // replaces `return {...}` with `const output = {...}`
        path.traverse({
          ReturnStatement(path) {
            const wrappedOutput = t.variableDeclaration('const', [
              t.variableDeclarator(t.identifier('output'), path.node.argument)
            ]);
            path.replaceWith(wrappedOutput);
          },
        });
        
        // adds logger to getDerivedStateFromProps#output and return statement
        path.get('body').pushContainer('body', itemLoggerAST);
        path.get('body').pushContainer('body', t.returnStatement(t.identifier('output')));
      },

      VariableDeclarator(path, state) {
        if (!state.filename.includes('VirtualizeUtils.js') && !state.filename.includes('VirtualizeUtils/index.js')) {
          return;
        }

        if (path.node.id.name !== 'newCellCount') {
          return;
        }

        /**
         * Tracks private state such as scrollMetrics overscan params etc.
         * inserts logger after `var newCellCount = {...}`
         */
        path.parentPath.insertAfter(privateStateAST);
      },
    },
  };
};

module.exports = plugin;
