const express = require("express");
const cors = require("cors");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const urlRouter = require("./routes/urlRoutes");
const limiter = require("./configs/limitRequest");
const globalHandlerError = require("./controllers/errorController");

// App config
const app = express();

app.use(cors());

// Set security http headers
app.use(helmet());

// Limit requests from the same ip
// app.use("/api", rateLimit(limiter));

// Body-parse reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent polluted parameter
app.use(hpp({ whitelist: ["original"] }));

// App router
app.use("/api/v1/urls", urlRouter);

app.use(globalHandlerError);

module.exports = app;
