FROM node:alpine3.18 as builder

ENV NODE_ENV=production

WORKDIR /app
COPY package*.json ./
RUN npm i --omit=dev
COPY . .

COPY fonts /usr/share/fonts/Additional 
RUN apk --update --upgrade --no-cache add fontconfig ttf-freefont font-noto terminus-font \ 
    && fc-cache -f \ 
    && fc-cache -fv \ 
    && fc-list | sort 

FROM node:alpine3.18 
COPY --from=builder /app /app
WORKDIR /app
CMD [ "node", "app.js"]