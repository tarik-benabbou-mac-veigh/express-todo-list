const express = require('express');
const app = express();
const port = 4000;
const tasks = [
    {
        title: 'Learn Nodejs',
        done: true,
    },
    {
        title: 'Learn SQL',
        done: true,
    },
    {
        title: 'Learn PHP',
        done: false,
    },
    {
        title: 'Learn MongoDB',
        done: false,
    },
    {
        title: 'Learn Express',
        done: false,
    },
];

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

// POST method :
app.post('/task', (req, res)=>{
    tasks.push(
        {
            title: req.body.task,
            done: false,
        },
    );
    res.redirect('/');
});

// GET methods :
app.get('/', (req,res)=>{
    res.render('todolist', {tasks});
});

app.get('/task/:id/done', (req,res)=>{
    tasks[req.params.id].done = true;
    res.redirect('/');
});

app.listen(port, ()=>{
    console.log(`Server is running on port${port}`);
});