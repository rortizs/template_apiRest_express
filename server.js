const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const swaggerRouter = require("./swagger");

/**Routes import */
const apiRouter = require("./routes/api");

//port server
const PORT = process.env.PORT || 3000;

//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
require("./config/passport")(passport);
app.disable("x-powered-by");
app.set("port", PORT);
app.use(epxress.static("public"));

//Calling routes
app.use("/api/v1", apiRouter);
//swagger
app.use("/api-docs", swaggerRouter);

server.listen(PORT, "IP PC LOCAL" || "locahost", function () {
  console.log(
    "SERVER RUNNING ON PORT " + PORT + "AND CONNECTION SUCCESSFULY DATABASE"
  );
});

//ROUTES
app.get("/", (req, res) => {
  res.send("Router point from backend server working fine");
});

//Messages from server errors
app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.status || 500)
    .send({ message: err.message, status: err.status });
});
