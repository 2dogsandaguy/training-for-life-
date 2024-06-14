import { gql } from "@apollo/client";

// User login mutation
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SET_JOURNAL = gql`
  mutation SetJournal($journal: String!, $createdAt: String!) {
    setJournal(journal: $journal, createdAt: $createdAt) {
      _id
      journals {
        _id
        createdAt
        journal
      }
    }
  }
`;

export const DELETE_JOURNAL = gql`
  mutation DeleteJournal($journalId: ID!) {
    deleteJournal(journalId: $journalId) {
      _id
      journals {
        _id
        createdAt
        journal
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
