import {validDestination , validDate} from "./js/inputValidation";
import { calcNumDays, insertTrip, getGeoCoords, getForecast, getImage, addTrip, addNotes, saveTrip, updateTrip, loadTrips, removeTrip, init } from './js/travel-app';

// IIFE for all code that needs to run as soon as the page loads.
( () => {
	document.addEventListener( 'DOMContentLoaded', init );
})();


import './styles/reset.scss';
import './styles/base.scss';
import './styles/header.scss';
import './styles/form.scss';


    /* Export JS functions */
export {
	validDestination,
	validDate,
	calcNumDays,
	insertTrip,
	getGeoCoords,
	getForecast,
	getImage,
	addTrip,
	addNotes,
	saveTrip,
	updateTrip,
	loadTrips,
	removeTrip
}
