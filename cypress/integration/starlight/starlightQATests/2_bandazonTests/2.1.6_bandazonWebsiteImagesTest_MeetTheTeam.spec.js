describe('Checking for broken images on Bandazon pages', function () {
  const mainPagesToCheck = [
    '/meet-the-team',
  ]

  // Define a function to check for broken images.
  function checkForBrokenImages (page) {
    cy.visit(`https://www.bandazon.com${page}`)
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
