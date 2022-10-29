//   products.js
//  Ildaphonse Cornolius
//  ID: 300699371
//  comp229-f2020-midterm

// modules required for routing

//the product routing page for different web pages
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const { title } = require("process");

// define the product model
let product = require("../models/products");

/* GET products List page. READ */
router.get("/", (req, res, next) => {
  // find all products in the products collection
  product.find((err, products) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("products/index", {
        title: "Products",
        products: products,
      });
    }
  });
});

//  GET the Product Details page in order to add a new Product
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   ****************/
      res.render("products/add", {
        "title": "add product"
        
  });  
});

router.get("/products/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   ****************/
      res.render("products/add", {
        "title": "add product"
        
  });  
});


// POST process the Product Details page and create a new Product - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let newProduct = product({
    "Productid": req.body.Productid,
    "Productname": req.body.Productname,
    "Description": req.body.Description,
    "Price": req.body.price
});

product.create(newProduct, (err, Product) =>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        // refresh the book list
        res.redirect('/products');
    }
});
});


router.post("/products/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let newProduct = product({
    "Productid": req.body.Productid,
    "Productname": req.body.Productname,
    "Description": req.body.Description,
    "Price": req.body.price
});

product.create(newProduct, (err, Product) =>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        // refresh the book list
        res.redirect('/products');
    }
});
});

// GET the Product Details page in order to edit an existing Product
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let id = req.params.id;

   product.findById(id, (err, productToEdit) => {
       if(err)
       {
           console.log(err);
           res.end(err);
       }
       else
       {
           //show the edit view
           res.render('products/details', {title: 'Edit Product', "products": productToEdit, 
           displayName: req.user ? req.user.displayName : ''})
       }
   });


});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

   let id = req.params.id

   let updatedProduct = product({
       "_id": id,
       "Productid": req.body.Productid,
       "Productname": req.body.Productname,
       "Description": req.body.Description,
       "Price": req.body.price
   });

   product.updateOne({_id: id}, updatedProduct, (err) => {
       if(err)
       {
           console.log(err);
           res.end(err);
       }
       else
       {
           
           res.redirect('./');
       }
   });


});

// GET - process the delete
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

   let id = req.params.id;

    product.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
           
             res.redirect('../');
        }
    });


});

module.exports = router;
