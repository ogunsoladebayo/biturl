const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js');
const { resolver } = require('./controllers/resolve');

const app = express();

// mount graphql
app.use(
	'/graphiql',
	graphqlHTTP({
		schema: schema,
		graphiql: true
	})
);
app.get('/favicon.ico', (req, res) => res.status(200));

// mount shortened url resolver
app.get('/:strpath', resolver);

app.listen(4000, () => {
	console.log('server running on port 4000...');
});
