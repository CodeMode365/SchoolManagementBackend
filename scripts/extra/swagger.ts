import fs from 'fs';
import { resolve } from 'path';
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Backend API',
    description: 'API Documentation',
    version: '0.0.1',
  },
  host: `localhost:${process.env.PORT || 4300}/api/v1`,
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
};

const outputFile = resolve(__dirname, '../../src/swagger.docs.json');
const endpointsFiles = ['./src/routes/index.ts'];

// Generate Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  // Read the generated JSON file
  const fileContent = fs.readFileSync(outputFile, 'utf8');
  const swaggerDocs = JSON.parse(fileContent);

  // Define the body parameter schema
  const param = {
    name: 'body',
    in: 'body',
    required: true,
    schema: {
      $ref: '#/components/schemas/ObjectSchema',
    },
  };

  // Add the ObjectSchema to components.schemas
  if (!swaggerDocs.components) {
    swaggerDocs.components = { schemas: {} };
  }
  swaggerDocs.components.schemas.ObjectSchema = {
    type: 'object',
  };

  // Add body parameter to all POST routes
  Object.keys(swaggerDocs.paths).forEach((route) => {
    if (swaggerDocs.paths[route].post) {
      swaggerDocs.paths[route].post.parameters =
        swaggerDocs.paths[route].post.parameters || [];
      swaggerDocs.paths[route].post.parameters.push(param);
    }
  });

  // Write the modified JSON back to the file
  fs.writeFileSync(outputFile, JSON.stringify(swaggerDocs, null, 2));
});
