# Backend
deploy url: https://backend-production-e56e.up.railway.app/api
## How to run it in development mode?

The backend runs using an Express Server Application based on Node JS. First of all, you need to run:

```bash
npm install
```

Now, you have to set the environment variables in a file named `.env`. Should follow the same structure as [example.env](./example.env) with these variables:

- `PORT` (_required_): Establishes the port where the server will run.

- `ORIGIN` (_optional_): Sets the valid origin for requests (CORS). The default value is 'localhost' and it works for dockerized DDBB.

- `DB_USER` (_required_): Sets a username for database. With the dockerized DDBB you can use any name.

- `DB_NAME` (_required_): Sets the database name. With the dockerized DDBB you can use any valid value.

- `DB_PASSWORD` (_required_): Sets the password for database. With the dockerized DDBB you can use any valid value.

- `JWT_SECRET` (_required_): Sets the secret key to create assigned to JWT.

After setting environment variables, you need an available Postgres database. You can use the dockerized DDBB only using [Docker Compose](https://docs.docker.com/compose/) with this command:

```bash
docker-compose up
```

Finally, start the application in development mode using the following command:

```bash
npm run dev
```
