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
];

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
    res.render('todolist', {tasks});
});

app.listen(port, ()=>{
    console.log(`Server is running on port${port}`);
});