import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js API',
      version: '1.0.0',
      description: 'Node.js API documentation',
    },
    servers: [
      {
        url: 'http://localhost:5001',
      },
    ],
    components: {
      schemas: {
        Definition: {
          type: 'object',
          properties: {
            word: {
              type: 'string',
              description: 'Word definition',
            },
            definition: {
              type: 'string',
              description: 'Definition of the word',
            },
          },
        },
        PopularTerm: {
          type: 'object',
          properties: {
            term: {
              type: 'string',
              description: 'Popular term',
            },
          },
        },
      },
    },
  },
  apis: ['./routers/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;