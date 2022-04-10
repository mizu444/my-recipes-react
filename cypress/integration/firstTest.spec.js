/// <reference types='cypress'/> 

describe('My first suite', () => {

    beforeEach('open application', () => {
        cy.visit("/");
    })
})