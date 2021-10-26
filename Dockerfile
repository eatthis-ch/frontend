FROM docker.io/node:16-slim AS builder

# Prepare env
WORKDIR /app
RUN mkdir /app/bin

# Get Source Code into image
COPY . .

## Build process
RUN npm i --production && \
    npm i -g @vercel/ncc && \
    ncc build index.js -o bin

############# Final image #############
FROM docker.io/node:16-alpine
LABEL MAINTAINER technat@technat.ch

## non-root stuff
USER node
WORKDIR /home/node/

### ENV Vars
ENV NODE_ENV developemnt

## App binary
COPY --from=builder /app/bin/index.js .

EXPOSE 8080

ENTRYPOINT [ "node", "/home/node/index.js"]