const express = require('express');
const User = require('./models/User');
const Cart = require('./models/Cart');

const app = express();

app.use(express.static('html'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '../public/index.html');
});
app.get('/dog', (req, res) => {
    res.sendFile(__dirname + '../public/dog.html');
    });
app.get('/cat', (req, res) => {
    res.sendFile(__dirname + '../public/cat.html');
    });
    
app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '../public/contact.html');
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
  res.sendFile(__dirname + '../public/login.html');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
           res.redirect('/cart');
    } else {
            res.sendFile(__dirname + '../public/login.html', { error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('An error occurred during login');
  }
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '../public/register.html');
});

app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    await User.create({ username, password, email });
    res.redirect('/login');
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).send('An error occurred during registration');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});