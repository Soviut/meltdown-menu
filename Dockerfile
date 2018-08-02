FROM starefossen/github-pages

WORKDIR /usr/src/app

ADD . .

EXPOSE 4000
