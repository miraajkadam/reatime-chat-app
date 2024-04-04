# realtime-chat-app

Realtime chat application based on [MERN stack](https://www.mongodb.com/mern-stack). Users can login/register, create multiple groups, join them to chat which will be broadcasted to everyone present in that group.

## Tech Stack

- [NodeJS](https://nodejs.org/en/) with [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/) ORM on top of [MongoDB](https://www.mongodb.com/)
- [React.js](https://reactjs.org/) with [React Router](https://reactrouter.com/en/main)
- Uses [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) with [Socket.io](https://socket.io/)
- Designed and customized using [Material UI](https://mui.com/material-ui/)
- Written in [Typescript](https://www.typescriptlang.org/)

## Installation

- **Step 1:** Clone this repository.
- **Step 2:** Change your directory to the clone.

```bash
cd <folder_name>
```

- **Step 3:** Install all dependencies

```bash
npm run setup-server && npm run setup-client
```

- **Step 3:** Create .env with database connection string

```bash
cd server
touch .env
echo >> DATABASE_URL="<your_connection_string>"
```

- **Step 3:** Seed the database

```bash
cd server/prisma
node seed.js
```

- **Step 4:** Run the server

```bash
npm run serve-server
```

- **Step 4:** Run the client

```bash
npm run serve-client
```

## Available Scripts

In the project directory, you can run:

##### `npm run setup-server`

Installs all server dependencies listed in `./server/package.json`.

##### `npm run build-server`

Builds the server and outputs the build files in `./server/dist`.

##### `npm run serve-server`

Starts server on port `process.env.PORT`.

##### `npm run setup-client`

Installs all client dependencies listed in `./client/package.json`.

##### `npm run build-client`

Builds the app for production to the `./client/build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

##### `npm run serve-client`

Serves react application on `PORT 3000`

## License

Distributed under the MIT License. See `LICENSE.txt` for more information
