const path = require('path');
const express = require("express");
const mockAPIResponse = require('./mockAPI.js')
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();
const fetch = require( 'node-fetch' );

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}
// Import API libraries
const Geonames = require( 'geonames.js' );
const DarkSky = require( 'dark-sky' );


// Initialize API libraries
const geonames = new Geonames( {
	username: process.env.GEONAMES_API_USERNAME,
	lang: 'en',
	encoding: 'JSON'
});

const darksky = new DarkSky( process.env.DARK_SKY_API_KEY );
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({urlencoded : false}));

app.use(express.static("dist"));
let tripData = {};

const port = 3000;

app.listen(port , ()=> {
    console.log(`Travel app is running on port ${port}`);
})

app.get('/', function (req, res) {
    res.sendFile("dist/index.html");
})

// Setup route for getting geographic coordinates.
app.post( '/geo-coords', ( request, response ) => {

	geonames.search( { 'q': request.body.destination } )
	.then( geonamesResponse => {

		tripData = {
			'country': geonamesResponse.geonames[0].countryName,
			'longitude': geonamesResponse.geonames[0].lng,
			'latitude': geonamesResponse.geonames[0].lat,
			'error': ""
		}

		response.send( tripData );
	})
	.catch(
		( error ) => {
			
			tripData = {
				'country': '',
				'longitude': '',
				'latitude': '',
				'error': error
			}
			response.send( tripData );
		}
	);

});

// Setup route for getting forcast information.
app.post( '/forecast', ( request, response ) => {

	// Format date.
	const dateArray = request.body.date.split( '/' );
	const date = `${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`; // yyyy-mm-dd

	darksky
		.options({
			latitude: request.body.latitude,
			longitude: request.body.longitude,
			time: date,
			language: 'en',
			exclude: ['minutely', 'daily']
		})
		.get()
		.then( ( res ) => {

			response.send( res );

		})
		.catch( ( error ) => {

			response.send( error );

		});

});

// Setup route for getting image path based on location.
app.post( '/image', async ( request, response ) => {

	const localURL = createPixabayURL( process.env.PIXABAY_API_KEY, request.body.destination );
	const countryURL = createPixabayURL( process.env.PIXABAY_API_KEY, request.body.country );

	let res = await fetch( localURL );
	let json = await res.json();

	if( json.hits.length > 0 ) {

		response.send( json );

	}else{

		res = await fetch( countryURL );
		json = await res.json();

		response.send( json );

	}
	
});

// Setup test route
app.get( '/image-url-test', async ( request, response ) => {

	let res = await fetch( createPixabayURL( process.env.PIXABAY_API_KEY, 'New York' ) );
	let json = await res.json();

	response.send( { 'url': json.hits[0].webformatURL } );

});

const createPixabayURL = ( key, query ) => {

	return `https://pixabay.com/api/?key=${key}&q=${encodeURIComponent( query )}`;

}

module.exports = app;
