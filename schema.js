const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql');
const generate = require('./controllers/generate');

// Root Query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		shortenURL: {
			type: GraphQLString,
			args: { url: { type: GraphQLString } },
			resolve(parentValue, args) {
				return generate(args.url).then(
					(res) => `https://biturl.tk/${res}`
				);
			}
		}
	}
});

module.exports = new GraphQLSchema({ query: RootQuery });
