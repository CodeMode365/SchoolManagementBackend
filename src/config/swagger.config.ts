import docs from '../swagger.docs.json';
import swaggerUi from 'swagger-ui-express';

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'School Backend API',
//       version: '0.0.1',
//       description: 'API Documentation for the School Backend',
//     },
//   },
//   apis: [path.resolve(__dirname, './routes/index.ts')],
// };
// const specs = swaggerJsDoc(options);

export const swaggerUI = swaggerUi.serve;
export const swaggerDocs = swaggerUi.setup(docs);
