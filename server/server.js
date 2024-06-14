const express = require("express");
const path = require("path");
require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});
app.listen({ port: 3000 }, () =>
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
);
const startApolloServer = async () => {
  try {
    console.log("Starting Apollo Server...");
    await server.start();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: authMiddleware,
      })
    );

    if (process.env.NODE_ENV === "production") {
      console.log("Serving static files...");
      app.use(express.static(path.join(__dirname, "../client/dist")));
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/dist/index.html"));
      });
    } else {
      console.log("Not in production mode. Static files not served.");
    }

    app.use((err, req, res, next) => {
      console.error("Error:", err.message);
      console.error("Stack trace:", err.stack);
      res.status(500).send("Internal Server Error");
    });

    db.once("open", () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      });
    });
  } catch (error) {
    console.error("Error starting Apollo Server:", error);
    if (error.networkError) {
      console.error("Network Error details:", error.networkError.result?.errors);
    }
  }
};

startApolloServer();
