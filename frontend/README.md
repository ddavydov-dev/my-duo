# My Duo

An open-source clone of language learning app [Duolingo](https://www.duolingo.com/) with additional functionality of adding custom lessons.

## Adding a skill

Your first lesson you can add by going to Constructor page. Everything you need to do there is to:

    1. Set skill title

    2. Go to lesson and choose a type

    3. Fill out the fields how you want them to be showed in learning mode.

    4. Click the button Save (if it's not clickable, then you didn't feel all the fields)

## Tech Stack

### Frontend

- TypeScript
- React
- React Query
- Vite

### Backend

- TypeScript
- Fastify

#### Testing

- Vitest
- React Testing Library
- Playwright

### DB

- PostgreSQL (users-projects-lessons)
- MongoDB (steps)

### Other

- Github Actions
- Docker
- Zod (possibly)
- Sentry
- (something for logging)

### New features

- Email with stats + Settings where you can change your data
- Add i18n