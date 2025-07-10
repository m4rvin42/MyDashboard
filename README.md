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

### Configuration

Docker Compose loads variables from a file named `.env` in this directory.
Copy `\.env.sample` to `.env` and fill in your `MSAL_CLIENT_ID` and
`MSAL_TENANT_ID` values for the Azure AD app registration. The start scripts
already set `PUBLIC_IP` automatically, but you can override it in `.env` if
needed. Be sure there are **no spaces** around the `=` sign when defining the
variables. These MSAL values are forwarded to the backend container when the
stack starts so it can authenticate with Azure AD. The `.env` file is ignored
by Git so your credentials remain local.

