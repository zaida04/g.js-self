const { copyFile } = require("fs/promises");
const { join } = require("path");

(async () => {
    await copyFile(join(__dirname, "..", "docs", "CNAME"), join(__dirname, "..", "CNAME"));
    console.log("MOVED CNAME OUT OF DOCS");
})();