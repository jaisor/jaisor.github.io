# Compiles the site and serves the production build for preview,
# using Vite's own `preview` server (matches what `npm run build` +
# `npm run preview` do locally, and the Node version CI builds with).
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
