// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const farmerRoutes = require('./routes/farmer.route.js');
const companyRoutes = require('./routes/company.route.js');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://nithin2720:mongo123@cluster0.dr89ki0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch(err => {
  console.error("Failed to connect to MongoDB", err);
});

// Mount farmer routes with the correct path
app.use('/', farmerRoutes);
app.use('/', companyRoutes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
