exports.COLORS = {
    CYAN: '\u001B[36m',
    GREEN: '\u001B[32m',
    RED: '\u001B[31m',
    RESET: '\u001B[0m',
    UNDERSCORE: '\u001B[4m',
    WHITE: '\u001B[37m',
    YELLOW: '\u001B[33m',
};

exports.testText = str => console.log(`\n${exports.COLORS.YELLOW} ---${str}--- ${exports.COLORS.RESET}`);
exports.successText = str => console.log(`${exports.COLORS.GREEN} ${str} ${exports.COLORS.RESET}`);
exports.errorText = str => console.log(`\n${exports.COLORS.RED} ${str} ${exports.COLORS.RESET}\n`);
