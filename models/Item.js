const mangoose = require('mongoose');

const ItemSchema = mangoose.Schema({
    name: String,
    price: Number
});

module.exports = mangoose.model('Items', ItemSchema);