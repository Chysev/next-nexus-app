FROM node:latest

WORKDIR /app

COPY package.json ./
COPY build ./build
COPY .env.prod ./
COPY prisma ./prisma

RUN npm install

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --allow-bad-names NextNexusBackend
RUN chown -R NextNexusBackend:nodejs /app/build

USER NextNexusBackend

EXPOSE 5000

CMD ["npm", "run", "production"]