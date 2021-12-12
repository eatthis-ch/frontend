FROM docker.io/node:16-slim AS builder

# Prepare env
WORKDIR /app

# Get Source Code into image
COPY . .

## Build process
RUN npm install && \
    npm run build --prod

############# Final image #############
FROM docker.io/nginx:alpine
LABEL MAINTAINER technat@technat.ch
## Get app in
COPY --from=builder /app/dist/eatthis /usr/share/nginx/html

