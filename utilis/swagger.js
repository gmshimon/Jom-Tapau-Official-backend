const express = require('express')
const swaggerJSDoc = require('swagger-jsdoc')
const SwaggerUi = require('swagger-ui-express')
const m2s = require('mongoose-to-swagger')

const Foods = require('../Models/Food/Food.modules')

const foodSchema = m2s(Foods)
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rest API Documentation',
      version: '2.0'
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: foodSchema
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./Models/User/user.route.js', './Models/User/User.modules.js']
}

const swaggerSpecs = swaggerJSDoc(options)

function swaggerDocs (app, port) {
  // swagger page
  app.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpecs))

  // Docs in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpecs)
  })
}

module.exports = swaggerDocs
