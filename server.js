const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js');
const { resolver } = require('./controllers/resolve');

const app = express();

// mount graphql
app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true
	})
);

// mount shortened url reolver
app.get('/:strpath', resolver);

app.listen(4000, () => {
	console.log('server running on port 4000...');
});
