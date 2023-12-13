describe('Starlight Results Test', function () {

    it('Checks Large and Small Band Results', function () {

        cy.viewport(2560, 1328)

        cy.visit('https://www.silverproentertainment.com/meet-the-team')

        cy.get('.navbar > .w-100 > .Header_nav_section_search__3JI_2 > .Header_nav_section_search_mini__2zAlY > .d-flex').click();

        cy.get('.d-flex > #search-date-input > .ant-picker > .ant-picker-input > input').click();

        cy.get('.d-flex > #search-date-input > .ant-picker-focused > .ant-picker-input > input').type(`{selectall}09/09/2029{enter}`);

        // cy.get('.d-flex > #search-date-input > .ant-picker-focused > .ant-picker-input > input').type(`{selectall}09/09/2029{enter}`).wait(50).type(`{tab}{downarrow}{enter}`).wait(50).type(`{tab}{tab}{enter}`);

        // cy.get('#search-venue-input').click();
        cy.get('#search-venue-input').type('{selectall}Gotham Hall, Broadway, New York, NY, USA').wait(500).type(`{downarrow}{enter}`);

        cy.wait(3000);

        cy.get('#run-search-btn').click();

        cy.wait(3000);
        // Use cy.url() to retrieve the current URL and then use .then() to handle its value
        cy.url().then((currentUrl) => {
            if (currentUrl === 'https://www.silverproentertainment.com/meet-the-team') {
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

        // Check results
        cy.contains('h4', 'Congratulations!').should('exist');

        // Check for the presence of exactly 2 ul elements with the specified class
        cy.get('.SearchResult_search_result_cards__23uLY')
        .should('have.length', 1)
        .each((list) => {
        // For each ul element, check that it contains at least one li element with the specified class
        cy.wrap(list).find('.SearchResult_search_result_card__2m0Pk')
            .should('have.length.at.least', 1);
        });

    })

})