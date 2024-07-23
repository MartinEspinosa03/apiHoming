const Users = require("../model/registerUserModel");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const user = new Users({
      name: req.body.name,
      lastname: req.body.lastname,
      mail: req.body.mail,
      password: req.body.password,
      genre: req.body.genre,
      numberPhone: req.body.numberPhone,
      laborField: req.body.laborField,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUser = async (req, res) => {
  jwt.verify(req.token, "homing", (error, authData) => {
    Users.find((err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const newPassword = req.body.password;

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { password: newPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: "Cambio de contraseña exitoso" });
  } catch (err) {
    res.status(500).send(err);
  }
};

const validationUser = async (req, res) => {
  try {
    const mail = req.params.userMail;
    const password = req.params.userPassword;

    const user = await Users.findOne({ mail: mail }).exec();

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    } else {
      if (mail === user.mail && password === user.password) {
        const token = jwt.sign({ user: user }, "homing");
        const { password, ...userData } = user.toObject();
        return res.status(200).json({ message: "Sesión iniciada", token: token, data: userData });
      } else {
        return res.status(400).send({ message: "Correo o contraseña incorrectos" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error en el servidor" });
  }
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  validationUser,
};
