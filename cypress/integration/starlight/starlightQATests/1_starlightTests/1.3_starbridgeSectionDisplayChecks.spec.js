/// BACKEND ///

// video for login session issue: https://www.youtube.com/watch?v=hOJ50rINCkA

import {
  userData
} from "./common";
import {
  finalsSidebarTitleContainsEventInfoWaitTime,
  finalsMainContainerMb3WaitTime
} from "./utilities";

// login
describe('Check User Starbridge Sections', function () {

  beforeEach(() => {

    const {
      user_email,
      user_password,
      user_login_url,
      myParams
    } = userData;

    cy.login(user_email, user_password, user_login_url, myParams);
  })

  function checkBasicInfoSection() {
    cy.contains('h3', 'Booked By').should('exist'); //h3 containing "Booked By" should exist
    cy.contains('h3', 'Lead Origin').should('exist'); //h3 containing "Lead Origin" should exist
    cy.contains('h3', 'Client Details').should('exist'); //h3 containing "Client Details" should exist
    cy.contains('h3', 'Upcoming Payments').should('exist'); //h3 containing "Upcoming Payments" should exist
    cy.contains('h3', 'Payment History').should('exist'); //h3 containing "Payment History" should exist
    cy.contains('p', /Total Price( After Discount)?:/).should('exist');
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
        cy.contains('th', 'Strings').should('exist'); // th containing "Strings" should exist
        cy.contains('th', 'Crew').should('exist'); // th containing "Crew" should exist
        cy.contains('th', 'Sound Company').should('exist');
      });
    });
  }

  function checkExpensesSection() {
    cy.contains('.nav-link', 'Expenses').should('exist').click().wait(500).then(() => {
      // 4.1.1.5.1 Cost Analysis
      cy.contains('div', 'Cost Analysis').should('exist').click().then(() => {
        cy.contains('th', 'Band Cost').should('exist'); // th containing "Band Cost" should exist
        cy.contains('th', 'E Amount').should('exist'); // th containing "E Amount" should exist
        cy.contains('th', 'A Amount').should('exist'); // th containing "A Amount" should exist
        cy.contains('th', 'Travel Cost').should('exist'); // th containing "Travel Cost" should exist

        cy.contains('.mb-1', 'Estimated').should('exist'); // .mb-1, Estimated, should exist
        cy.contains('.mb-1', 'Actual').should('exist'); // .mb-1, Actual, should exist
      });

      // 4.1.1.5.2 Paid Expenses
      cy.contains('div', 'Paid Expenses').should('exist').click().wait(500).then(() => {
        cy.contains('a', 'Add Title +').should('exist'); // a, "Add Title +", should exist
        cy.contains('a', 'Add Expenses +').should('exist'); // a, "Add Expenses +", should exist
        cy.contains('th', 'Reimburse To').should('exist'); // th, 'Reimburse To', should exist
      });

      // 4.1.1.5.3 Discount
      cy.contains('div', 'Discount').should('exist').click().wait(1000).then(() => {
        cy.contains('button', 'Update').should('exist'); // button, 'Update', should exist
        cy.contains('th', 'After Discount').should('exist'); // th, 'After Discount', should exist
        cy.contains('a', 'Add Amount +').should('exist'); // a, 'Add Amount +',should exist
      });

      // 4.1.1.5.4 Split Payment
      cy.contains('div', 'Split Payment').should('exist').click().then(() => {
        cy.contains('th', 'Payment').should('exist'); // th, Payment, should exist
        cy.contains('th', 'Actions').should('exist'); // th, Actions
        cy.contains('.primary_btn', 'Split Amount').should('exist');
      });

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

  function checkReviewsSection() {
    cy.contains('.nav-link', 'Reviews').should('exist').click().wait(500).then(() => {
      cy.contains('button', 'Add Review +').should('exist'); // button, Add Review +, should exist
      cy.contains('p', 'Rating').should('exist');
    });
  }

  function checkGigStylingSection() {
    cy.contains('.finals_sidebar_title', 'Gig Styling').should('exist').click().then(() => {
      cy.contains('.heading', 'global').should('exist'); // h1, Global, should exist          
      cy.contains('.heading', 'table data').should('exist');
    });
  }

  function checkFinalsSpecialSongsSection() {
    cy.contains('.finals_sidebar_title', 'Special Songs').should('exist').click().then(() => {
      cy.wait(finalsMainContainerMb3WaitTime);
      cy.get('.finals_main_container').find('.mb-3').should('have.length.greaterThan', 1); // .finals_main_container should contain more than 1 elemtent .mb-3
      cy.contains('.finals_main_add_song_card', 'Click to add a song').should('exist');
    });
  }

  function checkFinalsNotesSection() {
    cy.contains('.finals_sidebar_title', 'Notes').should('exist').click().then(() => {
      cy.contains('.finals__band_info_heading', 'Band Leader Notes').should('exist'); // '.finals__band_info_heading', 'Band Leader Notes', should exist
      cy.contains('.finals__band_info_heading', 'Song Notes').should('exist'); // .finals__band_info_heading, Song Notes, should exist
      cy.contains('.finals__band_info_heading', 'Wardrobe').should('exist');
    });
  }

  function checkFinalsSonglistSection() {
    cy.contains('.finals_sidebar_title', 'Song List').should('exist').click().wait(500).then(() => {
      // cy.contains('.finals-request-song-heading', 'Requested Songs').should('exist'); // .finals-request-song-heading, Requested Songs, should exist
      cy.contains('.myBand_add_new_song_btn', /Request a song \+|Add a song \+/).should('exist');
      cy.contains('.finals-request-song-heading', 'Band Songs').should('exist'); // .finals-request-song-heading, Band Songs
      cy.get('span.ml-1.mr-2').then(($span) => {
        // Check if the title of the span is not 'DJ Kristivl'
        if ($span.attr('title') !== 'DJ Kristaval' && $span.attr('title') !== 'Disc Jockey') {
          cy.wait(3000);
          cy.get('.myband-song-list-table').find('td').should('have.length.greaterThan', 1);
          cy.get('.myband-song-list-table').find('.myband-youtube-table').should('have.length.greaterThan', 1);
        } else {
          cy.log("DJ Kristival or Disc Jockey found - NO SONGLIST")
        }
      });
    });
  }

  function checkFinalsBlessingToastSection() {
    cy.contains('.finals_sidebar_title', 'Blessing/Toast').should('exist').click().then(() => {
      cy.wait(finalsMainContainerMb3WaitTime);
      cy.get('.finals_main_container').find('.mb-3').should('have.length.greaterThan', 1); // .finals_main_container should contain more than 1 elemtent .mb-3
      cy.wait(1000);
      cy.contains('.finals_main_add_song_card', 'Click to add a participant').should('exist');
    });
  }

  function checkFinalsProductionSection() {
    cy.contains('.finals_sidebar_title', 'Production').should('exist').click().then(() => {
      cy.contains('.mb-2', 'Venue Info').should('exist');
    });
  }

  function checkFinalsTimelineSection() {
    cy.contains('.finals_sidebar_title', 'Timeline').should('exist').click().then(() => {
      cy.contains('h3', 'Timeline').should('exist'); // h3, Timeline, should exist
      cy.get('.timeline-events-container').find('.timeline-card').should('have.length.greaterThan', 1);
    });
  }

  function visitStarbridge() {
    cy.visit("https://starbridge.starlightmusic.com")
    cy.viewport(1728, 1000);
    console.log("LOGIN SUCCESS")
  }

  it('Dashboard should present correctly', function () {
    // ~~~~~~~~~~~~ //
    // 1. DASHBOARD //
    // ~~~~~~~~~~~~ //

    visitStarbridge()

    // 1. Dashboard
    cy.contains('a', 'Dashboard').should('exist').click();
    cy.contains('.dashboard_heading', 'Dashboard').should('exist');

  })

  it('My Band Section should present correctly', function () {
    //  ~~~~~~~~~~~~ //
    //  2. MY BAND //
    //   ~~~~~~~~~~~~ //

    visitStarbridge()

    // 2. My Band
    cy.contains('a', 'My Band').should('exist').click();

    /// 2.1. Subsection - Basic Information
    cy.contains('div', 'Basic Information').should('exist').click();
    cy.contains('div', 'General Information').should('exist').click();
    cy.contains('h6', 'Band Name').should('exist');

    /// 2.2. Subsection - Song List
    cy.contains('div', 'Song List').should('exist').click();
    cy.get('.myBand_add_new_song_btn').should('exist');

    /// 2.3. Subsection - Band Availability    
    cy.contains('div', 'Band Availability').should('exist').click().then(() => {
      cy.contains('.ml-2', "Marked Unavailable").should('exist');
    })

    /// 2.4. Subsection - Gig Info
    cy.contains('div', 'Gig Info').should('exist').click();
    cy.contains('div', 'Sorting').should('exist').click().wait(1000).then(() => {
      cy.contains('span', 'Event Details').should('exist');
      cy.contains('div', 'Styling').should('exist').click();
      cy.contains('h5', 'Segments').should('exist');
    });

  })

  it('Leads Section should present correctly', function () {
    // ~~~~~~~~~~ //
    // 3. LEADS   //
    // ~~~~~~~~~~ //

    visitStarbridge()

    // 3. Leads
    cy.contains('span', 'Leads').should('exist').click().then(() => {
      cy.contains('a', 'Leads').should('exist');
      cy.contains('a', 'Inquiry').should('exist');
      cy.contains('a', 'Showcase').should('exist');
    });
    // cy.get('a > .leads-table-css-container').should('exist');
  })

  //~~~~~~~~~~~~~~//
  // 4. EVENTS    //
  //~~~~~~~~~~~~~~//

  it('Events Section should present correctly', function () {
    visitStarbridge()

    cy.contains('a', 'Events').should('exist').click().then(() => {
      cy.contains('.title', 'All Events').should('exist');
    })
  })

  //~~~~~~~~~~~~~~//
  // 5. CONTRACTS //
  //~~~~~~~~~~~~~~//

  it('Contract Section should present correctly', function () {

    visitStarbridge()

    // 5. Contracts
    cy.contains('span', 'Contracts').should('exist').click();

    // 5.1. Bookings
    cy.contains('a', 'Bookings').should('exist').click();
    cy.wait(500);
    cy.contains('tr', "BOOKING DATE").should('exist');

    // 5.2 Upsells
    cy.contains('a', 'Upsells').should('exist').click();
    cy.wait(1000);
    cy.contains('tr', "DATE SENT/RECEIVED").should('exist');

  })


  //~~~~~~~~~~~~~~~~//
  // 6. MAINTENANCE //
  //~~~~~~~~~~~~~~~~//

  it('Dashboard should present correctly', function () {
    visitStarbridge()

    // 6. Maintenance
    cy.contains('span', 'Maintenance').should('exist').click();

    // 6.1  Configurations
    cy.contains('span', 'Configurations').should('exist').click();

    // 6.1.1  Segments
    cy.contains('a', 'Segments').should('exist').click();
    cy.contains('.dashboard_heading', 'Segments').should('exist');

    // 6.1.2  Event Types  
    cy.contains('a', 'Event Types').should('exist').click().wait(2000).then(() => {
      cy.contains('.dashboard_heading', 'Events Types').should('exist');
    });

    // 6.1.3  Positions  
    cy.contains('a', 'Positions').should('exist').click().wait(5000).then(() => {
      cy.contains('.dashboard_heading', 'Positions').should('exist');
    });

    // 6.1.4  Extras 
    cy.contains('a', 'Extras').should('exist').click().wait(500).then(() => {
      cy.contains('.dashboard_heading', 'Extras').should('exist');
    });

    // 6.1.5  Genres   
    cy.contains('a', 'Genres').should('exist').click().wait(500).then(() => {
      cy.contains('.dashboard_heading', 'Genres').should('exist');
    });

    // 6.1.6  Rates
    cy.contains('a', 'Rates').should('exist').click().wait(500).then(() => {
      cy.contains('.dashboard_heading', 'Rates').should('exist');
    });

    cy.wait(1000);

    // 6.1.7  Margins
    cy.contains('a', 'Margins').should('exist').click().wait(2000).then(() => {
      cy.contains('label', 'Default Margins').should('exist');
      cy.contains('a', 'Download Template').should('exist');
      cy.contains('a', 'Download Template').should('exist');
      cy.contains('span', 'Import Peak Margins').should('exist');
    });

    // 6.2. Users
    cy.contains('a', 'Users').should('exist').click();
    cy.contains('.dashboard_heading', 'User Management').should('exist');

    /// 6.2.1 Performer tab
    cy.contains('.custom_nav', 'Performers').should('exist');
    cy.contains('a', 'Performers').should('exist').click();
    cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
    cy.contains('.ant-table-thead', 'BAND NAME').should('exist');

    /// 6.2.2 Band Leaders tab
    cy.contains('.custom_nav', 'Band Leaders').should('exist');
    cy.contains('a', 'Band Leaders').should('exist').click().click().then(() => {
      cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
      cy.contains('.ant-table-thead', 'BAND NAME').should('exist');
    });
    /// 6.2.3 Event Planners tab
    cy.contains('.custom_nav', 'Event planners').should('exist');
    cy.contains('a', 'Event planners').should('exist').click().then(() => {
      cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
      cy.contains('th', 'COMMISSION RATE').should('exist');
    });

    /// 6.2.4 Office staff tab
    cy.contains('.custom_nav', 'Office staff').should('exist');
    cy.contains('a', 'Office staff').should('exist').click().then(() => {
      cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
      0
      cy.contains('th', 'ROLES').should('exist');
    });

    /// 6.2.5 Customers tab
    cy.contains('.custom_nav', 'Customers').should('exist');
    cy.contains('a', 'Customers').should('exist').click().then(() => {
      cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
      cy.contains('th', 'LAST LOGIN').should('exist');
    });

    // 6.3  bands
    cy.contains('a', 'Bands').should('exist').click();
    cy.contains('.dashboard_heading', 'Bands').should('exist');
    cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
    cy.contains('th', 'Featured').should('exist');

    // Check Onyx
    cy.contains('a', 'Onyx').should('exist').click();

    /// 6.3.1 Check Information 
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
      cy.contains('label', 'Position:').should('exist');
      cy.contains('label', 'Reception Rate:').should('exist');
      cy.contains('h5', 'Core Performers: ').should('exist');
    });

    /// 6.3.4 Check Team
    cy.contains('a', 'Team').should('exist').click().then(() => {
      cy.contains('h4', 'Base Price: ').should('exist');
    });

    /// 6.3.5 Check Customer Reviews
    cy.contains('a', 'Customer Reviews').should('exist').click().then(() => {
      cy.get('div > .grey-card').should('exist');
    });

    /// 6.3.6 Check Band Proposals
    cy.contains('a', 'Band Proposals').should('exist').click().then(() => {
      cy.contains('.cms_card_heading', 'Banner Image').should('exist');
      cy.contains('.cms_card_heading', 'Band leader Image').should('exist');
      cy.contains('.cms_card_heading', 'Title Image').should('exist');
      cy.contains('.cms_card_heading', 'Logo Image').should('exist');
      cy.contains('.cms_card_heading', 'Footer Image').should('exist');
      cy.contains('.cms_card_heading', 'Event Images').should('exist');
    });


    // 6.3.7 Check Gig Info
    cy.contains('a', 'Gig Info').should('exist').click().then(() => {
      cy.contains('.ml-4', 'Event Details').should('exist');
    });

    // 6.4. Schedules
    cy.contains('a', 'Schedules').should('exist').click().then(() => {
      cy.contains('.dashboard_heading', 'Band Availability').should('exist');
      cy.contains('.ml-2', 'Marked Unavailable').should('exist');
    });

    // 6.5  Integration
    cy.contains('a', 'Integration').should('exist').click().then(() => {
      cy.contains('.dashboard_heading', 'Integration').should('exist');
      cy.get('.card-columns').should('exist');
      cy.contains('p', 'API Providers').should('exist');
    });

    // 6.6. Venues
    cy.contains('a', 'Venues').should('exist').click().wait(500).then(() => {
      cy.contains('.dashboard_heading', 'Venues').should('exist');
      cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
      cy.contains('th', 'Venue Name').should('exist');
    });

    // 6.7 FAQ
    cy.contains('span', 'FAQ').should('exist').click().then(() => {
      // 6.7.1  Categories
      cy.contains('a', 'Categories').should('exist').click().then(() => {
        cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
        cy.contains('th', 'S.NO').should('exist');
        cy.contains('th', 'CATEGORY').should('exist');
        cy.contains('.dashboard_heading', 'FAQ Category Management').should('exist');
      });

      // 6.7.2  Questions
      cy.contains('a', 'Questions').should('exist').click().then(() => {
        cy.contains('.dashboard_heading', 'FAQ Management').should('exist');
        cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
        cy.contains('th', 'QUESTION').should('exist');
      });
    });

    //  ~~~~ //
    //  CMS  //
    //  ~~~~ //

    // 6.8 CMS
    cy.contains('span', 'CMS').should('exist').click().then(() => {
      // 6.8.1  Categories
      cy.contains('a', 'Main Pages').should('exist').click().then(() => {
        cy.contains('.dashboard_heading', 'CMS').should('exist');
        cy.get('.cms_list').find('li').should('have.length.greaterThan', 1);
        cy.contains('p', 'Last update on').should('exist');
      });

      // 6.8.2  Venue
      cy.get('a[href="/maintenance/cms/city"]').should('contain', 'Venue').click().then(() => {
      // cy.contains('a', 'Venue').should('exist').click().then(() => {
        cy.contains('.cms_card_heading', 'All Venues').should('exist');
        cy.contains('.ant-breadcrumb-link', 'All Venues').should('exist');
        cy.get('.cms_list').find('div').should('have.length.greaterThan', 1);
      });
    });

  })

  // ~~~~~~~~~~~~~~~ //
  // 7. MY DOCUMENTS //
  // ~~~~~~~~~~~~~~~ //

  it('My Documents Section should present correctly', function () {

    visitStarbridge()

    // 7. My Documents
    cy.contains('a', 'My Documents').should('exist').click().then(() => {
      cy.contains('.dashboard_heading', 'My Documents').should('exist');
    });

  })

  // ~~~~~~~~~~ //
  // 8. FINANCE //
  // ~~~~~~~~~~ //

  it('Finance Section should present correctly', function () {

    visitStarbridge()

    // 8. Finance
    cy.contains('a', 'Finance').should('exist').click().then(() => {
      cy.contains('.dashboard_heading', 'Finance').should('exist');
    });

    cy.contains('a', 'Company').should('exist').click().then(() => {
      cy.contains('button', 'Generate reports').should('exist');
      cy.contains('button', 'Payroll report').should('exist');
      cy.contains('.finance_card_title', 'Payment Due').should('exist');
      cy.contains('.finance_card_title', 'Overdue Payments').should('exist');
      cy.contains('.finance_card_title', 'Profit Remaining').should('exist');
      cy.contains('.finance_card_title', 'Gross Sales').should('exist');
      cy.contains('.finance_card_title', 'Total Profit').should('exist');
      cy.wait(5000);
      cy.wait(5000);
      cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
      cy.contains('th', 'EVENT NAME').should('exist');
      cy.contains('th', 'BAND NAME').should('exist');
    });
  })

  // ~~~~~~~~~~ //
  // 9. BANDAZON ACCESS //
  // ~~~~~~~~~~ //

  it('User can access Bandazon', function () {
    visitStarbridge()

    // 9. Switch to Bandazon
    cy.contains('a', 'Switch to').should('exist');
    cy.contains('a', 'Bandazon').should('exist').click().wait(5000).then(() => {
      // check if url contains the word 'bandazon'cy.go('forward')
      cy.location('pathname').should('include', 'bandazon').then(() => { // cy.url().should('include', 'bandazon')
        cy.wait(10)
        cy.contains('.section-heading', 'Events').should('exist');
        cy.wait(10)
        cy.contains('.bzn-switch', 'Switch to').should('exist');
        cy.contains('a', 'Switch to').click().wait(5000).then(() => { // 8.1 Switch back to Starbridge 
          // cy.location('pathname').should('include', 'starbridge');
          cy.get('img').should('have.attr', 'src', 'https://starlightprod-images.s3.amazonaws.com/CMS-4_1690431299639.png')
          // Can see the word "Dashboard"
          cy.contains('.dashboard_heading', 'Dashboard').should('exist');

        })
      });
    })
  })

  // ~~~~~~~~~~ //
  // 4. EVENTS   //
  // ~~~~~~~~~~ //

  // 4. Events
  // Setup:
  // 1. select all events up to 6 months in the future
  // 2. save the _id's for FrontEnd Testing

  // ORDER:
  // 4.1. Click client name
  // 4.2. Check that the following load
  // 4.2.1 Basic Info
  // 4.2.2 Configuration
  // 4.2.3 Band
  // 4.2.4 Documents
  // 4.2.5 Communication
  // 4.2.6 Expenses
  // 4.2.7 Reviews
  // 4.2.8 Finals
  // 4.2.8.1 Event Info
  // 4.2.8.2 Special Songs
  // 4.2.8.3 Blessing/Toast
  // 4.2.8.4 Song List
  // 4.2.8.5 Production
  // 4.2.8.6 Timeline
  // 4.2.8.7 Notes
  // 4.2.8.8 Gig Styling
  // 4.2.8.9 Check Export Final PDF works 

  // REPEAT FOR ALL EVENTS

  it('EventType: Wedding contains all the correct sections', function () {
    visitStarbridge()

    // https://starbridge.starlightmusic.com/event/649221ae8ee20fd5285dd92b
    // const sampleLiveWeddingEventId = "649221ae8ee20fd5285dd92b" // RS 1/14/2024
    // cy.visit("https://starbridge.starlightmusic.com/event/" + sampleLiveWeddingEventId).wait(200).then(() => {

    cy.contains('a', 'Events').should('exist').click().then(() => {

      cy.contains('.title', 'All Events').should('exist');

      cy.wait(5000);

      // check a wedding // change to specific event
      // href="/event/649221ae8ee20fd5285dd92b" // RS 1/14/24
      // href="/651c93889adb424aae5df635" //RS 3/16/2024
      // href="/656d224338f51dcb816c4074" //BB 3/08/2025
      // href="/65674c4838f51dcb81c28758" //RS 6/30/2024 Crossed Keys Estate
      
      cy.get('a[href="/event/65674c4838f51dcb81c28758"]').first().click().wait(1500).then(() => { 
      // cy.contains('a', '01/14/2024').should('exist').click().then(() => {
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

        // 4.1.1.6 Reviews
        checkReviewsSection();

        // 4.1.1.7 Finals
        cy.contains('.nav-link', 'Finals').should('exist').click().wait(500).then(() => { // .nav-link containing "Finals" should exist, click it

          // 4.1.1.7.1 Event Info
          cy.wait(finalsSidebarTitleContainsEventInfoWaitTime);

          cy.contains('.finals_sidebar_title', 'Event Info').should('exist').click().then(() => { // .finals_sidebar_title, 'Event Info', click it
            cy.contains('h3', 'Parents').should('exist'); // h3, 'Parents', should exist
            cy.contains('h3', 'Event planner').should('exist'); // h3, Event planner, should exist
            cy.contains('h3', 'Socials').should('exist'); // h3, Socials, should exist
            cy.contains('h3', 'Vendor Socials').should('exist'); // h3, Vendor Socials, should exist
          });

          // 4.1.1.7.2 Special Songs
          checkFinalsSpecialSongsSection();

          // 4.1.1.7.3 Blessings/Toast
          checkFinalsBlessingToastSection();

          // 4.1.1.7.4 Song List
          checkFinalsSonglistSection();

          // 4.1.1.7.5 Production
          checkFinalsProductionSection();

          // 4.1.1.7.6 Timeline
          checkFinalsTimelineSection();

          // 4.1.1.7.7 Notes
          checkFinalsNotesSection();

          // 4.1.1.7.8 Gig Styling
          checkGigStylingSection();

          // Buttons
          cy.contains('button', 'Export Final PDF').should('exist'); // button, Export Final PDF should exist
          cy.contains('label', 'Finals Status:').should('exist'); // label, Finals Status:

        });
      });
    });
  })

  it('EventType: Birthday contains all the correct sections', function () {
    visitStarbridge()

    cy.wait(1000);

    cy.contains('a', 'Events').should('exist').click().then(() => {

      cy.wait(1000);

      cy.contains('.title', 'All Events').should('exist');

      cy.wait(5000);

      // check a birthday
      // cy.contains('a', 'Birthday').should('exist').click().then(() => {

      // https://starbridge.starlightmusic.com/event/649221ae8ee20fd5285dd92b

      // const sampleLiveBirthdayEventId = "644a85b6711ad7de0a595792" // SO 4/27/2024
      const sampleLiveBirthdayEventId = "65fd9a1c2c46ae21a1328291" // SP 5/11/2024
      // cy.visit("https://starbridge.starlightmusic.com/event/" + sampleLiveBirthdayEventId).wait(1500).then(() => {
      // cy.visit("https://starbridge.starlightmusic.com/event/" + sampleLiveBirthdayEventId).wait(1500).then(() => {
      cy.get('a[href="/event/65fd9a1c2c46ae21a1328291"]').first().click().wait(1500).then(() => {

        cy.wait(3000);

        // 4.1.1.1 Basic Info
        cy.get("#basic-info-btn").should('exist').click().then(() => {
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

        // 4.1.1.6 Reviews
        checkReviewsSection();

        // 4.1.1.7 Finals
        cy.contains('.nav-link', 'Finals').should('exist').click().wait(500).then(() => { // .nav-link containing "Finals" should exist, click it

          // 4.1.1.7.1 Event Info
          cy.wait(finalsSidebarTitleContainsEventInfoWaitTime);

          cy.contains('.finals_sidebar_title', 'Event Info').should('exist').click().then(() => { // .finals_sidebar_title, 'Event Info', click it
            cy.contains('h3', 'Guest(s) Of Honor').should('exist'); // h3, 'Parents', should exist
            cy.contains('h3', 'Event planner').should('exist'); // h3, Event planner, should exist
            cy.contains('h3', 'Socials').should('exist'); // h3, Socials, should exist
            cy.contains('h3', 'Vendor Socials').should('exist'); // h3, Vendor Socials, should exist
          });

          // 4.1.1.7.3 Blessings/Toast
          checkFinalsBlessingToastSection();

          // 4.1.1.7.4 Song List
          checkFinalsSonglistSection();

          // 4.1.1.7.5 Production
          checkFinalsProductionSection();

          // 4.1.1.7.6 Timeline
          checkFinalsTimelineSection();

          // 4.1.1.7.7 Notes
          checkFinalsNotesSection();

          // 4.1.1.7.8 Gig Styling
          checkGigStylingSection();

          // Buttons
          cy.contains('button', 'Export Final PDF').should('exist'); // button, Export Final PDF should exist
          cy.contains('label', 'Finals Status:').should('exist'); // label, Finals Status:

        });
      });
    });
    // });
  })

  it('EventType: Charity contains all the correct sections', function () {
    visitStarbridge()

    cy.wait(1000);

    cy.contains('a', 'Events').should('exist').click().then(() => {

      cy.wait(2500);

      cy.contains('.title', 'All Events').should('exist');

      cy.wait(2500);

      cy.get('li[title="2"]').click(); // scroll to second page

      cy.wait(1000); 

      // check a charity
      cy.contains('a', 'Charity').should('exist').click().then(() => {
        cy.wait(3000);

        // 4.1.1.1 Basic Info
        cy.get("#basic-info-btn").should('exist').click().then(() => {
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

        // 4.1.1.6 Reviews
        checkReviewsSection();

        // 4.1.1.7 Finals
        cy.contains('.nav-link', 'Finals').should('exist').click().wait(500).then(() => { // .nav-link containing "Finals" should exist, click it

          // 4.1.1.7.1 Event Info
          cy.contains('.finals_sidebar_title', 'Event Info').should('exist').click().then(() => { // .finals_sidebar_title, 'Event Info', click it
            cy.contains('h3', 'Guest(s) Of Honor').should('exist'); // h3, 'Parents', should exist
            cy.contains('h3', 'Event planner').should('exist'); // h3, Event planner, should exist
            cy.contains('h3', 'Socials').should('exist'); // h3, Socials, should exist
            cy.contains('h3', 'Vendor Socials').should('exist'); // h3, Vendor Socials, should exist
          });

          // 4.1.1.7.3 Blessings/Toast
          checkFinalsBlessingToastSection();

          // 4.1.1.7.4 Song List
          checkFinalsSonglistSection();

          // 4.1.1.7.5 Production
          checkFinalsProductionSection();

          // 4.1.1.7.6 Timeline
          checkFinalsTimelineSection();

          // 4.1.1.7.7 Notes
          checkFinalsNotesSection();

          // 4.1.1.7.8 Gig Styling
          checkGigStylingSection();

          // Buttons
          cy.contains('button', 'Export Final PDF').should('exist'); // button, Export Final PDF should exist
          cy.contains('label', 'Finals Status:').should('exist'); // label, Finals Status:

        });
      });
    });
  })

  it('EventType: Corporate contains all the correct sections', function () {
    visitStarbridge()

    cy.contains('a', 'Events').should('exist').click().then(() => {
      cy.contains('.title', 'All Events').should('exist');

      cy.wait(2500);

      cy.get('li[title="2"]').click(); // scroll to second page

      cy.wait(2500);

      //   cy.contains('a', 'Corporate').should('exist').click().then(() => {
      // https://starbridge.starlightmusic.com/event/64bfd737de3e812b80f7d294
      const sampleLiveCorporateEventId = "6552665daf80592de28758d9" // RS 11/09/2024
      // cy.visit("https://starbridge.starlightmusic.com/event/" + sampleLiveCorporateEventId).wait(1500).then(() => {
      cy.get('a[href="/event/6552665daf80592de28758d9"]').first().click().wait(1500).then(() => {

        cy.wait(3000);

        // 4.1.1.1 Basic Info
        cy.get("#basic-info-btn").should('exist').click().then(() => {
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

        // 4.1.1.6 Reviews
        checkReviewsSection();

        // 4.1.1.7 Finals
        cy.contains('.nav-link', 'Finals').should('exist').click().wait(500).then(() => { // .nav-link containing "Finals" should exist, click it

          // 4.1.1.7.1 Event Info
          cy.wait(finalsSidebarTitleContainsEventInfoWaitTime);

          cy.contains('.finals_sidebar_title', 'Event Info').should('exist').click().then(() => { // .finals_sidebar_title, 'Event Info', click it
            cy.contains('h3', 'Guest(s) Of Honor').should('exist'); // h3, 'Parents', should exist
            cy.contains('h3', 'Event planner').should('exist'); // h3, Event planner, should exist
            cy.contains('h3', 'Socials').should('exist'); // h3, Socials, should exist
            cy.contains('h3', 'Vendor Socials').should('exist'); // h3, Vendor Socials, should exist
          });

          // 4.1.1.7.3 Blessings/Toast
          checkFinalsBlessingToastSection();

          // 4.1.1.7.4 Song List
          checkFinalsSonglistSection();

          // 4.1.1.7.5 Production
          checkFinalsProductionSection();

          // 4.1.1.7.6 Timeline
          checkFinalsTimelineSection();

          // 4.1.1.7.7 Notes
          checkFinalsNotesSection();

          // 4.1.1.7.8 Gig Styling
          checkGigStylingSection();

          // Buttons
          cy.contains('button', 'Export Final PDF').should('exist'); // button, Export Final PDF should exist
          cy.contains('label', 'Finals Status:').should('exist'); // label, Finals Status:

        });
      });
    });
  });
  // })
});
