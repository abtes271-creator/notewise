# 📝 NoteWise — Markdown Notes App

A clean, distraction-free markdown notes app built with React. Write in markdown, see it rendered live, organize with tags, and search across all your notes.

**🔗 Live Demo:** (https://notewise-five.vercel.app/)

## Features

- ✍️ Split-screen markdown editor with live preview
- 📖 Clean reading view with word count and reading time
- 🏷️ Tag system — add tags per note, browse by tag
- 🔎 Live search across note titles and content
- 💾 Auto-save as you type — no manual saving needed
- 📱 Responsive — works on mobile and desktop
- 🚀 Deployed on Vercel

## Tech Stack

- **React JS** — component-based UI
- **React Router** — client-side routing across 4 pages
- **react-markdown** — renders markdown to formatted HTML
- **Context API** — global notes state management
- **localStorage** — notes persist across sessions

## Pages

| Route         | Description                                    |
| ------------- | ---------------------------------------------- |
| `/`           | All notes grid with search and tag filters     |
| `/editor/:id` | Split-screen markdown editor with live preview |
| `/note/:id`   | Clean reading view of a rendered note          |
| `/tags/:tag`  | Browse all notes filtered by a specific tag    |

## Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/notewise.git
cd notewise
npm install
npm start
```

## Built By

**Abenet Tesfaye Haile** — Software Engineer at Awash Bank  
[LinkedIn](https://www.linkedin.com/in/abenet-tesfaye-539907407/) · [GitHub](https://github.com/abetes271-creator)
