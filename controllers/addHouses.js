const Houses = require("../model/addHousesModel");

const getHouses = async(req, res) => {
    try{
        const house = await Houses.find();
        res.json(house);
    }catch (err){
        res.status(500).send(err);
    }
};

const createHouses = async(req, res) => {
    try{
        const house = new Houses({
            description: req.body.description,
            street: req.body.street,
            state: req.body.state,
            municipality: req.body.municipality,
            price: req.body.price,
            status: req.body.status,
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });
        const savedHouse = await house.save();
        res.json(savedHouse);
    }catch(err){
        res.status(500).send(err);
    }
};

const updateHouses = async(req, res) => {
    try {
        const updates = req.body;

        const updatedHouses = await Houses.findOneAndUpdate(
            { _id: req.params.houseID },
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
    getHouses,
    createHouses,
    updateHouses,
    deleteHouses,
};
