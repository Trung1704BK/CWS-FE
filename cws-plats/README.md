# Plats CWS

## Requirements
- node: >= 18
- install pnpm

## Hướng dẫn deploy server dev

1. Copy .env-example .env

```
cp .env-example .env
```

2. Build

```
### Local
- pnpm i && pnpm build && pnpm run start

### Server dev
pnpm i && pnpm dev

```

3. Run pm2

```
- cd /var/www/plats/cws
- pm2 delete dev-cws
- pm2 start pnpm --name "dev-cws" -- start
```