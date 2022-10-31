const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path');

const Product = require('./models/product');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> {
    console.log("MONGO CONNECTION OPEN")
})
.catch(err =>{
    console.log("OH NO MONGO ERROR CONNECTION FAILED")
    console.log(err)
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    //console.log(products)
    res.render('products/index', {products})
   //res.send(products) displays all product data as json
})

app.get('/products/:id', async (req,res) =>{
    const {id} = req.params;
    const product = await Product.findById(id);
    //console.log(product)
    res.render('products/show',{product})
})
   



