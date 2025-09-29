import { checkValue, intercept, wait, getStatus } from './../support/functions'

describe('house details', () => {

  Cypress.Commands.add('go_to_house_list', () => {
    cy.get('span.menu-title').contains('houses').click()
    cy.get('span.menu-title').contains('houses list').click()
    intercept('GET', 'https://property.pan-code.com/api/admin/house/houses/?page=1&pageSize=10', 'getHouses', () => { })
    wait('@getHouses', (interception) => {
      checkValue(interception.response.statusCode, 200)
    })
  })

  it('house details should be displayed properly', () => {
    cy.go_to_house_list()
    cy.get('a.ant-dropdown-trigger').eq(0).click()
    cy.get('li.ant-dropdown-menu-item').eq(0).click()
    intercept('GET', 'https://property.pan-code.com/api/admin/house/houses/6a22f1ba-e218-466d-af49-704df0da21b1', 'house', () => { })
    wait('@house', (interception) => {
      checkValue(interception.response.statusCode, 200)
      const body = interception.response.body.data
      const status = getStatus(body.status)
      cy.get('span.me-1').should('have.text', `#${body.reference_number}`)
      cy.get('div.pe-2').children().eq(1).should('have.text', `${body.provider.full_name}`)
      cy.get('div.text-warning').should('have.text', status)
    })
  })

  it.only('house document presents below the frame when clicking on Document', () => {
    
  })
})