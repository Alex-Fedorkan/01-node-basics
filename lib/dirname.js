import { fileURLToPath } from "url";
import { dirname } from "path";

const createDirnameAndFileName = (importURL) => {
  const __filename = fileURLToPath(importURL);
  const __dirname = dirname(__filename);
  return { __filename, __dirname };
};
export default createDirnameAndFileName;
