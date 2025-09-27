// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import { checkValue, intercept, wait } from './../support/functions'

Cypress.Commands.add('login', () => {
    cy.visit('https://propadmin.pan-code.com/auth')
    cy.get('[name="email"]').clear().type('ghassan@gmail.com')
    cy.get('input[type="radio"][value="1"]').check()
    
    intercept('POST', 'https://property.pan-code.com/api/admin/auth/email-login/', 'loginRequest',
      () => { cy.get('[id="kt_sign_in_submit"]').click() })
      
      wait('@loginRequest', (interception) => {
        checkValue(interception.response.statusCode, 201)
        const body = interception.response.body
        cy.log('response body: ')
        Object.entries(body).forEach((key, value) => {
          cy.log(`${key}: ${value}`)
        })
      })
    })

beforeEach(() => {
  cy.login()
});