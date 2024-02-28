// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('input[name="firstName"]')
    .should('be.visible')
    .type('Gabriel', { delay: 0 })
    .should('have.value', 'Gabriel')

    cy.get('input[name="lastName"]')
    .should('be.visible')
    .type('Guglielmi Kirtschig', { delay: 0 })
    .should('have.value', 'Guglielmi Kirtschig')

    cy.get('input[id="email"]')
    .should('be.visible')
    .type('gabrielguglielmik@gmail.com', { delay: 0 })
    .should('have.value', 'gabrielguglielmik@gmail.com')

    cy.get('textarea[name="open-text-area"]')
    .should('be.visible')
    .type('I am just testing', { delay: 0 })
    .should('have.value', 'I am just testing')

    cy.contains('button[type="submit"]', 'Enviar') // poderia utilizar apenas cy.get('button'), pois o texte dele já o identifica
    .should('be.visible')
    .click()
})