const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const groceryListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: "GrocreryItem"}],
  totalPrice: { type: Number, required: false },
  done: Boolean

});

const GrocreryList = mongoose.model("GroceryList", groceryListSchema);

module.exports = GrocreryList;
