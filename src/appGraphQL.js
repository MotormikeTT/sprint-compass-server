const { port, graphql } = require("./config");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const { resolvers } = require("./resolvers");
const { schema } = require("./schema");
const cors = require("cors");
const path = require("path");

app.use((req, res, next) => {
  console.log("Time:", new Date() + 3600000 * -5.0); // GMT-->EST
  next();
});

app.use(cors());

app.use(express.static("public"));

// app.get("/*", (request, response) => {
//   // needed for refresh
//   response.sendFile(path.join(__dirname, "public/index.html"));
// });

app.use(
  graphql,
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);
app.listen(port);
console.log(`Server ready on port ${port}${graphql} - ${process.env.NODE_ENV}`);
