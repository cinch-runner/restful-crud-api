const express = require("express");
const app = express();
const mongoose = require("mongoose");

// routes
app.get("/", (req, res) => {
  res.send("Hello Node API");
});

app.post("/product", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://admin:r5s2k22Ux4FBec45q9@aaronrestfulapi.bewki4j.mongodb.net/?retryWrites=true&w=majority"
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
