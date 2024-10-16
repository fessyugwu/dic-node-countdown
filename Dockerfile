FROM node:bookworm as builder

ENV NODE_ENV=production

WORKDIR /app
COPY package*.json ./
COPY MicrogrammaEFExtendBold.otf ./

RUN npm i --omit=dev
COPY . .

RUN cp MicrogrammaEFExtendBold.otf /usr/share/fonts/
RUN fc-cache -f \ 
    && fc-cache -fv \ 
    && fc-list | sort 

FROM node:bookworm 
COPY --from=builder /app /app
WORKDIR /app
CMD [ "node", "app.js"]