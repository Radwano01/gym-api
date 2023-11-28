const { addOrder, getOrders, getSingleOrder, updateStatus, deleteOrder } = require("../controller/orders");

const router = require("express").Router();

const path = require("path");

const checkFileType = function (file, cb) {

  const fileTypes = /pdf/;

  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload files!!");
  }
};

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/orders/bills");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
    checkFileType
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("bill");




router.post("/order",upload, addOrder)
router.get("/get-orders", getOrders)
router.get("/get-single-order/:id", getSingleOrder)
router.put("/change-status/:id", updateStatus)
router.post("/delete-order/:id", deleteOrder)

module.exports = {router}
