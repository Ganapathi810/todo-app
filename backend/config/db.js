const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(`${process.env.DATABASE_URL}`)
    .then(() => {
        console.log('MongoDB is connected successfully!')
    })
    .catch((error) => {
        console.log('Failed to connect MongoDB : ',error)
    })
}

module.exports = connectDB;
