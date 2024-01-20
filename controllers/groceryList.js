const GroceryList = require("../models/groceryList");
const GroceryItem = require("../models/groceryItems");
// const Performer = require('../models/performer');
module.exports = {
  index,
  show,
  new: newGroceryList,
  create,
  groceryList,
  addGrocery,
  createGrocery,
  grocery,
  delete: deleteGroceryItem,
  removegrocery,
  edit,
  update,
  editgrocerylist,
  updateGroceryList

};
function index(req, res) {
  GroceryList.find({}, function (err, groceryList) {
    res.render("grocery/index", { title: "All Grocery List", groceryList });
  });
}

function newGroceryList(req, res) {
  res.render('grocery/new', { title: "New Grocery List" });
};


function edit(req, res) {
  GroceryItem.findById(req.params.id, function(err, groceryItem) {
    console.log(groceryItem);
    res.render('grocery/edit', {title: "Edit",groceryItem});
  });
}

function editgrocerylist(req, res) {
  GroceryList.findById(req.params.id, function(err, groceryList) {
    console.log(groceryList);
    res.render('grocery/grocerylistedit', {title: "List Edit",groceryList});
  });
}


function updateGroceryList(req, res) {
  console.log(req.params.id)
  console.log(req.body)
  GroceryList.findByIdAndUpdate(req.params.id, req.body, function(err, grocery){
    res.redirect("/show");
});
}

function update(req, res) {
  GroceryItem.findByIdAndUpdate(req.params.id, req.body, function(err, grocery){
    res.redirect("/show");
});
}


function removegrocery(req, res) {
  GroceryList.findById(req.params.id, function(err, groceryList) { 
    
    var index = groceryList.items.indexOf(req.params.idx);
    if (index >= 0) {
      groceryList.items.splice( index, 1 );
    }
  
    groceryList.totalPrice= calcTotalPrice(groceryList.items)
    console.log('totalprice'+groceryList.totalPrice)
    groceryList.save(function(err) {
        res.redirect(`/${groceryList._id}`);
    });
  });
}


function deleteGroceryItem(req, res) {
  GroceryList.findByIdAndDelete(req.params.id).exec(function(err, grocery) {
    console.log(err, grocery)
    res.redirect('/show');
});
}

function create(req, res) {
  Grocery.create(req.body, function(err, grocery) {
        console.log(req.body); 
        res.redirect('/groceryList'); 
    })
}


function create(req, res) {
  // remove empty/blank inputs from req.body
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.done = !!req.body.done;
  GroceryList.create(req.body, function (err, groceryList) {
    // one way to handle errors
    if (err) {
      console.log(err)
    return res.redirect("/show");
    }
    // for now, redirect right back to the "new" view
    res.redirect(`/${groceryList._id}`);
  });
}


function show(req, res) {
  GroceryList.find({}, function (err, groceryList) {
    res.render("grocery/show", { title: "All Grocery List", groceryList });
  });
  }

  function groceryList(req, res) {
    console.log(req.params.id)
    GroceryList.findById(req.params.id, function (err, groceryList) {
      GroceryItem.find({}, function(err, groceries) {
        GroceryItem.find().where('_id').in(groceryList.items).exec((err, records) => {
          console.log(groceryList)
          res.render("grocery/list", {groceryList, groceries, records, title: 'list'});
        });
    
      
      });
    });
      
    }

    function createGrocery(req, res) {
      GroceryItem.find({}, function(err, groceries) {
        res.render('grocery/addgrocery', {
            title: 'Add Grocery',
            groceries
          });
    });
      }

      function addGrocery(req, res) {
        GroceryItem.create(req.body, function(err) {
          res.redirect('/creategrocery');
      });
        
      }

      function grocery(req, res) {
        GroceryList.findById(req.params.id, function(err, groceryList) {
          
          groceryList.items.push(req.body.groceryId);
          
          groceryList.save(function(err) {
              
            
              res.redirect(`/${groceryList._id}`);
          });
      });
              
      }

      function calcTotalPrice(items) {
        price= 0.0;
        for (item in items) {
          console.log(items[item])
          GroceryItem.findById(items[item], function(err, groceryItem) {
            console.log(groceryItem.price)
          price= price+Number(groceryItem.price);
            
        });
        }
        console.log(price)
       return price;       
      }





      