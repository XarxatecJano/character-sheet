const path = require('path');
const model = require('./model/model.js');
const generatePassword = require("./lib/passwordUtils").generatePassword;

exports.getFormNewUser = (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "formNewUser.html"));
}

exports.insertNewUser = async (req, res)=>{
    try {
        const hashData = generatePassword(req.body.iPwd);
        const result = await model.insertNewUser(req.body, hashData);
        if (result.affectedRows >0) {
            res.send("Usuario registrado con éxito");
        } else {
            res.send("No se registró el usuario correctamente");
        }
    } catch (err) {
        res.status(400).send(err);
    }
    
    

}

exports.getFormNewStudent = (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "formEntrada.html"));
}

exports.insertNewStudent = (req, res)=>{
    const result = model.insertNewStudent(req.body);
    res.sendFile(path.join(__dirname, "public", "formEntrada.html"));
}

exports.getFormFindCharacterSheet = (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "formFindCharacterSheet.html"));
}

exports.findCharacterSheet = async (req, res)=>{
    const dataJson = await model.findCharacterSheet(req.body.iStudentSelect);
    const parsedData = JSON.parse(dataJson);
    console.log(req.session);
    res.render("characterSheet.handlebars", {dataContext:parsedData});
}

exports.getFormFindDataStudent = (req,res) =>{
    res.sendFile(path.join(__dirname, "public", "formFindDataStudent.html"));
}

exports.findDataStudent = async (req, res) =>{
    const dataJson = await model.findCharacterSheet(req.body.idStudent);
    const parsedData = JSON.parse(dataJson);
    res.render("updateStudentForm.handlebars", {dataContext: parsedData, layout: false});
}

exports.updateStudent = async (req, res) =>{
    const result = await model.updateStudentById(req.body);
    console.log("reultado del update:" + result);
    res.sendFile(path.join(__dirname, "public", "formFindDataStudent.html"));
}

exports.getDataStudents = async (req, res)=>{
    const results = await model.getStudentData();
    //const JSONresults = JSON.stringify(results);
    res.json(results);
}


exports.login = (req, res)=> {
    res.sendFile(path.join(__dirname, "public", "formLogin.html"));
}

/*exports.checkLogin = async (req, res)=>{
    const result = await model.checkLogin(req.body.iUser, req.body.iPwd);
    let message = {};
    let loginCode = 0;//no existe el usuario
    const userExists = (result.length==1);
    let passwordOk = false;
    if (userExists) {
        passwordOk = (result[0].password == req.body.iPwd);
        loginCode = 1;//existe el usuario pero no coincide el password
    }
    if (passwordOk) loginCode = 2;//login OK
    if (loginCode==0) message.content="El usuario no existe en la base de datos";    
    if (loginCode==1) message.content="El usuario y el password no coinciden";    
    if (loginCode==0 || loginCode==1){ res.render("formLogin.handlebars", {message: message});
    }  
    else {
        req.session.user = req.body.iUser;
        req.session.role = result[0].role;
        res.send("Login OK");    
    }
}*/