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

