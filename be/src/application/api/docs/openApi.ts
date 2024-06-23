import { FastifyDynamicSwaggerOptions, SwaggerOptions } from "@fastify/swagger"
import { FastifyRegisterOptions, FastifySchema } from "fastify"

type ConsumeType = "application/json" | "multipart/form-data"

type Tags = "auth" | "user" | "posts" | "following"

export const openAPIdoc: FastifyRegisterOptions<SwaggerOptions> = {
	openapi: {
		openapi: "3.0.0",
		info: {
			title: "Tech Interview 0624",
			description: "OpenAPI documentation for the technical interview 0624",
			version: "0.1.0"
		},
		servers: [
			{
				url: `http://localhost:${process.env["SERVER_PORT"] || 3000}`,
				description: "Development server"
			}
		],
		tags: [
			{ name: "auth", description: "Creation and Login urls" },
			{ name: "user", description: "User related end-points" },
			{ name: "posts", description: "Posts related end-points" },
			{ name: "following", description: "Follow related end-points" }
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					description: "User access token",
					scheme: "bearer",
					bearerFormat: "JWT"
				}
			}
		},
		externalDocs: {
			url: "https://github.com/PaoloEG/tech_interview_0624",
			description: "Find more info here"
		}
	}
}

export const createPathFields = (tag: Tags, secured: boolean, consumes: ConsumeType): FastifySchema => ({
	consumes: [consumes],
	produces: ["application/json"],
	tags: [tag],
	...(secured
		? {
				security: [{ bearerAuth: [] }]
			}
		: {})
})

export const securityPathField = {}
