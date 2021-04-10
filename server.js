const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js')

const app = express();

// mount graphql
app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql:true
}));

app.listen(4000, ()=>{
    console.log('server running on port 4000...')
});
