import multer from "multer";
import path from "path";

const multerUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./public");
        },
        limits: {
            fileSize: 5000000 
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const filename = `${Date.now()}${ext}`;
            cb(null, filename);
        }
    }),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".JPG") {
            cb(null, true);
        } else {
            const error = {
                message: "File must be .png, .jpg, or .jpeg"
            };
            cb(error, false);
        }
    }
});

const upload = (req, res, next) => {
    const multerSingle = multerUpload.single("image");
    multerSingle(req, res, (err) => {
        if (err) {
            res.json({
                message: err.message 
            });
        } else {
            next();
        }
    });
};

export default upload;
