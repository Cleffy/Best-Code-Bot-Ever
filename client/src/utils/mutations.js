import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
  `;

export const CREATE_CHAT = gql`
mutation Mutation {
  createChat {
    _id
    createdOn
    responses {
      createdOn
      responseText
      username
    }
  }
}
  `;

  export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
  `;

  export const CREATE_RESPONSE = gql`
  mutation createResponse($responseText: String, $username: String, $chatId: ID) {
    createResponse(responseText: $responseText, username: $username, chatId: $chatId) {
      _id
      responses{
        responseText
        username
        createdOn
      }
      createdOn
    }
  }
  `;