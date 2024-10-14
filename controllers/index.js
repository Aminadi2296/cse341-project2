const { messages } = require('validatorjs/src/lang');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  // swagger.tags = [contacts]
  const result = await mongodb.getDatabase().db().collection('countries').find();
  result.toArray((err, lists)=>{
    if (err){
      res.status(400).json({message: err});
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); // we just need the first one (the only one)
  });
};


const getById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid country id to find a country.');
  }
    const countryId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('countries').find({ _id: countryId });
    result.toArray((err, lists)=>{
      if (err){
        res.status(400).json({message: err})
      }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]); 
      });
};

const createCountry = async (req, res) =>{
    // swagger.tags = [contacts]
  const country = {
    name: req.body.name,
    capital: req.body.capital,
    population: req.body.population,
    area: req.body.area,
    region: req.body.region,
    languages: [req.body.languages],
    currency: req.body.currency,
    flag: req.body.flag
  };
  const response = await mongodb.getDatabase().db().collection('countries').insertOne(country);
  if (response.acknowledged){
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'some error ocurred while creating the country.')
  }
};


const updateCountry = async (req, res) =>{
    // swagger.tags = [contacts]
  const countryId = new ObjectId(req.params.id);
  const country = {
    name: req.body.name,
    capital: req.body.capital,
    population: req.body.population,
    area: req.body.area,
    region: req.body.region,
    languages: [req.body.languages],
    currency: req.body.currency,
    flag: req.body.flag
  };
  const response = await mongodb.getDatabase().db().collection('countries').replaceOne({ _id: countryId }, country);
  if (response.modifiedCount > 0){
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'some error ocurred while updating the country.')
  }
};

const deleteCountry = async (req, res) =>{
    // swagger.tags = [contacts]
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to delete a country.');
    }
  const countryId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('countries').deleteOne({_id: countryId});
  if (response.deleteCount > 0){
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'some error ocurred while deleting the user.')
  }
}

module.exports = {getAll, getById, createCountry, updateCountry, deleteCountry};