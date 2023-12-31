import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    history: [Chat]
  }

  type Chat {
    _id: ID
    username: String
    responses: [Response]
    createdOn: String
   }

   type Response {
    _id: ID
    responseText: String
    username: String
    createdOn: String
   }

    type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    chat(_id: ID): Chat
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createChat(username: String):Chat
    createResponse(responseText: String, username:String, chatId: ID):Chat
  }
`;

export default typeDefs;
