const express = require("express");
const app = express();

const corsEnabledRouter = require("./cors-enabled/cors-enabled.router");
const corsNotEnabledRouter = require("./cors-not-enabled/cors-not-enabled.router");

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

const cors = require('cors');
app.use(express.json());

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });

app.use(cors({
    origin: 'http://localhost:3000', // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))

app.use("/cors-enabled", corsEnabledRouter);
app.use("/cors-not-enabled", corsNotEnabledRouter);

app.use(notFound);

app.use(errorHandler);

module.exports = app;
