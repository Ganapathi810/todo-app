const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
        username : {
            type : String,
            required : true,
            unique : true,
            trim : true,
            minLength : [3, 'Name must be at least 3 characters long'],
            maxLength : [50, 'Name must not exceed 50 characters long']
        },
        password : {
            type : String,
            required : true,
            minLength : [6,'Password must be at least 6 characters long']
        }
    },
    {
        timestamps : true
    }
)

const User = mongoose.model('User',userSchema)


module.exports = User
