# Live-reloading dev preview: the site's source is bind-mounted in via
# docker-compose.yml, so edits on the host show up without rebuilding
# the image. Run `docker compose up --build` (not `docker build` +
# `docker run`) to get the mount.
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
