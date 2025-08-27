# Use official Node.js LTS image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package.json first and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose service port
EXPOSE 4002

# Start the app
CMD ["npm", "start"]
