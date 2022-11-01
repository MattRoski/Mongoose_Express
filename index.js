const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const Product = require('./models/product');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))
//Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> {
    console.log("MONGO CONNECTION OPEN")
})
.catch(err =>{
    console.log("OH NO MONGO ERROR CONNECTION FAILED")
    console.log(err)
})


app.get('/products', async (req, res) => {
    const products = await Product.find({})
    //console.log(products)
    res.render('products/index', {products})
   //res.send(products) displays all product data as json
})

app.get('/products/new', (req,res) =>{
    res.render('products/new');
})

app.post('/products', async (req,res) =>{
console.log(req.body);  //req.body will ne undefined w/o app.use(express.urlencoded({extended:true}))
const newProduct = new Product(req.body); //not the right way to save data but quick for demo purpose  
await newProduct.save();
console.log(newProduct);
//always redirect after a post request
res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req,res) =>{
    const {id} = req.params;
    const product = await Product.findById(id);
    //console.log(product)
    res.render('products/show',{product});
})

app.get('/products/:id/edit', async (req,res) =>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product})

})


app.put('/products/:id', async (req,res) =>{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true, new:true}); //need await here or will break everything. page will load faster than the id can be accessed
    res.redirect(`/products/${product._id}`)
    //always redirect after update
})

app.delete('/products/:id', async (req,res) =>{
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})


app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})

   



