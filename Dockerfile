# Use Node.js 20 Alpine as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install required system packages
RUN apk add --no-cache libc6-compat

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application (excluding node_modules)
COPY . .

# Build the application
RUN pnpm build

# Expose the port
EXPOSE 3000

# Ensure the app binds to all interfaces in containers
ENV HOSTNAME=0.0.0.0

# Start the application
CMD ["pnpm", "start"] 