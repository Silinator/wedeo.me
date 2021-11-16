# wedeo.me web
(windows)
1. Install [Docker](https://www.docker.com/products/docker-desktop).
2. Install [NPM](https://www.npmjs.com/get-npm).
3. Clone this repo into the docker folder `C:/docker/` ) as a new folder `wedeo.me` so the project paht is `C:/docker/wedeo.me/`.
4. Open CMD.
5. Run `cd c:/docker/wedeo.me/web/`
6. Run `npm install` to load the the dependencies.
6. Run `npm run css` to generate the css from tailwind.
8. Run `cd ../`
9. Run `docker-compose up` to start your local server with php and nginx.
10. Enjoy your local version of wedeo.me at [http://localhost:8080/](http://localhost:8080/)!

# wedeo.me database
1. phpMyAdmin is installed at [http://localhost:8081/](http://localhost:8081/).
2. The data for the database is in `C:/docker/wedeo.me/db/`
3. Import them over phpMyAdmin.
5. You have to create a user and add a database to it.
6. Rename or copy the `C:/docker/wedeo.me/config/wedeome_git.ini` file into `C:/docker/wedeo.me/config/wedeome.ini`.
7. When you use a diffrent user name or database name, you have to adjust this settings in `C:/docker/wedeo.me/config/wedeome.ini`.

# wedeo.me server
(debian)
Get git
```
apt update
apt -y upgrade
apt -y install git
```

Get base tools
```
apt -y install \
     apt-transport-https \
     ca-certificates \
     curl \
     gnupg2 \
     software-properties-common
curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
```

Get docker
```
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"
apt update
apt -y install docker-ce
```

Get Docker compose
```
curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

SSH Key generate
`ssh-keygen -b 2048 -t rsa -f ~/.ssh/id_rsa -q -N ""`

Copy the public Key and add it to github
`cat ~/.ssh/id_rsa.pub`

Clone Repository
```
mkdir /var/docker
cd /var/docker

git clone git@github.com:Silinator/wedeo.me.git

cd wedeo.me
```

Go to step 5 of "wedeo.me web"
