import * as vscode from 'vscode';

import { FileTypes } from './interfaces.';
import { dirname } from 'path';
import { writeIndexFile } from './writeIndexFile';

async function generateIndexCommand() {
  generate(false);
}

async function generateIndexWithFoldersCommand() {
  generate(true);
}

async function generate(withFolders: boolean): Promise<void> {
  const { activeTextEditor } = vscode.window;
  if (!activeTextEditor) {
    vscode.window.showErrorMessage(
      `This command is availiable only inside a file!`,
    );
    return;
  }

  const { fileName } = activeTextEditor.document;
  const tsFile = fileName.includes(`.ts`);
  const cssFile = fileName.includes(`.css`); 
  const scssFile = fileName.includes(`.scss`); 

  if (!tsFile && !cssFile && !scssFile) {
    vscode.window.showErrorMessage(
      `Selected file format is not available!`,
    );
    return;
  }

  try {
    if(tsFile){
      await writeIndexFile(dirname(fileName), withFolders, FileTypes.TYPESCRIPT);
    }

    if(cssFile){
      await writeIndexFile(dirname(fileName), withFolders, FileTypes.CSS);
    }

    if(scssFile){
      await writeIndexFile(dirname(fileName), withFolders, FileTypes.SCSS);
    }

  } catch (error) {
    const errorMessage = `[Generate TS File] Something went wrong: ${error}`;
    vscode.window.showErrorMessage(errorMessage);
  }
}

export function activate(context: vscode.ExtensionContext) {
  let onlyTs = vscode.commands.registerCommand(
    `extension.generateIndex`,
    generateIndexCommand,
  );

  let tsAndFolders = vscode.commands.registerCommand(
    `extension.generateIndexWithFolders`,
    generateIndexWithFoldersCommand
  );

  context.subscriptions.push(onlyTs, tsAndFolders);
}
