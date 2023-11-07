/// BACKEND ///

// video for login session issue: https://www.youtube.com/watch?v=hOJ50rINCkA

// login

describe('My Tests', () => {

  let eventsList;
  let eventsListToPrint;

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


  it('Dashboard should present correctly', function () {
    visitStarbridge()

    // 1. Dashboard
    cy.contains('a', 'Dashboard').should('exist').click();
    cy.contains('.dashboard_heading', 'Dashboard').should('exist');

  });

  //  ~~~~~~~~~~  //
  // 0. CREATE FILTER   //
  //  ~~~~~~~~~~  //

  it('should create a new Filter for 6 months from today', function () {

    // Function to format a JavaScript Date object into a string "MM/DD/YYYY"
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, '0'); // JS months are zero-indexed
      const day = `${date.getDate()}`.padStart(2, '0');
      return `${month}/${day}/${year}`;
    };

    // Calculate today's date and the date six months from today
    const today = new Date();
    const sixMonthsFromToday = new Date(new Date().setMonth(new Date().getMonth() + 6));

    // Format the dates
    const formattedToday = formatDate(today);
    const formattedSixMonthsFromToday = formatDate(sixMonthsFromToday);

    visitStarbridge()

    const namedVariable = "SixMonthsList"

    // Add Default 
    cy.contains('a', 'Events').should('exist').click().then(() => {
      cy.get(':nth-child(2) > .ant-picker-input > input').click().type(`${formattedToday}{enter}`);
      cy.get(':nth-child(4) > .ant-picker-input > input').click().type(`{selectall}${formattedSixMonthsFromToday}{enter}`);
      // cy.get(':nth-child(2) > .ant-picker-input > input').click().type("01/01/2023{enter}");
      // cy.get(':nth-child(4) > .ant-picker-input > input').click().type("{selectall}06/01/2023{enter}");
      cy.contains('.title > .ant-btn > span', 'Save As').click();
      cy.get('input:nth-child(2)').type(namedVariable);
      cy.get('.events_filter_pop_checkbox').click();
      cy.get('.ant-modal-footer > .ant-btn-primary').click();
      cy.wait(3000); 
      cy.contains('a', 'Events').should('exist').click();
      cy.wait(2000); 
      cy.get('.dashboard_heading .ant-select-selection-item').click();
      cy.get('.ant-select-item-option-active .demo-option-label-item').click();
      cy.contains('.title > .ant-select > .ant-select-selector > .ant-select-selection-item', namedVariable).should('exist');
    });

  })

  //  ~~~~~~~~~~  //
  // 1. WEDDING   //
  //  ~~~~~~~~~~  //

  it('should run tests for WEDDING events', function () {

    visitStarbridge()

    cy.contains('a', 'Events').should('exist').click().then(() => {
      cy.get('.evt-approved-cname').then($elements => {
        const weddingEvents = $elements.filter(':contains("Wedding")');
        if (weddingEvents.length > 0) {
          cy.log('Wedding Event count:', weddingEvents.length);

          // Function to handle the click and subsequent actions for a single "Charity Event"
          const clickWeddingEvent = (index) => {
            cy.log("STAGE 0 WEDDING EVENT")
            cy.wait(1000)
            // Re-query for the elements to get fresh ones from the DOM
            cy.get('.evt-approved-cname:contains("Wedding")').eq(index).click();
            cy.log("STAGE 1 INSIDE WEDDING EVENT")
            // Wait for navigation or any other actions that need to occur after the click
            cy.wait(1000);
            // If there's a need to interact with elements on the new page, do it here
            testWeddingEvent()
            // Then navigate back or reset state as needed to continue with the next item
            cy.wait(1000); // Replace with a more reliable condition
            cy.get('.event-top-container > :nth-child(1) > .mr-3').click();
            cy.log("STAGE 2 INSIDE WEDDING EVENT")
          };

          // Click on each "Wedding Event"
          for (let i = 0; i < weddingEvents.length; i++) {
            cy.wait(1000)
            cy.log("BEFORE WEDDING EVENT")
            clickWeddingEvent(i);
            cy.log("AFTER WEDDING EVENT")
            cy.wait(1000)
          }
        } else {
          cy.log('No charity events found');
        }
      })
    })
  })

  //  ~~~~~~~~~~  //
  // 2. BIRTHDAY   //
  //  ~~~~~~~~~~  //

  it('should run tests for BIRTHDAY events', function () {

    visitStarbridge()

    cy.contains('a', 'Events').should('exist').click().then(() => {
      cy.get('.evt-approved-cname').then($elements => {
        const birthdayEvents = $elements.filter(':contains("Wedding")');
        if (birthdayEvents.length > 0) {
          cy.log('Birthday Event count:', birthdayEvents.length);

          // Function to handle the click and subsequent actions for a single "Charity Event"
          const clickBirthdayEvent = (index) => {
            cy.log("STAGE 0 BIRTHDAY EVENT")
            cy.wait(1000)
            // Re-query for the elements to get fresh ones from the DOM
            cy.get('.evt-approved-cname:contains("Birthday")').eq(index).click();
            cy.log("STAGE 1 INSIDE BIRTHDAY EVENT")
            // Wait for navigation or any other actions that need to occur after the click
            cy.wait(1000);
            // If there's a need to interact with elements on the new page, do it here
            testBirthdayEvent()
            // Then navigate back or reset state as needed to continue with the next item
            cy.wait(1000); // Replace with a more reliable condition
            cy.get('.event-top-container > :nth-child(1) > .mr-3').click();
            cy.log("STAGE 2 INSIDE BIRTHDAY EVENT")
          };

          // Click on each "Birthday Event"
          for (let i = 0; i < birthdayEvents.length; i++) {
            cy.wait(1000)
            cy.log("BEFORE BIRTHDAY EVENT")
            clickBirthdayEvent(i);
            cy.log("AFTER BIRTHDAY EVENT")
            cy.wait(1000)
          }
        } else {
          cy.log('No charity events found');
        }
      })
    })
  })

  //  ~~~~~~~~~~  //
  // 3. CHARITY   //
  //  ~~~~~~~~~~  //

  it('should run tests for CHARITY events', function () {

    visitStarbridge()

    cy.contains('a', 'Events').should('exist').click().then(() => {
      cy.get('.evt-approved-cname').then($elements => {
        const charityEvents = $elements.filter(':contains("Charity")');
        if (charityEvents.length > 0) {
          cy.log('Charity Event count:', charityEvents.length);

          // Function to handle the click and subsequent actions for a single "Charity Event"
          const clickCharityEvent = (index) => {
            cy.log("STAGE 0 CHARITY EVENT")
            cy.wait(1000)
            // Re-query for the elements to get fresh ones from the DOM
            cy.get('.evt-approved-cname:contains("Charity")').eq(index).click();
            cy.log("STAGE 1 INSIDE CHARITY EVENT")
            // Wait for navigation or any other actions that need to occur after the click
            cy.wait(1000);
            // If there's a need to interact with elements on the new page, do it here
            testCharityEvent()
            // Then navigate back or reset state as needed to continue with the next item
            cy.wait(1000); // Replace with a more reliable condition
            cy.get('.event-top-container > :nth-child(1) > .mr-3').click();
            cy.log("STAGE 2 INSIDE CHARITY EVENT")
          };

          // Click on each "Charity Event"
          for (let i = 0; i < charityEvents.length; i++) {
            cy.wait(1000)
            cy.log("BEFORE CHARITY EVENT")
            clickCharityEvent(i);
            cy.log("AFTER CHARITY EVENT")
            cy.wait(1000)
          }
        } else {
          cy.log('No charity events found');
        }
      })
    })
  })

  //  ~~~~~~~~~~  //
  // 4. CORPORATE   //
  //  ~~~~~~~~~~  //

  it('should run tests for CORPORATE events', function () {

    visitStarbridge()

    cy.contains('a', 'Events').should('exist').click().then(() => {
      cy.get('.evt-approved-cname').then($elements => {
        const corporateEvents = $elements.filter(':contains("Corporate")');
        if (corporateEvents.length > 0) {
          cy.log('Corporate Event count:', corporateEvents.length);

          // Function to handle the click and subsequent actions for a single "Private Event"
          const clickCorporateEvent = (index) => {
            cy.log("STAGE 0 CORPORATE EVENT")
            cy.wait(1000)
            // Re-query for the elements to get fresh ones from the DOM
            cy.get('.evt-approved-cname:contains("Corporate")').eq(index).click();
            cy.log("STAGE 1 INSIDE CORPORATE EVENT")
            // Wait for navigation or any other actions that need to occur after the click
            cy.wait(1000);
            // If there's a need to interact with elements on the new page, do it here
            testCorporateEvent()
            // Then navigate back or reset state as needed to continue with the next item
            cy.wait(1000); // Replace with a more reliable condition
            cy.get('.event-top-container > :nth-child(1) > .mr-3').click();
            cy.log("STAGE 2 INSIDE CORPORATE EVENT")
          };

          // Click on each "Private Event"
          for (let i = 0; i < corporateEvents.length; i++) {
            cy.wait(1000)
            cy.log("BEFORE CORPORATE EVENT")
            clickCorporateEvent(i);
            cy.log("AFTER CORPORATE EVENT")
            cy.wait(1000)
          }
        } else {
          cy.log('No corporate events found');
        }
      })
    })
  })

  //  ~~~~~~~~~~  //
  // 5. PRIVATE   //
  //  ~~~~~~~~~~  //

  it('should run tests for PRIVATE events', function () {

    visitStarbridge()

    cy.contains('a', 'Events').should('exist').click().then(() => {
      // For "Private Event"
      cy.get('.evt-approved-cname').then($elements => {
        const privateElements = $elements.filter(':contains("Private Event")');
        if (privateElements.length > 0) {
          cy.wrap(privateElements.length).as('privateCount');
          cy.get('@privateCount').then(privateCount => cy.log('Private Event count:', privateCount));

          cy.log('Private Event count:', $privateEvents.length);
          // Function to handle the click and subsequent actions for a single "Private Event"
          const clickPrivateEvent = (index) => {
            cy.log("STAGE 0 PRIVATE EVENT")
            cy.wait(1000)
            // Re-query for the elements to get fresh ones from the DOM
            cy.get('.evt-approved-cname:contains("Private Event")').eq(index).click();
            cy.log("STAGE 1 INSIDE PRIVATE EVENT")
            // Wait for navigation or any other actions that need to occur after the click
            cy.wait(1000);
            // If there's a need to interact with elements on the new page, do it here
            testPrivateEvent()
            // Then navigate back or reset state as needed to continue with the next item
            cy.wait(1000); // Replace with a more reliable condition
            cy.get('.event-top-container > :nth-child(1) > .mr-3').click();
            cy.log("STAGE 2 INSIDE PRIVATE EVENT")
          };

          // Click on each "Private Event"
          for (let i = 0; i < $privateEvents.length; i++) {
            cy.wait(1000)
            cy.log("BEFORE PRIVATE EVENT")
            clickPrivateEvent(i);
            cy.log("AFTER PRIVATE EVENT")
            cy.wait(1000)
          }
        } else {
          cy.log('No private events found');
        }
      });
    });
  })

  //  ~~~~~~~~~~  //
  // 6. HOLIDAY   //
  //  ~~~~~~~~~~  //

  it('should run tests for HOLIDAY events', function () {

    visitStarbridge()

    cy.contains('a', 'Events').should('exist').click().then(() => {
      cy.get('.evt-approved-cname').then($elements => {
        const holidayEvents = $elements.filter(':contains("Holiday")');
        if (holidayEvents.length > 0) {
          cy.log('Holiday Event count:', holidayEvents.length);

          // Function to handle the click and subsequent actions for a single "Private Event"
          const clickHolidayEvent = (index) => {
            cy.log("STAGE 0 HOLIDAY EVENT")
            cy.wait(1000)
            // Re-query for the elements to get fresh ones from the DOM
            cy.get('.evt-approved-cname:contains("Holiday")').eq(index).click();
            cy.log("STAGE 1 INSIDE HOLIDAY EVENT")
            cy.wait(1000);
            testHolidayEvent()
            cy.wait(1000);
            cy.get('.event-top-container > :nth-child(1) > .mr-3').click();
            cy.log("STAGE 2 INSIDE HOLIDAY EVENT")
          };

          // Click on each "Private Event"
          for (let i = 0; i < holidayEvents.length; i++) {
            cy.wait(1000)
            cy.log("BEFORE HOLIDAY EVENT")
            clickHolidayEvent(i);
            cy.log("AFTER HOLIDAY EVENT")
            cy.wait(1000)
          }
        } else {
          cy.log('No holiday events found');
        }
      })
    })
  })

  it('should remove 6 month filter', function () {
    cy.log("ENTERING COMPLETION BLOCK")
    // Clean up after tests run. For example, delete test data.
    cy.request({
      method: 'DELETE',
      url: 'https://8ze16mvrz1.execute-api.us-east-1.amazonaws.com/prod/removeSixMonthsEventsList'
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.log("AFTER BLOCK COMPLETE")
  });

  // 1. Wedding
  function testWeddingEvent() {
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
      cy.contains('button', 'Export Final Pdf').should('exist'); // button, Export Final Pdf should exist
      cy.contains('label', 'Finals Status:').should('exist'); // label, Finals Status:

    });
  }

  // 2. Birthday
  function testBirthdayEvent() {
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
      cy.contains('button', 'Export Final Pdf').should('exist'); // button, Export Final Pdf should exist
      cy.contains('label', 'Finals Status:').should('exist'); // label, Finals Status:

    });
  }

  // 3. Charity
  function testCharityEvent() {
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
      cy.contains('button', 'Export Final Pdf').should('exist'); // button, Export Final Pdf should exist
      cy.contains('label', 'Finals Status:').should('exist');
    }); // label, Finals Status:

  }

  // 4. Corporate
  function testCorporateEvent() {
    // check a corporate
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
      cy.contains('button', 'Export Final Pdf').should('exist'); // button, Export Final Pdf should exist
      cy.contains('label', 'Finals Status:').should('exist'); // label, Finals Status:

    });
  }

  // 5. Private
  function testPrivateEvent() {
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
      cy.contains('button', 'Export Final Pdf').should('exist'); // button, Export Final Pdf should exist
      cy.contains('label', 'Finals Status:').should('exist'); // label, Finals Status:

    });

  }

  // 6. Holiday
  function testHolidayEvent() {
    cy.wait(3000);

    // 4.1.1.1 Basic Info
    cy.get("#basic-info-btn").should('exist').click().then(() => {
      cy.contains('h3', 'Holiday').should('exist'); //h3 containing "Wedding of " should exist
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
      cy.contains('button', 'Export Final Pdf').should('exist'); // button, Export Final Pdf should exist
      cy.contains('label', 'Finals Status:').should('exist'); // label, Finals Status:

    });

  }

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
    // console.log("LOGIN SUCCESS")
    // cy.wait(3000);
  }

});