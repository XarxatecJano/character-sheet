const query = require('./query.js');

exports.findUserByUsername = async (username) => {
    const querySQL = `SELECT * FROM user WHERE user = "${username}"`;
    const results =  await query.query(querySQL);
    return results;
}

exports.findUserById = async (id) => {
    const querySQL = `SELECT * FROM user WHERE id = ${id}`;
    const results =  await query.query(querySQL);
    return results;
}

exports.insertNewUser = async (userData, hashData) => {
    const querySQL = `INSERT INTO user(user, hashCode, salt, role) VALUES ("${userData.iUser}", "${hashData.hash}", "${hashData.salt}", "${userData.iRole}")`;
    const results = await query.query(querySQL);
    return results;
}

exports.insertNewStudent = async (data) =>{
    const querySQL = `INSERT INTO student(name, first_surname, second_surname, telephone, email, description) VALUES ("${data.iName}", "${data.iFirstSurname}","${data.iSecondSurname}","${data.iPhone}","${data.iEmail}","${data.iDescription}")`;
    const results =  await query.query(querySQL);
    return results;
}

exports.findCharacterSheet = async (id) =>{
    const querySQL = `SELECT * FROM student WHERE id = ${id}`;
    const results =  await query.query(querySQL);
    return JSON.stringify(results[0]);
}

exports.updateStudentById = async (data) =>{
    const querySQL = `UPDATE student SET name="${data.iName}", first_surname="${data.iFirstSurname}", second_surname="${data.iSecondSurname}", email="${data.iEmail}", telephone="${data.iPhone}", description="${data.iDescription}" WHERE id = ${data.iIdStudent}`;
    const results =  await query.query(querySQL);
    return results;
}

exports.getStudentData = async ()=>{
    const querySQL = `SELECT id, name, first_surname, second_surname FROM student`;
    const results =  await query.query(querySQL);
    console.log(results);
    return results;
}

exports.checkLogin = async (user, password)=>{
    const querySQL = `SELECT password, role FROM user WHERE user= "${user}"`;
    const results = await query.query(querySQL);
    
    return results;
}