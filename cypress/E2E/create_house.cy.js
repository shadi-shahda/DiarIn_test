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
    wait('@cities', () => { })
    wait('@emirates', () => { })
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

  Cypress.Commands.add('enter_min_day_of_reservation', () => {
    cy.get('[name="min_day_of_reservation"]').type(5)
  })

  Cypress.Commands.add('enter_max_day_of_reservation', () => {
    cy.get('[name="max_day_of_reservation"]').type(10)
  })

  Cypress.Commands.add('enter_deposit', () => {
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
    cy.get('input.form-control').eq(0).should('have.value', '')
  })

  it('try to enter building number 0 ', () => {
    cy.fill_required_fields()
    cy.get('input.form-control').eq(0).type(0)
    cy.click_on_submit()
    intercept('POST', 'https://property.pan-code.com/api/admin/house/housess/', 'create_house', () => { })
    wait('@create_house', (interception) => {
      checkValue(interception.response.statusCode, 400)
      checkValue(interception.response.body.message, 'Ensure this value is greater than or equal to 1.')
    })
  })

  it('try to enter special characters in building number', () => {
    cy.get('input.form-control').eq(0).type('!@#$%^&*()_+-=')
    cy.get('input.form-control').eq(0).should('have.value', '')
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

  it('try to enter invalid data in property size (text not number)', () => {
    cy.get('[name="property_size"]').type('shadi')
    cy.get('[name="property_size"]').should('have.value', '')
  })

  it('try to enter property size 0 ', () => {
    cy.fill_required_fields()
    cy.get('[name="property_size"]').type(0)
    cy.click_on_submit()
    intercept('POST', 'https://property.pan-code.com/api/admin/house/housess/', 'create_house', () => { })
    wait('@create_house', (interception) => {
      checkValue(interception.response.statusCode, 400)
      checkValue(interception.response.body.message, 'Ensure this value is greater than or equal to 1.')
    })
  })

  it('try to enter special characters in property size', () => {
    cy.get('[name="property_size"]').type('!@#$%^&*()_+-=')
    cy.get('[name="property_size"]').should('have.value', '')
  })

  it('try to enter invalid data in beds count (text not number)', () => {
    cy.get('[name="beds_count"]').type('shadi')
    cy.get('[name="beds_count"]').should('have.value', '')
  })

  it('try to enter beds count 0 ', () => {
    cy.fill_required_fields()
    cy.get('[name="beds_count"]').clear().type(0)
    cy.click_on_submit()
    intercept('POST', 'https://property.pan-code.com/api/admin/house/housess/', 'create_house', () => { })
    wait('@create_house', (interception) => {
      checkValue(interception.response.statusCode, 400)
      checkValue(interception.response.body.message, 'Ensure this value is greater than or equal to 1.')
    })
  })

  it('try to enter special characters in beds count', () => {
    cy.get('[name="beds_count"]').type('!@#$%^&*()_+-=')
    cy.get('[name="beds_count"]').should('have.value', '')
  })

  it('try to enter invalid data in rooms count (text not number)', () => {
    cy.get('[name="rooms_count"]').type('shadi')
    cy.get('[name="rooms_count"]').should('have.value', '')
  })

  it('try to enter rooms count 0 ', () => {
    cy.fill_required_fields()
    cy.get('[name="rooms_count"]').clear().type(0)
    cy.click_on_submit()
    intercept('POST', 'https://property.pan-code.com/api/admin/house/housess/', 'create_house', () => { })
    wait('@create_house', (interception) => {
      checkValue(interception.response.statusCode, 400)
      checkValue(interception.response.body.message, 'Ensure this value is greater than or equal to 1.')
    })
  })

  it('try to enter special characters in rooms count', () => {
    cy.get('[name="rooms_count"]').type('!@#$%^&*()_+-=')
    cy.get('[name="rooms_count"]').should('have.value', '')
  })

  it('try to enter invalid data in bathrooms count (text not number)', () => {
    cy.get('[name="bathrooms_count"]').type('shadi')
    cy.get('[name="bathrooms_count"]').should('have.value', '')
  })

  it('try to enter bathrooms count 0 ', () => {
    cy.fill_required_fields()
    cy.get('[name="bathrooms_count"]').clear().type(0)
    cy.click_on_submit()
    intercept('POST', 'https://property.pan-code.com/api/admin/house/housess/', 'create_house', () => { })
    wait('@create_house', (interception) => {
      checkValue(interception.response.statusCode, 400)
      checkValue(interception.response.body.message, 'Ensure this value is greater than or equal to 1.')
    })
  })

  it('try to enter special characters in bathrooms count', () => {
    cy.get('[name="bathrooms_count"]').type('!@#$%^&*()_+-=')
    cy.get('[name="bathrooms_count"]').should('have.value', '')
  })

  it('try search in zones in capital letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(1).type('REV')

    cy.get('div.css-19bb58m').eq(1).children().should('have.length', 1)
    cy.get('#react-select-3-listbox').within(() => {
      cy.get('#react-select-3-option-0').should('be.visible')
    })
  })

  it('try search in zones in small letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(1).type('rev')

    cy.get('div.css-19bb58m').eq(1).children().should('have.length', 1)
    cy.get('#react-select-3-listbox').within(() => {
      cy.get('#react-select-3-option-0').should('be.visible')
    })
  })

  it('try search in zones in small and capital letters', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(1).type('rEVo')

    cy.get('div.css-19bb58m').eq(1).children().should('have.length', 1)
    cy.get('#react-select-3-listbox').within(() => {
      cy.get('#react-select-3-option-0').should('be.visible')
    })
  })

  it('try to search by intermediate letters only in zones', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(1).type('lutio')

    cy.get('div.css-19bb58m').eq(1).children().should('have.length', 1)
    cy.get('#react-select-3-listbox').within(() => {
      cy.get('#react-select-3-option-0').should('be.visible')
    })
  })

  it('try x button to remove the selected zones', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(1).type('shadi')
    cy.get('div.css-1xc3v61-indicatorContainer').eq(1).click()
    cy.get('div.css-19bb58m').should('have.value', '')
  })

  it('try search in government in capital letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(2).type('Dam')

    cy.get('div.css-19bb58m').eq(2).children().should('have.length', 1)
    cy.get('#react-select-4-listbox').within(() => {
      cy.get('#react-select-4-option-0').should('be.visible')
    })
  })

  it('try search in government in small letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(2).type('dam')

    cy.get('div.css-19bb58m').eq(2).children().should('have.length', 1)
    cy.get('#react-select-4-listbox').within(() => {
      cy.get('#react-select-4-option-0').should('be.visible')
    })
  })

  it('try search in government in small and capital letters', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(2).type('daMaSC')

    cy.get('div.css-19bb58m').eq(2).children().should('have.length', 1)
    cy.get('#react-select-4-listbox').within(() => {
      cy.get('#react-select-4-option-0').should('be.visible')
    })
  })

  it('try to search by intermediate letters only in government', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(2).type('iaf')

    cy.get('div.css-19bb58m').eq(2).children().should('have.length', 1)
    cy.get('#react-select-4-listbox').within(() => {
      cy.get('#react-select-4-option-1').should('be.visible')
    })
  })

  it('try x button to remove the selected government', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(2).type('shadi')
    cy.get('div.css-1xc3v61-indicatorContainer').eq(2).click()
    cy.get('div.css-19bb58m').should('have.value', '')
  })

  it('try search in country in capital letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(3).type('SYR')

    cy.get('div.css-19bb58m').eq(3).children().should('have.length', 1)
    cy.get('#react-select-5-listbox').within(() => {
      cy.get('#react-select-5-option-0').should('be.visible')
    })
  })

  it('try search in country in small letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(3).type('syr')

    cy.get('div.css-19bb58m').eq(3).children().should('have.length', 1)
    cy.get('#react-select-5-listbox').within(() => {
      cy.get('#react-select-5-option-0').should('be.visible')
    })
  })

  it('try search in country in small and capital letters', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(3).type('syRI')

    cy.get('div.css-19bb58m').eq(3).children().should('have.length', 1)
    cy.get('#react-select-5-listbox').within(() => {
      cy.get('#react-select-5-option-0').should('be.visible')
    })
  })

  it('try to search by intermediate letters only in country', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(3).type('ria')

    cy.get('div.css-19bb58m').eq(3).children().should('have.length', 1)
    cy.get('#react-select-5-listbox').within(() => {
      cy.get('#react-select-5-option-0').should('be.visible')
    })
  })

  it('try x button to remove the selected country', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(3).type('shadi')
    cy.get('div.css-1xc3v61-indicatorContainer').eq(3).click()
    cy.get('div.css-19bb58m').should('have.value', '')
  })


  it('try to enter invalid data in longitude (text not number)', () => {
    cy.get('[name="longitude"]').type('shadi')
    cy.get('[name="longitude"]').should('have.value', '')
  })

  it('try to enter longitude 0 ', () => {
    cy.fill_required_fields()
    cy.get('[name="longitude"]').clear().type(0)
    cy.click_on_submit()
    intercept('POST', 'https://property.pan-code.com/api/admin/house/housess/', 'create_house', () => { })
    wait('@create_house', (interception) => {
      checkValue(interception.response.statusCode, 400)
      checkValue(interception.response.body.message, 'Ensure this value is greater than or equal to 1.')
    })
  })

  it('try to enter special characters in longitude', () => {
    cy.get('[name="longitude"]').type('!@#$%^&*()_+-=')
    cy.get('[name="longitude"]').should('have.value', '')
  })

  it('try to enter invalid data in latitude (text not number)', () => {
    cy.get('[name="latitude"]').type('shadi')
    cy.get('[name="latitude"]').should('have.value', '')
  })

  it('try to enter latitude 0 ', () => {
    cy.fill_required_fields()
    cy.get('[name="latitude"]').clear().type(0)
    cy.click_on_submit()
    intercept('POST', 'https://property.pan-code.com/api/admin/house/housess/', 'create_house', () => { })
    wait('@create_house', (interception) => {
      checkValue(interception.response.statusCode, 400)
      checkValue(interception.response.body.message, 'Ensure this value is greater than or equal to 1.')
    })
  })

  it('try to enter special characters in price', () => {
    cy.get('[name="price"]').type('!@#$%^&*()_+-=')
    cy.get('[name="price"]').should('have.value', '')
  })

  it('try to enter invalid data in price (text not number)', () => {
    cy.get('[name="price"]').type('shadi')
    cy.get('[name="price"]').should('have.value', '')
  })

  it('try to enter price 0 ', () => {
    cy.fill_required_fields()
    cy.get('[name="price"]').clear().type(0)
    cy.click_on_submit()
    intercept('POST', 'https://property.pan-code.com/api/admin/house/housess/', 'create_house', () => { })
    wait('@create_house', (interception) => {
      checkValue(interception.response.statusCode, 400)
      checkValue(interception.response.body.message, 'Ensure this value is greater than or equal to 1.')
    })
  })

  it('try to enter special characters in price', () => {
    cy.get('[name="price"]').type('!@#$%^&*()_+-=')
    cy.get('[name="price"]').should('have.value', '')
  })

  it('try to enter invalid data in min_day_of_reservation (text not number)', () => {
    cy.get('[name="min_day_of_reservation"]').type('shadi')
    cy.get('[name="min_day_of_reservation"]').should('have.value', '')
  })

  it('try to enter min_day_of_reservation 0 ', () => {
    cy.fill_required_fields()
    cy.get('[name="min_day_of_reservation"]').clear().type(0)
    cy.click_on_submit()
    intercept('POST', 'https://property.pan-code.com/api/admin/house/housess/', 'create_house', () => { })
    wait('@create_house', (interception) => {
      checkValue(interception.response.statusCode, 400)
      checkValue(interception.response.body.message, 'Ensure this value is greater than or equal to 1.')
    })
  })

  it('try to enter special characters in min_day_of_reservation', () => {
    cy.get('[name="min_day_of_reservation"]').type('!@#$%^&*()_+-=')
    cy.get('[name="min_day_of_reservation"]').should('have.value', '')
  })

  it('try to enter invalid data in max_day_of_reservation (text not number)', () => {
    cy.get('[name="max_day_of_reservation"]').type('shadi')
    cy.get('[name="max_day_of_reservation"]').should('have.value', '')
  })

  it('try to enter max_day_of_reservation 0 ', () => {
    cy.fill_required_fields()
    cy.get('[name="max_day_of_reservation"]').clear().type(0)
    cy.click_on_submit()
    intercept('POST', 'https://property.pan-code.com/api/admin/house/housess/', 'create_house', () => { })
    wait('@create_house', (interception) => {
      checkValue(interception.response.statusCode, 400)
      checkValue(interception.response.body.message, 'Ensure this value is greater than or equal to 1.')
    })
  })

  it('try to enter special characters in max_day_of_reservation', () => {
    cy.get('[name="max_day_of_reservation"]').type('!@#$%^&*()_+-=')
    cy.get('[name="max_day_of_reservation"]').should('have.value', '')
  })

  it('try to enter invalid data in weekly_discount (text not number)', () => {
    cy.get('[name="weekly_discount"]').type('shadi')
    cy.get('[name="weekly_discount"]').should('have.value', '')
  })

  it('try to enter weekly_discount 0 ', () => {
    cy.fill_required_fields()
    cy.get('[name="weekly_discount"]').clear().type(0)
    cy.click_on_submit()
    intercept('POST', 'https://property.pan-code.com/api/admin/house/housess/', 'create_house', () => { })
    wait('@create_house', (interception) => {
      checkValue(interception.response.statusCode, 400)
      checkValue(interception.response.body.message, 'Ensure this value is greater than or equal to 1.')
    })
  })

  it('try to enter special characters in weekly_discount', () => {
    cy.get('[name="weekly_discount"]').type('!@#$%^&*()_+-=')
    cy.get('[name="weekly_discount"]').should('have.value', '')
  })

  it('try to enter invalid data in monthly_discount (text not number)', () => {
    cy.get('[name="monthly_discount"]').type('shadi')
    cy.get('[name="monthly_discount"]').should('have.value', '')
  })

  it('try to enter monthly_discount 0 ', () => {
    cy.fill_required_fields()
    cy.get('[name="monthly_discount"]').clear().type(0)
    cy.click_on_submit()
    intercept('POST', 'https://property.pan-code.com/api/admin/house/housess/', 'create_house', () => { })
    wait('@create_house', (interception) => {
      checkValue(interception.response.statusCode, 400)
      checkValue(interception.response.body.message, 'Ensure this value is greater than or equal to 1.')
    })
  })

  it('try to enter special characters in monthly_discount', () => {
    cy.get('[name="monthly_discount"]').type('!@#$%^&*()_+-=')
    cy.get('[name="monthly_discount"]').should('have.value', '')
  })

  it('try to enter invalid data in deposit (text not number)', () => {
    cy.get('[name="depoist"]').type('shadi')
    cy.get('[name="depoist"]').should('have.value', '')
  })

  it('try to enter deposit 0 ', () => {
    cy.fill_required_fields()
    cy.get('[name="depoist"]').clear().type(0)
    cy.click_on_submit()
    intercept('POST', 'https://property.pan-code.com/api/admin/house/housess/', 'create_house', () => { })
    wait('@create_house', (interception) => {
      checkValue(interception.response.statusCode, 400)
      checkValue(interception.response.body.message, 'Ensure this value is greater than or equal to 1.')
    })
  })

  it('try to enter special characters in deposit', () => {
    cy.get('[name="depoist"]').type('!@#$%^&*()_+-=')
    cy.get('[name="depoist"]').should('have.value', '')
  })

  it('try search in tax type in capital letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(4).type('AGE')

    cy.get('div.css-19bb58m').eq(4).children().should('have.length', 1)
    cy.get('#react-select-6-listbox').within(() => {
      cy.get('#react-select-6-option-0').should('be.visible')
    })
  })

  it('try search in tax type in small letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(4).type('age')

    cy.get('div.css-19bb58m').eq(4).children().should('have.length', 1)
    cy.get('#react-select-6-listbox').within(() => {
      cy.get('#react-select-6-option-0').should('be.visible')
    })
  })

  it('try search in tax type in small and capital letters', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(4).type('aGEn')

    cy.get('div.css-19bb58m').eq(4).children().should('have.length', 1)
    cy.get('#react-select-6-listbox').within(() => {
      cy.get('#react-select-6-option-0').should('be.visible')
    })
  })

  it('try to search by intermediate letters only in tax type', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(4).type('enc')

    cy.get('div.css-19bb58m').eq(4).children().should('have.length', 1)
    cy.get('#react-select-6-listbox').within(() => {
      cy.get('#react-select-6-option-0').should('be.visible')
    })
  })

  it('try x button to remove the selected tax type', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(4).type('shadi')
    cy.get('div.css-1xc3v61-indicatorContainer').eq(4).click()
    cy.get('div.css-19bb58m').should('have.value', '')
  })

  it('try search in currency in capital letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(5).type('DOL')

    cy.get('div.css-19bb58m').eq(5).children().should('have.length', 1)
    cy.get('#react-select-7-listbox').within(() => {
      cy.get('#react-select-7-option-0').should('be.visible')
    })
  })

  it('try search in currency in small letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(5).type('dol')

    cy.get('div.css-19bb58m').eq(5).children().should('have.length', 1)
    cy.get('#react-select-7-listbox').within(() => {
      cy.get('#react-select-7-option-0').should('be.visible')
    })
  })

  it('try search in currency in small and capital letters', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(5).type('doLlA')

    cy.get('div.css-19bb58m').eq(5).children().should('have.length', 1)
    cy.get('#react-select-7-listbox').within(() => {
      cy.get('#react-select-7-option-0').should('be.visible')
    })
  })

  it('try to search by intermediate letters only in currency', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(5).type('olla')
    cy.get('div.css-19bb58m').eq(5).children().should('have.length', 1)
    cy.get('#react-select-7-listbox').within(() => {
      cy.get('#react-select-7-option-0').should('be.visible')
    })
  })

  it('try x button to remove the selected currency', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(5).type('shadi')
    cy.get('div.css-1xc3v61-indicatorContainer').eq(5).click()
    cy.get('div.css-19bb58m').should('have.value', '')
  })

  it('try search in property type in capital letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(6).type('VILLA')

    cy.get('div.css-19bb58m').eq(6).children().should('have.length', 1)
    cy.get('#react-select-8-listbox').within(() => {
      cy.get('#react-select-8-option-0').should('be.visible')
    })
  })

  it('try search in property type in small letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(6).type('villa')

    cy.get('div.css-19bb58m').eq(6).children().should('have.length', 1)
    cy.get('#react-select-8-listbox').within(() => {
      cy.get('#react-select-8-option-0').should('be.visible')
    })
  })

  it('try search in property type in small and capital letters', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(6).type('vILl')

    cy.get('div.css-19bb58m').eq(6).children().should('have.length', 1)
    cy.get('#react-select-8-listbox').within(() => {
      cy.get('#react-select-8-option-0').should('be.visible')
    })
  })

  it('try to search by intermediate letters only in property type', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(6).type('lla')
    cy.get('div.css-19bb58m').eq(6).children().should('have.length', 1)
    cy.get('#react-select-8-listbox').within(() => {
      cy.get('#react-select-8-option-0').should('be.visible')
    })
  })

  it('try x button to remove the selected property type', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(6).type('shadi')
    cy.get('div.css-1xc3v61-indicatorContainer').eq(6).click()
    cy.get('div.css-19bb58m').should('have.value', '')
  })

  it('try search in view type in capital letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(7).type('POOL')

    cy.get('div.css-19bb58m').eq(7).children().should('have.length', 1)
    cy.get('#react-select-9-listbox').within(() => {
      cy.get('#react-select-9-option-0').should('be.visible')
    })
  })

  it('try search in view type in small letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(7).type('pool')

    cy.get('div.css-19bb58m').eq(7).children().should('have.length', 1)
    cy.get('#react-select-9-listbox').within(() => {
      cy.get('#react-select-9-option-0').should('be.visible')
    })
  })

  it('try search in view type in small and capital letters', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(7).type('pOOl')

    cy.get('div.css-19bb58m').eq(7).children().should('have.length', 1)
    cy.get('#react-select-9-listbox').within(() => {
      cy.get('#react-select-9-option-0').should('be.visible')
    })
  })

  it('try to search by intermediate letters only in view type', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(7).type('ol')
    cy.get('div.css-19bb58m').eq(7).children().should('have.length', 1)
    cy.get('#react-select-9-listbox').within(() => {
      cy.get('#react-select-9-option-0').should('be.visible')
    })
  })

  it('try x button to remove the view type', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(7).type('shadi')
    cy.get('div.css-1xc3v61-indicatorContainer').eq(7).click()
    cy.get('div.css-19bb58m').should('have.value', '')
  })

  it('in View Type when removing a selected view type it should display it again in view types options', () => {
    cy.wait_for_apis()
    cy.select_Property_View()
    cy.get('div.css-1p3m7a8-multiValue').should('be.visible')
    cy.get('[aria-label="Remove pool view"]').click()
    cy.get('div.css-19bb58m').eq(7).should('not.contain', 'ValueToRemove')
    cy.get('div.css-19bb58m').eq(7).click()
    cy.get('div.css-1nmdiq5-menu').children().children().should('have.length', 9)
  })

  it('try search in safety properties in capital letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(8).type('SMOKE')

    cy.get('div.css-19bb58m').eq(8).children().should('have.length', 1)
    cy.get('#react-select-10-listbox').within(() => {
      cy.get('#react-select-10-option-0').should('be.visible')
    })
  })

  it('try search in safety properties in small letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(8).type('smoke')

    cy.get('div.css-19bb58m').eq(8).children().should('have.length', 1)
    cy.get('#react-select-10-listbox').within(() => {
      cy.get('#react-select-10-option-0').should('be.visible')
    })
  })

  it('try search in safety properties in small and capital letters', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(8).type('smOKe')

    cy.get('div.css-19bb58m').eq(8).children().should('have.length', 1)
    cy.get('#react-select-10-listbox').within(() => {
      cy.get('#react-select-10-option-0').should('be.visible')
    })
  })

  it('try to search by intermediate letters only in safety properties', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(8).type('oke')
    cy.get('div.css-19bb58m').eq(8).children().should('have.length', 1)
    cy.get('#react-select-10-listbox').within(() => {
      cy.get('#react-select-10-option-0').should('be.visible')
    })
  })

  it('try x button to remove the safety properties', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(8).type('shadi')
    cy.get('div.css-1xc3v61-indicatorContainer').eq(8).click()
    cy.get('div.css-19bb58m').should('have.value', '')
  })

  it('in View Type when removing a selected view type it should display it again in safety properties options', () => {
    cy.wait_for_apis()
    cy.select_Safety_Property()
    cy.get('div.css-1p3m7a8-multiValue').should('be.visible')
    cy.get('[aria-label="Remove Smoke alarm"]').click()
    cy.get('div.css-19bb58m').eq(8).should('not.contain', 'ValueToRemove')
    cy.get('div.css-19bb58m').eq(8).click()
    cy.get('div.css-1nmdiq5-menu').children().children().should('have.length', 10)
  })

  it('try search in amenities in capital letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(9).type('TV')

    cy.get('div.css-19bb58m').eq(9).children().should('have.length', 1)
    cy.get('#react-select-11-listbox').within(() => {
      cy.get('#react-select-11-option-0').should('be.visible')
    })
  })

  it('try search in amenities in small letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(9).type('tv')

    cy.get('div.css-19bb58m').eq(9).children().should('have.length', 1)
    cy.get('#react-select-11-listbox').within(() => {
      cy.get('#react-select-11-option-0').should('be.visible')
    })
  })

  it('try search in amenities in small and capital letters', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(9).type('tV')

    cy.get('div.css-19bb58m').eq(9).children().should('have.length', 1)
    cy.get('#react-select-11-listbox').within(() => {
      cy.get('#react-select-11-option-0').should('be.visible')
    })
  })

  it('try to search by intermediate letters only in amenities', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(9).type('owe')
    cy.get('div.css-19bb58m').eq(9).children().should('have.length', 1)
    cy.get('#react-select-11-listbox').within(() => {
      cy.get('#react-select-11-option-1').should('be.visible')
    })
  })

  it('try x button to remove the amenities', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(9).type('shadi')
    cy.get('div.css-1xc3v61-indicatorContainer').eq(9).click()
    cy.get('div.css-19bb58m').should('have.value', '')
  })

  it.only('in View Type when removing a selected view type it should display it again in safety properties options', () => {
    cy.wait_for_apis()
    cy.select_Amenities()
    cy.get('div.css-1p3m7a8-multiValue').should('be.visible')
    cy.get('[aria-label="Remove tv"]').click()
    cy.get('div.css-19bb58m').eq(9).should('not.contain', 'ValueToRemove')
    cy.get('div.css-19bb58m').eq(9).click()
    cy.get('div.css-1nmdiq5-menu').children().children().should('have.length', 18)
  })

  it('try search in providers in capital letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(10).type('NOOR')

    cy.get('div.css-19bb58m').eq(10).children().should('have.length', 1)
    cy.get('#react-select-12-listbox').within(() => {
      cy.get('#react-select-12-option-0').should('be.visible')
    })
  })

  it('try search in providers in small letters only', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(10).type('noor')

    cy.get('div.css-19bb58m').eq(10).children().should('have.length', 1)
    cy.get('#react-select-12-listbox').within(() => {
      cy.get('#react-select-12-option-0').should('be.visible')
    })
  })

  it('try search in providers in small and capital letters', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(10).type('nOOr')

    cy.get('div.css-19bb58m').eq(10).children().should('have.length', 1)
    cy.get('#react-select-12-listbox').within(() => {
      cy.get('#react-select-12-option-0').should('be.visible')
    })
  })

  it('try to search by intermediate letters only in providers', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(10).type('or')
    cy.get('div.css-19bb58m').eq(10).children().should('have.length', 1)
    cy.get('#react-select-12-listbox').within(() => {
      cy.get('#react-select-12-option-0').should('be.visible')
    })
  })

  it('try x button to remove the providers', () => {
    cy.wait_for_apis()
    cy.get('div.css-19bb58m').eq(10).type('shadi')
    cy.get('div.css-1xc3v61-indicatorContainer').eq(10).click()
    cy.get('div.css-19bb58m').should('have.value', '')
  })

  it('try to check on best Deals check box', () => {
    cy.get('[name="best_deals"]').check();
    cy.get('[name="best_deals"]').check().should('be.checked');
  })

  it('try to uncheck on best Deals check box', () => {
    cy.get('[name="best_deals"]').check();
    cy.get('[name="best_deals"]').check();
    cy.get('[name="best_deals"]').check().should('not.be.checked');
  })

  it('in price rule try to put the start date after the due date', () => {
    cy.fill_required_fields()

    cy.get('label:contains("Start Date")')
      .siblings('input[type="date"]')
      .type('2025-10-28')

    cy.get('label:contains("End Date")')
      .siblings('input[type="date"]')
      .type('2025-10-05')

    cy.click_on_submit()

    intercept('POST', 'https://property.pan-code.com/api/admin/house/housess/', 'create_house', () => { })
    wait('@create_house', (interception) => {
      checkValue(interception.response.statusCode, 400)
      checkValue(interception.response.body.message, 'End date must be greater than start date in 0 special price')
    })

  })

  it('in price rule try to set price 0 (Start-End)', () => {
    cy.fill_required_fields()
    cy.get('label:contains("Start Date")')
      .siblings('input[type="date"]')
      .type('2025-09-28')

    cy.get('label:contains("End Date")')
      .siblings('input[type="date"]')
      .type('2025-10-05')

    cy.get('label:contains("Price")')
      .siblings('input[type="number"]')
      .type(0)

    cy.click_on_submit()

    intercept('POST', 'https://property.pan-code.com/api/admin/house/housess/', 'create_house', () => { })
    wait('@create_house', (interception) => {
      checkValue(interception.response.statusCode, 400)
    })
  })

  it('in price rule try to enter text (not numbers ) in price field (Start-End)', () => {
    cy.get('label:contains("Price")')
      .siblings('input[type="number"]')
      .clear().type('shadi')

    cy.get('label:contains("Price")')
      .siblings('input[type="number"]')
      .should('have.value', '')
  })

  it('in price rule try to enter 2 prices contain same range (Start-End)', () => {
    cy.fill_required_fields()
    cy.get('label:contains("Start Date")')
      .siblings('input[type="date"]')
      .type('2025-09-28')

    cy.get('label:contains("End Date")')
      .siblings('input[type="date"]')
      .type('2025-10-05')

    cy.get('button:contains("Add Range Rule (Start-End)")').click()
    cy.get('label:contains("Start Date")').eq(1)
      .siblings('input[type="date"]')
      .type('2025-09-28')

    cy.get('label:contains("End Date")').eq(1)
      .siblings('input[type="date"]')
      .type('2025-10-05')

    cy.click_on_submit()

    intercept('POST', 'https://property.pan-code.com/api/admin/house/housess/', 'create_house', () => { })
    wait('@create_house', (interception) => {
      checkValue(interception.response.statusCode, 400)
    })
  })

  it('in price rule try to enter 2 days with 2 different prices', () => {
    cy.fill_required_fields()
    cy.get('button:contains("Add Day Rule")').click()

    cy.get('select').select('Monday')

    cy.get('label:contains("Price")')
      .siblings('input[type="number"]').eq(1)
      .clear().type(10)

    cy.get('button:contains("Add Day Rule")').click()
    cy.get('select').eq(1).select('Monday')


    cy.get('label:contains("Price")')
      .siblings('input[type="number"]').eq(2)
      .clear().type(10)

    cy.get('button:contains("Remove")').eq(0).click()

    cy.click_on_submit()

    intercept('POST', 'https://property.pan-code.com/api/admin/house/housess/', 'create_house', () => { })
    wait('@create_house', (interception) => {
      const body = interception.response.body
      cy.log('response body: ')
      Object.entries(body).forEach((key, value) => {
        cy.log(`${key}: ${value}`)
      })
      checkValue(400, interception.response.statusCode)
    })

  })

  it('in price rule try to set price 0 (Day)', () => {
    cy.fill_required_fields()
    cy.get('button:contains("Add Day Rule")').click()

    cy.get('label:contains("Price")')
      .siblings('input[type="number"]').eq(1)
      .clear().type(0)

    cy.click_on_submit()

    intercept('POST', 'https://property.pan-code.com/api/admin/house/housess/', 'create_house', () => { })
    wait('@create_house', (interception) => {
      const body = interception.response.body
      cy.log('response body: ')
      Object.entries(body).forEach((key, value) => {
        cy.log(`${key}: ${value}`)
      })
      checkValue(400, interception.response.statusCode)
    })
  })

})
