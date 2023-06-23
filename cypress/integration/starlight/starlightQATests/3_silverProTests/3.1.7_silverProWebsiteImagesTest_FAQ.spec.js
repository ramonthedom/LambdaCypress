describe('Checking for broken images on Silver Pro pages', function () {
  const mainPagesToCheck = [
    '/faq',
  ]

  // Define a function to check for broken images.
  function checkForBrokenImages (page) {
    cy.visit(`https://new.silverproentertainment.com${page}`)

    cy.get('.modal-content').should('be.visible')
    cy.get('.modal-close').click()
    cy.get('.modal-content').should('not.be.visible')
    
    cy.get('img').each((img) => {
      cy.request(img.prop('src'))
        .its('status')
        .should('eq', 200)
    })
  }

  // Check for broken images on the main pages.
  it('should be check all images on main pages', function () {
    mainPagesToCheck.forEach(checkForBrokenImages)
  })
})
