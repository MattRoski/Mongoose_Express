const Product = require('./models/product');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> {
    console.log("MONGO CONNECTION OPEN")
})
.catch(err =>{
    console.log("OH NO MONGO ERROR CONNECTION FAILED")
    console.log(err)
})

// const p = new Product({
//     name: 'Apple',
//     price: 1.99,
//     category: 'fruit'
// })

// p.save()
// .then( p => {
//     console.log(p)
// })
// .catch(e =>{
//     console.log(e)
// })

const seedProducts = [
    {
        name: 'Grapes',
        price: 2.99,
        category: 'fruit'
    },
    {
        name: 'Milk',
        price: 3.99,
        category: 'dairy'
    },
    {
        name: 'Pineapple',
        price: 1.99,
        category: 'fruit'
    },
    {
        name: 'Brussel Sprouts',
        price: 2.50,
        category: 'vegetable'
    },
    {
        name: 'Onion',
        price: 0.99,
        category: 'vegetable'
    }
]

Product.insertMany(seedProducts)
.then(res =>{
    console.log(res)
})
.catch(err =>{
    console.log(err)
})