import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileURLToPath } from 'url';

import { authMiddleware } from './utils/auth.js';
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  //app.use(express.static(path.join(__dirname, '../dist/')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/'));
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};
  
startApolloServer();