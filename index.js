// Essential requires
const express = require("express");
require('dotenv').config();


// Connection and middleware requires
const connectMongoDb = require("./connection");
const { logReqRes } = require("./middleware");

// App initialization
const app = express();
const port = process.env.PORT || 3000;

// Routers
const bugRouter = require("./routes/bug");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));


// Connect to MongoDB
connectMongoDb("mongodb://127.0.0.1:27017/BugVault").then(() => {
  console.log("MongoDB connected");
});



// Routes
app.use("/bug", bugRouter);

// Start server
app.listen(port, () => console.log("Server started"));
