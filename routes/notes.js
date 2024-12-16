// imports
const express = require('express');
const router = express.Router();
const Notes = require("../models/notes")
const { body, validationResult } = require("express-validator");

// a route to handle a 'GET' request to fetch all
// available notes of the requested user
router.get('/notes', async (req, res, next) => {
    try {
        const notes = await Notes.find({});

        if (!notes.length){
            return res.json({message: "No Notes Found."});
        }
        res.json(notes);
    } catch (error) {
        next(error);
    }
});

router.post('/notes', [

    body("notes")
        .trim()
        .notEmpty()
        .withMessage("Note Content Must Not Be Empty!")
        .escape(),
    
    async (req, res, next) => {
        try {

            // the following code ensures that the recieved input
            // is not invalid, if it is, we notify the client
            // that the input is invalid
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            } 

            // else, we create a new note and save it 
            // to the mongoDB database
            const note = new Notes({
                content: req.body.notes,
                createdAt: new Date()
            });
            
            await note.save();
            return res.json({message: "Created a Note Successfully", newNote: note});
        } catch (error) {
            next(error);
        }
    }
]);


module.exports = router;
