FROM node:bookworm AS builder

ENV NODE_ENV=production

WORKDIR /app
COPY package*.json ./
COPY MicrogrammaEFExtendBold.otf ./

RUN npm i --omit=dev
COPY . .

FROM node:bookworm 
COPY --from=builder /app /app
WORKDIR /app
RUN chmod -R 775 '/public'
COPY MicrogrammaEFExtendBold.otf /usr/share/fonts/
RUN fc-cache -f \ 
    && fc-cache -fv \ 
    && fc-list | sort 
EXPOSE 3120
CMD [ "node", "app.js"]