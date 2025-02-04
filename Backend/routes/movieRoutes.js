const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Get all movies
router.get('/', movieController.getMovies);

// Add a movie
router.post('/', movieController.addMovie);

// Update a movie
router.put('/:id', movieController.updateMovie);

// Delete a movie
router.delete('/:id', movieController.deleteMovie);

module.exports = router;
