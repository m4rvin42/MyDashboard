# MyDashboard

This project now consists of a React frontend and a small Express backend.
Both services are built with Docker and orchestrated via `docker-compose`.
The helper scripts start the compose stack while injecting the host's public IP
address via the `PUBLIC_IP` environment variable.

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
to build and start both containers. The frontend is available on
[http://localhost:8080](http://localhost:8080) and the backend on
[http://localhost:3000](http://localhost:3000). The current IP is displayed in
the "Configure" link.

The backend exposes a `/api/logout` endpoint that clears the mail widget
authentication token so the next mail fetch will require logging in again.

