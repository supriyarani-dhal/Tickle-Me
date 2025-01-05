# Tickle Me

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Demo

see this live at here - https://tickle-me.vercel.app/

## Features

- Signup/ Login through verification code via email
- The user can fetch all the messages coming from anyone
- The user's unique link can be copied by clipboard and anyone can message the user via this link .
- the user can fetch all the messages but can't know who is the sender.
- Someone can also takes help of the AI for generating the messages .

## Tech Stack

**In this Next.js application, the frontend and backend are tightly integrated within the same project.**

**frontend:** defined under the _app_ directory

**backend:** in the app/api directory

**Deployment:** [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

**Others:**

- for email verification : nodemailer and [react email](https://react.email/docs/integrations/nodemailer)
- for authentication , [NextAuth.js](https://next-auth.js.org/providers/credentials)
- for ui design [shadcn ui](https://ui.shadcn.com/)
- Google's generative AI api

## Screenshots

![Tickle me](https://github.com/supriyarani-dhal/Tickle-Me/blob/main/public/tickle-me.png)

## Feedback

If you have any feedback, please reach out to us at supriyadhal50@gmail.com

## Made by

- [@supriyarani-dhal](https://github.com/supriyarani-dhal)

## Run Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
