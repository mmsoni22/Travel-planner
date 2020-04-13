const regeneratorRuntime = require("regenerator-runtime");
const app = require( '../src/server/server.js' );
const supertest = require( 'supertest' );
const request = supertest( app );

it( 'Checks image url prefix', async done => {

	const response = await request.get( '/image-url-test' );
	let prefix = response.body.url.substr( 0, 24 );
	expect( prefix ).toBe( 'https://pixabay.com/get/' );
	done();

});