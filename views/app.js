const express = require('express');
const app = express();
const port = 4000;
const tasks = [
    {
        title: 'Learn HTML',
        done: true,
    },
    {
        title: 'Learn CSS',
        done: true,
    },
    {
        title: 'Learn JavaScript',
        done: true,
    },
    {
        title: 'Learn Nodejs',
        done: true,
    },
    {
        title: 'Learn Express',
        done: false,
    },
    {
        title: 'Learn MongoDB',
        done: false,
    },
    {
        title: 'Learn SQL',
        done: false,
    },
    {
        title: 'Learn PHP',
        done: false,
    },
];

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

// POST method :
/*Adding a task*/
app.post('/task', (req, res)=>{
    /*condition to avoid having an empty task in the list*/
    if(req.body.task){
        tasks.push(
            {
                title: req.body.task,
                done: false,
            },
        );
    };
    res.redirect('/');
});

// GET methods :
app.get('/', (req,res)=>{
    res.render('todolist', {tasks});
});

/*Change the status of a task*/
app.get('/task/:id/done', (req,res)=>{
    tasks[req.params.id].done = true;
    res.redirect('/');
});

/*Delete a task from the list*/
app.get('/task/:id/delete', (req,res)=>{
    tasks.splice(req.params.id, 1);
    res.redirect('/')
})

app.listen(port, ()=>{
    console.log(`Server is running on port${port}`);
});