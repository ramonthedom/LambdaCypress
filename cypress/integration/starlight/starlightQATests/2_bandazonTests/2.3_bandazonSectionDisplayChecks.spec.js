/// BACKEND ///

// video for login session issue: https://www.youtube.com/watch?v=hOJ50rINCkA

import {
  userData
} from "./common";
// import {
//   finalsSidebarTitleContainsEventInfoWaitTime,
//   finalsMainContainerMb3WaitTime
// } from "./utilities";

// login
describe('Check User Bandazon Sections', function () {

  beforeEach(() => {

    const {
      user_email,
      user_password,
      user_login_url,
      myParams
    } = userData;
    cy.login(user_email, user_password, user_login_url, myParams);
  })

  // ~~~~~~~~~~ //
  // 0. BANDAZON ACCESS //
  // ~~~~~~~~~~ //

  it('Bandazon initial load should present correctly', function () {
    visitBandazon()
  })

  // ~~~~~~~~~~ //
  // 1. LEADS   //
  // ~~~~~~~~~~ //

  it('Leads Section should present correctly', function () {

    visitBandazon()

    cy.wait(3000);

    // 3. Leads
    cy.contains('a', 'Leads').should('exist').wait(3000).click();
    cy.get('a > .leads-table-css-container').should('exist');

  })

  //~~~~~~~~~~~~~~//
  // 2. EVENTS //
  //~~~~~~~~~~~~~~//

  it('Events Section should present correctly', function () {
    visitBandazon()

    cy.wait(3000);

    cy.contains('a', 'Events').should('exist').click().wait(3000).then(() => {
      cy.contains('.section-heading', 'Events').should('exist');
    })
  })

  //~~~~~~~~~~~~~~//
  // 3. CONTRACTS //
  //~~~~~~~~~~~~~~//

  it('Contract Section should present correctly', function () {

    visitBandazon()

    cy.wait(3000);

    // 5. Contracts
    cy.contains('span', 'Contracts').should('exist').click();

    // 5.1. Bookings
    cy.contains('a', 'Bookings').should('exist').click();
    cy.wait(500);
    cy.contains('tr', "BOOKING DATE").should('exist');

    // 5.2 Upsells
    cy.contains('a', 'Upsells').should('exist').click();
    cy.wait(500);
    cy.contains('tr', "STATUS").should('exist');

  })

  //~~~~~~~~~~~~~~~~//
  // 4. MAINTENANCE //
  //~~~~~~~~~~~~~~~~//

  it('Maintenance should present correctly', function () {
    visitBandazon()

    cy.wait(5000);

    // // 6. Maintenance
    cy.contains('span', 'Maintenance').click();
    // cy.contains('span', 'Maintenance').click();

    cy.wait(500);

    cy.log("POST MAINTENANCE")
    cy.wait(1000);

    // // check that click was successful
    cy.contains('span', 'Users').should('exist');
    cy.contains('span', 'Bands').should('exist');
    cy.contains('span', 'Schedules').should('exist');
    cy.contains('span', 'Segments').should('exist');

    cy.contains('span', 'Configurations').should('be.visible');
    cy.log("SPAN EXISTS")
    cy.wait(3000);
    // // 6.1  Configurations
    cy.contains('span', 'Configurations').should('exist').click();
    cy.log("POST CONFIGURATION")

    cy.wait(1000);

    cy.contains('span', 'Segments').should('exist');
    cy.contains('span', 'Event Types').should('exist');
    cy.contains('span', 'Positions').should('exist');
    cy.contains('span', 'Extras').should('exist');

    // // 6.1.1  Segments
    cy.contains('span', 'Segments').should('exist').click();
    cy.wait(2000);
    cy.contains('.section-heading', 'Segments').should('exist');

    // // 6.1.2  Event Types  
    cy.contains('a', 'Event Types').should('exist').click().wait(2000).then(() => {
      cy.contains('.section-heading', 'Event Types').should('exist');
    });

    // 6.1.3  Positions  
    cy.contains('a', 'Positions').should('exist').click().wait(5000).then(() => {
      cy.contains('.section-heading', 'Positions').should('exist');
    });

    // 6.1.4  Extras 
    cy.contains('a', 'Extras').should('exist').click().wait(500).then(() => {
      cy.contains('.section-heading', 'Extras').should('exist');
    });

    // 6.1.5  Genres   
    cy.contains('a', 'Genres').should('exist').click().wait(500).then(() => {
      cy.contains('.section-heading', 'Genres').should('exist');
    });

    // 6.1.6  Rates
    cy.contains('a', 'Rates').should('exist').click().wait(500).then(() => {
      cy.contains('.section-heading', 'Rates').should('exist');
    });

    cy.wait(1000);

    // 6.1.7  Margins
    cy.contains('a', 'Margins').should('exist').click().wait(2000).then(() => {
      cy.contains('label', 'Default Margins').should('exist');
      cy.contains('a', 'Download Template').should('exist');
      cy.contains('span', 'Import Peak Margins').should('exist');
    });

    // // 6.2. Users
    cy.contains('a', 'Users').should('exist').click().wait(500).then(() => {
      cy.contains('.section-heading', 'User Management').should('exist');
    })


    /// 6.2.1 Performer tab
    cy.contains('.custom_nav', 'Performers').should('exist');
    cy.contains('a', 'Performers').should('exist').click().then(() => {
      cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
      cy.contains('.ant-table-thead', 'PROVIDED SOUND').should('exist');
    });


    /// 6.2.4 Office staff tab
    cy.contains('.custom_nav', 'Office staff').should('exist');
    cy.contains('a', 'Office staff').should('exist').click().then(() => {
      cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
      0
      cy.contains('th', 'ROLES').should('exist');
    });

    // // 6.3  bands
    cy.contains('a', 'Bands').should('exist').click();
    cy.contains('.section-heading', 'Bands').should('exist');
    cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
    cy.contains('th', 'Featured').should('exist');

    // // Check Onyx
    // // cy.contains('a', 'Onyx').should('exist').click();
    cy.contains('a', 'Jazz Bands').should('exist').click();

    // /// 6.3.1 Check Information 
    cy.contains('a', 'Information').should('exist').click().then(() => {
      cy.contains('.cms_card_heading', 'Band Information').should('exist');
      cy.contains('.cms_card_heading', 'About Us').should('exist');
      cy.contains('.cms_card_heading', 'Hero Slider').should('exist');
      cy.contains('.cms_card_heading', 'SEO').should('exist');
    });

    /// 6.3.2 Check Videos
    cy.contains('a', 'Videos').should('exist').click().then(() => {
      cy.contains('h5', 'Band Video').should('exist');
    });;

    /// 6.3.3 Check Band Configuration
    cy.contains('a', 'Band Configuration').should('exist').click().then(() => {
      cy.contains('label', 'Position').should('exist');
      cy.contains('label', 'Reception Rate').should('exist');
      cy.contains('h5', 'Core Performers: ').should('exist');
    });

    /// 6.3.6 Check Band Proposals
    cy.contains('a', 'Band Proposals').should('exist').click().then(() => {
      cy.contains('.cms_card_heading', 'Banner Image').should('exist');
      cy.contains('.cms_card_heading', 'Introduction').should('exist');
      cy.contains('.cms_card_heading', 'Band leader Image').should('exist');
      cy.contains('.cms_card_heading', 'Title Image').should('exist');
      cy.contains('.cms_card_heading', 'Logo Image').should('exist');
      cy.contains('.cms_card_heading', 'Footer Image').should('exist');
      cy.contains('.cms_card_heading', 'Event Images').should('exist');
    });

    // 6.4. Schedules
    cy.contains('a', 'Schedules').should('exist').click().then(() => {
      cy.contains('.section-heading', 'Band Availability').should('exist');
      cy.contains('.ml-2', 'Marked Unavailable').should('exist');
    });

    // 6.8 CMS
    cy.contains('span', 'CMS').should('exist').click().then(() => {
      // 6.8.1  Categories
      cy.contains('a', 'Main Pages').should('exist').click().then(() => {
        cy.contains('.dashboard_heading', 'CMS').should('exist');
        cy.get('.cms_list').find('li').should('have.length.greaterThan', 1);
        cy.contains('p', 'Last update on').should('exist');
      });

    });

  })

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  // 5. CHECKING EVENT: WEDDING //
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  it('EventType: Wedding contains all the correct sections', function () {
    visitBandazon()

    cy.wait(3000);

    cy.contains('a', 'Events').should('exist').wait(1000).click().wait(3000).then(() => {
      cy.contains('.section-heading', 'Events').should('exist');

      // check a wedding // change to specific event
      // 
      cy.contains('a', '08/08/2028').should('exist').click().then(() => {
        cy.wait(3000);

        // 4.1.1.1 Basic Info
        cy.get("#basic-info-btn").should('exist').click().then(() => {
          cy.contains('h3', 'Wedding of ').should('exist'); //h3 containing "Wedding of " should exist
          checkBasicInfoSection(); //p containing "Total Price:" should exist
        });

        // 4.1.1.2 Configuration
        checkConfigurationSection();

        // 4.1.1.3 Band
        checkBandSection();

        // 4.1.1.4 Documents
        checkDocumentsSection();

        // 4.1.1.5 Communication
        checkCommunicationSection();

        // 4.1.1.5 Expenses      
        checkExpensesSection();

      });
    });
  })

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  // 6. CHECKING EVENT: DINNER  //
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  it('EventType: Dinner contains all the correct sections', function () {
    visitBandazon()

    cy.wait(3000);


    cy.contains('a', 'Events').should('exist').wait(1000).click().wait(3000).then(() => {
      cy.contains('.section-heading', 'Events').should('exist');

      // Test Event: 	Jazz Bands, Gotham Hall, Dinner, TestQAEvent TestDinner
      cy.contains('a', '07/08/2029').should('exist').click();


      cy.wait(3000);

      // 4.1.1.1 Basic Info
      cy.get("#basic-info-btn").should('exist').click().then(() => {
        checkBasicInfoSection(); //p containing "Total Price:" should exist
      });

      // 4.1.1.2 Configuration
      checkConfigurationSection();

      // 4.1.1.3 Band
      checkBandSection();

      // // 4.1.1.4 Documents
      checkDocumentsSection();

      // // 4.1.1.5 Communication
      checkCommunicationSection();

      // // 4.1.1.5 Expenses      
      checkExpensesSection();

    });
  })

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  function checkBasicInfoSection() {
    cy.contains('h3', 'Booked By').should('exist'); //h3 containing "Booked By" should exist
    cy.contains('h3', 'Lead Origin').should('exist'); //h3 containing "Lead Origin" should exist
    cy.contains('h3', 'Client Details').should('exist'); //h3 containing "Client Details" should exist
    cy.contains('h3', 'Upcoming Payments').should('exist'); //h3 containing "Upcoming Payments" should exist
    cy.contains('h3', 'Payment History').should('exist'); //h3 containing "Payment History" should exist
    cy.contains('p', 'Total Price:').should('exist');
  }

  function checkConfigurationSection() {
    cy.get("#config-btn").should('exist').click().then(() => {
      cy.contains('h3', 'Band Configurations').should('exist'); // h3 containing "Band Configurations" should exist
      cy.contains('.basic_info_heading', 'Segments').should('exist'); // .basic_info_heading containing "Segments" should exist
      cy.contains('.basic_info_heading', 'Band').should('exist');
    });
  }

  function checkCommunicationSection() {
    cy.contains('.nav-link', 'Communication').should('exist').click().wait(500).then(() => {
      cy.contains('div', "Office Side").should('exist').click().then(() => {
        cy.contains('h1', "Activity").should('exist'); // h1 containing "Documents" should exist
      });

      cy.contains('div', "Client Side").should('exist').click().then(() => {
        cy.contains('h1', "Activity").should('exist');
      });
    });
  }

  function checkBandSection() {
    cy.contains('.nav-link', 'Band').should('exist').click().then(() => {
      cy.contains('button', 'Notify All').should('exist'); // button containing "Notify All" should exist


      // 4.1.1.3.1 Musician Status
      cy.contains('div', 'Musician status').should('exist').click().wait(500).then(() => {
        cy.contains('th', 'Status').should('exist'); // th containing "Status" should exist
      });

      // 4.1.1.3.2 Assignment
      cy.contains('div', 'Assignment').should('exist').click().wait(500).then(() => {
        cy.contains('th', 'Segments').should('exist'); // th containing "Segments" should exist
        cy.contains('th', 'Musicians').should('exist'); // th containing "Musicians" should exist
        cy.contains('th', 'Vocalists').should('exist'); // th containing "Vocalists" should exist
        // cy.contains('th', 'Strings').should('exist'); // th containing "Strings" should exist
        // cy.contains('th', 'Crew').should('exist'); // th containing "Crew" should exist
        cy.contains('th', 'Sound Company').should('exist');
      });
    });
  }

  function checkExpensesSection() {
    cy.contains('.nav-link', 'Expenses').should('exist').click().wait(500).then(() => {
      // // 4.1.1.5.1 Cost Analysis
      // cy.contains('div', 'Cost Analysis').should('exist').click().then(() => {
      //   cy.contains('th', 'Band Cost').should('exist'); // th containing "Band Cost" should exist
      //   cy.contains('th', 'E Amount').should('exist'); // th containing "E Amount" should exist
      //   cy.contains('th', 'A Amount').should('exist'); // th containing "A Amount" should exist
      //   cy.contains('th', 'Travel Cost').should('exist'); // th containing "Travel Cost" should exist

      //   cy.contains('.mb-1', 'Estimated').should('exist'); // .mb-1, Estimated, should exist
      //   cy.contains('.mb-1', 'Actual').should('exist'); // .mb-1, Actual, should exist
      // });

      // 4.1.1.5.2 Paid Expenses
      cy.contains('div', 'Paid Expenses').should('exist').click().wait(500).then(() => {
        cy.contains('a', 'Add Title +').should('exist'); // a, "Add Title +", should exist
        cy.contains('a', 'Add Expenses +').should('exist'); // a, "Add Expenses +", should exist
        cy.contains('th', 'Reimburse To').should('exist'); // th, 'Reimburse To', should exist
      });

      // 4.1.1.5.3 Discount
      cy.contains('div', 'Discount').should('exist').click().then(() => {
        cy.contains('button', 'Update').should('exist'); // button, 'Update', should exist
        cy.contains('th', 'After Discount').should('exist'); // th, 'After Discount', should exist
        cy.contains('a', 'Add Amount +').should('exist'); // a, 'Add Amount +',should exist
      });

      // // 4.1.1.5.4 Split Payment
      // cy.contains('div', 'Split Payment').should('exist').click().then(() => {
      //   cy.contains('th', 'Payment').should('exist'); // th, Payment, should exist
      //   cy.contains('th', 'Actions').should('exist'); // th, Actions
      //   cy.contains('.primary_btn', 'Split Amount').should('exist');
      // });

    });
  }

  function checkDocumentsSection() {
    cy.contains('.nav-link', 'Documents').should('exist').click().wait(500).then(() => {
      // 4.1.1.4.1 Office Side
      cy.contains('div', "Office Side").should('exist').click().wait(500).then(() => {
        cy.contains('h1', "Documents").should('exist'); // h1 containing "Documents" should exist
      });

      // 4.1.1.4.2 Client Side
      cy.contains('div', "Client Side").should('exist').click().wait(500).then(() => {
        cy.contains('h1', "Documents").should('exist');
      });
    });
  }

  function visitBandazon() {
    cy.visit("https://starbridge.starlightmusic.com")
    cy.viewport(1728, 1000);
    console.log("LOGIN SUCCESS")
    cy.contains('a', 'Switch to Bandazon').should('exist').click();

    cy.wait(1500);

    cy.contains('.section-heading', 'Events').should('exist');
    cy.get('.pro-item-content > .bzn-switch').should('exist');

  }

});