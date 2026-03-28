import multer from "multer"

const storage = multer.memoryStorage();

//singleStorage
export const singleStorage = multer({storage}).single("file");

//multiple storage
export const multipleStorage = multer({storage}).array("files", 5);

