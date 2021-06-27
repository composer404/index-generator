"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const interfaces_1 = require("./interfaces.");
const path_1 = require("path");
const write_index_file_1 = require("./write-index-file");
function generateIndexCommand() {
    return __awaiter(this, void 0, void 0, function* () {
        generate(false);
    });
}
function generateIndexWithFoldersCommand() {
    return __awaiter(this, void 0, void 0, function* () {
        generate(true);
    });
}
function generate(withFolders) {
    return __awaiter(this, void 0, void 0, function* () {
        const { activeTextEditor } = vscode.window;
        if (!activeTextEditor) {
            vscode.window.showErrorMessage(`This command is availiable only inside a file!`);
            return;
        }
        const { fileName } = activeTextEditor.document;
        const tsFile = fileName.includes(`.ts`);
        const cssFile = fileName.includes(`.css`);
        const scssFile = fileName.includes(`.scss`);
        if (!tsFile && !cssFile && !scssFile) {
            vscode.window.showErrorMessage(`Selected file format is not available!`);
            return;
        }
        try {
            if (tsFile) {
                yield write_index_file_1.writeIndexFile(path_1.dirname(fileName), withFolders, interfaces_1.FileTypes.TYPESCRIPT);
            }
            if (cssFile) {
                yield write_index_file_1.writeIndexFile(path_1.dirname(fileName), withFolders, interfaces_1.FileTypes.CSS);
            }
            if (scssFile) {
                yield write_index_file_1.writeIndexFile(path_1.dirname(fileName), withFolders, interfaces_1.FileTypes.SCSS);
            }
        }
        catch (error) {
            const errorMessage = `[Generate TS File] Something went wrong: ${error}`;
            vscode.window.showErrorMessage(errorMessage);
        }
    });
}
function activate(context) {
    let onlyTs = vscode.commands.registerCommand(`extension.generateIndex`, generateIndexCommand);
    let tsAndFolders = vscode.commands.registerCommand(`extension.generateIndexWithFolders`, generateIndexWithFoldersCommand);
    context.subscriptions.push(onlyTs, tsAndFolders);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map