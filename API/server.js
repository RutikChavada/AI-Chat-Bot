const express = require('express')
const app = express()
const port = 8000
// const db = require('./config/db')
const cors = require('cors')
const mongoose = require('mongoose');

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.set("view engine","ejs")
app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true // Allow cookies and authentication headers
}));

app.use('/', require('./routes/index'))

mongoose.connect('mongodb://localhost:27017/codelingo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(port, (err) => {
    (err) ? console.error(err) : console.log(`Server is running on port ${port}`)
})