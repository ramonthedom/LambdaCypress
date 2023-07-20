describe('Checking for active SilverOps login page', function () {

  it('checks that login page is active', function () {
    cy.visit('https://silverops.silverproentertainment.com/')
    cy.get('.login_form_text').should('contain.text', 'Welcome back! Please login to your account.')
  })
})
