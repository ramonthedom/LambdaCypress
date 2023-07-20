describe('Checking for active Silverpro page images', function () {

  const mainPage = '/'
  const ourTalentPage = '/our-talent'
  const aboutUsPage = '/about-us'
  const celebritiesPage = '/celebrities'
  const contactUsPage = '/contact'
  const creditsPage = '/credits'
  const faqPage = '/faq'
  const meetTheTeamPage = '/meet-the-team'
  const privacyPoliciesPage = '/privacy-polices'
  const termsAndConditionsPage = '/terms-and-conditions'

  // Define a function to check for broken images.
  function checkForBrokenImages (page) {
    cy.visit(`https://www.silverproentertainment.com${page}`)
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

  it('should be check all images on Talent page', function () {
    checkForBrokenImages(ourTalentPage)
  })

  it('should be check all images on About Us page', function () {
    checkForBrokenImages(aboutUsPage)
  })

  it('should be check all images on Celebrities page', function () {
    checkForBrokenImages(celebritiesPage)
  })

  it('should be check all images on ContactUs page', function () {
    cy.visit(`https://www.silverproentertainment.com${contactUsPage}`)
    cy.get('.fade > .modal-dialog > .modal-content > .modal-body > .img_btn').click()
    cy.get('img').each((img) => {
      cy.request(img.prop('src'))
        .its('status')
        .should('eq', 200)
    })
  })

  it('should be check all images on Credits page', function () {
    checkForBrokenImages(creditsPage)
  })

  it('should be check all images on FAQ page', function () {
    checkForBrokenImages(faqPage)
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
