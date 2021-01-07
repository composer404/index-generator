import * as fsExtra from 'fs-extra';
import { resolve } from 'path';
import { generateIndexContent } from './generateIndexContent';

export async function writeIndexFile(targetFolder: string, withFolders: boolean) {
    const files = await fsExtra.readdir(targetFolder);
    const indexFilePath = resolve(targetFolder, 'index.ts');
    let indexContent;
    if (withFolders) {
        indexContent = generateIndexContent(files, true, ['.test.', '__snapshots__']);
    } else {
        indexContent = generateIndexContent(files, false, ['.test.', '__snapshots__']);
    }
    await fsExtra.writeFile(indexFilePath, indexContent);
}
