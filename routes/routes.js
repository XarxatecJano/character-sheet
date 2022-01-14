const express = require('express');
const path = require('path');
const passport = require("passport");

const controller = require('../controller.js');

const router = express.Router();

router.get("/new-user", controller.register);
router.post("/new-user", controller.saveNewUser);

router.get("/login", controller.login);
router.post("/login", passport.authenticate("local", { failureRedirect: '/login-failure', successRedirect: 'login-success' }));


router.get("/new-student", controller.getFormNewStudent);
router.post("/new-student", controller.insertNewStudent);
router.get("/get-character-sheet", controller.getFormFindCharacterSheet);
router.post("/find-character-sheet", controller.findCharacterSheet);
//router.get("/get-data-student", controller.getFormFindDataStudent);
router.post("/find-data-student", controller.findDataStudent);
router.put("/update-data-student", controller.updateStudent);

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in</p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});


router.get("/get-data-students", controller.getDataStudents);

module.exports = router;