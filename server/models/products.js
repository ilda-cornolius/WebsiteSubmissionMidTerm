//   Products
//  Ildaphonse Cornolius
//  ID: 300699371
//  comp229-f2020-midterm
let mongoose = require("mongoose");

// create a model class
let Product = mongoose.Schema(
  {
    Productid: String,
    Productname: String,
    Description: String,
    Price: Number,
  },
  {
    collection: "products",
  }
);

module.exports = mongoose.model("Product", Product);
