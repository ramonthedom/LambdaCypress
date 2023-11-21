// 1_WeddingEvents.spec.js

import {
  visitStarbridge,
  checkDashboard,
  testWeddingEvent,
  create6MonthFilter,
  remove6Monthfilter,
  evtApprovedCnameContainsWaitPeriod,
  evtApprovedCnameThenWaitPeriod
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

  // 3. TEST WEDDING EVENTS
  it('should run tests for WEDDING events', function () {

    visitStarbridge();

    cy.contains('a', 'Events').should('exist').click().wait(1500).then(() => {
      // cy.wait(evtApprovedCnameThenWaitPeriod);
      cy.get('.evt-approved-cname').then($elements => {
        const weddingEvents = $elements.filter(':contains("Wedding")');

        const START_INDEX = 30; // Set this to 0, 5, 10, etc., depending on the file
        const END_INDEX = 35; // Set this to 5 more than START_INDEX (5, 10, 15, etc.)
        const endIndex = Math.min(weddingEvents.length, END_INDEX);

        if (weddingEvents.length > START_INDEX) {
          for (let i = START_INDEX; i < endIndex; i++) {
            cy.wait(evtApprovedCnameContainsWaitPeriod);
            cy.get('.evt-approved-cname:contains("Wedding")').eq(i).click();
            cy.wait(1000);
            testWeddingEvent();
            cy.wait(1000);
            cy.get('.event-top-container > :nth-child(1) > .mr-3').click();
          }
        } else {
          cy.log('No wedding events found in the specified range');
        }
      });
    });
  });

  // 4. REMOVE FILTER
  it('should remove 6 month filter', function () {
    remove6Monthfilter()
  });

  after(() => {
    remove6Monthfilter()
  })

});