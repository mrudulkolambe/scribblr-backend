const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser')
dotenv.config();

app.use(cors({
	origin: ["http://localhost:59591", "*"]
}))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const userRouter = require("./routes/User")
app.use("/user", userRouter);

const topicRouter = require("./routes/Topic")
app.use("/topic", topicRouter);

const blogRouter = require("./routes/Blog")
app.use("/blog", blogRouter);


app.get("/", (req, res) => {
	return res.send("Server Is Live!");
})

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log("Connected to db"))
	.catch((err) => console.log(err))

app.listen(4000, () => {
	console.log("server started on port: 4000")
})