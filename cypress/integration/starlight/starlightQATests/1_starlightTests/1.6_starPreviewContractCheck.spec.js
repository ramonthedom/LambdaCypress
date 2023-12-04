describe('API Contract Preview Test', () => {
  it('should confirm that the contract preview page does not return a 500 error', () => {
    const testEventId = "63560fc8e27cdf19b676de1c"; // Steve Rogers OX3/21/2029 Gotham Hall
    const contractUrl = 'https://star-api.starlightmusic.com/events/api/v1/contract/preview/' + testEventId;

    cy.request({      
      url: contractUrl,
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 500) {
        // If a 500 error is encountered, trigger the Lambda function via API Gateway
        const lambdaTriggerUrl = 'https://8ze16mvrz1.execute-api.us-east-1.amazonaws.com/prod/resetContractPreviewServices'; // Replace with your API Gateway URL
        const lambdaPayload = {
          parameter: 'starlight' // Replace with the appropriate parameter if necessary
        };

        cy.request({
          method: 'POST',
          url: lambdaTriggerUrl,
          body: lambdaPayload,
          failOnStatusCode: false
        }).then(lambdaResponse => {
          // Handle the response from the Lambda function if needed
          expect(lambdaResponse.status).to.equal(200);
          cy.log('Lambda function ContractPreviewErrorSvcReset triggered successfully.');
        });

        // Optionally, you can fail the test after triggering the Lambda function
        expect(response.status).to.not.equal(500);
      } else {
        // Original assertion for non-500 status
        expect(response.status).to.equal(200);
      }
    });
  });
});
