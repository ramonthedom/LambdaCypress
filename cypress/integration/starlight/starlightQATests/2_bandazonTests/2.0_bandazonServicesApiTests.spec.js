describe('Testing the API for the Starlight Band Service', () => {

  // Define the base url for the API.
  const baseUrl = 'https://star-api.starlightmusic.com/';

  const bzoncontent = "bzoncontent";
  const bzonperformance = "bzonperformance";
  const bzonteam = "bzonteam";

// check bandazon content service
  it('bzon content service should be running', () => {
    const url = baseUrl + bzoncontent
    cy.request('GET', url)
      .then((response) => {  
        expect(response.status).to.eq(200);
    })
  });

// check bandazon performance service
  it('starbridge user service 4001 should be running', () => {
    const url = baseUrl + bzonperformance
    cy.request('GET', url)
      .then((response) => {  
        expect(response.status).to.eq(200);
      })
  });

// check bandazon team service
  it('starbridge client service 4002 should be running', () => {
    const url = baseUrl + bzonteam
    cy.request('GET', url)
      .then((response) => {  
        expect(response.status).to.eq(200);
      })
  });

})