"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIndexContent = void 0;
const fs = require("fs");
const vscode = require("vscode");
function generateIndexContent(files, excludePatterns = []) {
    const exportedFiles = files.filter((file) => {
        return (/\.tsx?$/.test(file) && file !== 'index.ts' && !excludePatterns.some((pattern) => file.includes(pattern)));
    });
    const exportLines = exportedFiles.map((file) => {
        var _a;
        const fileWithoutExtension = file.replace(/\.[^\.]+$/, '');
        try {
            let obj = { singleQuote: true };
            (_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a.map(folder => {
                obj = JSON.parse(fs.readFileSync(folder.uri.path + '/.prettierrc', 'utf8'));
            });
            if (obj.singleQuote) {
                return `export * from './${fileWithoutExtension}' \n`;
            }
            return `export * from "./${fileWithoutExtension}" \n`;
        }
        catch (_b) {
            return `export * from './${fileWithoutExtension}' \n`;
        }
    });
    return exportLines.join('');
}
exports.generateIndexContent = generateIndexContent;
//# sourceMappingURL=generateIndexContent.js.map