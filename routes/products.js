const {
  addProduct,
  getProduct,
  getSingleProduct,
  editProduct,
  deleteProduct,
} = require("../controller/products");
const router = require("express").Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/products");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage }).single("image");

router.post("/add-products",upload, addProduct);
router.get("/get-products", getProduct);
router.get("/get-single-product/:id", getSingleProduct);
router.put("/edit-products/:id",upload, editProduct);
router.delete("/delete-product/:id", deleteProduct);


module.exports = {
  router
}
