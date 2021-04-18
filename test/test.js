const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should();
const chaiHttp = require('chai-http');
const server = require('../server');
const generate = require('../controllers/generate');
const validator = require('../utils/urlValidator');

chai.use(chaiHttp);
describe('testing the api', () => {
	describe('testing url validator...', () => {
		// test that url can have protocol
		it('should return true if url has protocol or not', () => {
			expect(validator('http://example.com')).to.be.true;
		});
		// test that url must have domain valid name
		it('should return false if url does not have valid domain name', () => {
			expect(validator('http://example')).to.be.false;
		});
		// test that url with ports are not rejected
		it('should return true if url has port attached', () => {
			expect(validator('http://example.com:4509')).to.be.true;
		});
		// test that url with paths are also accepted
		it('should return true if url has paths', () => {
			expect(validator('http://example.com/path')).to.be.true;
		});
		// test that url can have query strings
		it('should return true if url has query strings', () => {
			expect(validator('http://example.com:4509/path?query=1234')).to.be
				.true;
		});
	});
	describe('testing shortenURL generation function...', () => {
		const string = generate();
		// test that function generates random string not more or less than 6 characters
		it('should return the number of characters generated', () => {
			string.length.should.equal(6);
		});
	});
	describe('testing the graphiql api', () => {
		// test that string is saved in the database
		it('should return shortened URL on query with valid parameter', (done) => {
			chai.request(server)
				.get('/graphiql?query={shortenURL(url: "http://example.com")}')
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.have.property('data');
					expect(res.body.data).to.have.property('shortenURL');
					expect(res.body.data.shortenURL).to.be.string;
				});
			done();
		});
	});
	describe('testing the resolver api', () => {
		let shortenURL;
		// test that original url is fetched from the database with id
		it('should fetch the correct url from the database', (done) => {
			chai.request(server)
				.get('/graphiql?query={shortenURL(url: "http://example.com")}')
				.end((err, res) => {
					shortenURL = res.body.data.shortenURL;
				});
			done();
			chai.request(server)
				.get(`/${shortenURL.split('/')[4]}`)
				.end((err, res) => {
					// expect(res).to.have.status(301);
					expect(res).should.redirectTo('http://example.com');
				});
		});
	});
});
