# sit323-2025-prac6p

## My Approach

Extending the previous calculator microservice, I'll be configuring a basic kubernetes deployment using the docker image I created. The first step involves preparing the necessary files, deployment.yaml and service.yaml.

## `deployment.yaml`

This file is required for determining how the app (microservice) is deployed in the kubernetes cluster. This requires defining the port that the service listens on and binding the container image to the service pod. Further, the number of pods used for the cluster needs to be clarified.

Now that the file is prepared, I need to apply the deployment strategy to the kubernetes cluster in the CLI.

## `service.yaml`

Now that the cluster deployment strategy has been set, I need to facilitate communication between the pods and external network. This will require a port for the service to listen on, the port for the container image that the microservice is listening on, and a port for external network access from outside the cluster.

Now that the file is completed, I need to apply the service to the cluster in the CLI, run and provide working evidence.

After having problems with my previous kubectl configuration, I opted for the snap install and created the cluster with kinder, which absolved the errors I was receiving when testing the cluster. I proceeded to register the kubernetes manifest with the cluster and deployed it with the docker service I created previously. This allowed me to port-forward the service for a local test with curl, which returned the expected result.

## sit323-2025-prac5p (previous README)

## Getting Started

- The original project cloned for the microservice is a simple Node.js REST Server
- Simply `npm install` from the microservice root to install its dependancies
- Don't forget to make sure the Docker daemon is running before testing the image

## Method

- This project outlines two specific files that are required as part of the image composition, `Dockerfile` and `docker-compose.yml` (note the .yml extension, a data serialisation language for our instructions)
- I have set up the project's microservice deps and left blank files for the Docker configuration for the initial commit
- The next step is to push the developed branches to dev and get to work on the docker configuration
- After completing the base working configuration for the Docker config, the next step is to document the configuration as proof of concept

### Dockerfile

The cloned app only requires a compatible Node.JS runtime version to install its dependancies and run the server index. Its container would require:

- A runtime image
- A specified working directory (makes for better organisation/management)
- Runtime command

### Docker Composition

The Dockerfile defines the single container image, but to compose this effectively, we need to describe how it should behave in a multi-container context, i.e., how new containers should be created, destroyed, etc.

- Define the calculator as its own docker service
- Configure the working directory and port config, define basic restart policy and build type (prod)
- Now the service can be mounted to its respective container directory and issued a run command

### Summary

- Cloned app
- Established Git repo
- Defined docker image, including app deps and runtime config
- Defined composition behaviour in service context
- Established Docker repo
- Pushed code and image to corresponding repositories

After completing these steps I updated the project's composition behaviour to draw on the registry image instead of the local image, clarifying that it can be pulled and deployed remotely from anywhere.
