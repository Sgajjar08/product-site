const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
let Product = require('./product-model');
const productRoutes = express.Router();

const PORT = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/products', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

app.use('/', productRoutes);

productRoutes.route('/products').get(function(req, res) {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

productRoutes.route('/products/:id').get(function(req, res) {
    let id = req.params.id;
    Product.findById(id, function(err, product) {
        res.json(product);
    });
});

productRoutes.route('/products/add').post(function(req, res) {
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json('product added successfully');
        })
        .catch(err => {
            console.log(err);
        });
});

productRoutes.route('/products/update/:id').post(function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (!product)
            res.status(404).send('Product not found');
        else {
            product.product_name = req.body.product_name;
            product.date = req.body.date;
            product.inventory_level = req.body.inventory_level;
            product.save()
                .then(product => {
                    res.json('Product updated successfully');
                })
                .catch(err => {
                    res.status(400).send('Product updation failed.');
                });
        }
    });
});

app.listen(PORT, function() {
    console.log("Server is runing on PORT: " + PORT);
});