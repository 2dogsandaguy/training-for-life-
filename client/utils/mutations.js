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

export const SET_BILL = gql`
  mutation setBill($category: String!, $customCategory: String, $amount: Float!, $date: String!) {
    setBill(category: $category, customCategory: $customCategory, amount: $amount, date: $date) {
      _id
      category
      customCategory
      amount
      date
    }
  }
`;

export const DELETE_BILL = gql`
  mutation deleteBill($billId: ID!) {
    deleteBill(billId: $billId) {
      _id
    }
  }
`;

export const SET_INVESTMENT = gql`
  mutation setInvestment($type: String!, $url: String, $amount: Float!, $date: String!) {
    setInvestment(type: $type, url: $url, amount: $amount, date: $date) {
      _id
      type
      url
      amount
      date
    }
  }
`;

export const DELETE_INVESTMENT = gql`
  mutation deleteInvestment($investmentId: ID!) {
    deleteInvestment(investmentId: $investmentId) {
      _id
      
    }
  }
`;

export const SAVE_TASKS = gql`
  mutation saveTasks($tasks: [TaskInput]!) {
    saveTasks(tasks: $tasks) {
      _id
      id
      task
    }
  }
`;

export const CLEAR_TASKS = gql`
  mutation clearTasks {
    clearTasks {
      _id
      id
      task
    }
  }
`;