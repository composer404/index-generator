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
const path_1 = require("path");
const generateIndexContent_1 = require("./generateIndexContent");
function writeIndexFile(targetFolder, fs = fsExtra) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield fs.readdir(targetFolder);
        const indexFilePath = path_1.resolve(targetFolder, "index.ts");
        const indexContent = generateIndexContent_1.generateIndexContent(files, [".test.", "__snapshots__"]);
        yield fs.writeFile(indexFilePath, indexContent);
    });
}
exports.writeIndexFile = writeIndexFile;
//# sourceMappingURL=writeIndexFile.js.map