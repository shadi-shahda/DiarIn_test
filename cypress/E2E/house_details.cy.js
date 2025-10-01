import { checkValue, intercept, wait, getStatus } from './../support/functions'

describe('house details', () => {

  const houseId = '6365c5a1-9028-42a3-9edd-4988cd744bca'
  const photo = 'Screenshot_273.png'
  const photoId = '43f65e9a-2af9-48cc-8d06-b13dd3d03ed5'
  const documentId = 'd4617059-6551-49b9-a940-fbf21e786934'

  Cypress.Commands.add('go_to_house_list', () => {
    intercept('GET', 'https://property.pan-code.com/api/admin/house/houses/?page=1&pageSize=10', 'getHouses', () => { })
    cy.get('span.menu-title').contains('houses').click()
    cy.get('span.menu-title').contains('houses list').click()
    wait('@getHouses', (interception) => {
      checkValue(interception.response.statusCode, 200)
    })
  })

  Cypress.Commands.add('get_house', () => {
    intercept('GET', `https://property.pan-code.com/api/admin/system_info/tax/`, 'house', () => { })
    cy.get('a.ant-dropdown-trigger').eq(0).click()
    cy.get('li.ant-dropdown-menu-item').eq(0).click()
    wait('@house', (interception) => { checkValue(interception.response.statusCode, 200) })
  })

  beforeEach(() => {
    cy.go_to_house_list()
  })

  it('house details should be displayed properly', () => {
    cy.get('a.ant-dropdown-trigger').eq(0).click()
    cy.get('li.ant-dropdown-menu-item').eq(0).click()
    intercept('GET', `https://property.pan-code.com/api/admin/house/houses/${houseId}`, 'house', () => { })
    wait('@house', (interception) => {
      checkValue(interception.response.statusCode, 200)
      const body = interception.response.body.data
      const status = getStatus(body.status)
      cy.get('span.me-1').should('have.text', `#${body.reference_number}`)
      cy.get('div.pe-2').children().eq(1).should('have.text', `${body.provider.full_name}`)
      cy.get('div.text-warning').should('have.text', status)
    })
  })

  it('house document presents below the frame when clicking on Document', () => {
    cy.get_house()
    cy.get('a.btn.btn-primary.btn-shadow')
      .should('have.attr', 'href')
      .and('include', 'lecture_1_introduction_FA_Regular_Expressions.pdf')
  })

  it('house photos present below the frame when clicking on house photos', () => {
    cy.get_house()
    cy.get('li.nav-item').eq(1).click()

    cy.get('img.ant-image-img.css-ive3o3')
      .should('have.attr', 'alt')
      .and('include', photo)
  })

  it('ability to delete the uploaded document', () => {
    cy.get_house()
    cy.get('button[aria-label="Delete image"]').should('contain.text', '×')
      .should('be.visible').should('not.be.disabled')
  })

  it('make sure delete button deletes the uploaded document', () => {
    cy.get_house()
    intercept('DELETE', `https://property.pan-code.com/api/admin/house/houses-photo/${documentId}/`, 'deleteDocument', () => { })

    cy.get('button[aria-label="Delete image"]').should('contain.text', '×').eq(0).click()
    cy.contains('button', 'Delete').should('be.visible').click()

    wait('@deleteDocument', interception => {
      checkValue(200, interception.response.statusCode)
    })
  })

  it('ability to delete the uploaded photo', () => {
    cy.get_house()
    cy.get('li.nav-item').eq(1).click()

    cy.get('button[aria-label="Delete image"]').should('contain.text', '×')
      .should('be.visible').should('not.be.disabled')
  })

  it('make sure delete button deletes the uploaded photo', () => {
    cy.get_house()
    cy.get('li.nav-item').eq(1).click()

    intercept('DELETE', `https://property.pan-code.com/api/admin/house/houses-photo/${photoId}/`, 'deletePhoto', () => { })

    cy.get('button[aria-label="Delete image"]').should('contain.text', '×').eq(1).click()
    cy.contains('button', 'Delete').should('be.visible').click()

    wait('@deletePhoto', interception => {
      checkValue(200, interception.response.statusCode)
    })
  })

  it('house general information present below frame when clicking on General information', () => {

    intercept('GET', `https://property.pan-code.com/api/admin/house/houses/${houseId}/`, 'house', () => { })
    cy.get('a.ant-dropdown-trigger').eq(0).click()
    cy.get('li.ant-dropdown-menu-item').eq(0).click()
    wait('@house', interception => {

      checkValue(interception.response.statusCode, 200)
      const body = interception.response.body.data
      cy.get('li.nav-item').eq(2).click()

      cy.contains('h3', 'Information About House').should('be.visible')

      cy.contains('label', 'Property type').should('be.visible')
        .siblings('span').should('exist').should('have.text', `${body.property_type.name} `)

      cy.contains('label', 'Property Size').should('be.visible')
        .siblings('span').should('exist').should('have.text', `${body.property_size}`)

      cy.contains('label', 'Property Overview').should('be.visible')
        .siblings('span').should('exist').should('have.text', `${body.property_overview}`)

      cy.contains('label', 'Number of rooms').should('be.visible')
        .siblings('span')
        .invoke('text')
        .then((fullText) => {
          expect(fullText).to.eq(`${body.rooms_count}room`)
        })

      cy.contains('label', 'Number of bathrooms').should('be.visible')
        .siblings('span')
        .invoke('text')
        .then((fullText) => {
          expect(fullText).to.eq(`${body.bathrooms_count}room`)
        })

      cy.contains('label', 'Number of Beds').should('be.visible')
        .siblings('span')
        .invoke('text')
        .then((fullText) => {
          expect(fullText).to.eq(`${body.beds_count}bed`)
        })

      cy.contains('h3', 'Location').should('be.visible')

      cy.contains('label', ' Zone').should('be.visible')
        .siblings('span').should('have.text', body.city.name)

      // cy.contains('label', '  Building number').should('be.visible')
      // .siblings('span').should('have.text', body.building_number)

      cy.contains('label', ' Government').should('be.visible')
        .siblings('span')
        .invoke('text')
        .then((fullText) => {
          expect(fullText).to.eq(`${body.emirate.name}`)
        })

      cy.contains('h3', 'View Types ').should('be.visible')

      body.view_types.forEach(element => {
        cy.contains('span', element.name)
      })
    })
  })

  it('house pricing details present below the frame', () => {
    intercept('GET', `https://property.pan-code.com/api/admin/house/houses/${houseId}/`, 'house', () => { })
    cy.get('a.ant-dropdown-trigger').eq(0).click()
    cy.get('li.ant-dropdown-menu-item').eq(0).click()
    wait('@house', interception => {

      checkValue(interception.response.statusCode, 200)
      const body = interception.response.body.data
      cy.get('li.nav-item').eq(3).click()

      cy.contains('h3', 'Pricing and availability ').should('be.visible')

      cy.contains('label', 'Peer Night').should('be.visible')
        .siblings('span').should('exist').should('have.text', `${body.price} $`)

      cy.contains('label', ' Weekly discount').should('be.visible')
        .siblings('span').should('exist')
        .should('have.text', body.weekly_discount === null ? '0.00  %' : `${body.weekly_discount} %`)

      cy.contains('label', ' Monthly discount').should('be.visible')
        .siblings('span').should('exist')
        .should('have.text', body.monthly_discount === null ? '0.00  %' : `${body.monthly_discount} %`)

      cy.contains('label', 'Include payment fees').should('be.visible')
        .siblings('span').should('exist')
        .should('have.text', 'No')

      cy.contains('label', 'minimum nights to be reserved').should('be.visible')
        .siblings('span').should('exist')
        .invoke('text')
        .then((fullText) => {
          expect(fullText).to.eq(`${body.min_day_of_reservation}night`)
        })

      cy.contains('label', 'Maximum nights to be reserved').should('be.visible')
        .siblings('span').should('exist')
        .invoke('text')
        .then((fullText) => {
          expect(fullText).to.eq(`${body.max_day_of_reservation}night`)
        })

      cy.contains('h3', ' Pricing Rules ').should('be.visible')

      cy.contains('span', 'Repeated Days')

      cy.contains('span', 'Range Date Pricing ')
    })
  })

  it('house Categorized Amenities present below the frame when clicking on Categorized Amenities ', () => {

    intercept('GET', `https://property.pan-code.com/api/admin/house/houses/${houseId}/`, 'house', () => { })
    cy.get('a.ant-dropdown-trigger').eq(0).click()
    cy.get('li.ant-dropdown-menu-item').eq(0).click()
    wait('@house', interception => {
      cy.get('li.nav-item').eq(3).click()
      cy.contains('button', 'Bedroom')
    })
  })

  it.only('try to change house status from view details', () => {
    intercept('GET', `https://property.pan-code.com/api/admin/house/houses/${houseId}/`, 'house', () => { })
    cy.get('a.ant-dropdown-trigger').eq(0).click()
    cy.get('li.ant-dropdown-menu-item').eq(0).click()
    wait('@house', () => { })

    cy.contains('Change Status').should('be.visible').should('not.be.disabled').click()
    
    
    
    intercept('PUT', `https://property.pan-code.com/api/admin/house/status/${houseId}/`, 'changeStatus',() => {})
    cy.get('div.css-19bb58m').eq(0).click()
    cy.get('#react-select-4-option-2').click()
    cy.get('[name="message_by_admin"]').clear().type('qwerty')
    
    cy.get('#kt_FormDrawer_close').click()
    wait('@changeStatus', interception => {
      checkValue(200, interception.response.statusCode)
    })
  })
})