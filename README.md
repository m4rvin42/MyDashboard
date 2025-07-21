# MyDashboard

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

