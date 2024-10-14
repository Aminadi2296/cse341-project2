const validator = require('../helpers/validate');

const saveCountry = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    capital: 'required|string',
    region: 'required|string',
    currency: 'string',
    flag: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveCountry
};