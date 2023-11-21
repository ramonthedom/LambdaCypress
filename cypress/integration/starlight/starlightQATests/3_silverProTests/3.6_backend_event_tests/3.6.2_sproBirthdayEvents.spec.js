// 2_BirthdayEvents.spec

import {
  visitSilverOps,
  checkDashboard,
  testBirthdayEvent,
  create6MonthFilter,
  remove6Monthfilter,
  evtApprovedCnameContainsWaitPeriod
} from "../utilities.js";
import { userData } from "../common.js";

describe('Test all Wedding Events in the next 6 months', () => {

  before(() => {
    remove6Monthfilter()
  })

  // 0. LOGIN
  beforeEach(() => {
    const { user_email, user_password, user_login_url, myParams } = userData;
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

    visitSilverOps()

    cy.contains('a', 'Events').should('exist').click().then(() => {
      cy.wait(1000);
      cy.get('.evt-approved-cname').then($elements => {
        const birthdayEvents = $elements.filter(':contains("Birthday")');
        if (birthdayEvents.length > 0) {
          cy.log('Birthday Event count:', birthdayEvents.length);

          // Function to handle the click and subsequent actions for a single "Charity Event"
          const clickBirthdayEvent = (index) => {
            cy.log("STAGE 0 BIRTHDAY EVENT")
            cy.wait(evtApprovedCnameContainsWaitPeriod)
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