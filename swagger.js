const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts Api',
        description: 'Contacts Api'
    },
    host: 'localhost:8089',
    schemes: ['http', 'https']
};

const outputFile = "./swagger.json";
const endpointsFile = ['./routes/index.js'];

// this will generate swaggerAutogen.json
swaggerAutogen(outputFile, endpointsFile, doc)