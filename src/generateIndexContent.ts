import * as fs from 'fs';
import * as vscode from 'vscode';

export function generateIndexContent(files: string[], withFolders: boolean, excludePatterns: string[]) {
    let exportLines = getTypeScriptFiles(files, excludePatterns).map((file) => {
        const fileWithoutExtension = file.replace(/\.[^\.]+$/, '');
        try {
            let obj: Config = {
                singleQuote: true,
                semi: true,
            };

            vscode.workspace.workspaceFolders?.map((folder) => {
                obj = JSON.parse(fs.readFileSync(folder.uri.path + '/.prettierrc', 'utf8'));
            });

            const semi = obj.semi ? `;` : ``;

            if (obj.singleQuote) {
                return `export * from './${fileWithoutExtension}'${semi}\n`;
            }
            return `export * from "./${fileWithoutExtension}"${semi}\n`;
        } catch {
            return `export * from './${fileWithoutExtension}';\n`;
        }
    });

    if (withFolders) {
        const exportDirectories = getDirectories().map((directory) => {
            try {
                let obj: Config = {
                    singleQuote: true,
                    semi: true,
                };

                vscode.workspace.workspaceFolders?.map((folder) => {
                    obj = JSON.parse(fs.readFileSync(folder.uri.path + '/.prettierrc', 'utf8'));
                });

                const semi = obj.semi ? `;` : ``;

                if (obj.singleQuote) {
                    return `export * from './${directory}'${semi}\n`;
                }
                return `export * from "./${directory}"${semi}\n`;
            } catch {
                return `export * from './${directory}';\n`;
            }
        });

        exportLines = exportLines.concat(exportDirectories);
    }

    return exportLines.sort().join('');
}

function getDirectories(): string[] {
    if (vscode.workspace.workspaceFolders) {
        const root = vscode.workspace.workspaceFolders[0];
        return fs.readdirSync(root.uri.path).filter(function (file) {
            return fs.statSync(root.uri.path + '/' + file).isDirectory();
        });
    }
    return [];
}

function getTypeScriptFiles(files: string[], excludePatterns: string[]): string[] {
    excludePatterns = [];
    return files.filter((file) => {
        return (
            /\.tsx?$/.test(file) && file !== 'index.ts' && !excludePatterns.some((pattern) => file.includes(pattern))
        );
    });
}

export interface Config {
    singleQuote: boolean;
    semi: boolean;
}
