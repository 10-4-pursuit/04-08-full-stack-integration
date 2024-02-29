// server.js
const PORT = process.env.PORT || 8080;
// importing modules
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import task from "./routes/task.js";
import dotenv from "dotenv";


// Loading .env
dotenv.config({path: "./config/config.env"});





// importing routes
const app = express();
// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());


if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
  }

// Routes
app.use("/api/tasks", task);

//Listening to port
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });