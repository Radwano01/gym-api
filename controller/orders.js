const { db } = require("../database/mysql");
const ordersModel = require("../models/orders");
const productsModel = require("../models/products");

const addOrder = (req, res) => {
  const addOrders =
    "INSERT INTO `orders` (`o_userid`, `o_name`, `o_email`, `o_price`, `o_items`, `o_status`, `o_address`, `o_date`) VALUES (?,?,?,?,?,?,?,?)";

  const values = [
    req.body.userID,
    req.body.name,
    req.body.email,
    req.body.price,
    JSON.stringify(req.body.items),
    req.body.status,
    req.body.address,
    req.body.date,
  ];

  db.query(addOrders, values, async (err, data) => {
    if (err) {
      console.error("SQL error:", err);
      return res.status(400).json({ error: "Order creation failed", details: err });
    }

    const clientName = req.body.name;
    const clientEmail = req.body.email;
    const clientBill = req.body.bill;
    const clientCode = req.body.code;

    try {
      await ordersModel.create({
        name: clientName,
        email: clientEmail,
        code: clientCode,
        bill: clientBill,
      });
      res.status(200).json("Order and bill uploaded successfully");
    } catch (mongoErr) {
      console.error("MongoDB error:", mongoErr);
      res.status(400).json({ error: "Bill upload failed", details: mongoErr });
    }
  });
};


const getOrders = (req, res) => {
  const getOrders = "SELECT * FROM `orders`";
  db.query(getOrders, (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json([data]);
    }
  });
};

const getSingleOrder = (req, res) => {
  const { id } = req.params;
  const getSingleOrder = "SELECT * FROM `orders` WHERE `p_id`=?";
  db.query(getSingleOrder, [id], (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      const updatedData = {
        ...data[0],
        o_items: JSON.parse(data[0].o_items),
      };
      res.status(200).json(updatedData);
    }
  });
};

const getSingleOrderImages = async (req, res) => {
  const { code, name } = req.body;
  try {
    const images = await productsModel.find(name);
    const bill = await ordersModel.find(code);
    if (images && bill) {
      res.status(200).json({ images, bill });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteOrder = (req, res) => {
  const { id } = req.params;
  const getSingleOrder = "DELETE FROM `orders` WHERE `p_id`=?";
  db.query(getSingleOrder, [id], async (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      const code = req.body.code;
      const deleteProduct = await ordersModel.deleteOne(code);
      if (deleteProduct) {
        res.status(200).json("Product deleted");
      } else {
        res.status(400).json("issue unsuccessful");
      }
    }
  });
};

const updateStatus = (req, res) => {
  const { id } = req.params;
  const updateStatus = "UPDATE `orders` SET `o_status`=? WHERE `p_id`=?";

  const values = [req.body.status, id];
  db.query(updateStatus, values, (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

module.exports = {
  addOrder,
  getOrders,
  getSingleOrder,
  getSingleOrderImages,
  updateStatus,
  deleteOrder,
};
