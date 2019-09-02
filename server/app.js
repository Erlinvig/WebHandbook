const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphqlHttp = require('express-graphql');

const schema = require('./graphql/schema');
const resolver = require('./graphql/resolvers');

const keys = require('./keys');
const app = express();

mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true})
  .then(() => console.log('MongoDB connected...'))
  .catch(error => console.error(error));

app.use('/graphql', graphqlHttp({
  schema: schema,
  rootValue: resolver,
  graphiql: true
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

module.exports = app;
