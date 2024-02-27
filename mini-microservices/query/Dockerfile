# Use an official Node runtime as the parent image
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install any dependencies
RUN npm install

# Bundle the source code inside the Docker image
COPY . .

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 4002

# Define the command to run the app
CMD [ "npm", "start" ]
