import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Promise from "bluebird";

import auth from "./routes/auth";

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT;
mongoose.Promise = Promise;
mongoose.connect(process.env.DBLINK, {
  useNewUrlParser: true
});

app.use("/api/auth", auth);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => console.log(`Running on localhost: ${port}.`));
