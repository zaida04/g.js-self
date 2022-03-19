const { writeFile } = require('fs/promises');
const { join } = require('path');

(async () => {
    await writeFile(join(__dirname, '..', 'docs', 'CNAME'), 'zaida04.github.io/guildedjs-selfbot-docs');
    console.log('CREATED CNAME');
})();
