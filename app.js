const express = require('express');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const Item = require('./models/Item');
require("dotenv/config")



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('hello welcome to our shop');

});

app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items)
    } catch (err) {
        res.json({ message: err });
    }
});

app.get('/items/:name', async (req, res) => {
    try {
        //console.log(req.params.name);
        const item = await Item.find({ "name": req.params.name });
        res.send(item);
    } catch (err) {
        res.json({ message: err });
    }
});

app.post('/', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        price: req.body.price
    });
    try {
        const savedItem = await item.save();
        res.json(savedItem);
    } catch (err) {
        res.json({ message: err });
    }

});


app.get('/about', (req, res) => {
    res.json('1. For getting list of all items type url http://localhost:3000/items 2. For getting the price of specific item type its name in url link  http://localhost:3000/items/name 3. For posting a new item type url http://localhost:3000 and select post option then in body of post query create new object {"name":your item name,"price": item price}')
});


//connect to database
mongoose.connect(process.env.DB_CONNECTION,
    { useUnifiedTopology: true },
    { useNewUrlParser: true },
    () => { console.log('connected to database') });

http.createServer(app).listen(process.env.PORT || 5000, function () {

    console.log('Example app listening on port', process.env.PORT || 5000)

})