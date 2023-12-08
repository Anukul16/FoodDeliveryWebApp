const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./db.js');

// Connect to MongoDB
mongoDB();

// Middleware for handling CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Body parsing middleware
app.use(express.json());

// Routes
app.use('/api', require("./Routes/UserRoute.js"));
app.use('/api', require("./Routes/DisplayData.js"));
app.use('/api', require("./Routes/OrderData.js"));
app.use('/api', require("./Routes/MyorderRoute.js"));

// Default route
app.get('/', (req, resp) => {
    resp.send("Hello world");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
