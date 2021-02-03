var Category = require('../models/category');
var models = require('../models');

// Display category create form on GET.
exports.category_create_get = function(req, res, next) {
        // create category GET controller logic here 
        res.render('forms/category_form', { title: 'Create Category',  layout: 'layouts/detail'});
        console.log("Category form renders successfully");
};

// Handle category create on POST.
exports.category_create_post = function(req, res, next) {
     models.Category.create({
            name: req.body.name,
     }).then(category => {
        res.json({
            success: 'Category Created Successfully',
            category: category
        });
    }).catch(error => {
        console.log("There was an error: " + error);
        res.status(404).send(error);
    });
};

// Display category delete form on GET.
exports.category_delete_get = function(req, res, next) {
        // GET logic to delete a category here
        models.Category.destroy({
            // find the category_id to delete from database
            where: {
              id: req.params.category_id
            }
          }).then(function() {
           // If a category gets deleted successfully, we just redirect to categories list
           // no need to render a page
            res.redirect('/blog/categories');
            console.log("Category deleted successfully");
          });
        // renders category delete page
        // res.render('pages/category_delete', { title: 'Category Category',  layout: 'layouts/detail'} );
};

// Handle category delete on POST.
exports.category_delete_post = function(req, res, next) {
        // POST logic to delete a category here
        // If a category gets deleted successfully, we just redirect to category list
        // no need to render a page
        console.log(req.params.category_id);
        models.Category.destroy({
            // find the category_id to delete from database
            where: {
              id: req.params.category_id  //.split(":")[1]
            }
        }).then(category => {
        res.json({
            success: 'Category Deleted Successfully',
            category: category
        });
    }).catch(error => {
        console.log("There was an error: " + error);
        res.status(404).send(error);
    });
};


// Display category update form on GET.
exports.category_update_get = function(req, res, next) {
        // Find the category you want to update
        console.log("ID is " + req.params.category_id);
        models.Category.findById(
                req.params.category_id
        ).then(function(category) {
               // renders a category form
               res.render('forms/category_form', { title: 'Update Category', category: category, layout: 'layouts/detail'});
               console.log("Category update get successful");
          });
        
};

// Handle category update on POST.
exports.category_update_post = function(req, res, next) {
        console.log("ID is " + req.params.category_id);
        models.Category.update(
        // Values to update
            {
                name: req.body.name,
            },
          { // Clause
                where: 
                {
                    id: req.params.category_id
                }
            }
        //   returning: true, where: {id: req.params.} 
         ).then(category => {
                res.json({
                    success: 'Category Updated Successfully',
                    category: category
                });
            }).catch(error => {
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });
};

// Display detail page for a specific category.
exports.category_detail = function(req, res, next) {
        // find a category by the primary key Pk
        models.Category.findById(
                req.params.category_id
        ).then(category => {
                res.json({
                    success: 'Detail of Category',
                    category: category
                });
            }).catch(error => {
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });
};

// Display list of all category.
exports.category_list = function(req, res, next) {
        // controller logic to display all category
        models.Category.findAll(
        ).then(category => {
                res.json({
                    success: 'List of All Authors',
                    author: category
                });
            }).catch(error => {
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });
};


 