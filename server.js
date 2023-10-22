const express = require('express');
const port = 5000;

const app = express();

let ideas = [
    {
        id:1,
        text: 'Ovo je prva ideja',
        tag: 'Tech',
        username: 'El Presidente',
        date: '2023-10-22'
    },
    {
        id:2,
        text: 'Ovo je druga ideja',
        tag: 'Stonks',
        username: 'Mitch Connor',
        date: '2022-09-15'
    },
    {
        id:3,
        text: 'Ovo je treca ideja',
        tag: 'Politics',
        username: 'Eric Cartman',
        date: '2022-09-11'
    }
];

app.get('/', (request, response) => {
    response.json({ message: 'Welcome to the RandomIdeasAPI'});
});

//get all ideas
app.get('/api/ideas', (request, response) => {
    response.json({ success: true, data: ideas});
});

app.get('/api/ideas/:id', (request, response) => {
    const idea = ideas.find((idea) => idea.id === +request.params.id);

    if(!idea) {
       return response
       .status(404)
       .json({ success: false, error: 'Resource not found'});
    }

    response.json({ success: true, data: request.params.id});
});

app.listen(port, () => console.log(`Server listening on port ${port}`));