/// BACKEND ///

// video for login session issue: https://www.youtube.com/watch?v=hOJ50rINCkA

// login

let eventsList; // Declare a variable to hold the events

describe('Event tests', function () {

  beforeEach(() => {

    const user_email = "sqatesting.dl@gmail.com"
    const user_password = "SQATesting1553!$"
    const user_login_url = "https://starbridge.starlightmusic.com"

    let myParams = {
      my_db: 'starlight',
      my_collection: 'userOtpManager',
      my_id: '64c1ecc42d56ce0ab99204f3', // user_id associated with OTP when OTP sent
      id_type: 'user' // or client
    };

    cy.login(user_email, user_password, user_login_url, myParams);
  })

  // Make the API call once before running the tests
  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://8ze16mvrz1.execute-api.us-east-1.amazonaws.com/prod/fetchSixMonthsEvents'
    }).then((response) => {
      // Store the response body for use in the tests
      // cy.wrap(response.body).as('events');
      eventsList = response.body;
    });
  });

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
      cy.contains('div', 'Paid Expenses').should('exist').click().then(() => {
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
    cy.contains('.finals_sidebar_title', 'Song List').should('exist').click().then(() => {
      // cy.contains('.finals-request-song-heading', 'Requested Songs').should('exist'); // .finals-request-song-heading, Requested Songs, should exist
      cy.contains('.myBand_add_new_song_btn', 'Request a song +').should('exist'); // a, Add a song +
      cy.contains('.finals-request-song-heading', 'Band Songs').should('exist'); // .finals-request-song-heading, Band Songs
      cy.get('.myband-song-list-table').find('td').should('have.length.greaterThan', 1);
      cy.get('.myband-song-list-table').find('.myband-youtube-table').should('have.length.greaterThan', 1);
    });
  }

  function checkFinalsBlessingToastSection() {
    cy.contains('.finals_sidebar_title', 'Blessing/Toast').should('exist').click().then(() => {
      cy.get('.finals_main_container').find('.mb-3').should('have.length.greaterThan', 1); // .finals_main_container should contain more than 1 elemtent .mb-3
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


  // Use the stored events to generate tests
  it('should run tests for each event', function() {

    visitStarbridge()


    // Check we're in the right place
    cy.contains('a', 'Dashboard').should('exist').click();
    cy.contains('.dashboard_heading', 'Dashboard').should('exist');

    // Iterate over each event
    eventsList.forEach((event) => {
      // Generate a test for each event based on its type
      it(`should pass for event with ID ${event._id} and type ${event.eventType}`, () => {
        // Your test logic here

        // Conditional logic based on eventType
        if (event.eventType === 'Wedding') {
          // cy.log('EventType: Wedding contains all the correct sections');
          cy.log(`EventType: Wedding contains all the correct sections. Event Date: ${event.eventDate}`);
          // Add your Cypress commands specific to Wedding
        } else if (event.eventType === 'Corporate') {
          // cy.log('EventType: Corporate contains all the correct sections');
          cy.log(`EventType: Wedding contains all the correct sections. Event Date: ${event.eventDate}`);
          // Add your Cypress commands specific to Corporate
        } else if (event.eventType === 'Birthday') {
          // cy.log('EventType: Birthday contains all the correct sections');
          cy.log(`EventType: Wedding contains all the correct sections. Event Date: ${event.eventDate}`);
          // Add your Cypress commands specific to Birthday
        } else {
          // cy.log(`EventType: ${event.eventType} is not recognized`);
          cy.log(`EventType: ${event.eventType} is not recognized. Event Date: ${event.eventDate}`);
        }

        // If a test fails, this line will log the failed event
        // But note that the other tests will continue to run
        cy.log(`Failed event: ${JSON.stringify(event)}`);
      });
    });
  });

  // it('Dashboard should present correctly', function () {
  //   // ~~~~~~~~~~~~ //
  //   // 1. DASHBOARD //
  //   // ~~~~~~~~~~~~ //

  //   visitStarbridge()

  //   // 1. Dashboard
  //   cy.contains('a', 'Dashboard').should('exist').click();
  //   cy.contains('.dashboard_heading', 'Dashboard').should('exist');

  // })

  // it('EventType: Wedding contains all the correct sections', function () {
  //   visitStarbridge()

  //   // https://starbridge.starlightmusic.com/event/649221ae8ee20fd5285dd92b
  //   const sampleLiveWeddingEventId = "649221ae8ee20fd5285dd92b" // RS 1/14/2024
  //   cy.visit("https://starbridge.starlightmusic.com/event/" + sampleLiveWeddingEventId).wait(200).then(() => {
  //     cy.wait(3000);

  //     // 4.1.1.1 Basic Info
  //     cy.get("#basic-info-btn").should('exist').click().then(() => {
  //       cy.contains('h3', 'Wedding of ').should('exist'); //h3 containing "Wedding of " should exist
  //       checkBasicInfoSection(); //p containing "Total Price:" should exist
  //     });

  //     // 4.1.1.2 Configuration
  //     checkConfigurationSection();

  //     // 4.1.1.3 Band
  //     checkBandSection();

  //     // 4.1.1.4 Documents
  //     checkDocumentsSection();

  //     // 4.1.1.5 Communication
  //     checkCommunicationSection();

  //     // 4.1.1.5 Expenses      
  //     checkExpensesSection();

  //     // 4.1.1.6 Reviews
  //     checkReviewsSection();

  //     // 4.1.1.7 Finals
  //     cy.contains('.nav-link', 'Finals').should('exist').click().wait(500).then(() => { // .nav-link containing "Finals" should exist, click it

  //       // 4.1.1.7.1 Event Info
  //       cy.contains('.finals_sidebar_title', 'Event Info').should('exist').click().then(() => { // .finals_sidebar_title, 'Event Info', click it
  //         cy.contains('h3', 'Parents').should('exist'); // h3, 'Parents', should exist
  //         cy.contains('h3', 'Event planner').should('exist'); // h3, Event planner, should exist
  //         cy.contains('h3', 'Socials').should('exist'); // h3, Socials, should exist
  //         cy.contains('h3', 'Vendor Socials').should('exist'); // h3, Vendor Socials, should exist
  //       });

  //       // 4.1.1.7.2 Special Songs
  //       checkFinalsSpecialSongsSection();

  //       // 4.1.1.7.3 Blessings/Toast
  //       checkFinalsBlessingToastSection();

  //       // 4.1.1.7.4 Song List
  //       checkFinalsSonglistSection();

  //       // 4.1.1.7.5 Production
  //       checkFinalsProductionSection();

  //       // 4.1.1.7.6 Timeline
  //       checkFinalsTimelineSection();

  //       // 4.1.1.7.7 Notes
  //       checkFinalsNotesSection();

  //       // 4.1.1.7.8 Gig Styling
  //       checkGigStylingSection();

  //       // Buttons
  //       cy.contains('button', 'Export Final Pdf').should('exist'); // button, Export Final Pdf should exist
  //       cy.contains('label', 'Finals Status:').should('exist'); // label, Finals Status:

  //     });
  //   });
  // })

  // it('EventType: Birthday contains all the correct sections', function () {
  //   visitStarbridge()

  //   cy.contains('a', 'Events').should('exist').click().then(() => {
  //     cy.contains('.title', 'All Events').should('exist');

  //     // check a birthday
  //     cy.contains('a', 'Birthday').should('exist').click().then(() => {
  //       cy.wait(3000);

  //       // 4.1.1.1 Basic Info
  //       cy.get("#basic-info-btn").should('exist').click().then(() => {
  //         checkBasicInfoSection(); //p containing "Total Price:" should exist
  //       });

  //       // 4.1.1.2 Configuration
  //       checkConfigurationSection();

  //       // 4.1.1.3 Band
  //       checkBandSection();

  //       // 4.1.1.4 Documents
  //       checkDocumentsSection();

  //       // 4.1.1.5 Communication
  //       checkCommunicationSection();

  //       // 4.1.1.5 Expenses      
  //       checkExpensesSection();

  //       // 4.1.1.6 Reviews
  //       checkReviewsSection();

  //       // 4.1.1.7 Finals
  //       cy.contains('.nav-link', 'Finals').should('exist').click().wait(500).then(() => { // .nav-link containing "Finals" should exist, click it

  //         // 4.1.1.7.1 Event Info
  //         cy.contains('.finals_sidebar_title', 'Event Info').should('exist').click().then(() => { // .finals_sidebar_title, 'Event Info', click it
  //           cy.contains('h3', 'Guest(s) Of Honor').should('exist'); // h3, 'Parents', should exist
  //           cy.contains('h3', 'Event planner').should('exist'); // h3, Event planner, should exist
  //           cy.contains('h3', 'Socials').should('exist'); // h3, Socials, should exist
  //           cy.contains('h3', 'Vendor Socials').should('exist'); // h3, Vendor Socials, should exist
  //         });

  //         // 4.1.1.7.3 Blessings/Toast
  //         checkFinalsBlessingToastSection();

  //         // 4.1.1.7.4 Song List
  //         checkFinalsSonglistSection();

  //         // 4.1.1.7.5 Production
  //         checkFinalsProductionSection();

  //         // 4.1.1.7.6 Timeline
  //         checkFinalsTimelineSection();

  //         // 4.1.1.7.7 Notes
  //         checkFinalsNotesSection();

  //         // 4.1.1.7.8 Gig Styling
  //         checkGigStylingSection();

  //         // Buttons
  //         cy.contains('button', 'Export Final Pdf').should('exist'); // button, Export Final Pdf should exist
  //         cy.contains('label', 'Finals Status:').should('exist'); // label, Finals Status:

  //       });
  //     });
  //   });
  // })

  // it('EventType: Charity contains all the correct sections', function () {
  //   visitStarbridge()

  //   cy.contains('a', 'Events').should('exist').click().then(() => {
  //     cy.contains('.title', 'All Events').should('exist');

  //     // check a charity
  //     cy.contains('a', 'Charity').should('exist').click().then(() => {
  //       cy.wait(3000);

  //       // 4.1.1.1 Basic Info
  //       cy.get("#basic-info-btn").should('exist').click().then(() => {
  //         checkBasicInfoSection(); //p containing "Total Price:" should exist
  //       });

  //       // 4.1.1.2 Configuration
  //       checkConfigurationSection();

  //       // 4.1.1.3 Band
  //       checkBandSection();

  //       // 4.1.1.4 Documents
  //       checkDocumentsSection();

  //       // 4.1.1.5 Communication
  //       checkCommunicationSection();

  //       // 4.1.1.5 Expenses      
  //       checkExpensesSection();

  //       // 4.1.1.6 Reviews
  //       checkReviewsSection();

  //       // 4.1.1.7 Finals
  //       cy.contains('.nav-link', 'Finals').should('exist').click().wait(500).then(() => { // .nav-link containing "Finals" should exist, click it

  //         // 4.1.1.7.1 Event Info
  //         cy.contains('.finals_sidebar_title', 'Event Info').should('exist').click().then(() => { // .finals_sidebar_title, 'Event Info', click it
  //           cy.contains('h3', 'Guest(s) Of Honor').should('exist'); // h3, 'Parents', should exist
  //           cy.contains('h3', 'Event planner').should('exist'); // h3, Event planner, should exist
  //           cy.contains('h3', 'Socials').should('exist'); // h3, Socials, should exist
  //           cy.contains('h3', 'Vendor Socials').should('exist'); // h3, Vendor Socials, should exist
  //         });

  //         // 4.1.1.7.3 Blessings/Toast
  //         checkFinalsBlessingToastSection();

  //         // 4.1.1.7.4 Song List
  //         checkFinalsSonglistSection();

  //         // 4.1.1.7.5 Production
  //         checkFinalsProductionSection();

  //         // 4.1.1.7.6 Timeline
  //         checkFinalsTimelineSection();

  //         // 4.1.1.7.7 Notes
  //         checkFinalsNotesSection();

  //         // 4.1.1.7.8 Gig Styling
  //         checkGigStylingSection();

  //         // Buttons
  //         cy.contains('button', 'Export Final Pdf').should('exist'); // button, Export Final Pdf should exist
  //         cy.contains('label', 'Finals Status:').should('exist'); // label, Finals Status:

  //       });
  //     });
  //   });
  // })

  // it('EventType: Corporate contains all the correct sections', function () {
  //   visitStarbridge()

  //   cy.contains('a', 'Events').should('exist').click().then(() => {
  //     cy.contains('.title', 'All Events').should('exist');

  //     // check a corporate
  //     cy.contains('a', 'Corporate').should('exist').click().then(() => {
  //       cy.wait(3000);

  //       // 4.1.1.1 Basic Info
  //       cy.get("#basic-info-btn").should('exist').click().then(() => {
  //         checkBasicInfoSection(); //p containing "Total Price:" should exist
  //       });

  //       // 4.1.1.2 Configuration
  //       checkConfigurationSection();

  //       // 4.1.1.3 Band
  //       checkBandSection();

  //       // 4.1.1.4 Documents
  //       checkDocumentsSection();

  //       // 4.1.1.5 Communication
  //       checkCommunicationSection();

  //       // 4.1.1.5 Expenses      
  //       checkExpensesSection();

  //       // 4.1.1.6 Reviews
  //       checkReviewsSection();

  //       // 4.1.1.7 Finals
  //       cy.contains('.nav-link', 'Finals').should('exist').click().wait(500).then(() => { // .nav-link containing "Finals" should exist, click it

  //         // 4.1.1.7.1 Event Info
  //         cy.contains('.finals_sidebar_title', 'Event Info').should('exist').click().then(() => { // .finals_sidebar_title, 'Event Info', click it
  //           cy.contains('h3', 'Guest(s) Of Honor').should('exist'); // h3, 'Parents', should exist
  //           cy.contains('h3', 'Event planner').should('exist'); // h3, Event planner, should exist
  //           cy.contains('h3', 'Socials').should('exist'); // h3, Socials, should exist
  //           cy.contains('h3', 'Vendor Socials').should('exist'); // h3, Vendor Socials, should exist
  //         });

  //         // 4.1.1.7.3 Blessings/Toast
  //         checkFinalsBlessingToastSection();

  //         // 4.1.1.7.4 Song List
  //         checkFinalsSonglistSection();

  //         // 4.1.1.7.5 Production
  //         checkFinalsProductionSection();

  //         // 4.1.1.7.6 Timeline
  //         checkFinalsTimelineSection();

  //         // 4.1.1.7.7 Notes
  //         checkFinalsNotesSection();

  //         // 4.1.1.7.8 Gig Styling
  //         checkGigStylingSection();

  //         // Buttons
  //         cy.contains('button', 'Export Final Pdf').should('exist'); // button, Export Final Pdf should exist
  //         cy.contains('label', 'Finals Status:').should('exist'); // label, Finals Status:

  //       });
  //     });
  //   });
  // })

  // it('EventType: Holiday contains all the correct sections', function () {
  //   visitStarbridge()

  //   cy.contains('a', 'Events').should('exist').click().then(() => {
  //     cy.contains('.title', 'All Events').should('exist');

  //     // check a corporate
  //     cy.contains('a', 'Corporate').should('exist').click().then(() => {
  //       cy.wait(3000);

  //       // 4.1.1.1 Basic Info
  //       cy.get("#basic-info-btn").should('exist').click().then(() => {
  //         checkBasicInfoSection(); //p containing "Total Price:" should exist
  //       });

  //       // 4.1.1.2 Configuration
  //       checkConfigurationSection();

  //       // 4.1.1.3 Band
  //       checkBandSection();

  //       // 4.1.1.4 Documents
  //       checkDocumentsSection();

  //       // 4.1.1.5 Communication
  //       checkCommunicationSection();

  //       // 4.1.1.5 Expenses      
  //       checkExpensesSection();

  //       // 4.1.1.6 Reviews
  //       checkReviewsSection();

  //       // 4.1.1.7 Finals
  //       cy.contains('.nav-link', 'Finals').should('exist').click().wait(500).then(() => { // .nav-link containing "Finals" should exist, click it

  //         // 4.1.1.7.1 Event Info
  //         cy.contains('.finals_sidebar_title', 'Event Info').should('exist').click().then(() => { // .finals_sidebar_title, 'Event Info', click it
  //           cy.contains('h3', 'Guest(s) Of Honor').should('exist'); // h3, 'Parents', should exist
  //           cy.contains('h3', 'Event planner').should('exist'); // h3, Event planner, should exist
  //           cy.contains('h3', 'Socials').should('exist'); // h3, Socials, should exist
  //           cy.contains('h3', 'Vendor Socials').should('exist'); // h3, Vendor Socials, should exist
  //         });

  //         // 4.1.1.7.3 Blessings/Toast
  //         checkFinalsBlessingToastSection();

  //         // 4.1.1.7.4 Song List
  //         checkFinalsSonglistSection();

  //         // 4.1.1.7.5 Production
  //         checkFinalsProductionSection();

  //         // 4.1.1.7.6 Timeline
  //         checkFinalsTimelineSection();

  //         // 4.1.1.7.7 Notes
  //         checkFinalsNotesSection();

  //         // 4.1.1.7.8 Gig Styling
  //         checkGigStylingSection();

  //         // Buttons
  //         cy.contains('button', 'Export Final Pdf').should('exist'); // button, Export Final Pdf should exist
  //         cy.contains('label', 'Finals Status:').should('exist'); // label, Finals Status:

  //       });
  //     });
  //   });
  // })
});


// events
// describe('Backend Events Checked Success', function () {

// requirement: user should have ALL permissions

// check all the sections in the left column:
// 1. Dashboard (ALL)
// 2. My Band (BL Only)
// 3. Leads
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