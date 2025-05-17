const express=require('express');
// const session=require('express-session');
const mysql=require('mysql');
const bcrypt=require('bcrypt');
const cors=require('cors');
const app=express();

const PORT=3001;

app.use(cors());
app.use(express.json());


const Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nolan',
});

Connection.connect((err) =>{
    if(err){
        console.log('database not connected');
}
else{

    console.log('database is connected')
}
});
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users(username, password) VALUES (?, ?)';

    Connection.query(sql, [username, hashed], (err, result) => {
        if (err) {
            return res.status(500).send('Error in Registering!');
        }

        res.status(200).send('User registered successfully!');
    });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';

    Connection.query(sql, [username], async (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Error in Login');
        }

        if (result.length === 0) {
            return res.status(401).send('Invalid username or password');
        }

        const user = result[0];

        if (!user.password || typeof user.password !== 'string') {
            return res.status(500).send('Invalid password format in database');
        }

        try {
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                res.send('Logged in successfully');
            } else {
                res.status(401).send('Invalid username or password');
            }
        } catch (error) {
            console.error('Bcrypt compare error:', error);
            res.status(500).send('Internal server error during password comparison');
        }
    });
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});