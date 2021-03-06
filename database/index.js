require ('dotenv').config()
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {

  await mongoose.connect('mongodb://3.212.15.225:27017/products', {
    authSource: "admin",
    user: "myUserAdmin",
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

}

const ProductSchema = mongoose.Schema({

  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: {
    type: Array,
    default: undefined
  },
  styles: {
    type: Array,
    default: undefined
  }
});

const StyleSchema = mongoose.Schema({

  id: Number,
  productId: Number,
  name: String,
  sale_price: Number,
  original_price: Number,
  default_style: String,
  photos: {
    type: Array,
    default: undefined
  },
  skus: {
    type: Object,
    default: undefined
  }
});

let Product = mongoose.model('product', ProductSchema, 'products');
let Style = mongoose.model('style', StyleSchema, 'styles');

function retrieve5Products(callback) {
  const query  = Product.where({ id: { $in: [900002, 900003, 900004, 900005, 900006 ] } });
  query.find(function (error, products) {
    if (error) {
      console.log('db error: ', error);
      callback(error);
    }
    if (products) {
      callback(null, products);
    }
  });
}

function retrieve5Styles(callback) {
  const query  = Style.where({ productId: { $in: [900002, 900003, 900004, 900005, 900006 ] } });
  query.find(function (error, products) {
    if (error) {
      console.log('db error: ', error);
      callback(error);
    }
    if (products) {
      callback(null, products);
    }
  });
}

function retrieveProductById(incomingId, callback) {

  const query  = Product.where({ id: incomingId });
  query.findOne(function (error, product) {
    if (error) {
      console.log('db error: ', error);
      callback(error);
    }
    if (product) {
      callback(null, product);
    }
  });
}

function retrieveStylesById(incomingId, callback) {

  const query  = Style.where({ productId: incomingId });
  query.find(function (error, styles) {
    if (error) {
      console.log('db error: ', error);
      callback(error);
    }
    if (styles) {
      callback(null, styles);
    }
  });
}

module.exports = {
  retrieveProductById,
  retrieveStylesById,
  retrieve5Products,
  retrieve5Styles
}

