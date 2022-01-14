const crypto = require("crypto");

exports.generatePassword = password => {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    return {
        salt: salt,
        hash: hash
    }
}

exports.validatePassword = (password, salt, hashCode) => {
    const generatedHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    return generatedHash === hashCode;
}