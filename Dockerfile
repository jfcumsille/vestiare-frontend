FROM nginx:1.21

COPY ./nginx/default.conf.template /etc/nginx/templates/default.conf.template

COPY dist /usr/share/nginx/html
