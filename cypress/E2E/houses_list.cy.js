import { checkValue, intercept, wait, waitForElementThen } from './../support/functions'

describe('houses list data displayed properly', () => {

  it('house details should be displayed properly', () => {
    cy.get('span.menu-title').contains('houses').click()
    cy.get('span.menu-title').contains('houses list').click()
    intercept('GET', 'https://property.pan-code.com/api/admin/house/houses/?page=1&pageSize=10', 'getHouses', () => { })
    wait('@getHouses', (interception) => {
      checkValue(interception.response.statusCode, 200)
      const apiData = interception.response.body.data

      cy.get('thead tr th').eq(0).should('contain', 'reference_number')
      cy.get('thead tr th').eq(1).should('contain', 'property_type')
      cy.get('thead tr th').eq(2).should('contain', 'view_types')
      cy.get('thead tr th').eq(3).should('contain', 'address')
      cy.get('thead tr th').eq(4).should('contain', 'provider')
      cy.get('thead tr th').eq(5).should('contain', 'tax_type')
      cy.get('thead tr th').eq(6).should('contain', 'depoist')
      cy.get('thead tr th').eq(7).should('contain', 'reservations count')
      cy.get('thead tr th').eq(8).should('contain', 'status')
      cy.get('thead tr th').eq(9).should('contain', 'actions')

      apiData.forEach((item, index) => {
        cy.get('tbody tr').eq(index).within(() => {
          const expectedViews = item.view_types.map(v => v.name).join(', ');
          const tax_type = item.tax_type === null ? '-' : item.tax_type.label
          const reservations_count = item.reservations_count === 0 ? '-' : item.reservations_count
          const status = item.status === 0 ? 'Draft' : item.status === 1 ? 'Pending' : item.status === 2 ? 'Rejected' : 'Published'

          cy.get('td').eq(0).should('contain', item.reference_number)
          cy.get('td').eq(1).should('contain', item.property_type.name)
          cy.get('td').eq(2).should('contain', expectedViews)
          cy.get('td').eq(3).invoke('text').then((text) => {
            expect(text.trim()).to.equal(`Zone ${item.city.name} , Government  ${item.city.emirate.name}`)
          })
          cy.get('td').eq(4).should('contain', item.provider.full_name)
          cy.get('td').eq(5).should('contain', tax_type)
          cy.get('td').eq(6).should('contain', item.depoist)
          cy.get('td').eq(7).should('contain', reservations_count)
          cy.get('td').eq(8).should('contain', status)
        })
      })
    })
  })
})