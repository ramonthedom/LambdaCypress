// 1_WeddingEvents.spec.js

import {
  visitStarbridge,
  checkDashboard,
  testWeddingEvent,
  create6MonthFilter,
  remove6Monthfilter,
  evtApprovedCnameContainsWaitPeriod
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

  // 3. TEST WEDDING EVENTS
  it('should run tests for WEDDING events', function () {

    visitStarbridge()

    cy.contains('a', 'Events').should('exist').click().then(() => {
      cy.get('.evt-approved-cname').then($elements => {
        const weddingEvents = $elements.filter(':contains("Wedding")');
        if (weddingEvents.length > 0) {
          const clickWeddingEvent = (index) => {
            cy.wait(evtApprovedCnameContainsWaitPeriod)
            cy.get('.evt-approved-cname:contains("Wedding")').eq(index).click();
            cy.wait(1000);
            testWeddingEvent()
            cy.wait(1000);
            cy.get('.event-top-container > :nth-child(1) > .mr-3').click();
          };

          // Click on each "Wedding Event"
          for (let i = 0; i < weddingEvents.length; i++) {
            cy.wait(1000)
            clickWeddingEvent(i);
            cy.wait(1000)
          }
        } else {
          cy.log('No charity events found');
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