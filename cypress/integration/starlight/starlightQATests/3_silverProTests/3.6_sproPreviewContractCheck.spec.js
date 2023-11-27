describe('API Contract Preview Test', () => {
  it('should confirm that the contract preview page does not return a 500 error', () => {

    const testEventId = "64a4f8508ee20fd52821ff34" // Ramon de Bruyn TRS1/03/20291 Liberty Plaza
    const contractUrl = 'https://star-api.starlightmusic.com/silproevent/api/v1/contract/preview/' + testEventId
    // https://star-api.starlightmusic.com/silproevent/api/v1/contract/preview/64a4f8508ee20fd52821ff34 

    cy.request({      
      url: contractUrl,
      failOnStatusCode: false // This will prevent Cypress from failing the test on server errors
    }).then((response) => {
      expect(response.status).to.not.equal(500);
      expect(response.status).to.equal(200);
    });
  });
});