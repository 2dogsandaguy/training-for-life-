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
  }

  type User {
    _id: ID
    username: String
    email: String
    journals: [Journal]
  }

  type Journal {
    _id: ID
    journal: String
    createdAt: String
  }

  type Query {
    me: User
  }
`;

module.exports = typeDefs;
