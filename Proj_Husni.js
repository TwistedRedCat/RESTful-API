const Joi = require('joi');       
const express = require('express');
const val = require('nodejs-1988');
var app = express();

app.use(express.json());           //middleware

const mcourses = [
    { id:1, name: 'Math'},
    { id:2, name: 'English'},
    { id:3, name: 'Science'},
];

app.get('/', (req, res) => {
    res.send(`Hello! Welcome to Husni's Project`);
});

app.get('/api/courses', (req, res) => {
    res.send(mcourses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = mcourses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('Course id not found');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const {error} = val.validate(req.body);         //Use code from nodejs-1988.

    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: mcourses.length + 1,
        name: req.body.name
    };
    mcourses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = mcourses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course id not found');

    const {error} = val.validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = mcourses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course id not found');

    const index = mcourses.indexOf(course);
    mcourses.splice(index, 1);

    res.send(course);
});

const port = process.env.PORT || 3000;         //if port not set by server, then use port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));