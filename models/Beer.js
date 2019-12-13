const mongoose = require('mongoose');

const { Schema } = mongoose;

const beerSchema = new Schema(
  {
    id: { type: Number },
    name: { type: String },
    tagline: { type: String },
    first_brewed: { type: String },
    description: { type: String },
    image_url: { type: String },
    abv: { type: Number },
    ibu: { type: Number },
    target_fg: { type: Number },
    target_og: { type: Number },
    ebc: { type: Number },
    srm: { type: Number },
    ph: { type: Number },
    attenuation_level: { type: Number },
    volume: Schema.Types.Mixed,
    boil_volume: Schema.Types.Mixed,
    method: Schema.Types.Mixed,
    ingredients: Schema.Types.Mixed,
    food_pairing: Schema.Types.Mixed,
    brewers_tips: { type: String },
    contributed_by: { type: String },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;