describe('Check for broken images', function () {
  it('should not have any broken images', function () {
    cy.visit('https://www.starlightmusic.com')
    cy.get('img').each((img) => {
      cy.request(img.prop('src'))
        .its('status')
        .should('eq', 200)
    })
  })
})
