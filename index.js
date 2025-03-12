const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const User = require("./models/User");
const cors = require("cors")
const connectDb = require("./config/connectDb")
const cookieParser = require("cookie-parser")

const app = express();
app.use(cors())
//Database connection
connectDb();
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser());


app.post("/login", async (req, res) => {
    //incoming data for login
    const { uname, password } = req.body;

    //check from the db(using User model)
    const userFound = await User.findOne({ uname: uname });
    //if userFound is having any doc then set the cookie: 
    if (userFound) {
        res.cookie("token", "authenticated", { maxAge: 60 * 1000, httpOnly: true })
        res.json("You afre logged in")
    } else {
        res.json({ msg: "invalid credentials" });
    }
})
// ========authentication routes(login & logout )===========
app.post("/logout", (req, res) => {
    res.clearCookie("token")
    res.json({ msg: "you are logged out !" })
})

//Home route
app.get("/", (req, res) => {
    res.json("Home page route")
})

// ====================== only route protection using  isLogin middleware========= 
//==============Get all books route==========
//to protect the route: apply middleware
app.get("/books", async (req, res) => {
    const booksFound = await Book.find();
    console.log(booksFound)
    res.json( {booksFound})
})

// ========================Get one book route using id===================
app.get("/book/:id", async (req, res) => {
    const id = req.params.id;
    console.log(req.params.id)
    const bookFound = await Book.findById(id);
    res.json({ msg: "Single book route", bookFound })
})


// =======================================04/03/2025(continued)===========================
//===================Create book route==============
app.post("/books", async (req, res) => {
    const book = req.body;
    const createdBook = await Book.create(book)
    res.json({ msg: "Book has been inserted", createdBook })

})

//=================Update Book route===========
app.put("/book/:id", async (req, res) => {
    const id = req.params.id;
    // const data = req.body; //for the data given by user
    const updatedBook = await Book.updateOne({ _id: id }, { bookname: "second time updated book" })
    res.json({ msg: "single update route", updatedBook })
})

//================Delete book route==============
app.delete("/book/:id", async (req, res) => {
    const id = req.params.id;

    const deletedBook = await Book.findOneAndDelete({ _id: id })
    res.json({ msg: "Book has been deleted", deletedBook });
})



app.listen(3000, console.log("server is running on 3000"));