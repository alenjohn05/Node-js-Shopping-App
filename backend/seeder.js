const dotenv = require("dotenv")
dotenv.config();

const productData = require("./data/productData");
const userData = require("./data/userData");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const User = require("./models/User");
dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Product.deleteMany({});
        await User.deleteMany({});
        await Product.insertMany(productData);
        await User.insertMany(userData);
    
        console.log("Data Import Success");
    
        process.exit();
      } catch (error) {
        console.error("Error with data import", error);
        process.exit(1);
      }
}

const destroyData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}