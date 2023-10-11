import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { URL } from 'url';

import { authMiddleware } from './utils/auth.js';
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\\([A=Z]:\\)/, '$1');
const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const root = path.join(__dirname, 'client', 'build');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(root));
}
  
app.get('*', (req, res) => {
  res.sendFile('index.html', { root });
})

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
  startApolloServer(typeDefs, resolvers);