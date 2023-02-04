
# BZEN API

A side project to learn Typescript and Event Sourcing using an node express server.

No API doc is provided right now, it's still a WIP and mainly a side project :)

## Events

Each query is handle by an express controller.

The controller instanciate a command, which check the inputs.

Then the command is handled by a separate function which check application rules to see if command is valid or not.

If command is valid, it generates an event which is stored. Else it return an error.

In case of success, the response is just a simple ACK, with a 200 status. No more data is returned. Because the ACK just means "Ok we got your command, we could handle it later, but the event is registred"

## Features

- User registration
- User login
- Account creation with initial balance
- Account debit/credit/transfert between accounts

At this point, no check if accounts or users exists on each commands.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file (you can copy .env.dist file for default values)

### Global variables

| Variable name   | Description |
|-----------------|-------------|
| `NODE_ENV` | production or development, determine ts compilation and some log behaviors |
| `API_PORT` | port use by the API |

### JWT configuration

| Variable name   | Description |
|-----------------|-------------|
| `BCRYPT_SALT_ROUND` | How strong the password encryption should be |
| `JWT_SECRET` | |
| `JWT_ALGORITHM` | |
| `JWT_TTL` | Time before token expiration |

### Rate limiter

To avoid too much queries, a rate limiter has been setup.

| Variable name   | Description |
|-----------------|-------------|
| `RATE_LIMIT_POINTS` | How many hits are allowed... |
| `RATE_LIMIT_DURATION` | ... in how many seconds ? |

### Mongo initialisation

#### Docker init
| Variable name   | Description |
|-----------------|-------------|
| `MONGO_INITDB_ROOT_USERNAME` | |
| `MONGO_INITDB_ROOT_PASSWORD` | |
| `MONGO_INITDB_DATABASE` | |

#### Application configuration

| Variable name   | Description |
|-----------------|-------------|
| `MONGO_USERNAME` | |
| `MONGO_PASSWORD` | |
| `MONGO_SERVER` | |
| `MONGO_PORT` | |
| `MONGO_URI` | |

### Mongo Express

If you want to access mongo data, mongo express can be setup

| Variable name   | Description |
|-----------------|-------------|
| `MONGO_EXPRESS_PORT` | localport to access mongodb-express ui |
| `MONGO_EXPRESS_HOST` | mongo db host |
| `MONGO_EXPRESS_PORT` | mongo db port |

## Run Locally

Clone the project

```bash
  git clone https://github.com/codr-fr/bzen-api.git
```

Go to the project directory

```bash
  cd bzen-api
```

Setup .env

```bash
  cp .env.dist .env
  # Then edit .env as needed
```

(optional) Configure docker

```bash
  cp docker-compose.override.dist.yml docker-compose.override.yml
  # Then edit docker-compose.override.yml as needed
```

(optional) Run docker

```bash
  docker compose up -d
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## License

[MIT](LICENCE.txt)

