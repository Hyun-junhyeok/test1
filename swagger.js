const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');
const options = {
    definition: {
        openapi : "3.0.0",
        info: {
            title: 'Spaus API 문서 테스트 버전',
            version: '1.0.0',
            description: 'Spaus API 문서 테스트 버전입니다.'
        },
        servers: [
            {
                url : "http://localhost:3000"
            }
        ]
    },
    apis: ['./routes/*.js']
};
const specs = swaggereJsdoc(options);
module.exports = {
    swaggerUi,
    specs
};
