const express = require('express');

const router = express.Router();
let Rushee = require('../models/rushee.model');

router.route('/').get((req, res) => {
    Rushee.find()
        .then(rushees => res.json(rushees))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const resume = req.body.resume;

    const newRushee = new Rushee({"firstName": firstName, 
                                "lastName": lastName, 
                                "resume": resume});

    newRushee.save()
        .then(() => res.json("Rushee  " + firstName + " " + lastName + " was added!"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Rushee.findById(req.params.id)
        .then((rushee) => res.json(rushee))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Rushee.findByIdAndDelete(req.params.id)
        .then(() => res.json("Rushee deleted."))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Rushee.findById(req.params.id)
        .then((rushee) => {
            firstName = req.body.firstName;
            lastName = req.body.lastName;
            resume = req.body.resume;
            elo = req.body.elo;
            
            if (firstName) {
                rushee.firstName = firstName;
            }
            if (lastName) {
                rushee.lastName = lastName;
            }
            if (resume) {
                rushee.resume = resume;
            }
            if (elo) {
                rushee.elo = elo;
            }

            rushee.save()
                .then(() => res.json("Rushee " + rushee.firstName + " " + rushee.lastName + " updated!"))
                .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;