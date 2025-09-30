import { checkValue, intercept, wait, getStatus } from './../support/functions'
import 'cypress-file-upload';

describe('house documents', () => {

  Cypress.Commands.add('go_to_house_details', () => {
    cy.get('span.menu-title').contains('houses').click()
    cy.get('span.menu-title').contains('houses list').click()
    intercept('GET', 'https://property.pan-code.com/api/admin/house/houses/?page=1&pageSize=10', 'getHouses', () => { })
    wait('@getHouses', (interception) => {
      checkValue(interception.response.statusCode, 200)
    })
    cy.get('a.ant-dropdown-trigger').eq(0).click()
    cy.get('li.ant-dropdown-menu-item').eq(0).click()

    // intercept('GET', 'https://property.pan-code.com/api/admin/house/houses/6a22f1ba-e218-466d-af49-704df0da21b1', 'house', () => { })
    // wait('@house', () => { })
  })

  Cypress.Commands.add('click_on_add_house_document', () => {
    intercept('GET', 'https://property.pan-code.com/api/admin/house/houses/', 'houses', () => { })
    cy.contains('button', 'Add House Documents').click()
    wait('@houses', interception => {
      checkValue(200, interception.response.statusCode)
    })
  })

  it('make sure can\'t click submit without uploading a document', () => {
    cy.go_to_house_details()
    cy.click_on_add_house_document()
    cy.get('button.py-2').should('be.disabled')
  })

  it('after uploading a document make sure it was uploaded before hitting submit', () => {
    cy.go_to_house_details()
    cy.click_on_add_house_document()
    const fileName = 'DiarIn.xlsx'

    cy.get('input[type="file"]').attachFile(fileName)
    cy.get(`[title="${fileName}"]`).should('exist')
  })

  it('ability to delete the uploaded document', () => {
    cy.go_to_house_details()
    cy.click_on_add_house_document()
    const fileName = 'DiarIn.xlsx'

    cy.get('input[type="file"]').attachFile(fileName)

    cy.get('[title="Remove file"]').should('be.visible').click()

    cy.get(`[title="${fileName}"]`).should('not.exist')

  })

  it('disable submit button after deleting the uploaded document', () => {
    cy.go_to_house_details()
    cy.click_on_add_house_document()
    const fileName = 'DiarIn.xlsx'

    cy.get('input[type="file"]').attachFile(fileName)

    cy.get('[title="Remove file"]').should('be.visible').click()

    cy.get('button.py-2').should('be.disabled')

  })

  it('make sure the uploaded document was uploaded successfully after hitting submit', () => {
    cy.go_to_house_details()
    cy.click_on_add_house_document()

    //file must be placed in cypress/fixtures
    const fileName = 'lecture_1_introduction_FA_Regular_Expressions.pdf'

    intercept('POST', 'https://property.pan-code.com/api/admin/house/house-documents/', 'uploadFile', () => { })
    cy.get('input[type="file"]').attachFile(fileName)

    cy.get('button.py-2').should('not.be.disabled').click()

    wait('@uploadFile', interception => {
      checkValue(201, interception.response.statusCode)
    })
  })

  it.only('check on document size must be less than 200kb', () => {
    cy.go_to_house_details()
    cy.click_on_add_house_document()

    //file must be placed in cypress/fixtures
    const fileName = 'lecture_1_introduction_FA_Regular_Expressions.pdf'

    intercept('POST', 'https://property.pan-code.com/api/admin/house/house-documents/', 'uploadFile', () => { })
    cy.get('input[type="file"]').attachFile(fileName)

    cy.get('button.py-2').should('not.be.disabled').click()

    wait('@uploadFile', interception => {
      checkValue(400, interception.response.statusCode)
    })
  })
})