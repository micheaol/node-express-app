const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//Create express app
const app = express();

//Connection string for db:
const dbURI = "mongodb+srv://nodeninja:test1234@blog-tuts.tnx6t.mongodb.net/node-tuts?retryWrites=true&w=majority";

//Connect Db with mongoose:
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then((result) => app.listen(3000))
        .catch((err) => console.log(err))

//set up view engine:
app.set('view engine', 'ejs')

//accessing static file:
app.use(express.static('public'));

//mongoose and mongodb sandbox:
app.get('/add-blog', (req, res)=>{
    const blog = new Blog({
        title: "Seriously Getting it",
        snipet: "I am on the right path with node.js",
        blog: "I am seriously trying all I can to ensure I learn node.js"
    });

    blog.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
});

//Get all blogs:
app.get('/all-blogs', (req, res)=>{
    Blog.find()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
});

//Get single blog:
app.get('/blog-id', (req, res)=>{
    Blog.findById("6170aa4de53604bfdee3eeaa")
        .then((result) =>{
            res.send(result)
        })
        .catch((err) =>{
            console.log(err)
        })
})

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


