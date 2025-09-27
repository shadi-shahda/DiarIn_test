export function checkValue(expectedStatus, actualStatus) {
  expect(expectedStatus).to.equal(actualStatus)
}

export function intercept(requestType, link, alias, todo) {
  cy.intercept(requestType, link).as(alias)
  todo()
}

export function wait(alias, todo) {
  cy.wait(alias, {timeout: 120000}).then(todo)
}

export function waitForElementThen(selector, callback) {
  cy.get(selector, { timeout: 50000 }).should('be.visible').then(callback)
}

export function waitForElementToDisappearThen(selector, callback) {
  cy.get(selector, { timeout: 50000 }).should('not.exist').then(callback)
}
