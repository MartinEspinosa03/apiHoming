const router = require("express").Router();
const upload = require("./multerConfig");

const {
    getUser,
    createUser,
    updateUser,
    validationUser,
} = require("./controllers/registerUser");

router.get("/users", getUser);

router.post("/users", createUser);

router.put("/users/:todoID", updateUser);

router.get("/users/:userMail/:userPassword", validationUser)

const {
    getHouses,
    createHouses,
    updateHouses,
    deleteHouses,
} = require("./controllers/addHouses");

router.get("/houses", getHouses);

router.post("/houses", upload.single('image'), createHouses);

router.put("/houses/:houseID", updateHouses);

router.delete("/houses/:houseID", deleteHouses)

const {
    getOwner,
    createInfoOwner,
    updateOwner,
} = require("./controllers/informationOwner");

router.get("/owner", getOwner),

router.post("/owner", createInfoOwner);

router.put("/owner/:todoID", updateOwner);

module.exports = router;