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
exports.writeIndexFile = void 0;
const fsExtra = require("fs-extra");
const interfaces_1 = require("./interfaces.");
const generateIndexContent_1 = require("./generateIndexContent");
const path_1 = require("path");
function writeIndexFile(targetFolder, withFolders, fileType) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield fsExtra.readdir(targetFolder);
        let indexContent = ``;
        let indexFilePath = ``;
        switch (fileType) {
            case (interfaces_1.FileTypes.TYPESCRIPT): {
                indexFilePath = path_1.resolve(targetFolder, `index.ts`);
                break;
            }
            case (interfaces_1.FileTypes.SCSS): {
                indexFilePath = path_1.resolve(targetFolder, `index.scss`);
                break;
            }
            case (interfaces_1.FileTypes.CSS): {
                indexFilePath = path_1.resolve(targetFolder, `index.css`);
                break;
            }
        }
        if (withFolders) {
            indexContent = generateIndexContent_1.generateIndexContent(files, true, targetFolder, fileType);
        }
        else {
            indexContent = generateIndexContent_1.generateIndexContent(files, false, targetFolder, fileType);
        }
        yield fsExtra.writeFile(indexFilePath, indexContent);
    });
}
exports.writeIndexFile = writeIndexFile;
//# sourceMappingURL=writeIndexFile.js.map