We're using EasyPanel, not raw docker-compose.
In EasyPanel, `frontend` and `backend` are distinct applications running in the cluster.
EasyPanel routes internal traffic using the format `app-name`. So if the app is named `backend`, the internal hostname should just be `backend` (or possibly the full project_app name).
However, 502 Bad Gateway from Nginx means it can't resolve or connect to the upstream. Let's fix the proxy pass to just use the EasyPanel convention.
