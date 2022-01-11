FROM docker.io/node:16-slim AS builder

# Prepare env
WORKDIR /app

# Get Source Code into image
COPY . .

## Build process
RUN npm install && \
    npm install -g @angular-cli && \
    ng build

############# Final image #############
FROM docker.io/nginx:alpine
LABEL MAINTAINER technat@technat.ch

## Override default virtualhost with our own
COPY default.conf /etc/nginx/conf.d/default.conf

## Get app in
COPY --from=builder /app/dist/eatthis /usr/share/nginx/html

