const express = require('express');
const path = require('path');
const passport = require("passport");

const controller = require('../controller.js');

const router = express.Router();


router.get("/new-user", controller.getFormNewUser);
router.post("/new-user", controller.insertNewUser);

router.get("/login", controller.login);
router.post("/login", passport.authenticate("local", { failureRedirect: '/login-failure', successRedirect: '/login-success' }));

router.get("/login-failure", (req, res, next)=>{
    console.log(req.session);
    console.log(req.user);
    next();
} , controller.loginFailure);
router.get("/login-success", (req, res, next)=>{
    console.log(req.session);
    console.log(req.user);
    next();
}, controller.loginSuccess);

router.get("/new-student", controller.getFormNewStudent);
router.post("/new-student", controller.insertNewStudent);
router.get("/get-character-sheet", controller.getFormFindCharacterSheet);
router.post("/find-character-sheet", controller.findCharacterSheet);
//router.get("/get-data-student", controller.getFormFindDataStudent);
router.post("/find-data-student", controller.findDataStudent);
router.put("/update-data-student", controller.updateStudent);



router.get("/get-data-students", controller.getDataStudents);

module.exports = router;