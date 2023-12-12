describe('Checking for Bandazon page images', function () {

  const mainPage = '/'
  const aboutUsPage = '/about-us'
  const celebritiesPage = '/celebrities'
  const contactUsPage = '/contact-us'
  const creditsPage = '/credits'
  const meetTheTeamPage = '/meet-the-team'
  const privacyPoliciesPage = '/privacy-polices'
  const termsAndConditionsPage = '/terms-and-conditions'

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
  it('should be check all images on Main page', function () {
    checkForBrokenImages(mainPage)
  })

  it('should be check all images on About Us page', function () {
    checkForBrokenImages(aboutUsPage)
  })

  it('should be check all images on Celebrities page', function () {
    checkForBrokenImages(celebritiesPage)
  })

  it('should be check all images on ContactUs page', function () {
    checkForBrokenImages(contactUsPage)
  })

  it('should be check all images on Credits page', function () {
    checkForBrokenImages(creditsPage)
  })

  it('should be check all images on Mee The Team page', function () {
    checkForBrokenImages(meetTheTeamPage)
  })

  it('should be check all images on Privacy Policy page', function () {
    checkForBrokenImages(privacyPoliciesPage)
  })

  it('should be check all images on Terms & Conditions page', function () {
    checkForBrokenImages(termsAndConditionsPage)
  })
})