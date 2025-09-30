import { checkValue, intercept, wait, getStatus } from './../support/functions'
import 'cypress-file-upload';

describe('house documents', () => {

  Cypress.Commands.add('go_to_house_details', () => {
    intercept('GET', 'https://property.pan-code.com/api/admin/house/houses/?page=1&pageSize=10', 'getHouses', () => { })
    // intercept('GET', 'https://property.pan-code.com/api/admin/house/houses/6a22f1ba-e218-466d-af49-704df0da21b1', 'house', () => { })
    cy.get('span.menu-title').contains('houses').click()
    cy.get('span.menu-title').contains('houses list').click()
    wait('@getHouses', (interception) => {
      checkValue(interception.response.statusCode, 200)
    })
    cy.get('a.ant-dropdown-trigger').eq(0).click()
    cy.get('li.ant-dropdown-menu-item').eq(0).click()
    // wait('@house', () => { })
    cy.wait(2000)
  })

  Cypress.Commands.add('click_on_add_house_photo', () => {
    intercept('GET', 'https://property.pan-code.com/api/admin/property/configure-rooms/?pageSize=1000&is_deleted=False', 'configureRooms', () => { })
    cy.contains('button', 'Add House Photo').click()
  })

  Cypress.Commands.add('wait_for_configure', () => {
    wait('@configureRooms', interception => {
      checkValue(200, interception.response.statusCode)
    })
  })

  beforeEach(() => {
    cy.go_to_house_details()
    cy.click_on_add_house_photo()
  })

  it('try search in Configure Room in capital letters only', () => {
    cy.wait_for_configure()
    cy.get('div.css-pvhmtt-control').click()

    cy.get('div.css-19bb58m').type('OFFICE')

    cy.get('div.css-1nmdiq5-menu').children().should('have.length', 1)
    cy.get('#react-select-4-listbox').within(() => {
      cy.get('#react-select-4-option-0').should('be.visible')
    })
  })

  it('try search in Configure Room in small letters only', () => {
    cy.wait_for_configure()
    cy.get('div.css-pvhmtt-control').click()

    cy.get('div.css-19bb58m').type('office')

    cy.get('div.css-1nmdiq5-menu').children().should('have.length', 1)
    cy.get('#react-select-4-listbox').within(() => {
      cy.get('#react-select-4-option-0').should('be.visible')
    })
  })

  it('try search in Configure Room in small and capital letters', () => {
    cy.wait_for_configure()
    cy.get('div.css-pvhmtt-control').click()

    cy.get('div.css-19bb58m').type('ofFIcE')

    cy.get('div.css-1nmdiq5-menu').children().should('have.length', 1)
    cy.get('#react-select-4-listbox').within(() => {
      cy.get('#react-select-4-option-0').should('be.visible')
    })
  })

  it('try to search by intermediate letters only in Configure Room', () => {
    cy.wait_for_configure()
    cy.get('div.css-pvhmtt-control').click()

    cy.get('div.css-19bb58m').type('ffi')

    cy.get('div.css-1nmdiq5-menu').children().should('have.length', 1)
    cy.get('#react-select-4-listbox').within(() => {
      cy.get('#react-select-4-option-0').should('be.visible')
    })
  })

  it('try x button to remove the selected Configure Room', () => {
    cy.wait_for_configure()
    cy.get('div.css-19bb58m').click()
    cy.get('#react-select-4-option-0').click()
    cy.get('div.css-1wy0on6').children().eq(0).click()
    cy.get('div.css-19bb58m').should('have.value', '')
  })

  it('make sure can\'t click submit without selecting Configure Room', () => {
    const fileName = 'Screenshot 2024-12-22 122511.png'

    cy.get('input[type="file"]').attachFile(fileName)
    cy.get(`[title="${fileName}"]`).should('exist')

    cy.get('button.py-2').should('be.disabled')
  })

  it('after uploading a photo make sure it was uploaded before hitting submit', () => {
    const fileName = 'Screenshot 2024-12-22 122511.png'

    cy.get('input[type="file"]').attachFile(fileName)
    cy.get(`[title="${fileName}"]`).should('exist')
  })

  it('ability to delete the uploaded photo', () => {
    const fileName = 'Screenshot 2024-12-22 122511.png'

    cy.get('input[type="file"]').attachFile(fileName)
    cy.get(`[title="${fileName}"]`).should('exist')

    cy.get('span.anticon-delete').click()
    cy.get(`[title="${fileName}"]`).should('not.exist')

  })

  it('disable submit button after deleting the uploaded photo ', () => {
    const fileName = 'Screenshot 2024-12-22 122511.png'

    cy.get('input[type="file"]').attachFile(fileName)
    cy.get(`[title="${fileName}"]`).should('exist')

    cy.get('span.anticon-delete').click()
    cy.get(`[title="${fileName}"]`).should('not.exist')

    cy.get('button.py-2').should('be.disabled')

  })

  it('uploaded photo should end with valid extension', () => {
    const fileName = 'DiarIn.xlsx'

    cy.get('input[type="file"]').attachFile(fileName)
    cy.get(`[title="${fileName}"]`).should('not.exist')
  })

  it('make sure the uploaded photo was uploaded successfully', () => {
    cy.wait_for_configure()
    cy.get('div.css-19bb58m').click()
    cy.get('#react-select-4-option-0').click()
    const fileName = 'Screenshot 2024-12-22 122511.png'

    cy.get('input[type="file"]').attachFile(fileName)

    cy.get('button.py-2').should('not.be.disabled').click()
  })

  it('check on photo size must be less or equal to 200kb', () => {
    cy.wait_for_configure()
    cy.get('div.css-19bb58m').click()
    cy.get('#react-select-4-option-0').click()

    const fileName = 'Screenshot (179).png'

    cy.get('input[type="file"]').attachFile(fileName)

    intercept('POST', 'https://property.pan-code.com/api/admin/house/houses-photo/', 'housePhoto', () => {})
    
    cy.get('button.py-2').should('not.be.disabled').click()
    wait('@housePhoto', interception => {
      checkValue(400, interception.response.statusCode)
    })

  })

})