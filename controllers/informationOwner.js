const Owner = require("../model/informationOwnerModel");

const getOwner = async(req, res) => {
    try {
        const infoOwner = await Owner.find();
        res.json(infoOwner);
    }catch(err){
        res.status(500).send(err);
    }
};

const createInfoOwner = async(req, res) => {
    try {
        const infoOwner = new Owner({
            owner: req.body.owner,
            phone: req.body.phone,
            mail: req.body.mail,
            housePhone: req.body.housePhone,
            extraInfo: req.body.extraInfo,
        });
        const savedOwner = await infoOwner.save();
        res.json(savedOwner);
    }catch(err) {
        res.status(500).send(err);
    }
};

const updateOwner = async(req, res) => {
    try {
        const updates = req.body;

        const updatedOwner = await Owner.findOneAndUpdate(
            { _id: req.params.todoID },
            { $set: updates },
            { new: true }
        );

        if(!updatedOwner){
            return res.status(404).send({ message: "Información de propietario no encontrada" });
        }

        res.json({ message: "Información actualizada" })
    }catch(err){
        res.status(500).send(err);
    }
};

module.exports = {
    getOwner,
    createInfoOwner,
    updateOwner,
};