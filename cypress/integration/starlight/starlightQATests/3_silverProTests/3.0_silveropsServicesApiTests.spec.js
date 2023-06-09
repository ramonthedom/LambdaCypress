describe('Testing the API for the Starlight Band Service', () => {

  // Define the base url for the API.
  const baseUrl = 'https://star-api.starlightmusic.com/';

  // Define the api key.

  const silopslogin = "silopslogin";
  const silopsuser = "silopsuser";
  const silopsclient = "silopsclient";
  const silopsmail = "silopsmail";
  const silopsmaintenance = "silopsmaintenance";
  const silopssms = "silopssms";
  const silprouser = "silprouser";
  const silprocms = "silprocms";
  const silproband = "silproband";
  const silopsband = "silopsband";
  const silproevent = "silproevent";
  const silopsevent = "silopsevent";

  // Check silopslogin 
  it('silopslogin should be running', () => {
    const url = baseUrl + silopslogin
    cy.request('GET', url)
      .then((response) => {  
        expect(response.status).to.eq(200);
    })
  });

  // check silopsuser 
  it('silopsuser should be running', () => {
    const url = baseUrl + silopsuser
    cy.request('GET', url)
      .then((response) => {  
        expect(response.status).to.eq(200);
      })
  });

// check silopsclient
  it('silopsclient should be running', () => {
    const url = baseUrl + silopsclient
    cy.request('GET', url)
      .then((response) => {  
        expect(response.status).to.eq(200);
      })
  });

// // check silopsmail 
//   it('silopsmail should be running', () => {
//     const url = baseUrl + silopsmail
//     cy.request('GET', url)
//       .then((response) => {  
//         expect(response.status).to.eq(200);
//       })
//   });

// check silopsmaintenance
  it('silopsmaintenance should be running', () => {
    const url = baseUrl + silopsmaintenance
    cy.request('GET', url)
      .then((response) => {  
        expect(response.status).to.eq(200);
      })
  });

// check silopssms
  it('silopssms should be running', () => {
    const url = baseUrl + silopssms
    cy.request('GET', url)
      .then((response) => {  
        expect(response.status).to.eq(200);
      })
  });

// check silprouser 
  it('silprouser should be running', () => {
    const url = baseUrl + silprouser
    cy.request('GET', url)
      .then((response) => {  
        expect(response.status).to.eq(200);
      })
  });

// check silprocms 
  it('silprocms should be running', () => {
    const url = baseUrl + silprocms
    cy.request('GET', url)
      .then((response) => {  
        expect(response.status).to.eq(200);
      })
  });

// check silproband 
  it('silproband should be running', () => {
    const url = baseUrl + silproband
    cy.request('GET', url)
      .then((response) => {  
        expect(response.status).to.eq(200);
      })
  });

// check silopsband 
  it('silopsband should be running', () => {
    const url = baseUrl + silopsband
    cy.request('GET', url)
      .then((response) => {  
        expect(response.status).to.eq(200);
      })
  });

// check silproevent 
  it('silproevent should be running', () => {
    const url = baseUrl + silproevent
    cy.request('GET', url)
      .then((response) => {  
        expect(response.status).to.eq(200);
      })
  });

// check silopsevent 
it('silopsevent should be running', () => {
  const url = baseUrl + silopsevent
  cy.request('GET', url)
    .then((response) => {  
      expect(response.status).to.eq(200);
    })
});

})