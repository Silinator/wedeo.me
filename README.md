# wedeo.me web
1. Install [Docker](https://www.docker.com/products/docker-desktop).
2. Install [NPM](https://www.npmjs.com/get-npm).
3. Clone this repo into the docker folder `C:/docker/` ) as a new folder `wedeo.me` so the project paht is `C:/docker/wedeo.me/`.
4. Open CMD.
5. Run `cd c:/docker/wedeo.me/web/`
6. Run `npm install` to load the the dependencies.
7. Run `cd ../`
8. Run `docker-compose up` to start your local server with php and nginx.
9. Enjoy your local version of wedeo.me at [http://localhost:8080/](http://localhost:8080/)!

# wedeo.me database
1. phpMyAdmin is installed at [http://localhost:8081/](http://localhost:8081/).
2. The data for the database is in `C:/docker/wedeo.me/db/`
3. Import them over phpMyAdmin.
5. You have to create a user and add a database to it.
6. Rename or copy the `C:/docker/wedeo.me/config/wedeome_git.ini` file into `C:/docker/wedeo.me/config/wedeome.ini`.
7. When you use a diffrent user name or database name, you have to adjust this settings in `C:/docker/wedeo.me/config/wedeome.ini`.
