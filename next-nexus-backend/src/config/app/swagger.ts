import path from "path";
import config from "./config";
import swaggerJsDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Next Nexus App",
    version: "1.0.0",
    description: "Next Nexus App Api Documentation",
  },
  servers: [
    {
      url: `http://localhost:5000/${config.api.baseRoute}/${config.api.version}`,
      description: "Local development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, "../../**/*.ts")],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
