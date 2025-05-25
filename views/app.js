const express = require('express');
const session = require('express-session');
const app = express();
const port = 4000;
// const tasks = [
//     {
//         title: 'Learn HTML',
//         done: true,
//     },
//     {
//         title: 'Learn CSS',
//         done: true,
//     },
//     {
//         title: 'Learn JavaScript',
//         done: true,
//     },
//     {
//         title: 'Learn Nodejs',
//         done: true,
//     },
//     {
//         title: 'Learn Express',
//         done: false,
//     },
//     {
//         title: 'Learn MongoDB',
//         done: false,
//     },
//     {
//         title: 'Learn SQL',
//         done: false,
//     },
//     {
//         title: 'Learn PHP',
//         done: false,
//     },
// ];

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

app.set('view engine', 'ejs');

// POST method :
/*Adding a task*/
app.post('/task', (req, res)=>{
    /*condition to avoid having an empty task in the list*/
    if(req.body.task){
        req.session.tasks.push(
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
    if(!req.session.tasks){
        req.session.tasks = [];
    }
    res.render('todolist', {tasks: req.session.tasks});
});

/*Change the status of a task*/
app.get('/task/:id/done', (req,res)=>{
    req.session.tasks[req.params.id].done = true;
    res.redirect('/');
});

/*Delete a task from the list*/
app.get('/task/:id/delete', (req,res)=>{
    req.session.tasks.splice(req.params.id, 1);
    res.redirect('/');
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});