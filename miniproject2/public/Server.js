
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the current directory
app.use(express.static(__dirname));
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Calamity@0',
  database: 'React',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());
app.post('/', (req, res) => {
    console.log("sign in recieved");
    const { email, password } = req.body;
  
    // Query the database to find the user with the given email
    db.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      // Check if a user with the given email exists
      if (results.length === 0) {
        res.status(401).json({ error: 'User not found' });
        return;
      }
  
      const user = results[0];
  
      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
        if (bcryptErr) {
          console.error('Error comparing passwords:', bcryptErr);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
  
        if (bcryptResult) {
          // Passwords match, user is authenticated
          res.cookie('user_id', user.user_id, { maxAge: 3600000, httpOnly: true });
          return res.redirect("/Category")
        } else {
          // Passwords do not match
          res.status(401).json({ error: 'Authentication failed' });
        }
      });
    });
  });
  
  // Endpoint for user sign-up
  app.post('/register', (req, res) => {
    console.log("sign up recieved");
    const { username, email, password, c, u , m } = req.body;
  
    // Hash the password before storing it in the database
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      // Insert the new user into the database
      db.query(
        'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hash],
        (insertErr) => {
          if (insertErr) {
            console.error('Error inserting user into database:', insertErr);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
  
          res.redirect('/createitem')
        }
      );
    });
  });

  app.post('/adminlogin', (req, res) => {
    const {username, password } = req.body;
    console.log(username);
    console.log(req.body);
    // Query the Sellers table to find the seller by name
    const findSellerQuery = 'SELECT seller_id, user_id, contact_email, contact_phone FROM Sellers WHERE seller_name = ?';
  
    db.query(findSellerQuery, [username], (err, results) => {
      console.log(results);
      
      if (err) {
        console.error('Database query error: ' + err.message);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ error: 'Seller login failed' });
      }
      console.log('recieved 1');
      // If the seller exists, retrieve their user_id and validate the password
      const seller = results[0];
      const user_id = seller.user_id;
  
      // Query the Users table to get the hashed password
      const findPasswordQuery = 'SELECT password FROM Users WHERE user_id = ?';
  
      db.query(findPasswordQuery, [user_id], (err, results) => {
        console.log(results);
        if (err) {
          console.error('Database query error: ' + err.message);
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        if (results.length === 0) {
          return res.status(401).json({ error: 'Seller login failed' });
        }
  
        // Compare the provided password with the hashed password
        const hashedPassword = results[0].password;
        
  
        bcrypt.compare(password, hashedPassword, (err, passwordMatch) => {
          console.log(password,hashedPassword)
          if (err) {
            console.error('Password comparison error: ' + err.message);
            return res.status(500).json({ error: 'Internal server error' });
          }
  
          if (passwordMatch) {
            // Authentication successful
            console.log("seller authed");
            res.cookie('seller_id', seller.seller_id, { maxAge: 3600000, httpOnly: true });
            return res.status(200).json({ msg:"sucess" });
          } else {
            // Authentication failed
            console.log("seller failed");
            res.status(401).json({ error: 'Seller login failed' });
          }
        });
      });
    });
  });

  app.post('/CreateItem', (req, res) => {
    const newItem = req.body;
    console.log(newItem);
    // Insert the new item into the "Items" table (use your database connection)
    // For simplicity, we're assuming you have a `db` object for the database connection
    db.query(
      'INSERT INTO Items (seller_id, item_name, description, image, category_id, starting_price) VALUES (?, ?, ?, ?, ?, ?)',
      [newItem.seller_id, newItem.item_name, newItem.description, newItem.image, newItem.category_id, newItem.starting_price],
      (insertErr, results) => {
        if (insertErr) {
          console.error('Error adding item to the database:', insertErr);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        console.log(results);
        res.status(200).json({ message: 'Item added successfully' });
      }
    );
  });
 
  app.get('/items', (req, res) => {
    // Query the database to retrieve items and their current bids
    const query = `
      SELECT * FROM Items 
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database query error: ' + err.message);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      // Send the retrieved items with their current bids as a JSON response
      res.json(results);
    });
  });

  app.get('/categories', (req, res) => {
    const query = 'SELECT * FROM categories';
  
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(result);
      }
    });
  });
  
  app.post('/addtowatchlist', (req, res) => {
    const { item_id } = req.body;
    const user_id = req.cookies.user_id;
  
    // Call the stored procedure to add or remove the item from the watchlist
    db.query('CALL AddToWatchlist(?, ?)', [user_id, item_id], (procedureErr, results) => {
      if (procedureErr) {
        console.error('Error calling stored procedure:', procedureErr);
        return res.json({ success: false, message: 'Error updating watchlist' });
      }
      // Check if results is an array and has at least one element
      if (results.affectedRows > 0) {
        // Assuming the stored procedure returns an object with an affectedRows property
        
        res.json({ success: true, message: 'Watchlist updated successfully' });
      } else {
        res.json({ success: false, message: 'Failed to update watchlist' });
      }
    });
  });
  
  
  // Assuming you have an endpoint like '/watchlist' to fetch the user's watchlist items
  
  app.get('/watchlist', (req, res) => {
    const user_id = req.cookies.user_id;
  
    // Fetch item_ids from the Watchlist table for the given user
    db.query(
      'SELECT item_id FROM Watchlist WHERE user_id = ?',
      [user_id],
      (queryErr, watchlistResults) => {
        if (queryErr) {
          console.error('Error fetching watchlist:', queryErr);
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        if (watchlistResults.length === 0) {
          // No items in the watchlist
          return res.json({ watchlistItems: [] });
        }
  
        // Extract item_ids from the results
        const itemIds = watchlistResults.map((row) => row.item_id);
        // Fetch details of items from the Items table using the item_ids
        db.query(
          'SELECT * FROM Items WHERE item_id IN (?)',
          [itemIds],
          (itemsQueryErr, itemsResults) => {
            if (itemsQueryErr) {
              console.error('Error fetching items:', itemsQueryErr);
              return res.status(500).json({ error: 'Internal server error' });
            }
  
            // Send the items to the frontend
            res.json({ watchlistItems: itemsResults });
  
          }
        );
      }
    );
  });
  
  
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });