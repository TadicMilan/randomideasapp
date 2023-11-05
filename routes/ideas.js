const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

//get all ideas
router.get('/', async(request, response) => {
    try{
        const ideas = await Idea.find();
        response.json({ success: true, data: ideas});
   } catch (error) {
        response.status(500).json({ success: false, error: 'Something went wrong' });
        console.log(error);
   }
});

//get single idea
router.get('/:id', async(request, response) => {
    try {
        const idea = await Idea.findById(request.params.id);
        response.json({ success: true, data: idea});
    } catch (error) {
        response.status(500).json({ success: false, error: 'Something went wrong' });
        console.log(error);
    }
});

//Add an idea
router.post('/', async(request, response) => {
    const idea = new Idea({
        text: request.body.text,
        tag: request.body.tag,
        username: request.body.username,
    });
    
    try {
        const savedIdea = await idea.save();
        response.json({ success: true, data: savedIdea });
    } catch (error) {
        response.status(500).json({ success: false, error: 'Something went wrong' });
        console.log(error);
    }
});

//Update an idea
router.put('/:id', async(request, response) => {
    try {
        //Match the usernames
        const idea = await Idea.findById(request.params.id);
        if(idea.username === request.body.username){
            const updatedIdea = await Idea.findByIdAndUpdate(
                request.params.id, 
                {$set: {
                    text: request.body.text,
                    tag: request.body.tag
                }},
                { new: true }
                );
            return response.json({ success: true, data: updatedIdea});
        } 
        //Username does not match
        response.status(403).json({ success: false, error: 'You shall not pass! You cannot update this' });
    } catch (error) {
        response.status(500).json({ success: false, error: 'Something went wrong' });
        console.log(error);
    }
});

//Delete an idea
router.delete('/:id', async(request, response) => {
    try {
        const idea = await Idea.findById(request.params.id);

        //Match the usernames
        if(idea.username === request.body.username){
            await Idea.findByIdAndDelete(request.params.id);
            return response.json({ success: true, data: {}});
        }

        //Usernames do not match
        response.status(403).json({ success: false, error: 'You shall not pass! You cannot delete this' });
    } catch (error) {
        response.status(500).json({ success: false, error: 'Something went wrong' });
        console.log(error);
    }
});

module.exports = router;