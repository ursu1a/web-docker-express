# Application specification
This is a basic Web application. It runned on Node throught Express.js server. There are used Docker for CI/CD. 

## How to build docker images

```bash
cd ./{project-root}
docker build -t web-docker-express .
```

*-t* 
Tag or name of the new image.

See __Dockerfile__ with image definitions. Basic images was taken it's __node:14.15__


## Check docker images list

```bash
docker images
```

### Getting a list of images:

```bash
REPOSITORY                 TAG                 IMAGE ID            CREATED             SIZE
web-docker-express         latest              841acd49be42        24 minutes ago      948MB
<none>                     <none>              3b111c9b3b7f        41 minutes ago      948MB
<none>                     <none>              164a62af21f5        47 minutes ago      948MB
...
```
## Start container with a web server runned

```bash
docker run --rm --name express -d -p 8080:8080 -e TZ=Europe/Kiev -v /{project_root}/resources:/usr/src/app/resources web-docker-express
```

#### Run parameters:

1. *--rm*  
Automatically remove the container when it stopped

2. *-p*
Publish a container’s port(s) to the host
3. *-e*
Set environment variable (TZ - Time Zone)
4. *-v*
Bind mount a volume. There is a volume for binding 'resources' folder into the container local path.
5. *--name express*
Set the name of container to be __express__
6. *web-docker-express*
The name of image was built.

### Check state of runned containers
```bash
ONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS              PORTS                    NAMES
e16a97664158        web-docker-express   "docker-entrypoint.s…"   12 minutes ago      Up 12 minutes       0.0.0.0:8080->8080/tcp   express
```

### Check the runned app on browser
#### Go by this link in your browser:
```bash
http://0.0.0.0:8080
```

## Docker Compose
Docker Compose is a tool for defining and running Docker applications. The goal for now is storing all container run commands inside configuration file docker-compose.yaml:

```bash
version: "3.0"

services: 
  web:
    container_name: express
    build: .
    ports: 
      - "8080:8080"
    volumes: 
      - ./resources:/usr/src/app/resources
    environment: 
      - TZ=Europe/Kiev
```

This file contains all instructions for running container with options to be needed for it:
1. ports: port allocated for server
2. volumes: directories for volumes
3. enviromnent variables: timezone

Run in terminal:
```bash
docker-compose build
```
When images creation will be finished run:
```bash
docker-compose up -d
```
Check container was runned:
```bash
docker-compose ps
```
You could see that container was up:
```bash
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
df9ee18cbdec        express_web         "docker-entrypoint.s…"   51 seconds ago      Up 2 seconds        0.0.0.0:8080->8080/tcp   express
```
Check server is runned on browser:
http://localhost:8080

Check the volume was updated automatically from local resourse folder.
