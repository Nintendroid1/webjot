const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

// Load Idea Model
require('../models/Idea');
const Idea = mongoose.model('ideas');

// Idea Index Page
router.get('/', ensureAuthenticated, (req, res) => {
  Idea.find({user: req.user.id})
    .sort({date: 'desc'})
    .then(ideas => {
      res.json(ideas);
    });
});

// Edit Idea Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      if (idea.user !== req.user.id) {
        //req.flash('error_msg', 'Not Authorized');
        res.redirect('/ideas');
      } else {
        res.json(idea);
      }

    });
});

// Process Form
router.post('/',ensureAuthenticated, (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({text: 'Please add a title'});
  }
  if (!req.body.content) {
    errors.push({text: 'Please add some details'});
  }

  if (!req.body.technologies) {
    errors.push({text: 'Please add some technologies that you will use'});
  }

  if (errors.length > 0) {
    res.json({
      errors: errors,
      title: req.body.title,
      content: req.body.content
    });
  } else {
    const newIdea = {
      title: req.body.title,
      content: req.body.content,
      user: req.user.id,
      features: [...req.body.features],
      technologies: req.body.technologies
    };
    new Idea(newIdea)
      .save()
      .then(idea => {
        // req.flash('success_msg', 'Video idea added');
        // res.redirect('/ideas');
        res.json(idea);
      }).catch(err => res.json(err))
  }
});

// Edit Form process
router.put('/:id', ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      // new values
      idea.title = req.body.title;
      idea.content = req.body.content;
      idea.technologies = req.body.technologies;
      idea.features = [...req.body.features];

      idea.save()
        .then(idea => {
          // req.flash('success_msg', 'Video idea updated');
          // res.redirect('/ideas');
        })
    });
});

// Delete Idea
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Idea.remove({_id: req.params.id})
    .then(() => {
      // req.flash('success_msg', 'Video idea removed');
      // res.redirect('/ideas');
    });
});

module.exports = router;