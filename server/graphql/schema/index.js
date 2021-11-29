const fs = require("fs");
const path = require("path");
const { gql } = require("apollo-server-express");
const queries = fs.readFileSync(
  path.join(__dirname + "/", "queries.gql"),
  "utf8"
);
const mutations = fs.readFileSync(
  path.join(__dirname + "/", "mutations.gql"),
  "utf8"
);
const types = fs.readFileSync(path.join(__dirname + "/", "types.gql"), "utf8");
const inputs = fs.readFileSync(
  path.join(__dirname + "/", "inputs.gql"),
  "utf8"
);

const schema = gql`
    type Query {
        ${queries}
    }

    type Mutation {
        ${mutations}
    }

    ${types}

    ${inputs}
`;

module.exports = schema;
