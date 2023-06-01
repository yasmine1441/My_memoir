require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const { requireAuth ,checkUser } = require('./middleware/authMiddleware');
// const nodemailer = require('nodemailer');
// const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express()

// register view engine
app.set('view engine', 'ejs');


// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// middleware blog & static files

app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));



// connect to db 
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    // listen for request
app.listen(process.env.PORT, () => {
    console.log('connect to db listening on port', process.env.PORT)
  })
})
.catch((error)=>{
  app.get('/contact', (req, res) => res.render('contact'));
    console.log(error)
})

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/profile', requireAuth, (req, res) => res.render('profile'));
app.get('/playlist', (req, res) => res.render('playlist'));
app.get('/playlistcss', (req, res) => res.render('playlistcss'));
app.get('/playlistjs', (req, res) => res.render('playlistjs'));
app.get('/quizzes', (req, res) => res.render('quizzes'));
app.get('/quizcss', (req, res) => res.render('quizcss'));
app.get('/quizjs', (req, res) => res.render('quizjs'));
app.get('/quizsass', (req, res) => res.render('quizsass'));
app.get('/quizreact', (req, res) => res.render('quizreact'));
app.get('/quizphp', (req, res) => res.render('quizphp'));
app.get('/quizjq', (req, res) => res.render('quizjq'));
app.get('/quizb', (req, res) => res.render('quizb'));
app.get('/quizhtml', (req, res) => res.render('quizhtml'));
app.get('/watch-video', (req, res) => res.render('watch-video'));
app.get('/watch-videoc', (req, res) => res.render('watch-videoc'));
app.get('/watch-videojs', (req, res) => res.render('watch-videojs'));
app.get('/watch-videojq', (req, res) => res.render('watch-videojq'));
app.get('/watch-videop', (req, res) => res.render('watch-videop'));
app.get('/watch-videor', (req, res) => res.render('watch-videor'));
app.get('/watch-videob', (req, res) => res.render('watch-videob'));
app.get('/watch-videos', (req, res) => res.render('watch-videos'));
app.get('/about', (req, res) => res.render('about'));
app.get('/courses', (req, res) => res.render('courses'));
app.get('/assignmnt', (req, res) => res.render('assignmnt'));
app.get('/assignjs', (req, res) => res.render('assignjs'));
app.get('/tools', (req, res) => res.render('tools'));
app.get('/contact', (req, res) => res.render('contact'));

app.use(authRoutes);

