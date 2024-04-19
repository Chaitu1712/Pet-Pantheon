const express = require('express');
const User = require('./models/User');
const Cart = require('./models/Cart');
const mongoose = require('mongoose');
 
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
app.get('/dog', (req, res) => {
  res.sendFile('dog.html',{root:'../public'});
    });
app.get('/dog_home', (req, res) => {
  res.sendFile('dog_home.html',{root:'../public'});
});
app.get('/cat_home', (req, res) => {
  res.sendFile('cat_home.html',{root:'../public'});
});
app.get('/cat', (req, res) => {
  res.sendFile('cat.html',{root:'../public'});
});
   
app.get('/cart', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.sendFile(__dirname + '../public/cart.html', { cartItems });
  } catch (err) {
    console.error('Error fetching cart items:', err);
    res.status(500).send('An error occurred while fetching the cart items');
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