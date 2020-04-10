import { validDestination , validDate} from "./inputValidationinputValidation";
const insertTrip = ( tripInfo ) => {

	const numDays = calcNumDays( tripInfo );
	let tripTitle = tripInfo.destination;
	let destCity = tripInfo.destination.split( ',' )[0];

	if( !tripTitle.match( tripInfo.country ) ){ // Append country text if user didn't specify.

		tripTitle += `, ${tripInfo.country}`;

	}

	let tripDisplay = `
		<div class="trip-entry">
			<div class="trip-left-content">
				<div class="trip-image-container"></div>
			</div>
			<div class="trip-right-content">
				<div class="trip-header">
					<h2>My Trip to: <span class="trip-location">${tripTitle}</span>
					<br>
					Departing: <span class="trip-date">${tripInfo.date}</span></h2>
				</div>
				<div class="trip-flight-info">
					<div class="flight-info-label">
						Flight info:
					</div>
					<div class="flight-info">
						DIA 4:35PM
						<br>
						Flight 587 United Airlines
					</div>
					<div class="clear"></div>
				</div>
				<div class="trip-add-remove">
					<button class="save-trip-button square-button">Save Trip</button> <button class="remove-trip-button square-button">Remove Trip</button>
				</div>
				<div class="trip-countdown">
					<span class="trip-location">${destCity}</span> is <span class="trip-countdown-num">${numDays}</span> days away.
				</div>
				<div class="trip-weather">
					Typical weather for then is:
					<br>
					<div class="trip-weather-details">
						${tripInfo.forecast}
					</div>
				</div>
			</div>
			<div class="trip-bottom-container">
				<button class="trip-add-notes-button rounded-button"><span class="bold">+</span> Add Notes</button>
				<div class="trip-notes-container">
					Notes<br>
					<textarea class="notes"></textarea>
				</div>
			</div>
        </div>`;
        document.querySelector( '#trips').insertAdjacentHTML( 'beforeend', tripDisplay );

	// Assign event listeners to the new trip buttons.
	let tripEntries = document.querySelectorAll( '.trip-entry' );
	const entryIndex = tripEntries.length - 1;
	const latestEntry = tripEntries[ entryIndex ];
	latestEntry.querySelector( '.trip-add-notes-button' ).addEventListener( 'click', () => { TravelApp.addNotes( entryIndex ); } );
	latestEntry.querySelector( '.save-trip-button' ).addEventListener( 'click', () => { TravelApp.updateTrip( entryIndex ); } );
	latestEntry.querySelector( '.remove-trip-button' ).addEventListener( 'click', () => { TravelApp.removeTrip( entryIndex ); } );
        
const addTrip = (event) => {
    event.preventDefault();
    const destInput = event.target[0].value; // Destination input.
	const dateInput = event.target[1].value; // Date input.

	if( !validDestination( destInput ) || !validDate( dateInput ) ) {

		return

	};
}

export {
    addTrip
}