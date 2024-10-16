FROM node:bookworm as builder

ENV NODE_ENV=production

WORKDIR /app
COPY package*.json ./
RUN npm i --omit=dev
COPY . .

COPY fonts /usr/share/fonts 
RUN fc-cache -f \ 
    && fc-cache -fv \ 
    && fc-list | sort 

FROM node:bookworm 
COPY --from=builder /app /app
WORKDIR /app
CMD [ "node", "app.js"]