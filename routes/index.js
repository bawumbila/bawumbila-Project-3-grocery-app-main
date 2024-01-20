// const express = require('express');
// const router = express.Router();


// router.get('/', function(req, res, next) {
//     res.render("index");
//   });
  
//   module.exports = router;



  const express = require('express');
  const router = express.Router();
  const groceryListCtrl = require('../controllers/groceryList');

  router.get('/:id/edit', groceryListCtrl.edit);
  router.get('/:id/grocerylistedit', groceryListCtrl.editgrocerylist);
  
  router.get('/', groceryListCtrl.index);
  router.get('/new', groceryListCtrl.new);
  router.post('/', groceryListCtrl.create);
  router.get('/show', groceryListCtrl.show);
  router.put('/:id', groceryListCtrl.update)
  router.put('/:id/grocerylistedit', groceryListCtrl.updateGroceryList)



  router.delete('/removegrocery/:id/:idx', groceryListCtrl.removegrocery);
  
  router.delete('/groceries/:id', groceryListCtrl.delete);
  
  router.post('/addgrocery', groceryListCtrl.addGrocery);
  
  router.get('/creategrocery', groceryListCtrl.createGrocery);

  

  router.post('/:id/grocery', groceryListCtrl.grocery);
  router.get('/lists/:id', groceryListCtrl.groceryList);
  
  
  module.exports = router;