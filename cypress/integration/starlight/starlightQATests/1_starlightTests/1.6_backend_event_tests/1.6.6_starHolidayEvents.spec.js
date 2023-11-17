// 6_HolidayEvents.spec.js

import {
  visitStarbridge,
  checkDashboard,
  testHolidayEvent,
  create6MonthFilter,
  remove6Monthfilter
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

  // 1. DUOBLE-CHECK LOGIN SUCCESS
  it('Dashboard should present correctly', function () {
    checkDashboard()
  });

  // 2. CREATE FILTER
  it('should create a new Filter for 6 months from today', function () {
    create6MonthFilter()
  })

  // 3. TEST HOLIDAY EVENTS
  it('should run tests for HOLIDAY events', function () {

    visitStarbridge()

    cy.contains('a', 'Events').should('exist').click().then(() => {
      cy.wait(1000);
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

  // 4. REMOVE FILTER
  it('should remove 6 month filter', function () {
    remove6Monthfilter()
  });

  after(() => {
    remove6Monthfilter()
  })

});