/// BACKEND ///

// video for login session issue: https://www.youtube.com/watch?v=hOJ50rINCkA

// login

describe('My Tests', () => {
  
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
  
  });