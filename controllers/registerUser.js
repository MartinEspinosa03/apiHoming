const Users = require("../model/registerUserModel");

const getUser = async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

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
    res.json(savedUser);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateUser = async (req, res) => {
  try {
    await Users.findOneAndUpdate(
      { _id: req.params.todoID },
      { $set: { password: req.body.password } },
      { new: true }
    );
    res.json({ message: "Cambio de contraseña exitoso" });
  } catch (err) {
    res.status(500).send(err);
  }
};

const validationUser = async (req, res) => {
  try {
    const mail = req.params.userMail;
    const password = req.params.userPassword;

    const user = await Users.findOne({ mail: req.params.userMail }).exec();

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    } else {
      if (mail === user.mail) {
        console.log("Correo correcto");
        if (password === user.password) {
          console.log("Contraseña correcta");
          console.log(user);
          return res.status(200).json(user);
        } else {
          return res.status(400).send({ message: "Contraseña incorrecta" });
        }
      } else {
        return res.status(400).send({ message: "Correo incorrecto" });
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
