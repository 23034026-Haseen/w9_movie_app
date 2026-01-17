// server.js
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your Aiven MySQL credentials
const dbConfig = {
  host: 'mysql-dabd117-myrp-96ed.l.aivencloud.com',
  user: 'YOUR_DB_USER',
  password: 'YOUR_DB_PASSWORD',
  database: 'YOUR_DB_NAME',
  port: 12345 // replace with your Aiven MySQL port
};

// API endpoint to fetch all movies
app.get('/movies', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    // Fetch movies from database
    const [rows] = await connection.execute(
      'SELECT id, title, genre, year, image_url FROM movies'
    );

    // Return array
    res.json(rows);

    await connection.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
