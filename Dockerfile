# Use the official Bun image as the base image
FROM oven/bun:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and bun.lockb (if available) to the working directory
COPY package.json bun.lockb ./

# Install the dependencies
RUN bun install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on (adjust according to your app's configuration)
EXPOSE 4300

# Define the command to run the application
CMD ["bun", "src/index.ts"]
