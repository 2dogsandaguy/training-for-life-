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
export const GET_BILLS = gql`
  query getBills {
    me {
      _id
      bills {
        _id
        category
        customCategory
        amount
        date
      }
    }
  }
  `;