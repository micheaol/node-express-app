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
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res)=>{
    res.redirect('/blogs')
});


app.get('/about', (req, res)=>{
    res.render('about', {title: "About-us"})
});

app.get('/blogs/create', (req, res)=>{
    res.render('create', {title: "Create New Blog"})
})

//Show all blogs to the vieiw:
app.get('/blogs', (req, res) =>{
    Blog.find().sort({createdAt: -1})
        .then((result) =>{
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch((err)=>{
            console.log(err)
        })
});

//Route to create blog and send to the db:
app.post('/blogs', (req, res) =>{
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect("/blogs")
        })
        .catch((err) =>{
            console.log(err)
        });
})

app.get('/blogs/:id', (req, res) =>{
    const id = req.params.id;
    Blog.findById(id)
        .then((result)=>{
            res.render('details', {title: 'Blog Detail', blog: result})
            
        })
        .catch((err) => {
            console.log(err)
        })
});

app.delete('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result)=>{
            res.json({ redirect: '/blogs'})
        })
        .catch((err)=>{
            console.log(err)
        })
})



app.use((req,res)=>{
    res.status(404).render('404', {title: "404"})
});


