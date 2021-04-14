const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql');
const generate = require('./controllers/generate');
const validUrl = require('valid-url');

// URL validation check
const isValidUrl = (url) => {
	var pattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$',
		'i'
	); // fragment locator
	return !!pattern.test(url);
};

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
				return generate(args.url).then(
					(res) => `${process.env.DOMAIN_URL}/${res}`
				);
			}
		}
	}
});

module.exports = new GraphQLSchema({ query: RootQuery });
