const express = require('express');

const app = express();


//set up view engine:
app.set('view engine', 'ejs')

//listening to the request:
app.listen(3000);

//accessing static file:
app.use(express.static('public'));

app.get('/', (req, res)=>{
    const blogs = [
        {title: "loremlorem", snipet: "loremloremloremloremloremloremloremloremlorem"},
        {title: "loremlorem", snipet: "loremloremloremloremloremloremloremloremlorem"},
        {title: "loremlorem", snipet: "loremloremloremloremloremloremloremloremlorem"},
        {title: "loremlorem", snipet: "loremloremloremloremloremloremloremloremlorem"},
    ]
    res.render('index', {title: "Home", blogs})
});


app.get('/about', (req, res)=>{
    res.render('about', {title: "About-us"})
});

app.get('/blogs/create', (req, res)=>{
    res.render('create', {title: "Create New Blog"})
})

app.use((req,res)=>{
    res.status(404).render('404', {title: "404"})
});


