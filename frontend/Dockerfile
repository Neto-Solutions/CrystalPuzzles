FROM node:22.1.0-alpine
WORKDIR /app
COPY package.json ./
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "start"]
