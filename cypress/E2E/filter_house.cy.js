function checkValue(expectedStatus, actualStatus) {
  expect(expectedStatus).to.equal(actualStatus)
}

function intercept(requestType, link, alias, todo, status) {
  cy.intercept(requestType, link).as(alias)
  todo()
}

function wait(alias, todo) {
  cy.wait(alias).then(todo)
}

describe('Filter houses', () => {

  
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
    
    // beforeEach(() => {
    //   cy.login()
    // })
    
  Cypress.Commands.add('waitForElementThen', (selector, callback) => {
    cy.get(selector, { timeout: 50000 }).should('be.visible').then(callback)
  })

  Cypress.Commands.add('houses_list_first_page', () => {
    cy.get('span.menu-title').contains('houses').click()
    cy.get('span.menu-title').contains('houses list').click()
    intercept('GET', 'https://property.pan-code.com/api/admin/house/houses/?page=1&pageSize=10', 'getHouses', () => { })
    wait('@getHouses', (interception) => {
      checkValue(interception.response.statusCode, 200)
    })
  })

  Cypress.Commands.add('click_on_filter', () => {
    cy.get('#kt_TableFilters_toggle').click()
  })

  Cypress.Commands.add('select_status', () => {
    cy.get('div.css-19bb58m').eq(0).click()
    cy.get('#react-select-2-option-1').click()
  })

  Cypress.Commands.add('select_provider', () => {
    cy.get('div.css-19bb58m').eq(1).click()
    cy.get('#react-select-3-option-2').click()
  })

  Cypress.Commands.add('enter_reference_number', () => {
    cy.get('input.form-control').type(42)
  })

  it('houses list', () => {
    cy.houses_list_first_page()
  })

  it('filter by status (Pending)', () => {
    cy.houses_list_first_page()
    cy.click_on_filter()
    cy.select_status()
    cy.get('button#kt_TableFilters_close').eq(1).click()
    cy.waitForElementThen('table tbody tr', ($el) => {
      cy.get('table tbody tr').each(($row) => {
        const cells = $row.find('td')
        if (cells.length > 8) {
          cy.wrap(cells.eq(8)).should('contain.text', 'Pending')
        }
      })
    })

    // expect(element.status).to.equal(1)
  })

  it('try x button to remove the selected status', () => {
    cy.houses_list_first_page()
    cy.click_on_filter()
    cy.get('div.css-19bb58m').eq(0).type('shadi')
    cy.get('div.css-1xc3v61-indicatorContainer').eq(0).click()
    cy.get('div.css-19bb58m').should('have.text', '')
  })

  it('try search in status in capital letters only', () => {
    cy.houses_list_first_page()
    cy.click_on_filter()
    cy.get('div.css-19bb58m').eq(0).type('PEN')

    cy.get('div.css-19bb58m').eq(0).children().should('have.length', 1)
    cy.get('#react-select-2-listbox').within(() => {
      cy.get('#react-select-2-option-1').should('be.visible')
    })
  })

  it('try search in status in small letters only', () => {
    cy.houses_list_first_page()
    cy.click_on_filter()
    cy.get('div.css-19bb58m').eq(0).type('pen')

    cy.get('div.css-19bb58m').eq(0).children().should('have.length', 1)
    cy.get('#react-select-2-listbox').within(() => {
      cy.get('#react-select-2-option-1').should('be.visible')
    })
  })

  it('try search in status in capital and  small letters', () => {
    cy.houses_list_first_page()
    cy.click_on_filter()
    cy.get('div.css-19bb58m').eq(0).type('pEN')

    cy.get('div.css-19bb58m').eq(0).children().should('have.length', 1)
    cy.get('#react-select-2-listbox').within(() => {
      cy.get('#react-select-2-option-1').should('be.visible')
    })
  })

  it('try to search by intermediate letters only in statuses', () => {
    cy.houses_list_first_page()
    cy.click_on_filter()
    cy.get('div.css-19bb58m').eq(0).type('ndi')

    cy.get('div.css-19bb58m').eq(0).children().should('have.length', 1)
    cy.get('#react-select-2-listbox').within(() => {
      cy.get('#react-select-2-option-1').should('be.visible')
    })
  })

  it('filter by provider (علا الحفار)', () => {
    cy.houses_list_first_page()
    cy.click_on_filter()
    cy.select_provider()

    cy.get('button#kt_TableFilters_close').eq(1).click()
    cy.waitForElementThen('table tbody tr', ($el) => {
      cy.get('table tbody tr').each(($row) => {
        if ($row.length > 0) {
          const cells = $row.find('td')
          cy.wrap(cells.eq(4)).should('contain.text', 'علا الحفار')
        }
      })
    })
  })

  it('try x button to remove the selected provider', () => {
    cy.houses_list_first_page()
    cy.click_on_filter()
    cy.get('div.css-19bb58m').eq(1).click()
    cy.get('#react-select-3-option-2').click()
    cy.get('div.react-select__clear-indicator').eq(0).click()
    cy.get('div.css-19bb58m').eq(1).should('have.text', '')
  })

  it.only('try search in providers in capital letters only', () => {
    cy.login()
    cy.houses_list_first_page()
    cy.click_on_filter()
    cy.get('div.css-19bb58m').eq(1).type('NOOR')

    cy.get('div.css-19bb58m').eq(1).children().should('have.length', 1)
    cy.get('#react-select-2-listbox').within(() => {
      cy.get('#react-select-3-option-2').should('be.visible')
    })
  })

  it('try search in providers in small letters only', () => {
    cy.houses_list_first_page()
    cy.click_on_filter()
    cy.get('div.css-19bb58m').eq(1).type('noor')

    cy.get('div.css-19bb58m').eq(1).children().should('have.length', 1)
    cy.get('#react-select-2-listbox').within(() => {
      cy.get('#react-select-3-option-2').should('be.visible')
    })
  })

  it('try search in providers in capital and small letters', () => {
    cy.houses_list_first_page()
    cy.click_on_filter()
    cy.get('div.css-19bb58m').eq(1).type('or')

    cy.get('div.css-19bb58m').eq(1).children().should('have.length', 1)
    cy.get('#react-select-2-listbox').within(() => {
      cy.get('#react-select-3-option-2').should('be.visible')
    })
  })

  it('try search in providers in arabic', () => {
    cy.houses_list_first_page()
    cy.click_on_filter()
    cy.get('div.css-19bb58m').eq(1).type('علا')

    cy.get('div.css-19bb58m').eq(1).children().should('have.length', 1)
    cy.get('#react-select-2-listbox').within(() => {
      cy.get('#react-select-3-option-2').should('be.visible')
    })
  })

  it('filter by reference number', () => {
    cy.houses_list_first_page()
    cy.click_on_filter()
    cy.enter_reference_number()

    cy.get('button#kt_TableFilters_close').eq(1).click()
    cy.waitForElementThen('table tbody tr', ($el) => {
      cy.get('table tbody tr').each(($row) => {
        if ($row.length > 0) {
          const cells = $row.find('td')
          cy.wrap(cells.eq(0)).should('contain.text', '42')
        }
      })
    })
  })

  it('filter by status and provider', () => {
    cy.houses_list_first_page()
    cy.click_on_filter()
    cy.select_status()
    cy.select_provider()
    cy.get('button#kt_TableFilters_close').eq(1).click()
    cy.waitForElementThen('table tbody tr', ($el) => {
      cy.get('table tbody tr').each(($row) => {
        if ($row.length > 0) {
          const cells = $row.find('td')
          cy.wrap(cells.eq(4)).should('contain.text', 'علا الحفار')
          cy.wrap(cells.eq(8)).should('contain.text', 'Pending')
        }
      })
    })
  })

  it('filter by status and reference number', () => {
    cy.houses_list_first_page()
    cy.click_on_filter()
    cy.select_status()
    cy.enter_reference_number()
    cy.get('button#kt_TableFilters_close').eq(1).click()
    cy.waitForElementThen('table tbody tr', ($el) => {
      cy.get('table tbody tr').each(($row) => {
        if ($row.length > 0) {
          const cells = $row.find('td')
          cy.wrap(cells.eq(0)).should('contain.text', '42')
          cy.wrap(cells.eq(8)).should('contain.text', 'Pending')
        }
      })
    })
  })

  it('filter by provider and reference number', () => {
    cy.houses_list_first_page()
    cy.click_on_filter()
    cy.select_provider()
    cy.enter_reference_number()
    cy.get('button#kt_TableFilters_close').eq(1).click()
    cy.waitForElementThen('table tbody tr', ($el) => {
      cy.get('table tbody tr').each(($row) => {
        if ($row.length > 0) {
          const cells = $row.find('td')
          cy.wrap(cells.eq(4)).should('contain.text', 'علا الحفار')
          cy.wrap(cells.eq(0)).should('contain.text', '42')
        }
      })
    })
  })

  it('filter by status, provider and reference number', () => {
    cy.houses_list_first_page()
    cy.click_on_filter()
    cy.select_provider()
    cy.enter_reference_number()
    cy.get('button#kt_TableFilters_close').eq(1).click()
    cy.waitForElementThen('table tbody tr', ($el) => {
      cy.get('table tbody tr').each(($row) => {
        if ($row.length > 0) {
          const cells = $row.find('td')
          cy.wrap(cells.eq(0)).should('contain.text', '42')
          cy.wrap(cells.eq(4)).should('contain.text', 'علا الحفار')
          cy.wrap(cells.eq(8)).should('contain.text', 'Pending')
        }
      })
    })
  })

  it('remove added filter(s)', () => {
    cy.houses_list_first_page()
    cy.click_on_filter()
    cy.enter_reference_number()
    cy.get('button#kt_TableFilters_close').eq(1).click()
    cy.waitForElementThen('table tbody tr', ($el) => {
      cy.get('table tbody tr').each(($row) => {
      })
    })

    cy.click_on_filter()
    cy.get('button#kt_TableFilters_close').eq(2).click()
    cy.waitForElementThen('table tbody tr', ($el) => {
      cy.get('table tbody tr')
      .its('length')
      .then((count) => {
        expect(count).to.be.greaterThan(1)
      })
    })
  })

})

//nooralhasan882@gmail.com