const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/productModel");

app.use(express.json());
// routes
app.get("/", (req, res) => {
  res.send("Hello Node API");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.messsage);
  }
});

// update a product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with id ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://aaroniscool:coolisaaron@aaronrestfulapi.bewki4j.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(3000, () => {
      console.log("Node API is running on port 3000...");
    });
  })
  .catch((error) => {
    console.error("MongoDB error", error);
    process.exit(1);
  });
