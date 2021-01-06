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
exports.deactivate = exports.activate = void 0;
const path_1 = require("path");
const vscode = require("vscode");
const writeIndexFile_1 = require("./writeIndexFile");
function generateIndexCommand() {
    return __awaiter(this, void 0, void 0, function* () {
        const { activeTextEditor } = vscode.window;
        if (!activeTextEditor) {
            vscode.window.showErrorMessage("Please open a file before activating this command.");
            return;
        }
        const { fileName } = activeTextEditor.document;
        if (!/\.tsx?$/.test(fileName)) {
            vscode.window.showErrorMessage("Only TypeScript files are supported at the moment, sorry!");
            return;
        }
        try {
            yield writeIndexFile_1.writeIndexFile(path_1.dirname(fileName));
            // FIXME: figure out how to do this properly
            // await vscode.workspace.openTextDocument(indexFilePath)
            // await vscode.window.showTextDocument(vscode.Uri.parse(indexFilePath))
        }
        catch (error) {
            const errorMessage = `[Generate TS File] Something went wrong: ${error}`;
            vscode.window.showErrorMessage(errorMessage);
        }
    });
}
function activate(context) {
    let disposable = vscode.commands.registerCommand("extension.generateIndex", generateIndexCommand);
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map