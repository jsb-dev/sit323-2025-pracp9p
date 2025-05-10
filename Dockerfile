# Dockerfile
# Use official Node.js image as the base runtime environment
FROM node:20-alpine

# Set working directory for the app, in this case the calculator microservice from task 4.1P
WORKDIR /calculator_microservice

# Copy package files and install dependencies
# This provides all the necessary packages for our app
COPY calculator_microservice/package*.json ./
RUN npm install

# Copy the rest of the app files in the working directory
COPY calculator_microservice/ ./

# Expose the service port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
