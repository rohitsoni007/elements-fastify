'use strict'

const Fastify = require('fastify')
const elements = require('../src/index')

describe('elements-fastify plugin', () => {
  test('works correctly', async () => {
    const fastify = Fastify()
    fastify.register(elements, {
      apiDescriptionUrl: '/openapi.json'
    })

    await fastify.ready()
    
    const response = await fastify.inject({
      method: 'GET',
      url: '/docs'
    })
    
    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toMatch('text/html')
  })

  test('requires apiDescriptionUrl', async () => {
    const fastify = Fastify()
    fastify.register(elements, {})

    await expect(fastify.ready()).rejects.toThrow('apiDescriptionUrl is required')
  })

  test('accepts title option', async () => {
    const fastify = Fastify()
    fastify.register(elements, {
      apiDescriptionUrl: '/openapi.json',
      title: 'Test API Documentation'
    })

    await fastify.ready()
    
    const response = await fastify.inject({
      method: 'GET',
      url: '/docs'
    })
    
    expect(response.statusCode).toBe(200)
    expect(response.payload).toMatch('<title>Test API Documentation</title>')
  })
})