# Notes Master

Fast, lightweight note‑taking built on the **MERN stack** — designed to help you capture ideas quickly and keep them organized without getting in your way.

**Live demo:** https://notes-master-ttiv.onrender.com

---

## Features

- **Fast & lightweight** experience
- Built with the **MERN stack** (MongoDB, Express, React, Node.js)

---

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Caching / KV (optional):** Upstash Redis (REST)

---

## Getting Started

### Prerequisites

- **Node.js** (LTS recommended)
- **npm**
- **MongoDB** (local instance or hosted)

### Environment Variables

Create a `.env` file in the project root and set:

```bash
MONGO_URL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NODE_ENV=
```

> Tip: If you don’t plan to use Upstash Redis, leave the Redis variables unset only if the app supports it.

---

## Install

```bash
npm install
```

---

## Development

Run locally in development mode:

```bash
npm run dev
```

---

## Build

Create a production build:

```bash
npm run build
```

---

## Production

If your project is configured to run the built app with a start script, you can add/use:

```bash
npm start
```

(If `npm start` isn’t defined, check `package.json` for the intended production command.)

---

## Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "Add my feature"`
4. Push to your fork: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

No license specified yet. If you want, add a `LICENSE` file (MIT is a common choice for open source).

---

## Author

- **codemechie** — https://github.com/codemechie
