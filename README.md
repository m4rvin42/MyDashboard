# MyDashboard


This project now consists of a React frontend and a small Express backend.
Both services are orchestrated via `docker-compose`.
Prebuilt images are pulled from GitHub Container Registry, and the helper
scripts start the stack while injecting the host's public IP address via the
`PUBLIC_IP` environment variable.

The Docker images referenced in the compose files live in GitHub Container
Registry (GHCR) and may require authentication. Log in using your GitHub
credentials before starting the stack:

```bash
echo <token> | docker login ghcr.io -u <github-username> --password-stdin
```

Make sure to run the helper script as the same user who performed the login
(avoid `sudo` if possible).

This project consists of a React frontend and a small Express backend.
Both services are built with Docker and orchestrated via `docker-compose`.
The compose file passes the host's IP address to the containers through the
`PUBLIC_IP` environment variable. You can provide this value via a `.env` file
or by exporting the variable before running Compose.


## Usage

### Linux

```sh
./start_dashboard.sh
```

### Windows

```bat
start_dashboard.bat
```


Each script queries the public IP with `curl` and then runs `docker compose`
to start both containers. Use the `dev` profile if you want to rebuild the
images locally:

```sh
docker compose -f docker-compose.yml -f docker-compose.dev.yml --profile dev up --build
```

The frontend is available on

The Windows batch script resolves the public IP automatically. The Linux script
contains a placeholder IP; adjust it or set `PUBLIC_IP` yourself. After starting
the stack the frontend is available on

[http://localhost:8080](http://localhost:8080) and the backend on
[http://localhost:3000](http://localhost:3000). The configuration page is
accessible via the QR code shown on the dashboard.

The backend shares one authentication session for all clients and now refreshes
access tokens automatically.

The default layout resides in `dashboard/src/layout.js`. When you save changes
from the configuration page the backend writes them to `layout.json`.

## GitHub Actions

This repository includes a workflow that builds Docker images for both the dashboard and the backend. It runs on every push to `main` and also nightly via a cron schedule. The workflow pushes the containers to GHCR and tags them as `latest` and `v<run_number>`.

Example of pulling a specific build:

```sh
docker pull ghcr.io/<owner>/dashboard:v123
docker pull ghcr.io/<owner>/backend:v123
```

## Automatic Updates

The compose stack now includes a [Watchtower](https://containrrr.dev/watchtower/)
service that periodically checks for new container images and restarts the
frontend and backend when updates are available.

