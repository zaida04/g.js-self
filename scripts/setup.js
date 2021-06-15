const { exec } = require('child_process');
const logExecOutput = data => console.log(data);

const runNPMInstall = exec('cd .. && npm i');
runNPMInstall.stdout.on('data', logExecOutput);
runNPMInstall.stderr.on('data', logExecOutput);
runNPMInstall.on('close', () => {
    const runBootstrap = exec('cd .. && npm run bootstrap');
    runBootstrap.stdout.on('data', logExecOutput);
    runBootstrap.stderr.on('data', logExecOutput);
    runBootstrap.on('close', () => {
        const runBuild = exec('cd .. && npm run build');
        runBuild.stdout.on('data', logExecOutput);
        runBuild.stderr.on('data', logExecOutput);
        runBuild.on('close', () => {
            console.log('Setup complete.');
            process.exit();
        });
    });
});
