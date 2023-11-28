const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const db = require("../database/mysql");

const register = async (req, res) => {
  try {
    const newUserQuery = "INSERT INTO `gymauth` (`name`, `email`, `password`) VALUES (?, ?, ?)";
    const existEmailQuery = "SELECT * FROM `gymauth` WHERE `email` = ?";
    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // Acquire a connection from the pool
    db.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting connection from pool:', err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Check if email already exists
      connection.query(existEmailQuery, [email], (err, data) => {
        if (err) {
          connection.release(); // Release the connection to the pool
          return res.status(500).json({ error: "Internal Server Error" });
        }

        if (data.length > 0) {
          connection.release(); // Release the connection to the pool
          return res.status(400).json({ error: "Email already taken" });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Insert new user into the database
        connection.query(newUserQuery, [name, email, hashedPassword], (err, result) => {
          connection.release(); // Release the connection to the pool
          if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
          }

          // Send verification email
          const verification = jwt.sign({ email }, "GymToken", { expiresIn: "1d" });

          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "www.radwaniq@gmail.com",
              pass: "zhnxldnualdylzhu",
            },
          });

          const mailOptions = {
            from: "www.radwaniq@gmail.com",
            to: email,
            subject: "Email Verification",
            html: `Click the following link to verify your email: <p><a href="http://localhost:3000/verify/${email}/${verification}">Click here to proceed</a></p>`,
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              return res.status(500).json({ error: "Internal Server Error" });
            } else {
              return res.json({
                status: "Success",
                message: "Verification email sent",
              });
            }
          });
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const existUser = "SELECT * FROM `gymauth` WHERE email = ?";
  const email = req.body.email;
  const password = req.body.password;

  db.query(existUser, [email], async (err, data) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      if (data.length === 0) {
        return res.status(400).json("no data length");
      } else {
        const storedisVerified = data[0].isVerified;
        const storedPassword = data[0].password;
        const email = data[0].email;
        const name = data[0].name;

        if (storedisVerified === 1) {
          const compare = await bcrypt.compare(password, storedPassword);
          if (compare) {
            const token = jwt.sign({ id: data[0].id }, "GymToken");
            res.json({ token, id: data[0].id, email, name });
          } else {
            res.status(400).json({ error: "password or email is wrong" });
          }
        } else {
          res.status(400).json({ error: "verify your email first" });
        }
      }
    }
  });
};

const verifyEmail = async (req, res) => {
  const { email, verification } = req.params;
  const updataUser = "UPDATE `gymauth` SET `isVerified` = 1 WHERE `email` = ?";
  try {
    const verify = jwt.verify(verification, "GymToken");

    if (verify.email === email) {
      db.query(updataUser, [email], (err, data) => {
        if (err) {
          res.json(err);
        } else {
          res.status(200).json({ success: "account verified" });
        }
      });
    } else {
      res.status(400).json({ error: "email or password wrong" });
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

const forgotPassword = (req, res) => {
  const getEmail = "SELECT * FROM `gymauth` WHERE `email` = ?";
  const email = req.body.email;
  const verification = jwt.sign({ email }, "GymToken", { expiresIn: "1d" });
  db.query(getEmail, [email], (err, data) => {
    if (err) {
      res.status(400).json({ err });
    } else {
      res.status(200).json({ success: "check your gmail" });
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "www.radwaniq@gmail.com",
          pass: "zhnxldnualdylzhu",
        },
      });

      const mailOptions = {
        from: "www.radwaniq@gmail.com",
        to: email,
        subject: "Reset Password Link",
        html: `Click the following link to reset your email password: <p><a href="http://localhost:3000/resetpassword/${getEmail.id}/${verification}">Click here to proceed</a></p>`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).json({ err });
        } else {
          return res
            .status(200)
            .json({ success: "Success", Message: "Verification email sent" });
        }
      });
    }
  });
};

const resetPassword = (req, res) => {
  const { id, verification } = req.params;
  const resetpPassword =
    "UPDATE `gymauth` SET `password` = ? WHERE `email` = ?";

  const newPassword = req.body.password;
  const Password = bcrypt.hash(newPassword, 10);

  const verify = jwt.verify(verification, "GymToken");
  if ((verify.id = id)) {
    db.query(resetpPassword, [Password], (err, data) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json("password changed successfully");
      }
    });
  } else {
    res.status(400).json({ error: "someting went wrongsssssssssssssssssssss" });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
