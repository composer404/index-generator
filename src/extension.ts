import { dirname } from "path";
import * as vscode from "vscode";
import { writeIndexFile } from "./writeIndexFile";

async function generateIndexCommand() {
  generate(false);
}

async function generateIndexWithFoldersCommand() {
  generate(true);
}

async function generate(withFolders: boolean) {
  const { activeTextEditor } = vscode.window;
  if (!activeTextEditor) {
    vscode.window.showErrorMessage(
      "Please open a file before activating this command.",
    );
    return;
  }

  const { fileName } = activeTextEditor.document;
  if (!/\.tsx?$/.test(fileName)) {
    vscode.window.showErrorMessage(
      "Only TypeScript files are supported at the moment, sorry!",
    );
    return;
  }

  try {
    await writeIndexFile(dirname(fileName), withFolders);

  } catch (error) {
    const errorMessage = `[Generate TS File] Something went wrong: ${error}`;
    vscode.window.showErrorMessage(errorMessage);
  }
}

export function activate(context: vscode.ExtensionContext) {
  let onlyTs = vscode.commands.registerCommand(
    "extension.generateIndex",
    generateIndexCommand,
  );

  let tsAndFolders = vscode.commands.registerCommand(
    "extension.generateIndexWithFolders",
    generateIndexWithFoldersCommand
  );

  context.subscriptions.push(onlyTs, tsAndFolders);
}
