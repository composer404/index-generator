"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIndexContent = void 0;
const fs = require("fs");
const vscode = require("vscode");
function generateIndexContent(files, withFolders, excludePatterns) {
    let exportLines = getTypeScriptFiles(files, excludePatterns).map((file) => {
        var _a;
        const fileWithoutExtension = file.replace(/\.[^\.]+$/, '');
        try {
            let obj = {
                singleQuote: true,
                semi: true,
            };
            (_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a.map((folder) => {
                obj = JSON.parse(fs.readFileSync(folder.uri.path + '/.prettierrc', 'utf8'));
            });
            const semi = obj.semi ? `;` : ``;
            if (obj.singleQuote) {
                return `export * from './${fileWithoutExtension}'${semi}\n`;
            }
            return `export * from "./${fileWithoutExtension}"${semi}\n`;
        }
        catch (_b) {
            return `export * from './${fileWithoutExtension}';\n`;
        }
    });
    if (withFolders) {
        const exportDirectories = getDirectories().map((directory) => {
            var _a;
            try {
                let obj = {
                    singleQuote: true,
                    semi: true,
                };
                (_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a.map((folder) => {
                    obj = JSON.parse(fs.readFileSync(folder.uri.path + '/.prettierrc', 'utf8'));
                });
                const semi = obj.semi ? `;` : ``;
                if (obj.singleQuote) {
                    return `export * from './${directory}'${semi}\n`;
                }
                return `export * from "./${directory}"${semi}\n`;
            }
            catch (_b) {
                return `export * from './${directory}';\n`;
            }
        });
        exportLines = exportLines.concat(exportDirectories);
    }
    return exportLines.sort().join('');
}
exports.generateIndexContent = generateIndexContent;
function getDirectories() {
    if (vscode.workspace.workspaceFolders) {
        const root = vscode.workspace.workspaceFolders[0];
        return fs.readdirSync(root.uri.path).filter(function (file) {
            return fs.statSync(root.uri.path + '/' + file).isDirectory();
        });
    }
    return [];
}
function getTypeScriptFiles(files, excludePatterns) {
    excludePatterns = [];
    return files.filter((file) => {
        return (/\.tsx?$/.test(file) && file !== 'index.ts' && !excludePatterns.some((pattern) => file.includes(pattern)));
    });
}
//# sourceMappingURL=generateIndexContent.js.map