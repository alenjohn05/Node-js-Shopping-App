const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
var bodyParser = require('body-parser')
const app = express();

//Connect DB
connectDB();

const authRouter = require("./routes/auth");
const privateRouter = require("./routes/private");
const productRoutes = require("./routes/product");


// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/private", privateRouter);

app.use("/api/products", productRoutes);

app.use(errorHandler);

const port = process.env.PORT || 4080;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log("Logged Error: " + err.message);
  server.close(() => process.exit(1));
});
