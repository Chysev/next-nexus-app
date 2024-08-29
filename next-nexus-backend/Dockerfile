FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN \
  if [ -f yarn.lock ]; then yarn run build:production; \
  elif [ -f package-lock.json ]; then npm run build:production; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build:production; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV BACKEND_PORT 5000
ENV BACKEND_BASE_URL http://localhost:5000
ENV FRONTEND_BASE_URL http://localhost:3000

ENV DATABASE_URL mysql://root:@localhost:3306/next-horizon-app

ENV REDIS_URL redis://localhost:6379

ENV CLOUDINARY_NAME YourCloudinaryName
ENV CLOUDINARY_KEY YourCloudinaryKey
ENV CLOUDINARY_SECRET YourCloudinarySecret

ENV NEXUS_KEY YourNexusKey

ENV JOSE_PRIVATE_KEY="YourJosePrivateKey"
ENV JOSE_PUBLIC_KEY="YourJosePublicKey"
ENV JWT_PRIVATE_KEY="YourJWTPrivateKey"
ENV JWT_PUBLIC_KEY="YourJWTPublicKey"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 NextNexusBackend

RUN mkdir build
RUN chown NextNexusBackend:nodejs build

COPY --from=builder --chown=NextNexusBackend:nodejs /app/build ./
COPY .env.prod ./app/build
COPY --from=builder --chown=NextNexusBackend:nodejs /app/prisma ./prisma

USER NextNexusBackend

EXPOSE 5000

CMD ["node", "build/cluster.js"]
