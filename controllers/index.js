const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  // swagger.tags = [contacts]
  const result = await mongodb.getDatabase().db().collection('countries').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); // we just need the first one (the only one)
  });
};


const getById = async (req, res) => {
    const countryId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('countries').find({ _id: countryId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]); 
      });
};

const createCountry = async (req, res) =>{
    // swagger.tags = [contacts]
  const countryId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDatabase().db().collection('contacts').insertOne(user);
  if (response.acknowledged){
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'some error ocurred while updating the user.')
  }
};

const updateCountry = async (req, res) =>{
    // swagger.tags = [contacts]
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: userId}, user);
  if (response.modifiedCount > 0){
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'some error ocurred while updating the user.')
  }
};

const deleteCountry = async (req, res) =>{
    // swagger.tags = [contacts]
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: userId});
  if (response.deleteCount > 0){
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'some error ocurred while deleting the user.')
  }
}

module.exports = {getAll, getById};