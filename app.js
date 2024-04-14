require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');


// Import helper function
const { isActiveRoute } = require('./server/helpers/routeHelpers');

// Import database connection function
const connectDB = require('./server/config/db');

// Create Express app
const app = express();

// Set port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
}));
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

// Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Set custom local variable for EJS templates
app.locals.isActiveRoute = isActiveRoute; 

// Middleware to set current route
app.use((req, res, next) => {
  // Define current route based on the request path
  res.locals.currentRoute = req.path;
  next();
});

// Routes
app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));
app.use('/', require('./server/routes/contact')); // Assuming you have a file named contact.js in ./server/routes directory



// Define route handler for rendering the blog page
app.get('/blog', (req, res) => {
  // Assume you have blog posts data stored in a variable called blogPosts
  const blogPosts = [
    { title: 'Post 1', content: 'This is the content of post 1.' },
    { title: 'Post 2', content: 'This is the content of post 2.' },
    // Add more blog posts as needed
  ];

  // Render the blog.ejs template and pass the blogPosts data to it
  res.render('blog', { blogPosts });
});

app.get('/write', (req, res) => {
  res.render('write');
});


const router = express.Router();

// Define route handler for the contact page
router.get('/contact', (req, res) => {
  // Render the contact page view
  res.render('contact'); // Assuming you have a view named contact.ejs
});

// Export the router
module.exports = router;

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});



