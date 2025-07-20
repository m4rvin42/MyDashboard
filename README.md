# MyDashboard

This project now consists of a React frontend and a small Express backend.
Both services are orchestrated via `docker-compose`.
Prebuilt images are pulled from GitHub Container Registry, and the helper
scripts start the stack while injecting the host's public IP address via the
`PUBLIC_IP` environment variable.

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
[http://localhost:8080](http://localhost:8080) and the backend on
[http://localhost:3000](http://localhost:3000). The current IP is displayed in
the "Configure" link.

