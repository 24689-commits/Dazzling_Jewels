const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const {verifyAToken} = require('../middleware/errorHandling')
const routes = express.Router()

const {users, products}=require('../model')

routes.post('/login',
bodyParser.json(), (req, res)=>{
    users.login(req, res)
})

// =====user router==========
routes.get('/users',(req,res)=>{
    users.fetchUsers(req,res)
})
routes.get('/user/:id',(req,res)=>{
    users.fetchUser(req,res)
})
routes.post('/register', bodyParser.json(),
(req,res)=>{
    users.register(req,res)
})
routes.put('/user/:id',bodyParser.json(),
(req,res)=>{
    users.updateUser(req,res)
})
routes.patch('/user/:id',bodyParser.json(),
(req,res)=>{
    users.updateUser(req,res)
})
routes.delete('/user/:id',(req,res)=>{
    users.deleteUser(req,res)
})
// ===products==
routes.get('/products',(req,res)=>{
  products.fetchProducts(req,res)
})
routes.get('/product/:id',(req,res)=>{
    products.fetchProduct(req,res)
})
routes.get('/products/:category',(req,res)=>{
    products.fetchProductsByCategory(req,res)
})
routes.get('/products/:gender',(req,res)=>{
    products.fetchProductsByGender(req,res)
})
routes.post('/addproduct', bodyParser.json(),
(req,res)=>{
    products.addProduct(req,res)
})
routes.put('/product/:id',bodyParser.json(),
(req,res)=>{
    products.updateProduct(req,res)
})
routes.patch('/product/:id',bodyParser.json(),
(req,res)=>{
    products.updateProduct(req,res)
})
routes.delete('/product/:id',(req,res)=>{
    products.deleteProduct(req,res)
})
module.exports ={
    express,
    routes
}

