const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql');
const generate = require('./controllers/generate');
const isValidUrl = require('./utils/urlValidator');
const db = require('./models');

// Root Query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		shortenURL: {
			type: GraphQLString,
			args: { url: { type: GraphQLString } },
			resolve(parentValue, args) {
				if (!isValidUrl(args.url)) {
					return 'Not a valid URL';
				}
				const id = generate();
				// save the url to the db with the string as identifier
				return db.urls
					.create({ id, link: args.url })
					.then((res) => `${process.env.DOMAIN_NAME}/${res.id}`);
			}
		}
	}
});

module.exports = new GraphQLSchema({ query: RootQuery });
