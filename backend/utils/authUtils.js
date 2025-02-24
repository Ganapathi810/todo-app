const bcrypt = require('bcrypt')

const hashPassword = async (plaintextPassword) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(plaintextPassword,salt)
    } catch(error) {
        console.log('Failed to hash password : ',error)
    }
}

const comparePassword = async (plaintextPassword,hashedPassword) => {
    const result = await bcrypt.compare(plaintextPassword,hashedPassword)
    return result;
}   

module.exports = {
    hashPassword,
    comparePassword
}