var Author = require('../models/author');
var models = require('../models');

// Display author create form on GET.
exports.author_create_get = function(req, res, next) {
        // create author GET controller logic here 
        res.render('forms/author_form', { title: 'Create Author',  layout: 'layouts/detail'});
};

// Handle author create on POST.
exports.author_create_post = function(req, res, next) {
     // create author POST controller logic here
     // If an author gets created successfully, we just redirect to authors list
     // no need to render a page
     models.Author.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }).then(author => {
        res.json({
            success: 'Author Created Successfully',
            author: author
        });
    }).catch(error => {
        console.log("There was an error: " + error);
        res.status(404).send(error);
    });
};


// Display author delete form on GET.
exports.author_delete_get = function(req, res, next) {
        // GET logic to delete an author here
        
        // renders author delete page
        res.render('pages/author_delete', { title: 'Delete Author',  layout: 'layouts/detail'} );
};

// Handle author delete on POST.
exports.author_delete_post = function(req, res, next) {
        // POST logic to delete an user here
        // If an user gets deleted successfully, we just redirect to users list
        // no need to render a page
        console.log(req.params.author_id)
        models.Author.destroy({
            // find the user_id to delete from database
            where: {
              id: req.params.author_id  //.split(":")[1]
            }
        }).then(author => {
        res.json({
            success: 'Author Deleted Successfully',
            author: author
        });
    }).catch(error => {
        console.log("There was an error: " + error);
        res.status(404).send(error);
    });
};

// Display author update form on GET.
exports.author_update_get = function(req, res, next) {
        // GET logic to update an author here
        
        // renders author form
        res.render('forms/author_form', { title: 'Update Author',  layout: 'layouts/detail'});
};

// Handle post update on POST.
exports.author_update_post = function(req, res, next) {
        console.log("ID is " + req.params.author_id);
        models.Author.update(
        // Values to update
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                role: req.body.role
            },
          { // Clause
                where: 
                {
                    id: req.params.author_id
                }
            }
        //   returning: true, where: {id: req.params.post_id} 
        ).then(author => {
                res.json({
                    success: 'Author Updated Successfully',
                    author: author
                });
            }).catch(error => {
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });
};

// Display list of all authors.
exports.author_list = function(req, res, next) {
        // controller logic to display all users
        models.Author.findAll(
        ).then(author => {
                res.json({
                    success: 'List of All Authors',
                    author: author
                });
            }).catch(error => {
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });
};

// Display detail page for a specific author.
exports.author_detail = function(req, res, next) {
         // find a user by the primary key Pk
        models.Author.findById(
                req.params.author_id
        ).then(author => {
                res.json({
                    success: 'Detail of Author',
                    author: author
                });
            }).catch(error => {
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });
};

 