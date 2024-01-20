const mongoose = require("mongoose");



const groceryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  done: Boolean
});



const GrocreryItem = mongoose.model("GroceryItem", groceryItemSchema);

module.exports = GrocreryItem;