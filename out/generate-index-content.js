"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIndexContent = void 0;
const fs = require("fs");
const vscode = require("vscode");
const interfaces_1 = require("./interfaces.");
function generateIndexContent(files, withFolders, targetFolder, fileType) {
    const config = loadPrettierrc();
    let exportedFiles = [];
    let exportedDirectories = [];
    switch (fileType) {
        case interfaces_1.FileTypes.TYPESCRIPT: {
            exportedFiles = getTypeScriptFiles(files).map((file) => {
                const fileWithoutExtension = file.replace(/\.[^\.]+$/, ``);
                return styleImportedLineWithExportKeyWord(fileWithoutExtension, config);
            });
            break;
        }
        case interfaces_1.FileTypes.SCSS: {
            exportedFiles = getSCSSFiles(files).map((file) => {
                const fileWithoutExtension = file.replace(/\.[^\.]+$/, ``);
                return styleImportedLineWithImportKeyWord(fileWithoutExtension, config, fileType);
            });
            break;
        }
        case interfaces_1.FileTypes.CSS: {
            exportedFiles = getCSSFiles(files).map((file) => {
                const fileWithoutExtension = file.replace(/\.[^\.]+$/, ``);
                return styleImportedLineWithImportKeyWord(fileWithoutExtension, config, fileType);
            });
            break;
        }
    }
    if (withFolders) {
        exportedDirectories = getDirectories(targetFolder).map((directory) => {
            if (fileType === interfaces_1.FileTypes.SCSS || fileType === interfaces_1.FileTypes.CSS) {
                return styleImportedDirectoryLineForImportKeyWord(directory, config, fileType);
            }
            return styleImportedLineWithExportKeyWord(directory, config);
        });
    }
    exportedFiles = exportedFiles.concat(exportedDirectories);
    return exportedFiles.sort().join('');
}
exports.generateIndexContent = generateIndexContent;
function styleImportedLineWithExportKeyWord(name, config) {
    const semi = config.semi ? `;` : ``;
    if (config.singleQuote) {
        return `export * from './${name}'${semi}\n`;
    }
    return `export * from "./${name}"${semi}\n`;
}
function styleImportedLineWithImportKeyWord(name, config, fileType) {
    const semi = config.semi ? `;` : ``;
    if (config.singleQuote) {
        return `@import './${name}.${fileType.toString().toLowerCase()}'${semi}\n`;
    }
    return `@import "./${name}.${fileType.toString().toLowerCase()}"${semi}\n`;
}
function styleImportedDirectoryLineForImportKeyWord(name, config, fileType) {
    const semi = config.semi ? `;` : ``;
    if (config.singleQuote) {
        return `@import './${name}/index.${fileType.toString().toLowerCase()}'${semi}\n`;
    }
    return `@import "./${name}/index.${fileType.toString().toLowerCase()}"${semi}\n`;
}
function loadExcludedPatterns() {
    return [`.test.`, `__snapshots__`];
}
function loadPrettierrc() {
    var _a;
    let config = {
        singleQuote: true,
        semi: true,
    };
    try {
        (_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a.map((folder) => {
            config = JSON.parse(fs.readFileSync(folder.uri.path + `/.prettierrc`, `utf8`));
        });
    }
    catch (_b) {
        return config;
    }
    return config;
}
function getDirectories(folder) {
    return fs.readdirSync(folder).filter(function (file) {
        return fs.statSync(folder + `/` + file).isDirectory();
    });
}
function getTypeScriptFiles(files) {
    return files.filter((file) => {
        return (file.includes(`.ts`) &&
            file !== `index.ts` &&
            !loadExcludedPatterns().some((pattern) => file.includes(pattern)));
    });
}
function getSCSSFiles(files) {
    return files.filter((file) => {
        return (file.includes(`.scss`) &&
            file !== `index.scss` &&
            !loadExcludedPatterns().some((pattern) => file.includes(pattern)));
    });
}
function getCSSFiles(files) {
    return files.filter((file) => {
        return (file.includes(`.css`) &&
            file !== `index.css` &&
            !loadExcludedPatterns().some((pattern) => file.includes(pattern)));
    });
}
//# sourceMappingURL=generate-index-content.js.map