# Use the official Node.js Alpine image as base
FROM node:alpine

# Set environment variables
# ENV CI=true
# ENV WDS_SOCKET_PORT=0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Command to start the React application
CMD ["npm", "run", "dev"]
