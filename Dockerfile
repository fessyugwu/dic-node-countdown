FROM node:bookworm AS builder

ENV NODE_ENV=production

WORKDIR /app
COPY package*.json ./
COPY MicrogrammaEFExtendBold.otf ./

RUN npm i --omit=dev
COPY . .

FROM node:bookworm 
USER node
COPY --from=builder --chown==node:node /app /app

WORKDIR /app
COPY MicrogrammaEFExtendBold.otf /usr/share/fonts/
RUN fc-cache -f \ 
    && fc-cache -fv \ 
    && fc-list | sort 
EXPOSE 3120

CMD [ "node", "app.js"]