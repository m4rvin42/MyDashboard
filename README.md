# MyDashboard

This project contains a small React dashboard served from a Docker container.

Two helper scripts are provided to build and run the container while injecting
the host's public IP address via the `PUBLIC_IP` environment variable.

## Usage

### Linux

```sh
./start_dashboard.sh
```

### Windows

```bat
start_dashboard.bat
```

Each script queries the public IP with `curl`, builds the Docker image and runs
the container with the retrieved IP. The application displays the IP inside the
"Configure" link.


## Backend Server

A simple Express backend is provided in the `backend` directory. It exposes a
`/test` endpoint on port `3000`.

### Running with Docker Compose

To start both the dashboard and backend simultaneously run:

```sh
./start_services.sh
```

The dashboard will be available on [http://localhost:8080](http://localhost:8080)
and the backend on [http://localhost:3000/test](http://localhost:3000/test).
