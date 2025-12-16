# elements-fastify 🚀

Fastify Plugin for Stoplight Elements API Documentation - Beautiful, Interactive, and Zero-Config API Documentation for Fastify Apps

Enhance your Fastify applications with stunning, interactive API documentation using Stoplight Elements. This plugin seamlessly integrates with your existing Fastify server to provide a professional documentation experience with minimal setup.

## 🌟 Features & Benefits

* ✅ Interactive API Console - Test endpoints directly in the documentation
* ✅ Zero Configuration - Get started in seconds with minimal setup
* ✅ Beautiful UI - Modern, responsive design that developers love
* ✅ OpenAPI 3.x Support - Full compatibility with OpenAPI specifications
* ✅ Embedded Assets - No external dependencies or CDN requirements
* ✅ Customizable - Easily configure titles and API spec URLs
* ✅ SEO Optimized - Built-in meta tags for better search engine indexing

## 📦 Installation

```bash
npm install elements-fastify
```

## 🚀 Quick Start

### Basic Setup

```javascript
const fastify = require('fastify')({ logger: true });
const elements = require('elements-fastify');

// Register the elements-fastify plugin
fastify.register(elements, {
  apiDescriptionUrl: '/openapi.json',
  title: 'My API Documentation',  // Optional: custom page title
  path: '/docs'  // Optional: custom path (defaults to '/docs')
});

// Serve your OpenAPI specification
fastify.get('/openapi.json', (request, reply) => {
  reply.sendFile('path/to/your/openapi.json');
});

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Documentation available at http://localhost:3000/docs`);
});
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| apiDescriptionUrl | string | Required | URL to your OpenAPI specification (JSON or YAML) |
| title | string | 'API Documentation' | Custom title for the documentation page |
| path | string | '/docs' | Path to serve the documentation |

## 💡 How It Works

1. The plugin serves both the static CSS and JavaScript files from the @stoplight/elements package and generates an HTML page that includes the Stoplight Elements web component
2. The web component fetches your OpenAPI specification and renders interactive documentation
3. Developers can browse endpoints, test APIs directly in-browser, and understand your API quickly

## 📄 Example OpenAPI Specification

Place your OpenAPI specification file in your project and serve it with Fastify:

```javascript
fastify.get('/openapi.json', (request, reply) => {
  reply.sendFile('public/openapi.json');
});
```

## 🔍 Keywords

Stoplight Elements, Fastify plugin, API documentation, OpenAPI documentation, Swagger alternative, Redoc alternative, interactive API docs, REST API documentation, developer portal, API explorer, Fastify.js documentation, API reference, documentation generator, API visualization, OpenAPI 3.0, OpenAPI 3.1

## 📄 License

MIT