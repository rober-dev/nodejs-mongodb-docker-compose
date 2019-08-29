const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      require: true
    },
    name: {
      type: String,
      required: true,
      min: 3,
      max: 50
    }
  },
  {
    timestamps: true,
    collection: 'countries'
  }
);

const CountryModel = mongoose.model('Country', CountrySchema);

module.exports = CountryModel;
