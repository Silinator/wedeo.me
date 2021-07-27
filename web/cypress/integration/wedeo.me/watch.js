/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe( 'Player', () => {
	/*beforeEach( () => {
		cy.visit('http://localhost:8080/watch/ZL7CM0Rd');
	});*/

	it( 'Load', () => {
		cy.visit('http://localhost:8080/watch/ZL7CM0Rd');
	});

	it( 'Pause', () => {
		expect(2).to.equal(2);
		cy.wait(2000);
		cy.get('button.vjs-play-control').click();
		cy.get('#wedeo-player.video-js').should('have.class', 'vjs-paused')
	});

	it( 'Play', () => {
		expect(2).to.equal(2);
		cy.wait(500);
		cy.get('button.vjs-play-control').click();
		cy.get('#wedeo-player.video-js').should('have.class', 'vjs-playing')
	});
});