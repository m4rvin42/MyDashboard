# MyDashboard

This project contains a small React dashboard served from a Docker container.

Two helper scripts are provided to build and run the dashboard container while
injecting the host's public IP address via the `PUBLIC_IP` environment variable.
They also start the backend mail server so everything runs with a single
command.

## Usage

### Linux

```sh
./start_dashboard.sh
```

### Windows

```bat
start_dashboard.bat
```

Each script installs backend dependencies if necessary, launches the Express
server and then starts the Docker image. The application displays the public IP
inside the "Configure" link.

## Backend server

The repository contains a minimal Express based backend under `server/`. It
returns sample mail data and enables CORS for the local dashboard. The helper
scripts automatically start this server, but you can also run it manually:

```sh
npm install --prefix server
npm start --prefix server
```

The server listens on [http://localhost:3001](http://localhost:3001) and
exposes `GET /api/mails` used by `MailWidget`.

