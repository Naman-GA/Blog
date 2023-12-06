const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("./utils/passport");

const app = express();
app.use(express.json());
app.use(passport.initialize());

const userPrefix = "/auth";
const blogPrefix = "/auth/blog";


const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");


app.use(userPrefix, userRoutes);
app.use(blogPrefix, blogRoutes);

// Serve Swagger UI for API documentation
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json"); // Path to the generated Swagger file
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/", (req, res) => {
  res.send("Welcome to the main page");
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});

module.exports = app;
