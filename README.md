# frontend

Note: app has to handle sigterm signals and shutdown gracefully (this is whay makes it happy running in kubernetes)

## CD
On all branches an action automatically builds container images based on the branchname and pushes them to a registry.

Get the image:
```bash
docker pull eatthis/frontend:develop # Current unstable version
docker pull eatthis/frontend:main # Current stable version
```

## Development
To develop the frontend you'll need a node environment.

### Build locally
Builds are done using docker. If you have docker installed run the following command to build an image locally:
```bash
docker build -t eatthis/frontend:develop .
```

## References
- [Graceful shutdown](https://blog.risingstack.com/graceful-shutdown-node-js-kubernetes/)
- [Node Dockerfile](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Node Docker Best Practieses](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [Node minimal Images](https://webbylab.com/blog/minimal_size_docker_image_for_your_nodejs_app/)
