import { SwaggerOptions } from "@fastify/swagger";
import { FastifyRegisterOptions } from "fastify";

export const openAPIdoc: FastifyRegisterOptions<SwaggerOptions> = {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Tech Interview 0624',
        description: 'OpenAPI documentation for the technical interview 0624',
        version: '0.1.0'
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server'
        }
      ],
      tags: [
        { name: 'user', description: 'User related end-points' },
      ],
      components: {},
      externalDocs: {
        url: 'https://github.com/PaoloEG/tech_interview_0624',
        description: 'Find more info here'
      }
    }
  }