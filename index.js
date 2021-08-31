const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//models
const TodoTask = require("./models/TodoTask");


dotenv.config();

//This is the bit that allows the css to be read correctly
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));



//GET Method
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", { todoTasks: tasks });

    });
});

//POST Method
app.post("/", async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

//Database connection
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true }, () => {
        console.log("Connected to DB");
        app.listen(3000, () => console.log("Server Up and running"));
});

