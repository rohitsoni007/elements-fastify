const fastify = require('fastify')({ logger: true });
const path = require('path');
const fs = require('fs').promises;
const elements = require('elements-fastify');

// Register the elements-fastify plugin
fastify.register(elements, {
  apiDescriptionUrl: '/petstore.json',
  title: 'Petstore API Documentation',
  path: '/docs'
});

// Serve the petstore OpenAPI specification
fastify.get('/petstore.json', async (request, reply) => {
  // Serve the petstore.json file from the examples directory
  const petstorePath = path.join(__dirname, 'petstore.json');
  try {
    const data = await fs.readFile(petstorePath, 'utf8');
    reply.type('application/json').send(data);
  } catch (err) {
    reply.status(500).send({ error: 'Failed to read petstore.json' });
  }
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log(`Documentation available at http://localhost:3000/docs`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();