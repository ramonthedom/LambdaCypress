describe('Starlight Results Test', function () {

    beforeEach(() => {
        // Intercept image requests and block them
        cy.intercept('**/*.(png|jpg|jpeg|gif|svg)', (req) => {
          req.destroy();
        });
      });

    let resultText;

    it('Checks Large and Small Band Results', function () {        

        cy.viewport(2560, 1328)
        cy.visit('https://www.starlightmusic.com/meet-the-team')

        cy.get('.navbar > .w-100 > .Header_nav_section_search__3JI_2 > .Header_nav_section_search_mini__2zAlY > .d-flex').click();

        cy.get('.d-flex > #search-date-input > .ant-picker > .ant-picker-input > input').click();

        cy.get('.d-flex > #search-date-input > .ant-picker-focused > .ant-picker-input > input').type(`{selectall}09/20/2026{enter}`);

        // cy.get('.d-flex > #search-date-input > .ant-picker-focused > .ant-picker-input > input').type(`{selectall}09/09/2029{enter}`).wait(50).type(`{tab}{downarrow}{enter}`).wait(50).type(`{tab}{tab}{enter}`);

        // cy.get('#search-venue-input').click();
        cy.get('#search-venue-input').type('{selectall}Gotham Hall, Broadway, New York, NY, USA').wait(500).type(`{downarrow}{enter}`);

        cy.wait(3000);

        cy.get('#run-search-btn').click();

        cy.wait(3000);
        // Use cy.url() to retrieve the current URL and then use .then() to handle its value
        cy.url().then((currentUrl) => {
            if (currentUrl === 'https://www.starlightmusic.com/meet-the-team') {
                // If the URL is still 'https://www.url.com/page1', click the button again
                cy.get('#search-venue-input').click().wait(500).type(`{downarrow}{enter}`);
                cy.wait(500);
                cy.get('#run-search-btn').click();
            } else {
                // If the URL is not 'https://www.url.com/page1', move forward with other actions
                cy.log('URL has changed, moving forward.');
            }
        });

        cy.wait(5000);

        cy.get(':nth-child(2) > :nth-child(1) > .SearchResult_search_result_card_body__rQjZ- > :nth-child(3) > :nth-child(1) > .SearchResult_search_result_card_avg__1HMIO > .SearchResult_search_result_card_price__36J67').then(($elem) => {
            resultText = $elem.text();
            cy.log("in Block 1: ", resultText)
        })

        // Step 1: Intercept the request
        cy.intercept('POST', '/starlightband/api/v1/reviews').as('getReviews');
        // cy.intercept('POST', '**/reviews').as('getReviews');

        // Step 2: Trigger the request
        cy.get(':nth-child(2) > :nth-child(1) > .SearchResult_search_result_card_body__rQjZ- > :nth-child(3) > .d-flex > .SearchResult_search_result_card_explore_btn__1VZk6').click({force: true});

        // VERSION 1: Step 3: Wait for the request and log the response
        cy.get('@getReviews').should(response => {
            cy.log("Response 1");
            cy.log(response);
            cy.log('--------')
            cy.log("Response 2");
            // cy.log(response.response.body);n
        })

        // VERSION 2: Step 3: Wait for the request and log the response
        cy.wait('@getReviews', {setTimeout: 6000}).then((interception) => {
            // Log the entire response
            cy.log("interception.response")
            cy.log(interception.response);
  
            // If you want to log just the body
            cy.log("interception.response.body")
            cy.log(interception.response.body);

            //
            cy.log("interception")
            cy.log(interception);
        });

        cy.wait(2000);
        cy.contains('h1', 'Blake Band').should('exist');


    })

    it('uses result elsewhere', () => {
        cy.log("in Block 2: ", resultText)
    })

})