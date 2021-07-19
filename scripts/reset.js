const rimraf = require('rimraf');
const { join } = require('path');

const packages = ['common', 'embeds', 'guilded-api-typings', 'guilded.js', 'itami', 'webhook-client', 'rest'];
const subDirs = ['node_modules', 'dist', 'types'];
rimraf.sync(join(__dirname, '..', 'node_modules'));
console.log('Deleting root node_modules');

packages.forEach(package => {
    subDirs.forEach(dir => {
        rimraf.sync(join(__dirname, '..', 'packages', package, dir));
        console.log(`Deleting package ${package} ${dir}`);
    });
});
