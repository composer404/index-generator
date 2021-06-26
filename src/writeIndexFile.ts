import * as fsExtra from 'fs-extra';

import { FileTypes } from './interfaces.';
import { generateIndexContent } from './generateIndexContent';
import { resolve } from 'path';

export async function writeIndexFile(targetFolder: string, withFolders: boolean, fileType: FileTypes) {
    const files = await fsExtra.readdir(targetFolder);
    let indexContent = ``;
    let indexFilePath = ``;

    switch(fileType) {
        case(FileTypes.TYPESCRIPT): {
            indexFilePath = resolve(targetFolder, `index.ts`); 
            break;
        }
        case(FileTypes.SCSS): {
            indexFilePath = resolve(targetFolder, `index.scss`); 
            break;
        }
        case(FileTypes.CSS): {
            indexFilePath = resolve(targetFolder, `index.css`);
            break;
        }
    }
    
    if (withFolders) {
        indexContent = generateIndexContent(files, true, targetFolder, fileType);
    } else {
        indexContent = generateIndexContent(files, false, targetFolder, fileType);
    }

    await fsExtra.writeFile(indexFilePath, indexContent);
}
