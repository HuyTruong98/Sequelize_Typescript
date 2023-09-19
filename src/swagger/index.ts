import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  info: {
    title: 'API Food App',
    version: '1.0.0',
    description: 'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
  },
  host: 'localhost:8080',
  basePath: '/api',
  schemes: ['http'],
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['src/swagger/auth.swagger.yaml', 'src/swagger/user.swagger.yaml'],
};

export const swaggerSpec = swaggerJSDoc(options);
