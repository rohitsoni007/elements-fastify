const fp = require('fastify-plugin');
const { getAssetPath } = require('elements-dist');

/**
 * Fastify plugin for serving Stoplight Elements API documentation with embedded static assets
 * @param {Object} fastify - Fastify instance
 * @param {Object} options - Configuration options
 * @param {string} options.apiDescriptionUrl - URL to the OpenAPI specification
 * @param {string} [options.title='API Documentation'] - Title for the documentation page
 * @param {string} [options.path='/docs'] - Path to serve the documentation
 * @param {Function} next - Callback function
 */
function elements(fastify, options, next) {
  // Validate required options
  if (!options.apiDescriptionUrl) {
    return next(new Error('apiDescriptionUrl is required'));
  }

  // Set default options
  const opts = {
    title: 'API Documentation',
    path: '/docs',
    ...options,
  };

  // Get the path to Elements static assets
  const elementsPath = getAssetPath();

  // Register @fastify/static plugin to serve static assets
  fastify.register(require('@fastify/static'), {
    root: elementsPath,
    prefix: '/', // Optional: default '/'
    decorateReply: false, // Don't decorate the reply object
  });

  // Serve the HTML page for GET requests
  // Register route without trailing slash
  fastify.get(opts.path, (request, reply) => {
    reply.type('text/html').send(`
      <!DOCTYPE html>
      <html>
      <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <title>${opts.title}</title>
      <!-- Stoplight Elements CSS -->
      <link rel="stylesheet" href="./styles.min.css" />
      <!-- Stoplight Elements JS -->
      <script type="module" src="./web-components.min.js"></script>
      <style>
        html, body {
          height: 100%;
          margin: 0;
        }
      </style>
      </head>
      <body>
      <elements-api
          apiDescriptionUrl="${opts.apiDescriptionUrl}"
          router="hash"
          layout="sidebar"
      ></elements-api>
      </body>
      </html>
      `);
  });

  next();
}

module.exports = fp(elements, {
  fastify: '4.x - 5.x',
  name: 'elements-fastify',
});
