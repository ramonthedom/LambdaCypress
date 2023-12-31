/// <reference types="cypress" />

context('Location', function () {
  beforeEach(function () {
    cy.visit('https://example.cypress.io/commands/location')
  })

  it('cy.hash() - get the current URL hash', function () {
    // https://on.cypress.io/hash
    cy.hash().should('be.empty')
  })

  it('cy.location() - get window.location', function () {
    // https://on.cypress.io/location
    cy.location().should((location) => {
      expect(location.hash).to.be.empty
      expect(location.href).to.eq('https://example.cypress.io/commands/location')
      expect(location.host).to.eq('localhost:8080')
      expect(location.hostname).to.eq('localhost')
      expect(location.origin).to.eq('https://example.cypress.io/')
      expect(location.pathname).to.eq('/commands/location')
      expect(location.port).to.eq('8080')
      expect(location.protocol).to.eq('https:')
      expect(location.search).to.be.empty
    })
  })

  it('cy.url() - get the current URL', function () {
    // https://on.cypress.io/url
    cy.url().should('eq', 'http://example.cypress.io/commands/location')
  })
})
