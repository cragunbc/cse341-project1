const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const result = await mongodb.getDatabase().db("Contacts").collection("Contacts").find();
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts)
    })
    .catch((error) => {
        res.status(500).json({message: error});
    });
};


const getSingle = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("Contacts").collection("Contacts").find({_id: userId});
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0])
    })
    .catch((error) => {
        res.status(500).json({message: error});
    });
};

const createContact = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastname,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db("Contacts").collection("Contacts").insertOne(contact);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occured while creating the contact.")
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const userId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastname,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db("Contacts").collection("Contacts").replaceOne({ _id: userId }, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occured while updating the user.")
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db("Contacts").collection("Contacts").deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occured while delting the user.");
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};