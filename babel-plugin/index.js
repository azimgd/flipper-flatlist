const template = require('@babel/template');
const fs = require('fs');
const p = require('path');

const connectionWeb = fs.readFileSync(p.join(__dirname, './babel/connection-web.ast'), {encoding:'utf8', flag:'r'});
const itemLogger = fs.readFileSync(p.join(__dirname, './babel/item-logger.ast'), {encoding:'utf8', flag:'r'});
const privateState = fs.readFileSync(p.join(__dirname, './babel/private-state.ast'), {encoding:'utf8', flag:'r'});

const flipperConnectionAST = template.default.ast(connectionWeb);
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
          if (state.filename.includes('VirtualizeUtils') || state.filename.includes('VirtualizeUtils/index.js')) {
            path.unshiftContainer('body', flipperConnectionAST);
          }
        },
      },

      ClassMethod(path, state) {
        if (!state.filename.includes('VirtualizedList.js') && !state.filename.includes('VirtualizedList/index.js')) {
          return;
        }

        /**
         * 
         */
        if (path.node.key.name === 'getDerivedStateFromProps') {
          const returnVisitor = {
            ReturnStatement(path) {
              const wrappedOutput = t.variableDeclaration('const', [
                t.variableDeclarator(t.identifier('output'), path.node.argument)
              ]);
              
              const wrappedReturn = t.returnStatement(
                t.identifier('output')
              );
              
              path.parent.body.pop()
              path.parent.body.push(wrappedOutput)
              itemLoggerAST.forEach(node => {
                path.parent.body.push(node);
              });
              path.parent.body.push(wrappedReturn)
            }
          }
  
          path.traverse(returnVisitor)
        }
      },

      VariableDeclarator(path, state) {
        if (!state.filename.includes('VirtualizeUtils.js') && !state.filename.includes('VirtualizeUtils/index.js')) {
          return;
        }

        /**
         * 
         */
        if (path.node.id.name === 'newCellCount') {
          path.parentPath.insertAfter(privateStateAST);
        }
      },
    },
  };
};

module.exports = plugin;
