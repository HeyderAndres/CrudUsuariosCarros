const express = require('express');
const path = require('path');
const app = express();
const usersRouter = require('./router/usersRouter');
const mainRouter = require('./router/mainRouter');
const productsRouter = require('./router/productsRouter');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')

const port = process.env.PORT || 3000;

const methodOverride = require('method-override')
const session = require('express-session');
const cookie = require('cookie-parser')

app.use(cookie())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.resolve(__dirname,'./public')))
app.use(methodOverride('_method'))
app.use(session({secret: 'cookie_secret',
    resave: false,
    saveUninitialized: false}))
app.use(userLoggedMiddleware)    



app.set('view engine','ejs');
app.set('views',path.resolve(__dirname,'./views'));

app.use('/', mainRouter)
app.use('/users',usersRouter);
app.use('/products',productsRouter);

app.listen(port, () =>{
    console.log(`servidor corriendo en el puerto ${port}`);
} )