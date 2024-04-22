const express=require('express');
const {Pool}=require('pg');
const cors = require('cors')



const app = express();
// const corsOptions = {
//   origin: 'http://localhost:3000', // Allow requests from this origin
// };
app.use(cors());
const PORT=5000;

// PostgreSQL configuration
const pool = new Pool({
    user: 'dp',
    host: 'localhost',
    database: 'dpdatabase',
    password: 'dp143sss',
    port: 5432,
  });
  

  console.log("iam here 1");

  // Example API endpoint
app.get('/api/data', async (req, res) => {
    try {
        console.log("iam here");
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM random_table');
      console.log(result.rows); 
      client.release();
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
      console.log("in error");
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });