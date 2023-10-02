
const {db} = require("../database/mysql")

const addProduct = (req, res) => {

  const addProduct =
  "INSERT INTO `products` (`p_name`, `p_price`, `p_images`, `p_category`, `p_sizes`, `p_colors`, `p_arms`) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.name,
    req.body.price,
    req.file.filename,
    req.body.category,
    JSON.stringify(req.body.sizes),
    JSON.stringify(req.body.colors),
    JSON.stringify(req.body.arms),
  ];

  db.query(addProduct, values, (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

const getProduct = (req, res) => {
  const getProducts = "SELECT * FROM products";

  db.query(getProducts, (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

const getSingleProduct = (req, res) => {
  const { id } = req.params;
  const getProduct = "SELECT * FROM `products` WHERE p_id = ?";

  db.query(getProduct, [id], (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

const editProduct = (req, res) => {
  const { id } = req.params;
  const editProducts =
    "UPDATE `products` SET `p_name`=?, `p_price`=?, `p_images`=?, `p_category`=?, `p_sizes`=?, `p_colors`=?, `p_arms`=? WHERE `p_id`=?";

  const values = [
    req.body.name,
    req.body.price,
    req.file.filename,
    req.body.category,
    JSON.stringify(req.body.sizes),
    JSON.stringify(req.body.colors),
    JSON.stringify(req.body.arms),
    id,
  ];

  db.query(editProducts, values, (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

const deleteProduct = (req, res) => {
  const deleteProduct = "DELETE FROM `products` WHERE `products`.`p_id` = ?";
  const id = req.body.id;
  db.query(deleteProduct, [id], (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

module.exports = {
  addProduct,
  getProduct,
  getSingleProduct,
  editProduct,
  deleteProduct,
};
