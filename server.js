import express from 'express';
import mysql from 'mysql2';

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: '212.192.29.71',
  user: 'flamingh_calender',
  password: 'Loveboat1973!',
  database: 'flamingh_calender'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.post('/api/tasks', (req, res) => {
  const { date, task, taskClass, level } = req.body;
  const query = 'INSERT INTO tasks (date, task, class, level) VALUES (?, ?, ?, ?)';
  db.query(query, [date, task, taskClass, level], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send(results);
  });
});

app.get('/api/tasks', (req, res) => {
  const query = 'SELECT * FROM tasks';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
