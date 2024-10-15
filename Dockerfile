FROM node:alpine3.18 as builder

ENV NODE_ENV=production

WORKDIR /app
COPY package*.json ./
RUN npm i --omit=dev
COPY . .

FROM node:alpine3.18 
COPY --from=builder /app /app
WORKDIR /app
CMD [ "node", "app.js"]