describe('Checking for active Starbridge login page', function () {

  it('checks that login page is active', function () {
    cy.visit('https://starbridge.starlightmusic.com/')
    cy.get('.login_form_text').should('contain.text', 'Welcome back! Please login to your account.')
  })
})
