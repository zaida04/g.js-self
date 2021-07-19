const { execSync } = require('child_process');

const commands = ['cd .. && npm i', 'cd .. && npm run bootstrap', 'cd .. && npm run build'];
commands.forEach(command => execSync(command));
