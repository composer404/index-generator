import * as fs from 'fs';
import * as vscode from 'vscode';

import { Config, FileTypes } from './interfaces.';

export function generateIndexContent(files: string[], withFolders: boolean, targetFolder: string, fileType: FileTypes) {
    const config = loadPrettierrc();
    let exportedFiles: string[] = [];
    let exportedDirectories: string [] = [];

    switch(fileType){
        case(FileTypes.TYPESCRIPT): {
            exportedFiles = getTypeScriptFiles(files).map((file) => {
                const fileWithoutExtension = file.replace(/\.[^\.]+$/, ``);
                return styleImportedLineWithExportKeyWord(fileWithoutExtension, config);
            });
            break;
        }
        case(FileTypes.SCSS): {
            exportedFiles = getSCSSFiles(files).map((file) => {
                const fileWithoutExtension = file.replace(/\.[^\.]+$/, ``);
                return styleImportedLineWithImportKeyWord(fileWithoutExtension, config);
            });
            break;
        }
        case(FileTypes.CSS): {
            exportedFiles = getCSSFiles(files).map((file) => {
                const fileWithoutExtension = file.replace(/\.[^\.]+$/, ``);
                return styleImportedLineWithImportKeyWord(fileWithoutExtension, config);
            });
            break;
        }
    }
   
    if (withFolders) {
        exportedDirectories = getDirectories(targetFolder).map((directory) => {
            if(fileType === FileTypes.SCSS || fileType === FileTypes.CSS){
                return styleImportedLineWithImportKeyWord(directory, config);
            }
            return styleImportedLineWithExportKeyWord(directory, config);
        });
    }

    exportedFiles = exportedFiles.concat(exportedDirectories);
    return exportedFiles.sort().join('');
}


function styleImportedLineWithExportKeyWord(name: string, config: Config): string {
    const semi = config.semi ? `;` : ``;
    if (config.singleQuote) {
        return `export * from './${name}'${semi}\n`;
    }
        return `export * from "./${name}"${semi}\n`;
}

function styleImportedLineWithImportKeyWord(name: string, config: Config): string {
    const semi = config.semi ? `;` : ``;
    if (config.singleQuote) {
        return `@import './${name}'${semi}\n`;
    }
        return `@import "./${name}"${semi}\n`;
}

function loadExcludedPatterns(): string[] {
   return [`.test.`, `__snapshots__`];
}

function loadPrettierrc(): Config {
    let config: Config = {
        singleQuote: true,
        semi: true,
    };

    try {
        vscode.workspace.workspaceFolders?.map((folder) => {
        config = JSON.parse(fs.readFileSync(folder.uri.path + `/.prettierrc`, `utf8`));
    });
    } catch {
        return config;
    }
  
    return config;
}

function getDirectories(folder: string): string[] {
        return fs.readdirSync(folder).filter(function (file) {
            return fs.statSync(folder + `/` + file).isDirectory();
        });
}

function getTypeScriptFiles(files: string[]): string[] {
    return files.filter((file) => {
        return (
            file.includes(`.ts`) && file !== `index.ts` && !loadExcludedPatterns().some((pattern) => file.includes(pattern))
        );
    });
}

function getSCSSFiles(files: string[]): string[] {
    return files.filter((file) => {
        return (
            file.includes(`.scss`) && file !== `index.scss` && !loadExcludedPatterns().some((pattern) => file.includes(pattern))
        );
    });
}

function getCSSFiles(files: string[]): string[] {
    return files.filter((file) => {
        return (
            file.includes(`.css`) && file !== `index.css` && !loadExcludedPatterns().some((pattern) => file.includes(pattern))
        );
    });
}
