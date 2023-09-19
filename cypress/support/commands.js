// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
    {
        function makeRequest() {
            // FETCH OTP
            cy.request({
                method: 'POST',
                url: 'https://8ze16mvrz1.execute-api.us-east-1.amazonaws.com/prod/fetch',
              }).wait(3000)
              .then((response) => {
                expect(response.status).to.eq(200); // assert status code
                // Further checks based on the response
                var otp = response.body;
                cy.log('Returned OTP: ', otp);
        
                // Convert to string if it's not
                if (typeof otp !== 'string') {
                  otp = otp.toString();
                }
        
                expect(otp.length).to.eq(6);
        
                // Split the returned data into an array of characters
                const characters = otp.split('');
        
                // Loop through the array and input each character into the corresponding form field
                characters.forEach((char, index) => {
                  cy.get(`.otp_input_form:nth-child(${index + 1}) > input`).type(char);
                });
        
              });
        
            // Login
            cy.wait(3000);
            cy.get('.login_btn').click().wait(3000);
        
          }

        cy.session([username, password], () => 
        {
            cy.visit("https://starbridge.starlightmusic.com")
            cy.viewport(1728, 1000);
            cy.get('.login_form_text').should('contain.text', 'Welcome back! Please login to your account.')

            // ENTER USER INFO
            cy.get('#user_email').type(username)
            cy.get('[data-test=user_password]').type(password)

            cy.get('.login_btn').click();
            cy.get('[data-test=login_form]').submit();
            cy.get('.login_form_heading').should('contain.text', 'Verification Code')

            makeRequest()
            // UNCHECK REMEMBER ME

            cy.get('body').then(($body) => {
                if ($body.find('[style="color: red;"]:contains("Wrong otp")').length) {
                    cy.log('Element with "Wrong otp" found'); // The element with style "color: red;" containing "Wrong otp" exists
                    cy.get('.error-resend').click();
                    makeRequest()
                } else {
                    cy.log('Element with "Wrong otp" not found'); // The element does not exist
                }
            });
            console.log("LOGIN SUCCESS")

            cy.contains('.dashboard_heading', 'Dashboard').should('exist');

        }, 
        // {
        //     validate: () => {
        //         // Example: check if a specific element exists to determine if session is still valid
        //         return cy.get('.dashboard_heading').should('exist');
        //     }
        // }
        );
    }
})
