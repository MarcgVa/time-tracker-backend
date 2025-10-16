require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const {logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const PORT = process.env.PORT || 4000;
const path = require("path");


// custom middleware logger
app.use(logger);
app.use(credentials);
// Cross Origin Resource Sharing
//app.use(cors(corsOptions));
app.use(cors({ origin: true, credentials: true }));
//built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//server static files
app.use("/", express.static(path.join(__dirname,'/public')));

// routes
const serverRoutes = require("./serverRoutes");
app.use("/", serverRoutes);
//app.use("/", require("./routes/root"));


// routes below this middleware are protected
// verify JWT token
app.use(verifyJWT);



// app.all("*", (req, res) => {
//   res.status(404);
//   if (req.accepts("html")) {
//     res.sendFile(path.join(__dirname, "views", "404.html"));
//   } else if (req.accepts("json")) {
//     res.json({ message: "404 Not Found" });
//   } else {
//     res.type("txt").send("404 Not Found");
//   }
// });

// error handler
app.use(errorHandler);


app.listen(4000, () =>
  console.log("🚀 Server running on http://localhost:4000")
);
