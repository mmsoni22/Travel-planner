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
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})