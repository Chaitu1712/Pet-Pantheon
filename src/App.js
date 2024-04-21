const express = require('express');
const User = require('./models/User');//define the model for user
const Cart = require('./models/Cart');//define the model for cart items
const mongoose = require('mongoose');
const urldecode = require('urldecode');

const path = require('path');

// Serve the React app's build folder

mongoose.connect('mongodb+srv://Chaitanya:chaitu1712@cluster0.un7nmla.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));//connect to the database and log the status 
const app = express();//create an express app
app.use(express.json());//parse the request body as JSON
app.use(express.static('../public'));//serve static files from the public directory

app.use(express.static(path.join(__dirname, '../cart-app/build')));

// Serve the React app for all routes
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, '../cart-app/build', 'index.html'));
});



app.get('/', (req, res) => {//define a route handler for the default home page
  res.sendFile('index.html',{root:'../public'});
  res.clearCookie('username');
});
app.get('/home',(req,res)=>{//define a route handler for the home page after Login
  res.sendFile('Logged_In.html',{root:'../public'});
});

app.get('/dog_home', (req, res) => {//define a route handler for the dog product page
  res.sendFile('dog_home.html',{root:'../public'});
});
app.get('/cat_home', (req, res) => {//define a route handler for the cat product page
  res.sendFile('cat_home.html',{root:'../public'});
});

app.get('/logout', (req, res) => {//define a route handler for the logout page
  res.clearCookie('username');//clear the cookie
  res.redirect('/');
});
app.get('/cart', async (req, res) => {//define a route handler for the cart page using react js
  try {
    //extract the username from the cookie
    const cookies = req.headers.cookie.split('; ').reduce((prev, current) => {
      const [name, value] = current.split('=');
      prev[name] = urldecode(value);
      return prev;
    }, {});
    const username = cookies.username;
    // Fetch the cart items from the database
    const cartItems = await Cart.find({ user: username});
    console.log(cartItems);
    res.status(201).json(cartItems);//filter the cart items based on the username
  } catch (err) {
    console.error('Error fetching cart items:', err);
    res.status(500).json({ error: 'An error occurred while fetching the cart items' });
}
});
app.post('/cart', async (req, res) => {//define a route handler for adding the product to the cart

  const cookies = req.headers.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = urldecode(value);
    return prev;
  }, {});
  const username = cookies.username;

  const { name, price, quantity,img } = req.body;
  try {
    const existingProduct = await Cart
      .findOne
      ({ name, user: username});
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
app.get('/login', (req, res) => {//define a route handler for the login page
  res.sendFile('login.html',{root:'../public'});
});

app.post('/login', async (req, res) => {//define a route handler for authenticating the user login
  const { username, password } = req.body;
    try {
      // Find the user in the database
      const user = await User.findOne({ username, password });
  
      if (user) {
        // Login successful
        res.cookie('username', username, { maxAge:9000000,httpOnly: true });//create a cookie to store username so it can be globally accessed
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

app.get('/register', (req, res) => {//define a route handler for the signup page
  res.sendFile('signup.html',{root:'../public'});
});

app.post('/register', async (req, res) => {//define a route handler for the user registration
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