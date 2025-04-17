require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

const indexRouter = require("./routes/indexRouter");

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`Express server running at http://localhost:${PORT}`)
);
