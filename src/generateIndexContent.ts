import * as fs from 'fs';
import * as vscode from 'vscode';


export function generateIndexContent(files: string[], excludePatterns: string[] = []) {
    const exportedFiles = files.filter((file) => {
        return (
            /\.tsx?$/.test(file) && file !== 'index.ts' && !excludePatterns.some((pattern) => file.includes(pattern))
        );
    });

    const exportLines = exportedFiles.map((file) => {
        const fileWithoutExtension = file.replace(/\.[^\.]+$/, '');
        try{
                let obj: Config = {
                    singleQuote: true, 
                    semi: true,
                };
                
                vscode.workspace.workspaceFolders?.map(folder => {
                obj = JSON.parse(fs.readFileSync(folder.uri.path + '/.prettierrc', 'utf8'));
                });

                const semi = obj.semi ? `;` : ``;

                if(obj.singleQuote) {
                    return `export * from './${fileWithoutExtension}'${semi} \n`;
                }
                return `export * from "./${fileWithoutExtension}"${semi} \n`;   
        }
        catch{
            return `export * from './${fileWithoutExtension}'; \n`;
        }
        
    });

    return exportLines.join('');
}

export interface Config{
    singleQuote: boolean;
    semi: boolean;
}
