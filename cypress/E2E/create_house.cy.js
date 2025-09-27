import { checkValue, intercept, wait, waitForElementToDisappearThen } from './../support/functions'

describe('create house fields validation', () => {

  Cypress.Commands.add('go_to_create_house', () => {
    cy.get('span.menu-title').contains('houses').click()
    cy.get('span.menu-title').contains('create House').click()
  })

  Cypress.Commands.add('select_status', () => {
    cy.get('div.css-19bb58m').eq(0).type('PEN')

    cy.get('div.css-19bb58m').eq(0).children().should('have.length', 1)
    cy.get('#react-select-2-listbox').within(() => {
      cy.get('#react-select-2-option-0').should('be.visible').click()
    })
  })

  Cypress.Commands.add('enter_text_in_address_details', () => {
    cy.get('[name="address_details"]').type('address details')
  })

  Cypress.Commands.add('enter_text_in_property_overview', () => {
    cy.get('[name="property_overview"]').type('property overview')
  })

  Cypress.Commands.add('enter_property_size', () => {
    cy.get('[name="property_size"]').type(20)
  })

  Cypress.Commands.add('enter_bed_count', () => {
    cy.get('[name="beds_count"]').type(2)
  })

  Cypress.Commands.add('enter_rooms_count', () => {
    cy.get('[name="rooms_count"]').type(2)
  })

  Cypress.Commands.add('enter_bathrooms_count', () => {
    cy.get('[name="bathrooms_count"]').type(2)
  })

  Cypress.Commands.add('select_zone', () => {
    cy.get('div.css-19bb58m').eq(1).click()
    cy.get('div.css-1nmdiq5-menu').within(() => {
      cy.get('#react-select-3-option-0').should('be.visible').click()
    })
  })

  Cypress.Commands.add('select_government', () => {
    cy.get('div.css-19bb58m').eq(2).click()
    cy.get('div.css-1nmdiq5-menu').within(() => {
      cy.get('#react-select-4-option-0').should('be.visible').click()
    })
  })

  Cypress.Commands.add('select_country', () => {
    cy.get('div.css-19bb58m').eq(3).click()
    cy.get('div.css-1nmdiq5-menu').within(() => {
      cy.get('#react-select-5-option-0').should('be.visible').click()
    })
  })

  Cypress.Commands.add('wait_for_apis', () => {
    intercept('GET', 'https://property.pan-code.com/api/admin/national/cities/?pageSize=1000&is_deleted=False', 'cities', () => { })
    intercept('GET', 'https://property.pan-code.com/api/admin/national/emirates/?pageSize=1000&is_deleted=False', 'emirates', () => { })
    wait('@cities', () => {} )
    wait('@emirates', () => {} )
  })

  Cypress.Commands.add('enter_longitude', () => {
    cy.get('[name="longitude"]').type(7410.08520)
  })

  Cypress.Commands.add('enter_latitude', () => {
    cy.get('[name="latitude"]').type(7410.08520)
  })

  Cypress.Commands.add('enter_price', () => {
    cy.get('[name="price"]').type(5000)
  })

  Cypress.Commands.add('enter_min_day_of_reservation',() => {
    cy.get('[name="min_day_of_reservation"]').type(5)
  })

  Cypress.Commands.add('enter_max_day_of_reservation',() => {
    cy.get('[name="max_day_of_reservation"]').type(10)
  })

  Cypress.Commands.add('enter_deposit',() => {
    cy.get('[name="depoist"]').type(2000)
  })

  Cypress.Commands.add('select_tax_type', () => {
    cy.get('div.css-19bb58m').eq(4).click()
    cy.get('div.css-1nmdiq5-menu').within(() => {
      cy.get('#react-select-6-option-0').should('be.visible').click()
    })
  })

  Cypress.Commands.add('select_currency', () => {
    cy.get('div.css-19bb58m').eq(5).click()
    cy.get('div.css-1nmdiq5-menu').within(() => {
      cy.get('#react-select-7-option-0').should('be.visible').click()
    })
  })

  Cypress.Commands.add('select_Property_Type', () => {
    cy.get('div.css-19bb58m').eq(6).click()
    cy.get('div.css-1nmdiq5-menu').within(() => {
      cy.get('#react-select-8-option-0').should('be.visible').click()
    })
  })

  Cypress.Commands.add('select_Property_View', () => {
    cy.get('div.css-19bb58m').eq(7).click()
    cy.get('div.css-1nmdiq5-menu').within(() => {
      cy.get('#react-select-9-option-0').should('be.visible').click()
    })
  })

  Cypress.Commands.add('select_Safety_Property', () => {
    cy.get('div.css-19bb58m').eq(8).click()
    cy.get('div.css-1nmdiq5-menu').within(() => {
      cy.get('#react-select-10-option-0').should('be.visible').click()
    })
  })

  Cypress.Commands.add('select_Amenities', () => {
    cy.get('div.css-19bb58m').eq(9).click()
    cy.get('div.css-1nmdiq5-menu').within(() => {
      cy.get('#react-select-11-option-0').should('be.visible').click()
    })
  })

  Cypress.Commands.add('select_Provider', () => {
    cy.get('div.css-19bb58m').eq(10).click()
    cy.get('div.css-1nmdiq5-menu').within(() => {
      cy.get('#react-select-12-option-0').should('be.visible').click()
    })
  })

  Cypress.Commands.add('click_on_submit', () => {
    cy.get('span.indicator-label').click()
  })

  Cypress.Commands.add('fill_required_fields', () => {
    cy.wait_for_apis()
    cy.select_status()
    cy.enter_text_in_address_details()
    cy.enter_text_in_property_overview()
    cy.enter_property_size()
    cy.enter_bed_count()
    cy.enter_rooms_count()
    cy.enter_bathrooms_count()
    cy.select_zone()
    cy.select_government()
    cy.select_country()
    cy.enter_longitude()
    cy.enter_latitude()
    cy.enter_price()
    cy.enter_min_day_of_reservation()
    cy.enter_max_day_of_reservation()
    cy.enter_deposit()
    cy.select_tax_type()
    cy.select_currency()
    cy.select_Property_Type()
    cy.select_Property_View()
    cy.select_Safety_Property()
    cy.select_Amenities()
    cy.select_Provider()
  })

  beforeEach(() => {
    cy.go_to_create_house()
  })

  it('try to enter invalid data in building number (text not number)', () => {
    cy.get('input.form-control').eq(0).type('shadi')
    cy.get('input.form-control').eq(0).should('have.text', '')
  })

  it.only('try to enter building number 0 ', () => {
    cy.fill_required_fields()
    cy.get('input.form-control').eq(0).type(0)
    cy.click_on_submit()
  })

  it('try to enter special characters in building number', () => {
    cy.get('input.form-control').eq(0).type('!@#$%^&*()_+-=')
    cy.get('input.form-control').eq(0).should('have.text', '')
  })

  it('try search in status in capital letters only', () => {
    cy.get('div.css-19bb58m').eq(0).type('PEN')

    cy.get('div.css-19bb58m').eq(0).children().should('have.length', 1)
    cy.get('#react-select-2-listbox').within(() => {
      cy.get('#react-select-2-option-0').should('be.visible')
    })
  })

  it('try search in status in small letters only', () => {
    cy.get('div.css-19bb58m').eq(0).type('pen')

    cy.get('div.css-19bb58m').eq(0).children().should('have.length', 1)
    cy.get('#react-select-2-listbox').within(() => {
      cy.get('#react-select-2-option-0').should('be.visible')
    })
  })

  it('try search in status in small and capital letters', () => {
    cy.get('div.css-19bb58m').eq(0).type('pENd')

    cy.get('div.css-19bb58m').eq(0).children().should('have.length', 1)
    cy.get('#react-select-2-listbox').within(() => {
      cy.get('#react-select-2-option-0').should('be.visible')
    })
  })

  it('try to search by intermediate letters only in statuses', () => {
    cy.get('div.css-19bb58m').eq(0).type('ndi')

    cy.get('div.css-19bb58m').eq(0).children().should('have.length', 1)
    cy.get('#react-select-2-listbox').within(() => {
      cy.get('#react-select-2-option-0').should('be.visible')
    })
  })

  it('try x button to remove the selected status', () => {
    cy.get('div.css-19bb58m').eq(0).type('shadi')
    cy.get('div.css-1xc3v61-indicatorContainer').eq(0).click()
    cy.get('div.css-19bb58m').should('have.text', '')
  })

  it('try to enter invalid data in property size (text not number)', () => {
    cy.get('input.form-control').eq(2).clear().type('shadi')
    cy.get('input.form-control').eq(2)
      .invoke('val')
      .then(value => {
        checkValue(value, '')
      })
  })

  it('try to enter special characters in building number)', () => {
    cy.get('input.form-control').eq(2).clear().type('!@#$%^&*()_+-=')
    cy.get('input.form-control').eq(2)
      .invoke('val')
      .then(value => {
        checkValue(value, '')
      })
  })
})
