const multer = require('multer');
const { v1 :uuid} = require('uuid');


const pdfUploader = multer({
//   limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/pdf');
    },
    filename: (req, file, cb) => {
    //   const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + '.pdf');
    }
  })

});

module.exports = pdfUploader;

