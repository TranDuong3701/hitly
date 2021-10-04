const dotenv = require("dotenv").config();
const app = require("./app");
const mongodb = require("./configs/mongo");

// Connect database
mongodb.connect();

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
    console.log(`Server is running on port: ${PORT}`)
);
