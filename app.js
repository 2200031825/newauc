const express = require('express'); // Import Express
const cors = require('cors'); // Import CORS for Cross-Origin Resource Sharing
const { MongoClient, ObjectId } = require('mongodb'); // Import MongoDB client and ObjectId
const fileUpload = require('express-fileupload'); // Middleware for file uploads

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS
app.use(fileUpload()); // Enable file uploads

// MongoDB configuration
const mongoUrl = 'mongodb://localhost:27017/'; // MongoDB connection string
const client = new MongoClient(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle server shutdown gracefully
process.on('SIGINT', async () => {
  await client.close(); // Ensure MongoDB connection is closed
  console.log('MongoDB connection closed');
  process.exit(); // Exit the process
});

// Simple Web API endpoints
app.get('/klef/cse', (req, res) => {
  res.json("Computer Science");
});

app.post('/klef/klu', (req, res) => {
  res.json("K L University");
});

// Registration module
app.post('/registration/signup', async (req, res) => {
  let conn;
  try {
    conn = await client.connect(); // Open MongoDB connection
    const db = conn.db('auc'); // Get the database
    const users = db.collection('users'); // Get the collection

    const existingUser = await users.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists.' });
    }

    await users.insertOne(req.body); // Insert new user
    res.json({ success: true, message: 'Registered successfully.' });

  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  } finally {
    if (conn) {
      await conn.close(); // Ensure connection is closed
    }
  }
});

// Login module
app.post('/login/signin', async (req, res) => {
  let conn;
  try {
    conn = await client.connect(); // Open MongoDB connection
    const db = conn.db('auc'); // Get the database
    const users = db.collection('users'); // Get the collection

    const user = await users.findOne({ email: req.body.email, password: req.body.password });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    res.json({ success: true, message: 'Login successful.' });

  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  } finally {
    if (conn) {
      await conn.close(); // Ensure connection is closed
    }
  }
});

// File upload module
app.post('/uploaddp', async (req, res) => {
  let conn;
  try {
    if (!req.files || !req.files.myfile) {
      return res.status(400).json({ success: false, message: 'File not found.' });
    }

    const myfile = req.files.myfile;
    const fname = req.body.fname;
    const uploadPath = `../src/images/photo/${fname}.jpg`;

    await myfile.mv(uploadPath); // Move the file to the specified location

    conn = await client.connect(); // Reopen the connection
    const db = conn.db('auc'); // Get the database
    const users = db.collection('users'); // Get the collection

    await users.updateOne({ email: fname }, { $set: { imgurl: `${fname}.jpg` } });

    res.json({ success: true, message: 'File uploaded successfully.' });

  } catch (err) {
    console.error('Error during file upload:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  } finally {
    if (conn) {
      await conn.close(); // Ensure connection is closed
    }
  }
});

// Items retrieval module
app.get('/items', async (req, res) => {
    let conn;
    try {
      conn = await client.connect(); // Open MongoDB connection
      const db = conn.db('auc'); // Get the database
      const items = db.collection('items'); // Get the collection
  
      const data = await items.find({}).toArray(); // Fetch all items
      res.json(data);
  
    } catch (err) {
      console.error('Error fetching items:', err);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    } finally {
      if (conn) {
        await conn.close(); // Ensure connection is closed
      }
    }
  });
  
//LOGIN MODULE
app.post('/login/signin', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('auc');
        users = db.collection('users');
        data = await users.count(req.body);
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//HOME MODULE
app.post('/home/uname', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('auc');
        users = db.collection('users');
        data = await users.find(req.body, {projection : {firstname: true, lastname : true }}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/home/menu', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('auc');
        menu = db.collection('menu');
        data = await menu.find({}).sort({mid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/home/menus', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('auc');
        menu = db.collection('menus');
        data = await menu.find(req.body).sort({smid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//CHANGE PASSWORD
app.post('/cp/updatepwd', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('auc');
        users = db.collection('users');
        data = await users.updateOne({emailid:req.body.emailid}, {$set:{pwd: req.body.pwd}});
        conn.close();
        res.json("Password has been Updated..");
    }catch(err)
    {
        res.json(err).status(404);
    }
});
//MyPROFILE
app.post('/myprofile/userinfo', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('auc');
        users = db.collection('users');
        data = await users.find(req.body).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//FILE UPLOAD
app.post('/uploaddp', async function(req, res){
    try
    {
        if(!req.files)
            return res.json("File not found");

        let myfile = req.files.myfile;
        var fname = req.body.fname;
        myfile.mv('../src/images/photo/'+ fname +'.jpg', function(err){
            if(err)
                return res.json("File upload operation failed!");

            res.json("File uploaded successfully...");
        });

        conn = await client.connect();
        db = conn.db('auc');
        users = db.collection('users');
        data = await users.updateOne({emailid: req.body.fname},{$set:{imgurl: fname + '.jpg'}});
        conn.close();

    }catch(err)
    {
        res.json(err).status(404);
    }
});
// In your Express backend code

// Suppose you have a collection named 'items' in your MongoDB
app.get('/items', async function(req, res){
    try {
        conn = await client.connect();
        db = conn.db('auc');
        items = db.collection('items');
        const data = await items.find({}).toArray();
        conn.close();
        res.json(data);
    } catch(err) {
        res.json(err).status(500);
    }
});
app.get('/inbox/:userId', async (req, res) => {
    let conn;
    try {
      conn = await client.connect(); // Open MongoDB connection
      const db = conn.db('auc'); // Get the correct database
      const inbox = db.collection('inbox'); // Collection for inbox items
  
      const userId = req.params.userId; // User ID from route parameter
      const data = await inbox.find({ userId }).toArray(); // Get all inbox items for this user
  
      res.json(data); // Send the retrieved inbox items as a response
  
    } catch (err) {
      console.error('Error fetching inbox items:', err);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    } finally {
      if (conn) {
        await conn.close(); // Ensure connection is closed
      }
    }
  });
  