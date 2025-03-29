import { OpenAPIObject } from '@nestjs/swagger'
import axios from 'axios'

async function fetchSwaggerDocument(serviceUrl: string): Promise<OpenAPIObject | null> {
    try {
        const response = await axios.get<OpenAPIObject>(serviceUrl, {
            timeout: 5000,
        })
        if (response.status === 200 && response.data.paths && response.data.components) {
            return response.data
        }
        console.error(`Invalid Swagger document from ${serviceUrl}`)
        return null
    } catch (error) {
        console.error(`Error fetching Swagger document from ${serviceUrl}: ${error.message}`)
        return null
    }
}

function mergeSwaggerDocuments(baseDocument: OpenAPIObject, additionalDocument: OpenAPIObject): OpenAPIObject {
    const result = {
        ...baseDocument,
        paths: { ...baseDocument.paths, ...additionalDocument.paths },
        components: {
            schemas: {
                ...baseDocument.components?.schemas,
                ...additionalDocument.components?.schemas,
            },
        },
    }
    return result
}

export { fetchSwaggerDocument, mergeSwaggerDocuments }
