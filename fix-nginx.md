# Problem Analysis:
The frontend is loading (returns 200 OK and valid HTML) but the React app crashes or shows a white screen.
The backend API proxy is returning 502 Bad Gateway.

This tells us:
1. Nginx config proxy is `proxy_pass http://backend:3000/api/;`
2. EasyPanel internal Docker networking uses projectname_appname. So `backend` might need to be `saftaa_backend`.
