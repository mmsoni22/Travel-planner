import { validDestination, validDate } from '../src/client/js/inputValidation';

window.alert = () => {};  // Create empty alert method to prevent false failures from jsdom

test( `Validates missing destination input`, () => {
	expect( validDestination( '' ) ).toBe( false );
} );

test( `Validates destination input was entered`, () => {
	expect( validDestination( 'Lorraine, New York' ) ).toBe( true );
} );

test( `Validates incorrect date format`, () => {
	expect( validDate( '11-11-2020' ) ).toBe( false );
} );

test( `Validates correct date format`, () => {
	expect( validDate( '11/11/2020' ) ).toBe( true );
} );

test( `Validates date that is in the past`, () => {
	expect( validDate( '02-09-2020' ) ).toBe( false );
} );

test( `Validates date that is in the future`, () => {
	expect( validDate( '02/09/2021' ) ).toBe( true );
} );