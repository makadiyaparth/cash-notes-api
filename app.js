require("dotenv").config();
const express = require("express");

const cors = require("./config/cors");
const connectToDatabase = require("./config/database");
const recordRoutes = require("./routes/record");

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors);

connectToDatabase();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.use("/api/records", recordRoutes);
