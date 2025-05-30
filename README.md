# My Duo

An open-source inspired by [Duolingo](https://www.duolingo.com/) app where you can build your custom lessons.

## Adding a skill

Your first lesson you can add by going to Constructor page. Everything you need to do there is to:

    1. Set skill title

    2. Go to lesson and choose a type

    3. Fill out the fields how you want them to be showed in learning mode.

    4. Click the button Save (if it's not clickable, then you didn't feel all the fields)

## How to run locally (installed docker or an alternative is needed)

1. npm ci
2. supabase start
3. supabase functions serve
4. npm run dev

### New features (TODO)

- Email with stats + Settings where you can change your data
- Add i18n
- On register page there can be AI helping to define first modules with lessons related to your project
  - There can also be templates of different topics
- Lesson progress to be saved so you can quit in the middle of the lesson and continue any time later
- Generate challenges to repeat
- Generate "Exams"
- Emojies for skills
- Dark theme
- Add "Share" page
- Add error boundaries
- Add sorting for tailwind classes and imports
- Add husky with tests before commit

### List of solutions I'd reconsider

- Custom Page component used for preventing layout shifts during transition from a page with Navigation to a page without one.
