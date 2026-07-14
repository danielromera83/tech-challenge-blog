FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --include=dev

COPY . .

ENV DATABASE_URL="postgresql://mock:mock@localhost:5432/mock"
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
