const express = require('express');
const User = require('./models/User');
const Cart = require('./models/Cart');
const mongoose = require('mongoose');
const urldecode = require('urldecode');
mongoose.connect('mongodb+srv://Chaitanya:chaitu1712@cluster0.un7nmla.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));
const app = express();
app.use(express.json());
app.use(express.static('../public'));
app.get('/', (req, res) => {
  res.sendFile('index.html',{root:'../public'});
});
app.get('/home',(req,res)=>{
  res.sendFile('Logged_In.html',{root:'../public'});
});

app.get('/dog_home', (req, res) => {
  res.sendFile('dog_home.html',{root:'../public'});
});
app.get('/cat_home', (req, res) => {
  res.sendFile('cat_home.html',{root:'../public'});
});

app.get('/cart', (req, res) => {
  res.sendFile('index.html',{root:'../cart-app/public'});
});
app.get('/logout', (req, res) => {
  res.clearCookie('username');
  res.redirect('/');
});
app.use(express.static('../cart-app/src/index.js'));
// Cart API routes
app.get('/cart', async (req, res) => {
  try {
    const cookies = req.headers.cookie.split('; ').reduce((prev, current) => {
      const [name, value] = current.split('=');
      prev[name] = urldecode(value);
      return prev;
    }, {});
    const username = cookies.username;
    const cartItems = await Cart.find();
    res.json(cartItems.filter(item => item.user === username));
  } catch (err) {
    console.error('Error fetching cart items:', err);
    res.status(500).json({ error: 'An error occurred while fetching the cart items' });
  }
});
app.post('/cart', async (req, res) => {
  const cookies = req.headers.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = urldecode(value);
    return prev;
  }, {});
  const username = cookies.username;
  console.log(username);
  const { name, price, quantity,img } = req.body;
  try {
    const existingProduct = await Cart
      .findOne
      ({ name });
    if (existingProduct) {
      existingProduct.quantity += 1;
      await existingProduct.save();
    }
    else {
      const newProduct = new Cart({ name, price, quantity,img, user: username});
      await newProduct.save();
    }
    res.status(200).send('Product added to cart successfully');
  } catch (err) {
    console.error('Error adding product to cart:', err);
    res.status(500).send('An error occurred while adding the product to the cart');
  }
});
app.get('/login', (req, res) => {
  res.sendFile('login.html',{root:'../public'});
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
    try {
      // Find the user in the database
      const user = await User.findOne({ username, password });
  
      if (user) {
        // Login successful
        res.cookie('username', username, { maxAge:9000000,httpOnly: true });
        res.status(200).send('Login successful');
      } else {
        // Invalid credentials
        res.status(401).send('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('An error occurred during login');
    }
  });

app.get('/register', (req, res) => {
  res.sendFile('signup.html',{root:'../public'});
});

app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    // Check if the username or email is already taken
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).send('Username or email already exists');
    }

    // Create a new user document
    const newUser = new User({ username, password, email });
    await newUser.save();

    // Redirect to the login page after successful registration
    res.status(200).json({ redirectUrl: '/login' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('An error occurred during registration');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});