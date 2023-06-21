describe('Testing the API for the Starlight Band Service', () => {
  // Define the base url for the API.
  const baseUrl = 'https://star-api.starlightmusic.com/'

  const bridgelogin = 'bridgelogin' //4000
  const bridgeuser = 'bridgeuser' //4001
  const bridgeclient = 'bridgeclient' //4002
  // const bridgemail = 'bridgemail' //4003
  const maintenance = 'maintenance' //4004
  const bridgesms = 'bridgesms' //4006
  const user = 'user' //4007
  const cms = 'cms' //4008
  const starlightband = 'starlightband' //4009
  const band = 'band' //4010
  const events = 'events' //4011
  const bridgeevent = 'bridgeevent' //4012

  // Check starbridge login service 4000
  it('starbridge login service 4000 should be running', () => {
    const url = baseUrl + bridgelogin

    cy.request('GET', url)
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  })

  // check starbridge user service 4001;
  it('starbridge user service 4001 should be running', () => {
    const url = baseUrl + bridgeuser

    cy.request('GET', url)
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  })

  // check starbridge client service 4002
  it('starbridge client service 4002 should be running', () => {
    const url = baseUrl + bridgeclient

    cy.request('GET', url)
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  })

  // check starbridge mail service 4003
  // it('starbridge mail service 4003 should be running', () => {
  //   const url = baseUrl + bridgemail
  //   cy.request('GET', url)
  //     .then((response) => {
  //       expect(response.status).to.eq(200);
  //     })
  // });

  // check starbridge maintenance service 4004
  it('starbridge maintenance service 4004 should be running', () => {
    const url = baseUrl + maintenance

    cy.request('GET', url)
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  })

  // check starbridge sms service 4006
  it('starbridge sms service 4006 should be running', () => {
    const url = baseUrl + bridgesms

    cy.request('GET', url)
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  })

  // check starlight users service 4007
  it('starlight users service 4007 should be running', () => {
    const url = baseUrl + user

    cy.request('GET', url)
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  })

  // check starbridge CMS service 4008
  it('starbridge CMS service 4008 should be running', () => {
    const url = baseUrl + cms

    cy.request('GET', url)
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  })

  // check starlight band service 4009
  it('starlight band service 4009 should be running', () => {
    const url = baseUrl + starlightband

    cy.request('GET', url)
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  })

  // check starbridge band service 4010
  it('starbridge band service 4010 should be running', () => {
    const url = baseUrl + band

    cy.request('GET', url)
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  })

  // check starlight event service 4011
  it('starlight event service 4011 should be running', () => {
    const url = baseUrl + events

    cy.request('GET', url)
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  })

  // check starbridge event service 4012
  it('starbridge event service 4012 should be running', () => {
    const url = baseUrl + bridgeevent

    cy.request('GET', url)
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  })
})
