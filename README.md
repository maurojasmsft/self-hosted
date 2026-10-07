# Birth Year Calculator

A small self-hosted page that calculates a birth year from the visitor's age and whether their birthday has happened this year. It has no external dependencies, analytics, storage, or outbound browser requests.

## Features

- Calculates one exact birth year from age and birthday status
- Runs entirely in the browser
- Stores and transmits no user answers
- Uses a restrictive Content Security Policy
- Includes Docker health checks
- Supports Cloudflare Tunnel without exposing a host port

## Run with Docker and Cloudflare Tunnel

Create a remotely managed Cloudflare Tunnel and copy its connector token. Then create a local `.env` file:

```dotenv
CLOUDFLARE_TUNNEL_TOKEN=your-cloudflare-tunnel-token
```

Do not commit `.env`. It is excluded by `.gitignore`.

In the Cloudflare tunnel's published application route, configure:

```text
Hostname: your-app.example.com
Service:  http://localhost:80
```

The `cloudflared` service shares the dashboard container's network namespace, so `localhost:80` reaches Nginx without publishing a port on the Docker host.

Start the application:

```powershell
docker compose up -d --build
```

Check its status:

```powershell
docker compose ps
docker compose logs cloudflared
```

Open the public hostname configured in Cloudflare.

Stop the services with:

```powershell
docker compose stop
```

## Protect access

Create a Cloudflare Access self-hosted application for the same hostname. Add an Allow policy containing only approved email addresses, then enable One-Time PIN as the identity provider. Cloudflare Access denies all users who do not match an Allow policy.

Do not create an Allow Everyone or Bypass policy.

## Local development

To preview the static application without the tunnel:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Open <http://127.0.0.1:8765/>.

## Privacy

The calculator runs entirely in the browser. Answers are not stored or transmitted.
