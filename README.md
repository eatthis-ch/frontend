# frontend

Note: app has to handle sigterm signals and shutdown gracefully (this is whay makes it happy running in kubernetes)

## CD
On all branches an action automatically builds container images based on the branchname and pushes them to a registry.

## References
- [Graceful shutdown](https://blog.risingstack.com/graceful-shutdown-node-js-kubernetes/)
- [Node Dockerfile](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Node Docker Best Practieses](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [Node minimal Images](https://webbylab.com/blog/minimal_size_docker_image_for_your_nodejs_app/)
