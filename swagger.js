const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./main.js"]; 

swaggerAutogen(outputFile, endpointsFiles);
