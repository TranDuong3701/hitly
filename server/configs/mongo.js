const mongoose = require("mongoose");

exports.connect = async () => {
    const DB = process.env.MONGO_URI || "mongodb://localhost/shortly-app";
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connection successful...");
    } catch (error) {
        console.log(`Database connection failed ${error.message}`);
    }
};
