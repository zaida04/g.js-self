exports.COLORS = {
    "RESET": "\u001B[0m",
    "UNDERSCORE": "\u001B[4m",
    "RED": "\u001B[31m",
    "GREEN": "\u001B[32m",
    "YELLOW": "\u001B[33m",
    "CYAN": "\u001B[36m",
    "WHITE": "\u001B[37m",
}

exports.tester = (color, str) => console.log(`${color} ${str} ${exports.COLORS.RESET}`);