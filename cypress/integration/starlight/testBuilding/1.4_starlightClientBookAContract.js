/// FRONTEND ///

import { clientData } from "./common";

// login
describe('Check StarlightMusic Client Can Book a Contract', function () {

    beforeEach(() => {

      const { user_email, user_password, user_login_url, myParams } = clientData;
  
      cy.login(user_email, user_password, user_login_url, myParams);
    })
  
    function checkAllImagesExist() {
      cy.get('img').each((img) => {
        cy.request(img.prop('src'))
          .its('status')
          .should('eq', 200)
      })
    }
  
    function checkBasicInfoSection() {
      cy.contains('.nav-link', 'Basic Info').should('exist').click().then(() => { // .nav-link containing "Finals" should exist, click it
        cy.contains('h3', ' pieces)').should('exist'); //h3 containing " pieces)" should exist
        cy.contains('.EventsComponent_download_text__1sHIG', 'Proposal').should('exist');
        cy.contains('.EventsComponent_download_text__1sHIG', 'Signed Contract').should('exist');
        cy.contains('h3', 'Upcoming Payments').should('exist'); //h3 containing "Upcoming Payments" should exist
        cy.contains('h3', 'Payment History').should('exist'); //h3 containing "Payment History" should exist
        cy.contains('p', 'Total Price:').should('exist');
        cy.get('.ant-table-content').find('tr').should('have.length.at.least', 1);
  
        checkAllImagesExist()
      })
    }
  
    function checkBasicInfoSectionWithNoPaymentsOrContract() {
      cy.contains('.nav-link', 'Basic Info').should('exist').click().then(() => { // .nav-link containing "Finals" should exist, click it
        cy.contains('h3', ' pieces)').should('exist'); //h3 containing " pieces)" should exist
        cy.contains('.EventsComponent_download_text__1sHIG', 'Proposal').should('exist');
        cy.contains('h3', 'Upcoming Payments').should('exist'); //h3 containing "Upcoming Payments" should exist
        cy.contains('h3', 'Payment History').should('exist'); //h3 containing "Payment History" should exist
        cy.contains('p', 'Total Price:').should('exist');
  
        checkAllImagesExist()
      })
    }
  
    function checkMyBandConfigurationSection() {
      cy.contains('.nav-link', 'My Band Configuration').should('exist').click().then(() => {
        cy.contains('h3', 'Band Configurations').should('exist'); // h3 containing "Band Configurations" should exist
        cy.contains('h5', 'How to?').should('exist');
        cy.contains('button', '+ Add Item').should('exist'); // button containing "Notify All" should exist
  
        // Segments
        cy.contains('h3', 'Segments').should('exist');
        cy.contains('th', 'Musicians').should('exist'); // th containing "Musicians" should exist
  
        // Band
        cy.contains('h3', 'Band').should('exist');
        cy.contains('th', 'Qty').should('exist'); // th containing "Musicians" should exist
  
        checkAllImagesExist()
      });
    }
  
    function checkDocumentsSection() {
      cy.contains('.nav-link', 'Documents').should('exist').click().wait(2000).then(() => {
        cy.contains('h1', "Documents").should('exist');
        cy.contains('button', 'Upload File').should('exist');

        cy.wait(3000);
  
        // check for documents
        cy.get('body').then(($body) => {
          // Check if the element for condition1 exists
          if ($body.find('.EventsComponent_contract_docoments__xDg6q').length > 0) {
            // Condition1 is met, so do nothing further
          } else {
            // Condition1 is not met, proceed to check condition2
            cy.contains('h4', 'No Documents available').should('exist');
          }
        });
        // cy.get('.EventsComponent_contract_docoments__xDg6q').should('have.length.at.least', 1);
        // cy.contain('h4', 'No Documents available').should('exist');
  
        checkAllImagesExist()
      });
    }
  
    function checkCommunicationSection() {
      cy.contains('.nav-link', 'Communication').should('exist').click().wait(500).then(() => {
        cy.contains('h1', "Activity").should('exist');
  
        cy.get('body').then(($body) => {
          // Check if the element for condition1 exists
          if ($body.find('.styles_aty-text-container__2E6pD').length > 0) {
            // Condition1 is met, so do nothing further
          } else {
            // Condition1 is not met, proceed to check condition2
            cy.contains('h4', 'No Activity available').should('exist');
          }
        });
  
        checkAllImagesExist()
      });
    }
  
    // FINALS SECTIONS
  
    /// wedding
    function checkWeddingFinalsSection() {
      // Event Info
      checkWeddingFinalsEventInfoSection()
  
      // Ceremony
      checkFinalsCeremonySection()
  
      // Special Songs
      checkFinalsSpecialSongsSection();
  
      // Blessings/Toast
      checkFinalsBlessingToastSection();
  
      // Song List
      checkFinalsSonglistSection();
  
      // Production
      checkFinalsProductionSection();
  
      // Timeline
      checkFinalsTimelineSection();
    }
  
    /// non-wedding
    function checkNonWeddingFinalsSection(eventInfoMainSectionHeading) {
      // Event Info
      checkNonWeddingFinalsEventInfoSection(eventInfoMainSectionHeading)
  
      // Blessings/Toast
      checkFinalsBlessingToastSection();
  
      // Song List
      checkFinalsSonglistSection();
  
      // Production
      checkFinalsProductionSection();
  
      // Timeline
      checkFinalsTimelineSection();
    }
  
    // EVENT INFO SECTIONS
    /// wedding
    function checkWeddingFinalsEventInfoSection() {
      cy.contains('.Finals_finals_sidebar_title__1DQUZ', 'Event Info').should('exist').click().then(() => { // .finals_sidebar_title, 'Event Info', click it
        cy.contains('h3', 'Parents').should('exist'); // h3, 'Parents', should exist
        cy.contains('h3', 'Event planner').should('exist'); // h3, Event planner, should exist
        cy.contains('h3', 'Socials').should('exist'); // h3, Socials, should exist
        cy.contains('h3', 'Vendor Socials').should('exist'); // h3, Vendor Socials, should exist
        cy.contains('button', 'Save').should('exist');
      });
    }
  
    // non-wedding
    function checkNonWeddingFinalsEventInfoSection(eventInfoMainSectionHeading) {
      cy.contains('.Finals_finals_sidebar_title__1DQUZ', 'Event Info').should('exist').click().then(() => { // .finals_sidebar_title, 'Event Info', click it
        cy.contains('h3', eventInfoMainSectionHeading).should('exist'); // h3, 'Parents', should exist
        cy.contains('h3', 'Event planner').should('exist'); // h3, Event planner, should exist
        cy.contains('h3', 'Socials').should('exist'); // h3, Socials, should exist
        cy.contains('h3', 'Vendor Socials').should('exist'); // h3, Vendor Socials, should exist
        cy.contains('button', 'Save').should('exist');
      });
    }
  
    function checkFinalsCeremonySection() {
      cy.contains('.Finals_finals_sidebar_title__1DQUZ', 'Ceremony').should('exist').click().then(() => {
        cy.get('.Finals_finals_main_container__2E4tK').find('.mb-3').should('have.length.greaterThan', 1); // .finals_main_container should contain more than 1 elemtent .mb-3
        cy.contains('.CeremonyComponent_finals_main_add_song_card__2Ntup', 'Click to add a song').should('exist');
        cy.contains('button', 'Save').should('exist');
      });
    }
  
    function checkFinalsSpecialSongsSection() {
      cy.contains('.Finals_finals_sidebar_title__1DQUZ', 'Special Songs').should('exist').click().then(() => {
        cy.get('.CeremonyComponent_ul_padding_none__Xpi_x').find('.mb-3').should('have.length.greaterThan', 1); // .finals_main_container should contain more than 1 elemtent .mb-3
        cy.contains('.CeremonyComponent_finals_main_add_song_card__2Ntup', 'Click to add a song').should('exist');
        cy.contains('button', 'Save').should('exist');
      });
    }
  
    function checkFinalsBlessingToastSection() {
      cy.contains('.Finals_finals_sidebar_title__1DQUZ', 'Blessing/Toast').should('exist').click().wait(500).then(() => {
        cy.get('.Finals_finals_main_container__2E4tK').find('.mb-3').should('have.length.greaterThan', 1); // .finals_main_container should contain more than 1 elemtent .mb-3
        cy.contains('.CeremonyComponent_finals_main_add_song_card__2Ntup', 'Click to add a participant').should('exist');
        cy.contains('button', 'Save').should('exist');
      });
    }
  
    function checkFinalsSonglistSection() {
      cy.contains('.Finals_finals_sidebar_title__1DQUZ', 'Song List').should('exist').click().wait(500).then(() => {
        // cy.contains('.finals-request-song-heading', 'Requested Songs').should('exist'); // .finals-request-song-heading, Requested Songs, should exist
        cy.contains('.SongsFinalComponent_myBand_add_new_song_btn__1u8Uj', /\+ Request a song|\+ Add a song/).should('exist'); // a, Add a song +
        cy.contains('.SongsFinalComponent_songs_heading__1fPng', 'Band Songs').should('exist'); // .finals-request-song-heading, Band Songs
        cy.get('.SongsFinalComponent_myband_song_list_table__Tw8xm').find('tr').should('have.length.greaterThan', 1);
      });
    }
  
    function checkFinalsProductionSection() {
      cy.contains('.Finals_finals_sidebar_title__1DQUZ', 'Production').should('exist').click().then(() => {
        cy.contains('.mb-2', 'Venue Info').should('exist');
        cy.contains('button', 'Save').should('exist');
      });
    }
  
    function checkFinalsTimelineSection() {
      cy.contains('.Finals_finals_sidebar_title__1DQUZ', 'Timeline').should('exist').click().then(() => {
        cy.contains('h3', 'Timeline').should('exist'); // h3, Timeline, should exist
        cy.get('.TimelineComponent_timeline_events_container__16PSl').find('.TimelineComponent_timeline_card__31gmQ').should('have.length.greaterThan', 1);
        // cy.contains('button', 'Save').should('exist');
      });
    }
  
    function visitStarlightMusic() {
      cy.visit("https://www.starlightmusic.com/dashboard")
      cy.viewport(1728, 1000);
      console.log("LOGIN SUCCESS")
    }
  
    // ~~~~~~~~~~~~ //
    // 1. DASHBOARD //
    // ~~~~~~~~~~~~ //
  
    // it('Dashboard should present correctly', function () {
  
    //   visitStarlightMusic()
  
    //   cy.contains('a', 'Dashboard').should('exist').click();
    //   cy.contains('.account-heading', 'Dashboard').should('exist');
  
    //   cy.contains('h3', 'Notifications').should('exist');
    //   cy.contains('h3', 'Recent activities').should('exist');
  
    // })
  
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
    // 2. CLIENT CAN BOOK A CONTRACT   //
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  
    it('Proposal section should present correctly', function () {
  
      visitStarlightMusic()

      // Return to Homepage

      // cy.visit('https://www.starlightmusic.com/dashboard');

      // cy.get('.header_left_logo > img').click();

      // cy.viewport(1728, 1000);

      cy.visit('https://www.starlightmusic.com/meet-the-team')

      cy.get('.navbar > .w-100 > .Header_nav_section_search__3JI_2 > .Header_nav_section_search_mini__2zAlY > .d-flex').click();

      cy.get('.d-flex > #search-date-input > .ant-picker > .ant-picker-input > input').click();

      cy.get('.d-flex > #search-date-input > .ant-picker-focused > .ant-picker-input > input').type(`{selectall}09/09/2029{enter}`);

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

      // Check results
      cy.contains('h4', 'Congratulations!').should('exist');
      cy.contains('h5', 'Smaller Acts').should('exist');

      // Check for the presence of exactly 2 ul elements with the specified class
      cy.get('.SearchResult_search_result_cards__23uLY')
      .should('have.length', 2)
      .each((list) => {
      // For each ul element, check that it contains at least one li element with the specified class
      cy.wrap(list).find('.SearchResult_search_result_card__2m0Pk')
          .should('have.length.at.least', 1);
      });

      // End current nav code...

      // let dynamicValue; // Declare a variable to store the dynamic value

      //// Save Onyx Amount
      
      // cy.contains('h5', 'Onyx') // Start from the h5 element containing "Onyx"
      //   .parents('.SearchResult_search_result_card_body__rQjZ-') // Assuming the span is a sibling or child of a sibling, traverse to the common parent
      //   .find('.SearchResult_search_result_card_price_36367') // Now find the span within the parent that has the dynamic value
      //   .invoke('text') // Get the text of the span element
      //   .then((text) => { // Use .then() to work with the text value
      //     dynamicValue = text.trim(); // Save the trimmed value in the variable
      //   }); // Now you can use 'dynamicValue' in other parts of the test

      // cy.log("DynamicValue =", dynamicValue)

      //// ...later in the test
      //// Use the saved 'dynamicValue' in another command
      //// For example, to assert that this value is displayed somewhere else on the page
      //// cy.get('selector-for-element-to-assert').should('have.text', dynamicValue);

      // Navigate to Onyx
      cy.contains('h5', 'Onyx') // Finds the h5 element with the text "Onyx"
        .closest('.SearchResult_search_result_card_body__rQjZ-') // Traverses up to the common ancestor with this class
        .find('button:contains("Explore")') // Finds the button with the text "Explore" within that ancestor
        .click(); // Clicks the button

        // Navigate to home page

        // Enter in date, hit enter

        // should see result page

        // navigate to onyx
        /// save amount

        // click on onyx
        /// confirm amount

        // click on book now
        /// confirm amount
        /// confirm date

        // click on proceed to contract

        // enter info

        // click on next
        /// confirm amount
        /// confirm date
        /// confirm initial payment date

        // click on preview contract

        /// result should be 200

        // save eventId

        // change eventStatus to paid

        // refresh page
        // confirm date

        // navigsate to backend
        /// naviogsate to event
        /// confirm date
        /// confirm amount

        // delete event

        // confirm event is deleted

    })
  });
  