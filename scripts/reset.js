const rimraf = require('rimraf');
const { join } = require('path');

const packages = ['common', 'embeds', 'guilded-api-typings', 'guilded.js', 'itami', 'webhook-client'];
rimraf.sync(join(__dirname, '..', 'node_modules'));
console.log('Deleting root node_modules');

for (const package of packages) {
    rimraf.sync(join(__dirname, '..', 'packages', package, 'node_modules'));
    console.log(`Deleting package ${package} node_modules`);
    rimraf.sync(join(__dirname, '..', 'packages', package, 'dist'));
    console.log(`Deleting package ${package} dist`);
    rimraf.sync(join(__dirname, '..', 'packages', package, 'types'));
    console.log(`Deleting package ${package} types`);
}
