# Task Stack

A full-stack app for managing projects and their tasks: create projects, drill into a project to manage its task board, and track progress across To Do, In Progress, and Done.

## Features

- **Login** – username/password checked against the database (passwords are stored hashed).
- **Projects** – create projects, browse them as cards, rename/re-describe a project inline (double-click to edit), and delete a project (its tasks are deleted with it).
- **Project details** – per-project task board split into To Do / In Progress / Done tabs.
- **Tasks** – add, edit, delete, and change the status of tasks, each with a name, description, priority, and deadline.
- **Quick-peek sidebar** – jump to any project from a slide-out drawer.

All data is stored in MongoDB.

## Tech stack

- **Frontend:** [React 19](https://react.dev/) + [Vite](https://vite.dev/), [Redux Toolkit](https://redux-toolkit.js.org/), [React Router](https://reactrouter.com/), [MUI](https://mui.com/), [React Hook Form](https://react-hook-form.com/)
- **Backend:** Node.js + [Express](https://expressjs.com/), organized as **Controllers → Services → Models**
- **Database:** MongoDB (Atlas) with [Mongoose](https://mongoosejs.com/)
- **Docker** Compose for running the backend and frontend

## Getting started

The app runs with Docker, so nothing needs to be installed locally.

1. Create a free cluster in [MongoDB Atlas](https://www.mongodb.com/atlas), add a database user, and allow your IP under *Network Access*.
2. Copy `backend/.env.example` to `backend/.env` and put your connection string in `MONGO_URI`.
3. Start the backend (`http://localhost:3000`) and the frontend (`http://localhost:5173`):

```bash
docker compose up --build
```

4. (First time only) create the demo user and demo data. **This clears the users, projects and tasks collections.**

```bash
docker compose exec backend npm run seed
```

5. Open `http://localhost:5173` and log in.

**Demo login:** username `yael`, password `1234`.

After editing `backend/.env`, recreate the container: `docker compose up -d --force-recreate backend`.

## Backend structure

```
backend/
  server.js        # connects to MongoDB and starts the server
  app.js           # Express app: middleware, routes, error handler
  routes/          # maps URLs to controller functions
  controllers/     # handles the request/response (HTTP only)
  services/        # business logic and database calls
  models/          # Mongoose schemas: User, Project, Task
  scripts/seed.js  # demo data
```

## API

| Method | Path                           | Description                  |
| ------ | ------------------------------ | ---------------------------- |
| POST   | `/api/auth/login`              | Log in                       |
| GET    | `/api/projects`                | List projects                |
| POST   | `/api/projects`                | Create a project             |
| PUT    | `/api/projects/:id`            | Update name/description      |
| DELETE | `/api/projects/:id`            | Delete a project and its tasks |
| GET    | `/api/projects/:id/tasks`      | List a project's tasks       |
| POST   | `/api/projects/:id/tasks`      | Create a task                |
| GET    | `/api/tasks`                   | List all tasks               |
| PUT    | `/api/tasks/:id`               | Update a task's details      |
| PATCH  | `/api/tasks/:id/status`        | Change a task's status       |
| DELETE | `/api/tasks/:id`               | Delete a task                |

## Frontend scripts

| Command           | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`       | Start the Vite dev server with HMR   |
| `npm run build`     | Build for production                 |
| `npm run preview`   | Preview the production build locally |
| `npm run lint`      | Run ESLint                           |

## Routes

| Path                     | Page                          |
| ------------------------- | ----------------------------- |
| `/`                        | Login                          |
| `/show-projects`           | Projects list                  |
| `/new-project`             | Create a project               |
| `/show-projects/:id`       | Project details & task board   |
