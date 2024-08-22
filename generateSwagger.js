const swaggerJsdoc = require("swagger-jsdoc");
const fs = require("fs");

const options = {
  definition: {
        openapi: "3.0.0",
    info: {
      title: "API Documentación API TEMPLATE EXPRESS  By: Richard Ortiz",
      version: "1.0.0",
      description: "Documentación de la API para la gestión de EMPRESAS",
    },
    servers: [
      {
        url: "http://api.empresa.digicom.com.gt/api/v1",
      },
    ],
  },
  apis: ["./routes/api.js", "./controllers/usersController.js"], 
};

const specs = swaggerJsdoc(options);

fs.writeFile("./swagger.json", JSON.stringify(specs, null, 2), (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Archivo swagger.json generado correctamente.");
});
