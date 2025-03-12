const mongoose = require("mongoose")

const URL = "mongodb+srv://sheeriekhan275:p90ppFGycOwpQq5n@mern-jan.5lht0.mongodb.net/?retryWrites=true&w=majority&appName=mern-jan";

const connectDb = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Database connected");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDb;