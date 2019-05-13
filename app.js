const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();
 
const customerScheme = new Schema({name: String, surname: String, fathername: String, card: Number}, {versionKey: false});
const Customer = mongoose.model("Customer", customerScheme);
const productScheme = new Schema({itemmumber: Number, nameitem: String, unit: String, price: Number, country: String}, {versionKey: false});
const Product = mongoose.model("Product", productScheme);
const bookScheme = new Schema({datanumber: String, datafinish: Number, amount: Number, cost: Number, costend: Number}, {versionKey: false});
const Book = mongoose.model("Book", bookScheme);
 
mongoose.connect("mongodb://localhost:27017/customersdb", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});
app.use(express.static(__dirname + '/public'));
app.set("view engine", "hbs");
app.use("/main", function(request, response){
     
    response.render("index.hbs");
});
app.use("/customers", function(request, response){
     
    response.render("customers.hbs");
});
app.use("/products", function(request, response){
     
    response.render("products.hbs");
});
app.use("/book", function(request, response){
     
    response.render("book.hbs");
});
app.get("/api/customers", function(req, res){
        
    Customer.find({}, function(err, customers){
 
        if(err) return console.log(err);
        res.send(customers);
    });
});
 
app.get("/api/customers/:id", function(req, res){
         
    const id = req.params.id;
   Customer.findOne({_id: id}, function(err, customers){
          
        if(err) return console.log(err);
        res.send(customers);
    });
});
    
app.post("/api/customers", jsonParser, function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
        
    const customerName = req.body.name;
    const customerSurname = req.body.surname;
	const customerFathername = req.body.fathername;
	const customerCard = req.body.card;
    const customer = new Customer({name: customerName, surname: customerSurname, fathername: customerFathername, card: customerCard});
        
   customer.save(function(err){
        if(err) return console.log(err);
        res.send(customer);
    });
});
 
app.delete("/api/customers/:id", function(req, res){
         
    const id = req.params.id;
    Customer.findByIdAndDelete(id, function(err, customer){
                
        if(err) return console.log(err);
        res.send(customer);
    });
});
 
app.put("/api/customers", jsonParser, function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const customerName = req.body.name;
    const customerSurname = req.body.surname;
	const customerFathername = req.body.fathername;
	const customerCard = req.body.card;
    const newCustomer = {name: customerName, surname: customerSurname, fathername: customerFathername, card: customerCard};
     
    Customer.findOneAndUpdate({_id: id}, newCustomer, {new: true}, function(err, customer){
        if(err) return console.log(err); 
        res.send(customer);
    });
});
//// End first shema
app.get("/api/products", function(req, res){
        
    Product.find({}, function(err, products){
 
        if(err) return console.log(err);
        res.send(products);
    });
});
 
app.get("/api/products/:id", function(req, res){
         
    const id = req.params.id;
   Product.findOne({_id: id}, function(err, products){
          
        if(err) return console.log(err);
        res.send(products);
    });
});
    
app.post("/api/products", jsonParser, function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
        
    const productItemmumber = req.body.itemmumber;
    const productNameitem = req.body.nameitem;
	const productUnit = req.body.unit;
	const productPrice = req.body.price;
	const productCountry = req.body.country;
    const product = new Product({itemmumber: productItemmumber, nameitem: productNameitem, unit: productUnit, price: productPrice,country: productCountry});
        
   product.save(function(err){
        if(err) return console.log(err);
        res.send(product);
    });
});
  
app.delete("/api/products/:id", function(req, res){
         
    const id = req.params.id;
   Product.findByIdAndDelete(id, function(err, product){
                
        if(err) return console.log(err);
        res.send(product);
    });
});
 
app.put("/api/products", jsonParser, function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
  const productItemmumber = req.body.itemmumber;
    const productNameitem = req.body.nameitem;
	const productUnit = req.body.unit;
	const productPrice = req.body.price;
	const productCountry = req.body.country;
    const newProduct = {itemmumber: productItemmumber, nameitem: productNameitem, unit: productUnit, price: productPrice,country: productCountry};
     
    Product.findOneAndUpdate({_id: id}, newProduct, {new: true}, function(err, product){
        if(err) return console.log(err); 
        res.send(product);
    });
});
//// End second shema
app.get("/api/books", function(req, res){
        
    Book.find({}, function(err, books){
 
        if(err) return console.log(err);
        res.send(books);
    });
});
 
app.get("/api/books/:id", function(req, res){
         
    const id = req.params.id;
   Book.findOne({_id: id}, function(err, books){
          
        if(err) return console.log(err);
        res.send(books);
    });
});
    
app.post("/api/books", jsonParser, function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
        
    const bookDatanumber = req.body.datanumber;
    const bookDatafinish = req.body.datafinish;
	const bookAmount = req.body.amount;
	const bookCost = req.body.cost;
	const bookCostend = req.body.costend;
    const book = new Book({datanumber: bookDatanumber, datafinish: bookDatafinish, amount: bookAmount, cost: bookCost, costend: bookCostend});
        
    book.save(function(err){
        if(err) return console.log(err);
        res.send(book);
    });
});
  
app.delete("/api/books/:id", function(req, res){
         
    const id = req.params.id;
   Book.findByIdAndDelete(id, function(err, book){
                
        if(err) return console.log(err);
        res.send(book);
    });
});
 
app.put("/api/books", jsonParser, function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const bookDatanumber = req.body.datanumber;
    const bookDatafinish = req.body.datafinish;
	const bookAmount = req.body.amount;
	const bookCost = req.body.cost;
	const bookCostend = req.body.costend;
    const newBook = {datanumber: bookDatanumber, datafinish: bookDatafinish, amount: bookAmount, cost: bookCost, costend: bookCostend};
     
    Book.findOneAndUpdate({_id: id}, newBook, {new: true}, function(err, book){
        if(err) return console.log(err); 
        res.send(book);
    });
});