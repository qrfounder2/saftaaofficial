Wait, there's another issue I saw!
`saftaa.shop/api/health` returned a 502 Bad Gateway.
This means Nginx (`frontend`) couldn't reach `backend:3000`.
In EasyPanel, Docker containers on the same network can reach each other by the app name ONLY if they are in the same project, but usually, it's prefixed. Actually, in EasyPanel, apps in the same project can reach each other using their exact app name as the hostname.
So `proxy_pass http://backend:3000/api/;` was correct IF the backend app is literally named `backend`. But maybe the port isn't exposed?
In `backend.Dockerfile`, we EXPOSE 3000. Nginx is using `proxy_pass http://backend:3000/api/;`.
Wait, let's fix `nginx.conf` back to `http://backend:3000/api/;` if that's what EasyPanel uses. Or maybe it's `projectname_backend`? The default EasyPanel network alias is just the app name. Let me revert Nginx and push.
