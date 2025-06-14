// Essential requires
const express = require("express");
require('dotenv').config();


// Connection and middleware requires
const connectMongoDb = require("./connection");
const { logReqRes, checkAuthentication, restrictTo } = require("./middleware");


// App initialization
const app = express();
const port = process.env.PORT || 3000;

// Routers
const userRouter = require("./routes/user");
const bugRouter = require("./routes/bug");
const commentRouter = require("./routes/comment");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(logReqRes("log.txt"));


// Connect to MongoDB
connectMongoDb("mongodb://127.0.0.1:27017/BugVault").then(() => {
  console.log("MongoDB connected");
});



// Routes
app.use("/user", userRouter);
app.use("/bug", bugRouter);
app.use("/comment",commentRouter);

// Start server
app.listen(port, () => console.log("Server started"));
