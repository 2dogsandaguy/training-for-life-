const typeDefs = `
  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  type Auth {
    token: ID!
    user: User
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    setJournal(journal: String!, createdAt: String!): User
    deleteJournal(journalId: ID!): User
    setBill(category: String!, customCategory: String, amount: Float!, date: String!): Bill
    deleteBill(billId: ID!): Bill
  }

  type User {
    _id: ID
    username: String
    email: String
    journals: [Journal]
    bills: [Bill]
  }

  type Journal {
    _id: ID
    journal: String
    createdAt: String
  }

  type Bill {
    _id: ID
    category: String
    customCategory: String
    amount: Float
    date: String
    userId: ID
  }

  type Query {
    me: User
  }
`;



module.exports = typeDefs;
