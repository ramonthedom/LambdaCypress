describe('Testing the API for the Starlight Band Service', () => {
  // const baseUrl = 'https://star-api.starlightmusic.com/';
  it('starbridge login service should be running', () => {
    cy.visit(`https://star-api.starlightmusic.com/bridgelogin`) // Replace with the actual path to your HTML file

    cy.contains('hello this is the star bridge login service')
      .should('be.visible')
  })
})

describe('Testing the API for the Starlight Band Service', () => {
  // Define the base url for the API.
  const baseUrl = 'https://star-api.starlightmusic.com/'

  // check starbridge login service
  it('starbridge login service should be running', () => {
    cy.visit(`${baseUrl}/bridgelogin`) // Replace with the actual path to your HTML file

    cy.contains('pre', `{"msg":"hello this is the star bridge login service"}`)
      .should('be.visible')
  })

  describe('Testing the API for the Starlight Band Service', () => {
    const baseUrl = 'https://star-api.starlightmusic.com/'

    it('starbridge login service should be running', () => {
      cy.visit(`${baseUrl}/bridgelogin`) // Replace with the actual path to your HTML file

      cy.contains('pre', `{"msg":"hello this is the star bridge login service"}`)
      .should('be.visible')
    })
  })

  cy.contains('pre', '{"msg":"hello this is the star bridge login service"')
      .should('be.visible')

  // check starbridge login service
  it('starbridge login service should be running', () => {
    cy.request({
      url: `${baseUrl}/bridgelogin`,
      method: 'GET',
    })
      .its('status')
      .should('eq', 200)
  })

  // check starbridge user service;
  it('starbridge user service should be running', () => {
    cy.request({
      url: `${baseUrl}/bridgeuser`,
      method: 'GET',
    })
      .its('status')
      .should('eq', 200)
  })

  // check starbridge client service
  it('starbridge client service should be running', () => {
    cy.request({
      url: `${baseUrl}/bridgeclient`,
      method: 'GET',
    })
      .its('status')
      .should('eq', 200)
  })

  // check starbridge mail service
  it('starbridge mail service should be running', () => {
    cy.request({
      url: `${baseUrl}/bridgemail`,
      method: 'GET',
    })
      .its('status')
      .should('eq', 200)
  })

  // check starbridge maintenance service
  it('starbridge maintenance service should be running', () => {
    cy.request({
      url: `${baseUrl}/maintenance`,
      method: 'GET',
    })
      .its('status')
      .should('eq', 200)
  })

  // check starbridge sms service
  it('starbridge sms service should be running', () => {
    cy.request({
      url: `${baseUrl}/bridgesms`,
      method: 'GET',
    })
      .its('status')
      .should('eq', 200)
  })

  // check starlight users service
  it('starlight users service should be running', () => {
    cy.request({
      url: `${baseUrl}/user`,
      method: 'GET',
    })
      .its('status')
      .should('eq', 200)
  })

  // check starbridge CMS service
  it('starbridge CMS service should be running', () => {
    cy.request({
      url: `${baseUrl}/cms`,
      method: 'GET',
    })
      .its('status')
      .should('eq', 200)
  })

  // check starlight band service
  it('starlight band service should be running', () => {
    cy.request({
      url: `${baseUrl}/starlightband`,
      method: 'GET',
    })
      .its('status')
      .should('eq', 200)
  })

  // check starbridge band service
  it('starbridge band service should be running', () => {
    cy.request({
      url: `${baseUrl}/band`,
      method: 'GET',
    })
      .its('status')
      .should('eq', 200)
  })

  // check starlight event service
  it('starlight event service should be running', () => {
    cy.request({
      url: `${baseUrl}/events`,
      method: 'GET',
    })
      .its('status')
      .should('eq', 200)
  })

  // check starbridge event service
  it('starbridge event service should be running', () => {
    cy.request({
      url: `${baseUrl}/bridgeevent`,
      method: 'GET',
    })
      .its('status')
      .should('eq', 200)
  })
})

describe('Testing the API for the Starlight Band Service', () => {
  const baseUrl = 'https://star-api.starlightmusic.com/'

  it('starbridge login service should be running', () => {
    cy.visit(`${baseUrl}/bridgelogin`) // Replace with the actual path to your HTML file

    cy.contains('pre', `{"msg":"hello this is the star bridge login service"}`)
      .should('be.visible')
  })
})
