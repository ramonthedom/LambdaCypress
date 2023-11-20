describe('API Contract Preview Test', () => {
  it('should confirm that the contract preview page does not return a 500 error', () => {

    const testEventId = "63560fc8e27cdf19b676de1c" // Steve Rogers OX3/21/2029 Gotham Hall
    const contractUrl = 'https://star-api.starlightmusic.com/events/api/v1/contract/preview/' + testEventId

    cy.request({      
      url: contractUrl,
      failOnStatusCode: false // This will prevent Cypress from failing the test on server errors
    }).then((response) => {
      expect(response.status).to.not.equal(500);
      expect(response.status).to.equal(200);
    });
  });
});