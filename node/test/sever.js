const express=require('express');
// const session=require('express-session');
const mysql=require('mysql');
const bcrypt=require('bcrypt');
const cors=require('cors');


const app = express();
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
app.post('/product', (req, res) => {
  const { pcode, productname, product_quantity, unit_price, total_price } = req.body;

  const sql = 'INSERT INTO products (pcode, productname, product_quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?)';
  Connection.query(sql, [pcode, productname, product_quantity, unit_price, total_price], (err, result) => {
    if (err) {
      console.error("Insert Error:", err);
      res.status(500).send("Data not inserted");
      return;
    }
    res.status(200).send("Product inserted successfully");
  });
});
// Get products
app.get('/products', (req, res) => {
  Connection.query('SELECT pcode, productname, product_quantity, unit_price, total_price FROM products', (err, results) => {
    if (err) return res.status(500).send("Error fetching products");
    res.json(results);
  });
});
app.post('/customer', (req, res) => {
  const { cust_fname, cust_lname, location, telephone } = req.body;

  const sql = 'INSERT INTO customers (cust_fname, cust_lname, location, telephone) VALUES (?, ?, ?, ?)';
  Connection.query(sql, [cust_fname, cust_lname, location, telephone], (err, result) => {
    if (err) {
      console.error("Insert Customer Error:", err);
      res.status(500).send("Failed to add customer");
    } else {
      res.status(200).send("Customer added successfully");
    }
  });
});
// DELETE /product/:pcode
app.delete("/product/:pcode", (req, res) => {
  const { pcode } = req.params;
  Connection.query("DELETE FROM products WHERE pcode = ?", [pcode], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Product deleted" });
  });
});

// PUT /product/:pcode
app.put("/product/:pcode", (req, res) => {
  const { pcode } = req.params;
  const { productname, product_quantity, unit_price } = req.body;
  const total_price = parseFloat(product_quantity * unit_price).toFixed(2);
  Connection.query(
    "UPDATE products SET productname = ?, product_quantity = ?, unit_price = ?, total_price = ? WHERE pcode = ?",
    [productname, product_quantity, unit_price, total_price, pcode],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Product updated" });
    }
  );
});

// Get customers
app.get('/customers', (req, res) => {
  Connection.query('SELECT cust_id, cust_fname, cust_lname, location, telephone FROM customers', (err, results) => {
    if (err) return res.status(500).send("Error fetching customers");
    res.json(results);
  });
});
// DELETE customer
app.delete("/customer/:id", (req, res) => {
  const { id } = req.params;
  Connection.query("DELETE FROM customers WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Customer deleted" });
  });
});

// UPDATE customer
app.put("/customer/:id", (req, res) => {
  const { id } = req.params;
  const { cust_fname, cust_lname, location, telephone } = req.body;
  Connection.query(
    "UPDATE customers SET cust_fname = ?, cust_lname = ?, location = ?, telephone = ? WHERE id = ?",
    [cust_fname, cust_lname, location, telephone, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Customer updated" });
    }
  );
});
app.post('/order', (req, res) => {
  const { pcode, cust_id, order_date } = req.body;

  const sql = 'INSERT INTO orderr (pcode, cust_id, order_date) VALUES (?, ?, ?)';
  Connection.query(sql, [pcode, cust_id, order_date], (err, result) => {
    if (err) {
      console.error("Insert Order Error:", err);
      res.status(500).send("Failed to place order");
    } else {
      res.status(200).send("Order placed successfully");
    }
  });
});



app.get('/report', (req, res) => {
  const sql = 'SELECT order_nb, order_date, pcode, cust_id FROM orderr';
  Connection.query(sql,(err, results) => {
    if (err){ res.status(500).send(err);}
    res.json(results);
  });
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
app.delete('/order/:order_nb', (req, res) => {
  const { order_nb } = req.params;

  const q = 'DELETE FROM orderr WHERE order_nb = ?';

  Connection.query(q, [order_nb], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed', details: err });

    return res.status(200).json({ message: 'Order deleted successfully' });
  });
});
app.get('/general-report', (req, res) => {
  const sql = `
    SELECT 
      o.order_date,
      c.cust_fname,
      c.telephone,
      p.productname
    FROM orderr o
    JOIN customers c ON o.cust_id = c.cust_id
    JOIN products p ON o.pcode = p.pcode
  `;

  Connection.query(sql, (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ error: "Database error", details: err.message });
    }
    res.json(result);
  });
});





// Start Server
app.listen(8800, () => {
  console.log('Server running on http://localhost:8800');
});