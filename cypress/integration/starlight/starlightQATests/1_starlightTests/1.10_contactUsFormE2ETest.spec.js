describe('Starlight Contact Us Form E2E Test', function () {
  const prodUrl = 'https://www.starlightmusic.com'

  // Register the intercept BEFORE visiting the page
  beforeEach(() => {
    cy.intercept('POST', '**/getInTouch', (req) => {
      req.headers['x-qa-bypass-token'] = Cypress.env('QA_BYPASS_TOKEN')
    }).as('formSubmit')
  })

  it('Contact Us page loads correctly with all form fields', function () {
    cy.visit(prodUrl + '/contact-us', { timeout: 30000 })
    cy.get('.contact-form-container', { timeout: 15000 }).should('exist')
    cy.get('.contact-form-heading').should('contain', 'Get in Touch')
    cy.get('#fname-input').should('exist')
    cy.get('#lname-input').should('exist')
    cy.get('.react-tel-input > .form-control').should('exist')
    cy.get('#email-input').should('exist')
    cy.get('#event-date-input').should('exist')
    cy.get('#venue-input').should('exist')
    cy.get('.contact-us-submit-btn').should('exist')
    cy.get('#message-input').should('exist')
  })

  it('Fill and submit Contact Us form', function () {
    const timestamp = Date.now()
    // Calculate a date 65 days from now in MM/DD/YYYY format
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 65)
    const month = String(futureDate.getMonth() + 1).padStart(2, '0')
    const day = String(futureDate.getDate()).padStart(2, '0')
    const year = futureDate.getFullYear()
    const dateStr = `${month}/${day}/${year}`

    cy.visit(prodUrl + '/contact-us', { timeout: 30000 })
    cy.get('.contact-form-container', { timeout: 15000 }).should('exist')

    // First Name
    cy.get('#fname-input').click({ force: true }).type('QATest', { force: true })

    // Last Name
    cy.get('#lname-input').click({ force: true }).type('WeeklyCheck', { force: true })

    // Phone (react-phone-input-2: renders as .react-tel-input > .form-control)
    cy.get('.react-tel-input > .form-control').click({ force: true })
      .type('(555) 867-5309', { force: true })

    // Email
    cy.get('#email-input').click({ force: true })
      .type('qa-weekly@starlightmusic.com', { force: true })

    // Event Date (Ant DatePicker: type date + press Enter to close picker)
    cy.get('#event-date-input').click({ force: true })
      .type(dateStr, { force: true })
    cy.get('#event-date-input').type('{enter}', { force: true })

    // Venue (Google Autocomplete: type text, no need to select suggestion)
    cy.get('#venue-input').click({ force: true })
      .type('The Plaza Hotel New York NY', { force: true })
    cy.wait(1000) // Let autocomplete populate

    // Event Type (Ant Select: click to open dropdown, click first option)
    cy.get('#event-type-input').closest('.ant-select').click({ force: true })
    cy.get('.ant-select-item-option').first().click({ force: true })

    // How did you hear (Ant Select: select "Other")
    cy.get('#hear-about-us-input').closest('.ant-select').click({ force: true })
    cy.get('.ant-select-item-option').contains('Other').click({ force: true })

    // Contact Reason (default is Pricing and Availability, keep it)

    // Message
    cy.get('#message-input').click({ force: true })
      .type(`QA_WEEKLY_TEST_${timestamp} - Automated weekly QA test. Please ignore.`, { force: true })

    cy.wait(2000) // Allow form to settle

    // Submit
    cy.get('.contact-us-submit-btn').click({ force: true })

    // Assert success
    cy.wait('@formSubmit', { timeout: 30000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })

    // Verify redirect to thank-you page
    cy.url({ timeout: 15000 }).should('include', '/contact-us/thank-you')
  })
})
