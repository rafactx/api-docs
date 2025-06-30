# Involves Stage API Reference

Available in:
[English](README.md) | [Português](README.pt-br.md)

This project is a professional, developer-friendly documentation portal for the Involves Stage API, focused on efficient integration processes and providing a clear and intuitive experience. Built with modern technologies such as VitePress, Vue.js, and Scalar, it emphasizes performance, interactivity, multi-language support, and maintainability.

---

## Quick Start

Follow these steps to quickly get the project up and running in your local environment.

### Prerequisites

* Node.js (>=18.0.0)
* pnpm (>=8.15.5)

### Installation

Clone the repository and enter the directory:

```bash
git clone https://github.com/rafactx/api-docs.git
cd api-docs
```

Install dependencies:

```bash
pnpm install
```

### Development Environment

Start the development server with hot-reloading:

```bash
pnpm run dev
```

Access the documentation at [`http://localhost:5173`](http://localhost:5173) or whichever port is available.

### Production Build

Generate a static version of the documentation:

```bash
pnpm run build
```

Generated files will be available at:

```plaintext
docs/.vitepress/dist
```

### Preview Production Build

Test the locally built version:

```bash
pnpm run preview
```

---

## Project Structure

```plaintext
.
├── docs/                             # VitePress Documentation
│   ├── .vitepress/                   # VitePress theme and configuration
│   │   ├── components/               # Custom Vue components
│   │   ├── theme/                    # Global CSS and custom styles
│   │   ├── config.ts                 # Main configurations (i18n, navbar, sidebar)
│   │   └── index.ts                  # Theme entry point
│   ├── public/                       # Static assets
│   │   ├── openapi-pt-br.json        # OpenAPI specification (Portuguese)
│   │   └── openapi.scalar.yaml       # Scalar API integration
│   ├── en/                           # Content in English
│   ├── es/                           # Content in Spanish
│   ├── fr/                           # Content in French
│   ├── pt/                           # Content in Portuguese (default)
│   └── index.md                      # Language redirection logic
├── .gitignore                        # Git exclusions
├── package.json                      # Dependencies and scripts
├── pnpm-lock.yaml                    # Lockfile for dependency consistency
├── pnpm-workspace.yaml               # pnpm workspace configuration
├── tsconfig.json                     # TypeScript configuration
├── vercel.json                       # Vercel deployment configuration
└── vite.config.ts                    # Vite build configuration
```

---

## Main Features

* **Interactive API Reference**: Directly test endpoints within the documentation using Scalar, with clear and comprehensive schemas.
* **Multi-language Support**: Documentation available in Portuguese, English, Spanish, and French, including automatic language detection.
* **Responsive Design**: Compatible with various devices and screen sizes.
* **Consistent Styling**: Interface inspired by best design practices, ensuring a professional and clean experience.
* **Optimized Performance**: Fast loading through modern techniques such as code splitting, lazy loading, and optimized builds.
* **Clear Authentication and Versioning Documentation**: Detailed explanations of HTTP Basic authentication and header-based API versioning.
* **Practical Examples**: Code snippets in JavaScript, Python, cURL, and PHP to enable quick and robust integrations.

---

## API Concepts

### Base URL

The base URL for all requests is:

```plaintext
https://{customerSubdomain}.involves.com/webservices/api/v3
```

### Authentication

The API uses HTTP Basic authentication. Encode your credentials in Base64 and include them in the header:

```http
Authorization: Basic <base64-credentials>
```

*Example*: for `user:password`, encode as `user:password | base64`.

### Versioning

Specify the API version you wish to use via the header:

```http
Accept-Version: 2020-02-26
```

### Error Handling

The API returns standard HTTP status codes along with detailed JSON error messages to assist in debugging and problem-solving:

```json
{
  "status": 400,
  "term": "ID_INVALIDO",
  "message": "The provided ID is invalid.",
  "details": [
    {
      "field": "id",
      "message": "The ID must be a valid integer."
    }
  ]
}
```

---

## Contributing

Contributions are encouraged and appreciated. Follow these steps to collaborate:

1. Fork the project.
2. Create a branch for your contribution:

```bash
git checkout -b feature/your-feature-name
```

3. Implement your changes.
4. Validate code quality and compliance:

```bash
pnpm run lint
pnpm run format
```

5. Commit your changes:

```bash
git commit -m 'feat: clear description of the functionality'
```

6. Push to your fork:

```bash
git push origin feature/your-feature-name
```

7. Open a Pull Request clearly describing your changes.

---

## License

This project currently does not have a defined license. For more details, see the `LICENSE` file (if available) or contact the project maintainer directly.
