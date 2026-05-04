FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
# Install only production dependencies
RUN npm ci --omit=dev
COPY server.js ./
COPY storage ./storage
EXPOSE 3000
CMD ["node", "server.js"]
