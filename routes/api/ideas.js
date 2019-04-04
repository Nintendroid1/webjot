const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');

// Load Validation
// const validateIdeaInput = require('../../validation/ideas');

// Load Idea Model
const Idea = require('../../models/Idea');

// @route   GET api/idea/test
// @desc    Tests idea route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Idea Works' }));

// @route   GET api/ideas
// @desc    Get all ideas
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Idea.find({user: req.user.id})
    .sort({date: 'desc'})
    .then(ideas => {
      if(!ideas) {
        error.noideas = 'no ideas for this user';
        return res.status(404).json(errors);
      }
      res.json(ideas);
    }).catch(err => res.status(404).json(err))
});

// @route   GET api/ideas/edit/:id
// @desc    Edit Idea Form
// @access  Private
router.get('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      if (idea.user !== req.user.id) {
        errors.notYourIdea = 'This is not your idea post';
        return res.status(404).json(errors);
      }
      res.json(idea);

    });
});

// @route   POST api/ideas
// @desc    Add Idea
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  let errors = {};

  if (!req.body.title) {
    errors.notitle = 'Please add a title';
  }
  if (!req.body.content) {
    errors.nocontent = 'Please add some details';
  }

  if (!req.body.technologies) {
    errors.notech = 'Please add some technologies that you will use';
  }

  if (errors.notitle || errors.nocontent || errors.notech) {
    return res.status(404).json({
      errors: errors,
      title: req.body.title,
      content: req.body.content
    });
  } else {
    const newIdea = {
      title: req.body.title,
      content: req.body.content,
      user: req.user.id,
      features: req.body.features,
      technologies: req.body.technologies
    };
    new Idea(newIdea)
      .save()
      .then(idea => {
        // req.flash('success_msg', 'Video idea added');
        res.status(200).json(idea);
      }).catch(err => res.json(err))
  }
});

// @route   PUT api/ideas/:id
// @desc    Edit Form process
// @access  Private
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
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
           res.status(200).json(idea);
        })
    });
});

// Delete Idea
// @route   DELETE api/ideas/:id
// @desc    Delete Idea
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Idea.remove({_id: req.params.id})
    .then(() => {
      res.json({message: 'idea removed'})
    });
});

module.exports = router;