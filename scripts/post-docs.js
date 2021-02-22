const { copyFile, unlink } = require("fs/promises");
const { join } = require("path");

(async () => {
    await copyFile(join(__dirname, "..", "CNAME"), join(__dirname, "..", "docs", "CNAME"));
    await unlink(join(__dirname, "..", "CNAME"));
    console.log("MOVED CNAME INTO DOCS");
})();