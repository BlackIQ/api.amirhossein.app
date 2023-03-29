import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const ext = file.originalname.split(".")[1];

      cb(null, `files/${ext === "inpv" ? "ios" : "android"}`);
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split(".")[1];
      const name = ext === "inpv" ? "ios" : "android";

      cb(null, `${name}.${ext}`);
    },
  }),
});

export default upload;
