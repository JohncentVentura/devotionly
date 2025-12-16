# Devotionly

A digital devotion app for writing, organizing, and tracking on personal bible devotions.

## Tools & Commands

Next.js

- npx create-next-app@latest

React

- npm add react-hot-toast

Typescript

Tailwind CSS

Shadcn UI

- npx shadcn@latest init
- npx shadcn@latest add button
- npm install next-themes
- npx shadcn@latest add https://shadcnui-blocks.com/r/hero-01.json
- npx shadcn@latest add https://www.shadcnui-blocks.com/r/table-01.json
- npx shadcn@latest add popover
- npx shadcn@latest add command
- npx shadcn@latest add card
- npx shadcn@latest add skeleton
- npx shadcn@latest add alert-dialog
- npx shadcn@latest add label
- npx shadcn@latest add textarea
- npx shadcn@latest add input
- npx shadcn@latest add https://shadcnui-blocks.com/r/features-01.json
- npx shadcn@latest add https://shadcnui-blocks.com/r/navbar-02.json

Neon

- https://neon.com/
- npm install @neondatabase/serverless
- When creating data inside neon, go to console.neon.tech Dashboard > SQL Editor > query UPDATE "Devotions" SET id = replace(id, E'\t', ''); > press Run
- When deploying, go to console.neon.tech Dashboard > Auth > Configuration > Domains > Your trusted domains > Type the domain name > press Add domain

Stack Auth

- npx @stackframe/init-stack . --no-browser

Prisma

- When deploying, go to package.json > scripts > add "postinstall": "prisma generate"
- npm install -D prisma (Same as npm install prisma --save-dev)
- npx prisma init (Creates prisma folder, .env, & prisma.config.ts)
- npx prisma generate (Execute after creating a new modal & creates generated/prisma folder & files)
- npx prisma db push
- npx prisma studio (Optional to view database)
- (Create a typescript file & paste PrismaClient from prisma.docs)
- npm i @prisma/adapter-pg
- npm install @prisma/client

Uploadthing

- https://docs.uploadthing.com/getting-started/appdir
