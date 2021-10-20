const express = require('express');

const app = express();


//set up view engine:
app.set('view engine', 'ejs')

//listening to the request:
app.listen(3000);

//accessing static file:
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('index')
});

app.get('/about', (req, res)=>{
    res.sendFile('./views/about.html', {root: __dirname});
});

app.get('/contact-me', (req, res)=>{
    res.sendFile('./views/contact-me.html', {root: __dirname});
})

app.use((req,res)=>{
    res.sendFile('./views/404.html', {root: __dirname});
});


