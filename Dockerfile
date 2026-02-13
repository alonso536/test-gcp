# Base stage
FROM node:22-alpine AS base

# Install openssl for Prisma
RUN apk add --no-cache openssl

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies and generate Prisma client
RUN npm install
RUN npx prisma generate

# Build stage
FROM base AS build

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:22-alpine AS production

# Install openssl for Prisma
RUN apk add --no-cache openssl

WORKDIR /usr/src/app

# Copy production dependencies from base (optional optimization: only copies necessary things)
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=base /usr/src/app/package*.json ./
COPY --from=base /usr/src/app/prisma ./prisma/

# Copy built application from build stage
COPY --from=build /usr/src/app/dist ./dist

# Expose port
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/src/main.js"]
