import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me {
    me {
      _id
      username 
      email
      journals {
        _id
        journal
        createdAt
      }
    }
  }
`;