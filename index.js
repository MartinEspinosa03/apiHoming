const express = require('express');
const app = express();
const router = require("./router");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cors = require("cors");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('¡Base de datos homing!');
});

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Conectado a MongoDB");
})
.catch((err) => {
  console.log(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
