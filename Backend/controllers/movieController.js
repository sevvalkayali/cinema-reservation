const mssql = require('mssql');

exports.getMovies = async (req, res) => {
  try {
    const result = await mssql.query`SELECT * FROM Movies`;
    res.json(result.recordset); // Film listesini frontend'e gönder
  } catch (err) {
    res.status(500).json({ error: 'Error fetching movies: ' + err.message });
  }
};

exports.addMovie = async (req, res) => {
  const { title, description, screeningTime, seats } = req.body;

  try {
    await mssql.query`
      INSERT INTO Movies (title, description, screeningTime, seats)
      VALUES (${title}, ${description}, ${screeningTime}, ${seats})
    `;
    res.status(201).json({ message: 'Movie added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error adding movie: ' + err.message });
  }
};

exports.updateMovie = async (req, res) => {
  const { title, description, screeningTime, seats } = req.body;
  const movieId = req.params.id;

  try {
    await mssql.query`
      UPDATE Movies
      SET title = ${title}, description = ${description}, screeningTime = ${screeningTime}, seats = ${seats}
      WHERE id = ${movieId}
    `;
    res.json({ message: 'Movie updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating movie: ' + err.message });
  }
};

exports.deleteMovie = async (req, res) => {
  const movieId = req.params.id;

  try {
    await mssql.query`DELETE FROM Movies WHERE id = ${movieId}`;
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting movie: ' + err.message });
  }
};
