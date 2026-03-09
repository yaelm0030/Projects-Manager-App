# Task Stack

A React + Redux Toolkit app for managing projects and their tasks: create projects, drill into a project to manage its task board, and track progress across To Do, In Progress, and Done.

## Features

- **Login gate** – simple username/password form guarding access to the app (see demo credentials below).
- **Projects** – create projects, browse them as cards, rename/re-describe a project inline (double-click to edit), and delete a project.
- **Project details** – per-project task board split into To Do / In Progress / Done tabs.
- **Tasks** – add, edit, delete, and change the status of tasks, each with a name, description, priority, and deadline.
- **Quick-peek sidebar** – jump to any project from a slide-out drawer without leaving the current page.

All state is held in Redux (no backend) — data resets on page reload.

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/) / [React Redux](https://react-redux.js.org/)
- [React Router](https://reactrouter.com/)
- [MUI](https://mui.com/) (Material UI) + Emotion
- [React Hook Form](https://react-hook-form.com/)
- ESLint

## Getting started

```bash
npm install
npm run dev
```

The app runs at the URL Vite prints (default `http://localhost:5173`).

**Demo login:** username `yael`, password `1234`.

## Scripts

| Command           | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`       | Start the Vite dev server with HMR   |
| `npm run build`     | Build for production                 |
| `npm run preview`   | Preview the production build locally |
| `npm run lint`      | Run ESLint                           |

## Project structure

```
src/
  components/   # Pages and dialogs (Login, ShowProjects, ProjectDetails, task dialogs, ...)
  redux/        # Redux Toolkit slices (projects, tasks, user, running-number counters) + store
  assets/       # Logos and icons
  theme.js      # MUI theme
```

## Routes

| Path                     | Page                          |
| ------------------------- | ----------------------------- |
| `/`                        | Login                          |
| `/show-projects`           | Projects list                  |
| `/new-project`             | Create a project               |
| `/show-projects/:id`       | Project details & task board   |
