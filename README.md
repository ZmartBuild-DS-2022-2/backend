# Backend

## How to run it in development mode?

The backend runs using an Express Server Application based on Node JS. First of all, you need to run:

```bash
npm install
```

Now, you have to set the environment variables in a file named `.env`. Should follow the same structure as [example.env](./example.env) with these variables:
- `PORT` (*required*): Establishes the port where the server will run.

- `ORIGIN` (*optional*): Sets the valid origin for requests (CORS). The default value is 'localhost' and it works for dockerized DDBB.

- `DB_USER` (*required*): Sets a username for database. With the dockerized DDBB you can use any name.

- `DB_NAME` (*required*): Sets the database name. With the dockerized DDBB you can use any valid value.

- `DB_PASSWORD` (*required*): Sets the password for database. With the dockerized DDBB you can use any valid value.

- `JWT_SECRET` (*required*): Sets the secret key to create assigned to JWT.


After setting environment variables, you need an available Postgres database. You can use the dockerized DDBB only using [Docker Compose](https://docs.docker.com/compose/) with this command:
```bash
docker-compose up
```

Finally, start the application in development mode using the following command:

```bash
npm run dev
```
