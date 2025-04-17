# fe/Dockerfile

FROM oven/bun

WORKDIR /app

COPY package* .

RUN bun install

COPY . .

EXPOSE 8080

CMD ["bun", "run", "dev"]
