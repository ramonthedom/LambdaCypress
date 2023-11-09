// 2_BirthdayEvents.spec

import {
  visitStarbridge,
  checkDashboard,
  testBirthdayEvent,
  create6MonthFilter,
  remove6Monthfilter
} from "../utilities.js"

describe('Test all Wedding Events in the next 6 months', () => {

  before(() => {
    remove6Monthfilter()
  })

  // 0. LOGIN
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

  // 1. DOUBLE-CHECK LOGIN SUCCESS
  it('Dashboard should present correctly', function () {
    checkDashboard()
  });

  // 2. CREATE FILTER
  it('should create a new Filter for 6 months from today', function () {
    create6MonthFilter()
  })

  // 2. TEST BIRTHDAY EVENTS
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

  // 3. REMOVE FILTER
  it('should remove 6 month filter', function () {
    remove6Monthfilter()
  });

  after(() => {
    remove6Monthfilter()
  })

});