const Houses = require("../model/addHousesModel");

const getUserHouses = async (req, res) => {
    try {
      const userId = req.params.userId;
      const houses = await Houses.find({ userId: userId }); 
      res.json(houses);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  

const getAllHouses = async (req, res) => {
    try {
      const houses = await Houses.find();
      res.json(houses);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  

  const createHouses = async(req, res) => {
    try {
        const { description, street, state, municipality, price, status, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId es requerido" });
        }

        const house = new Houses({
            description,
            street,
            state,
            municipality,
            price,
            status,
            image: req.file ? {
                data: req.file.buffer,
                contentType: req.file.mimetype
            } : undefined,
            userId 
        });

        const savedHouse = await house.save();
        res.status(201).json(savedHouse);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
  

const updateHouses = async(req, res) => {
    try {
        const updates = req.body;

        const updatedHouses = await Houses.findOneAndUpdate(
            { _id: req.params.houseID, userId: req.user._id },
            { $set: updates },
            { new: true }
        );

        if(!updatedHouses){
            return res.status(404).send({ message: "Casa no encontrada" });
        }

        res.json(updatedHouses)
    }catch(err){
        res.status(500).send(err);
    }
};

const deleteHouses = async(req, res) => {
    try{
        const house = await Houses.findByIdAndDelete(req.params.houseID);
        if(!house){
            return res.status(404).send({ message: "Casa no encontrada" });
        }
        res.status(200).send({ message: "Casa eliminada exitosamente" });
    }catch(err){
        res.status(500).send(err)
    }
};

module.exports = {
    getUserHouses,
    getAllHouses,
    createHouses,
    updateHouses,
    deleteHouses,
};
