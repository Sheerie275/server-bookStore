const mongoose = require("mongoose");

const bookSchema= new mongoose.Schema({
    
    bookname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    },
    price:{
        type: Number,
        required: [true, "Price is a required field"],
        min: 50,
        max: 1000
    },
    language:{
        type:String,
        enum: ["hindi", "english"],
        default: "hindi"
    }
})

const Book = new mongoose.model("Book", bookSchema);

module.exports = Book;