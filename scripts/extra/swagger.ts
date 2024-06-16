import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Backend API',
    description: 'Api Documentation',
    version: '0.0.1',
  },
  host: `localhost:${process.env.PORT}/api/v1`,
  schemes: ['http'],
};

const outputFile = './src/swagger.docs.json';
const endpointsFiles = ['./src/routes/index.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);
