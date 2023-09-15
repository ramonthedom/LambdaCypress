/// BACKEND ///

// login
describe('Backend Login Success', function () {

  it('visit login page', function () {

    const user_email = "sqatesting.dl@gmail.com"
    const user_password = "SQATesting1553!$"

    function makeRequest() {
      // FETCH OTP
      cy.request({
          method: 'POST',
          url: 'https://8ze16mvrz1.execute-api.us-east-1.amazonaws.com/prod/fetch',
        }).wait(3000)
        .then((response) => {
          expect(response.status).to.eq(200); // assert status code
          // Further checks based on the response
          var otp = response.body;
          cy.log('Returned OTP: ', otp);

          // Convert to string if it's not
          if (typeof otp !== 'string') {
            otp = otp.toString();
          }

          expect(otp.length).to.eq(6);

          // Split the returned data into an array of characters
          const characters = otp.split('');

          // Loop through the array and input each character into the corresponding form field
          characters.forEach((char, index) => {
            cy.get(`.otp_input_form:nth-child(${index + 1}) > input`).type(char);
          });

        });

      // Login

      cy.wait(3000);

      cy.get('.login_btn').click().wait(3000);


    }

    cy.visit("https://starbridge.starlightmusic.com")
    cy.get('.login_form_text').should('contain.text', 'Welcome back! Please login to your account.')

    // ENTER USER INFO
    cy.get('#user_email').type(user_email)
    cy.get('[data-test=user_password]').type(user_password)

    cy.get('.login_btn').click();
    cy.get('[data-test=login_form]').submit();
    cy.get('.login_form_heading').should('contain.text', 'Verification Code')

    makeRequest()
    // UNCHECK REMEMBER ME

    cy.get('body').then(($body) => {
      if ($body.find('[style="color: red;"]:contains("Wrong otp")').length) {
        // The element with style "color: red;" containing "Wrong otp" exists
        cy.log('Element with "Wrong otp" found');
        cy.get('.error-resend').click();
        makeRequest()
      } else {
        // The element does not exist
        cy.log('Element with "Wrong otp" not found');
      }
    });

    // cy.get('[data-test=otpForm]').submit();

    console.log("LOGIN SUCCESS")

    // ~~~~~~~~~~~~ //
    // 1. DASHBOARD //
    // ~~~~~~~~~~~~ //

    // 1. Dashboard
    // cy.contains('a', 'Dashboard').should('exist').click();
    // cy.contains('.dashboard_heading', 'Dashboard').should('exist');

// EVENTS //



cy.contains('a', 'Events').should('exist').click().then(()=>{
  cy.contains('.title', 'All Events').should('exist');

  cy.get('.ant-picker-input')
  .eq(0).type('09/14/2023').type('{enter}').wait(1000).then(()=>{
    //   cy.get('.ant-picker-input')
    //   .eq(0).next().next().type('03/14/2024').type('{enter}');
    
    //   cy.visit('https://starbridge.starlightmusic.com/');
    // cy.get('.ant-picker-focused input').dblclick();
    // cy.get('.ant-picker-focused input').click();
    cy.get('.ant-picker:nth-child(2) input').type('08/08/2024');

  });


  // cy.get('.ant-picker-input')
  // .eq(0).type('09/14/2023')
  // .type('{enter}')
  // .type('{return}')
  // .type('03/14/2024')
  // .type('{enter}');
  // // });

});


    // ~~~~~~~~~~~~ //
    //  2. MY BAND  //
    // ~~~~~~~~~~~~ //

    // // 2. My Band
    // cy.contains('a', 'My Band').should('exist').click();

    // /// 2.1. Subsection - Basic Information
    // cy.contains('div', 'Basic Information').should('exist').click();
    // cy.contains('div', 'General Information').should('exist').click();
    // cy.contains('h6', 'Band Name').should('exist');

    // /// 2.2. Subsection - Song List
    // cy.contains('div', 'Song List').should('exist').click();
    // cy.get('.myBand_add_new_song_btn').should('exist');

    // /// 2.3. Subsection - Band Availability    
    // cy.contains('div', 'Band Availability').should('exist').click().then(() => {
    //   cy.contains('.ml-2', "Marked Unavailable").should('exist');
    // })

    // /// 2.4. Subsection - Gig Info
    // cy.contains('div', 'Gig Info').should('exist').click();
    // cy.contains('div', 'Sorting').should('exist').click();
    // cy.contains('span', 'Event Details').should('exist');
    // cy.contains('div', 'Styling').should('exist').click();
    // cy.contains('h5', 'Segments').should('exist');

    // // ~~~~~~~~~~ //
    // // 3. LEADS   //
    // // ~~~~~~~~~~ //

    // // 2. Leads
    // cy.contains('a', 'Leads').should('exist').click();
    // cy.get('a > .leads-table-css-container').should('exist');

    // // ~~~~~~~~~~ //
    // // 4. EVENTS   //
    // // ~~~~~~~~~~ //

    // // 4. Events
    // // Setup:
    // // 1. select all events up to 6 months in the future
    // // 2. save the _id's for FrontEnd Testing

    // // ORDER:
    // // 4.1. Click client name
    // // 4.2. Check that the following load
    // // 4.2.1 Basic Info
    // // 4.2.2 Configuration
    // // 4.2.3 Band
    // // 4.2.4 Documents
    // // 4.2.5 Communication
    // // 4.2.6 Expenses
    // // 4.2.7 Reviews
    // // 4.2.8 Finals
    // // 4.2.8.1 Event Info
    // // 4.2.8.2 Special Songs
    // // 4.2.8.3 Blessing/Toast
    // // 4.2.8.4 Song List
    // // 4.2.8.5 Production
    // // 4.2.8.6 Timeline
    // // 4.2.8.7 Notes
    // // 4.2.8.8 Gig Styling
    // // 4.2.8.9 Check Export Final PDF works 

    // // REPEAT FOR ALL EVENTS


    // //~~~~~~~~~~~~~~//
    // // 5. CONTRACTS //
    // //~~~~~~~~~~~~~~//

    // // 5. Contracts
    // cy.contains('span', 'Contracts').should('exist').click();

    // // 5.1. Bookings
    // cy.contains('a', 'Bookings').should('exist').click();
    // cy.contains('tr', "BOOKING DATE").should('exist');

    // // 5.2 Upsells
    // cy.contains('a', 'Upsells').should('exist').click();
    // cy.contains('tr', "DATE SENT/RECEIVED").should('exist');

    // //~~~~~~~~~~~~~~~~//
    // // 6. MAINTENANCE //
    // //~~~~~~~~~~~~~~~~//

    // // 6. Maintenance
    // cy.contains('span', 'Maintenance').should('exist').click();

    // // 6.1  Configurations
    // cy.contains('span', 'Configurations').should('exist').click();

    // // 6.1.1  Segments
    // cy.contains('a', 'Segments').should('exist').click();
    // cy.contains('.dashboard_heading', 'Segments').should('exist');

    // // 6.1.2  Event Types  
    // cy.contains('a', 'Event Types').should('exist').click().wait(2000).then(() => {
    //   cy.contains('.dashboard_heading', 'Events Types').should('exist');
    // });

    // // 6.1.3  Positions  
    // cy.contains('a', 'Positions').should('exist').click().wait(5000).then(() => {
    //   cy.contains('.dashboard_heading', 'Positions').should('exist');
    // });

    // // 6.1.4  Extras 
    // cy.contains('a', 'Extras').should('exist').click().wait(500).then(() => {
    //   cy.contains('.dashboard_heading', 'Extras').should('exist');
    // });

    // // 6.1.5  Genres   
    // cy.contains('a', 'Genres').should('exist').click().wait(500).then(() => {
    //   cy.contains('.dashboard_heading', 'Genres').should('exist');
    // });

    // // 6.1.6  Rates
    // cy.contains('a', 'Rates').should('exist').click().wait(500).then(() => {
    //   cy.contains('.dashboard_heading', 'Rates').should('exist');
    // });

    // cy.wait(1000);

    // // 6.1.7  Margins
    // cy.contains('a', 'Margins').should('exist').click().wait(2000).then(() => {
    //   cy.contains('label', 'Default Margins').should('exist');
    //   cy.contains('a', 'Download Template').should('exist');
    //   cy.contains('a', 'Download Template').should('exist');
    //   cy.contains('span', 'Import Peak Margins').should('exist');
    // });

    // // 6.2. Users
    // cy.contains('a', 'Users').should('exist').click();
    // cy.contains('.dashboard_heading', 'User Management').should('exist');

    // /// 6.2.1 Performer tab
    // cy.contains('.custom_nav', 'Performers').should('exist');
    // cy.contains('a', 'Performers').should('exist').click();
    // cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
    // cy.contains('.ant-table-thead', 'BAND NAME').should('exist');

    // /// 6.2.2 Band Leaders tab
    // cy.contains('.custom_nav', 'Band Leaders').should('exist');
    // cy.contains('a', 'Band Leaders').should('exist').click().click().then(() => {
    //   cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
    //   cy.contains('.ant-table-thead', 'BAND NAME').should('exist');
    // });
    // /// 6.2.3 Event Planners tab
    // cy.contains('.custom_nav', 'Event planners').should('exist');
    // cy.contains('a', 'Event planners').should('exist').click().then(() => {
    //   cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
    //   cy.contains('th', 'COMMISSION RATE').should('exist');
    // });

    // /// 6.2.4 Office staff tab
    // cy.contains('.custom_nav', 'Office staff').should('exist');
    // cy.contains('a', 'Office staff').should('exist').click().then(() => {
    //   cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
    //   0
    //   cy.contains('th', 'ROLES').should('exist');
    // });

    // /// 6.2.5 Customers tab
    // cy.contains('.custom_nav', 'Customers').should('exist');
    // cy.contains('a', 'Customers').should('exist').click().then(() => {
    //   cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
    //   cy.contains('th', 'LAST LOGIN').should('exist');
    // });

    // // 6.3  bands
    // cy.contains('a', 'Bands').should('exist').click();
    // cy.contains('.dashboard_heading', 'Bands').should('exist');
    // cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
    // cy.contains('th', 'Featured').should('exist');

    // // Check Onyx
    // cy.contains('a', 'Onyx').should('exist').click();

    // /// 6.3.1 Check Information 
    // cy.contains('a', 'Information').should('exist').click().then(() => {
    //   cy.contains('.cms_card_heading', 'Band Information').should('exist');
    //   cy.contains('.cms_card_heading', 'About Us').should('exist');
    //   cy.contains('.cms_card_heading', 'Hero Slider').should('exist');
    //   cy.contains('.cms_card_heading', 'SEO').should('exist');
    // });

    // /// 6.3.2 Check Videos
    // cy.contains('a', 'Videos').should('exist').click().then(() => {
    //   cy.contains('h5', 'Band Video').should('exist');
    // });;

    // /// 6.3.3 Check Band Configuration
    // cy.contains('a', 'Band Configuration').should('exist').click().then(() => {
    //   cy.contains('label', 'Position:').should('exist');
    //   cy.contains('label', 'Reception Rate:').should('exist');
    //   cy.contains('h5', 'Core Performers: ').should('exist');
    // });

    // /// 6.3.4 Check Team
    // cy.contains('a', 'Team').should('exist').click().then(() => {
    //   cy.contains('h4', 'Base Price: ').should('exist');
    // });

    // /// 6.3.5 Check Customer Reviews
    // cy.contains('a', 'Customer Reviews').should('exist').click().then(() => {
    //   cy.get('div > .grey-card').should('exist');
    // });

    // /// 6.3.6 Check Band Proposals
    // cy.contains('a', 'Band Proposals').should('exist').click().then(() => {
    //   cy.contains('.cms_card_heading', 'Banner Image').should('exist');
    //   cy.contains('.cms_card_heading', 'Band leader Image').should('exist');
    //   cy.contains('.cms_card_heading', 'Title Image').should('exist');
    //   cy.contains('.cms_card_heading', 'Logo Image').should('exist');
    //   cy.contains('.cms_card_heading', 'Footer Image').should('exist');
    //   cy.contains('.cms_card_heading', 'Event Images').should('exist');
    // });


    // // 6.3.7 Check Gig Info
    // cy.contains('a', 'Gig Info').should('exist').click().then(() => {
    //   cy.contains('.ml-4', 'Event Details').should('exist');
    // });

    // // 6.4. Schedules
    // cy.contains('a', 'Schedules').should('exist').click().then(() => {
    //   cy.contains('.dashboard_heading', 'Band Availability').should('exist');
    //   cy.contains('.ml-2', 'Marked Unavailable').should('exist');
    // });

    // // 6.5  Integration
    // cy.contains('a', 'Integration').should('exist').click().then(() => {
    //   cy.contains('.dashboard_heading', 'Integration').should('exist');
    //   cy.get('.card-columns').should('exist');
    //   cy.contains('p', 'API Providers').should('exist');
    // });

    // // 6.6. Venues
    // cy.contains('a', 'Venues').should('exist').click().then(() => {
    //   cy.contains('.dashboard_heading', 'Venues').should('exist');
    //   cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
    //   cy.contains('th', 'Venue Name').should('exist');
    // });

    // // 6.7 FAQ
    // cy.contains('span', 'FAQ').should('exist').click().then(() => {
    //   // 6.7.1  Categories
    //   cy.contains('a', 'Categories').should('exist').click().then(() => {
    //     cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
    //     cy.contains('th', 'S.NO').should('exist');
    //     cy.contains('th', 'CATEGORY').should('exist');
    //     cy.contains('.dashboard_heading', 'FAQ Category Management').should('exist');
    //   });

    //   // 6.7.2  Questions
    //   cy.contains('a', 'Questions').should('exist').click().then(() => {
    //     cy.contains('.dashboard_heading', 'FAQ Management').should('exist');
    //     cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
    //     cy.contains('th', 'QUESTION').should('exist');
    //   });
    // });

    // //  ~~~~ //
    // //  CMS  //
    // //  ~~~~ //

    // // 6.8 CMS
    // cy.contains('span', 'CMS').should('exist').click().then(() => {
    //   // 6.8.1  Categories
    //   cy.contains('a', 'Main Pages').should('exist').click().then(() => {
    //     cy.contains('.dashboard_heading', 'CMS').should('exist');
    //     cy.get('.cms_list').find('li').should('have.length.greaterThan', 1);
    //     cy.contains('p', 'Last update on').should('exist');
    //   });

    //   // 6.8.2  Questions
    //   cy.contains('a', 'City').should('exist').click().then(() => {
    //     cy.contains('.cms_card_heading', 'All Cities').should('exist');
    //     cy.contains('.ant-breadcrumb-link', 'All Cities').should('exist');
    //     cy.get('.cms_list').find('li').should('have.length.greaterThan', 1);
    //   });
    // });


    // // ~~~~~~~~~~~~~~~ //
    // // 7. MY DOCUMENTS //
    // // ~~~~~~~~~~~~~~~ //

    // // 7. My Documents
    // cy.contains('a', 'My Documents').should('exist').click().then(() => {
    //   cy.contains('.dashboard_heading', 'My Documents').should('exist');
    // });

    // // ~~~~~~~~~~ //
    // // 8. FINANCE //
    // // ~~~~~~~~~~ //

    // // 8. Finance
    // cy.contains('a', 'Finance').should('exist').click().then(() => {
    //   cy.contains('.dashboard_heading', 'Finance').should('exist');
    // });

    // cy.contains('a', 'Company').should('exist').click().then(() => {
    //   cy.contains('button', 'Gross sales report').should('exist');
    //   cy.contains('button', 'Payroll report').should('exist');
    //   cy.contains('.finance_card_title', 'Payment Due').should('exist');
    //   cy.contains('.finance_card_title', 'Overdue Payments').should('exist');
    //   cy.contains('.finance_card_title', 'Profit Remaining').should('exist');
    //   cy.contains('.finance_card_title', 'Gross Sales').should('exist');
    //   cy.contains('.finance_card_title', 'Total Profit').should('exist');
    //   cy.get('.ant-table-content').find('tr').should('have.length.greaterThan', 1);
    //   cy.contains('th', 'EVENT NAME').should('exist');
    //   cy.contains('th', 'BAND NAME').should('exist');
    // });

    // // 9. Switch to Bandazon
    // cy.contains('a', 'Switch to').should('exist');
    // cy.contains('a', 'Bandazon').should('exist').click().wait(5000).then(() => {
    //   // check if url contains the word 'bandazon'cy.go('forward')
    //   cy.location('pathname').should('include', 'bandazon').then(() => {
    //     // cy.url().should('include', 'bandazon')
    //     cy.contains('.section-heading', 'Events').should('exist');
    //     // 8.1 Switch back to Starbridge 
    //     cy.contains('a', 'Switch to').should('exist');
    //     cy.contains('a', 'Starbridge').should('exist').click().wait(5000).then(() => {
    //       // cy.location('pathname').should('include', 'starbridge');
    //       cy.get('img').should('have.attr', 'src', 'https://starlightprod-images.s3.amazonaws.com/CMS-4_1690431299639.png')
    //       // Can see the word "Dashboard"
    //       cy.contains('.dashboard_heading', 'Dashboard').should('exist');

    //     })
    //   });
    // })
    // })
  })

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

// 5. Contracts
// 5.1. Bookings
// 5.2 Upsells
// 6. Maintenance
// 6.1  Configurations
// 6.1.1  Segments
// 6.1.2  Event Types  
// 6.1.3  Positions  
// 6.1.4  Extras  
// 6.1.5  Genres   
// 6.1.6  Rates
// 6.1.7  Margins
// 6.2. Users
// 6.3  bandss
// 6.4. Schedules
// 6.5  Integration
// 6.6. Venues
// 6.7 FAQ 
// 6.8 CMS
// 7. My Documents
// 8. Finance
// 9. Switch to Bandazon
// 8.1 Switch back to Starbridge


//   it('starbridge login service should be running', function () {
//     cy.visit(`https://star-api.starlightmusic.com/bridgelogin`) // Replace with the actual path to your HTML file
//     cy.contains('hello this is the star bridge login service')
//       .should('be.visible')
//   })
// })

/// FRONTEND ///

// login
// describe('Frontend Login Success', function () {
//   it('starbridge login service should be running', function () {
//     cy.visit(`https://star-api.starlightmusic.com/bridgelogin`) // Replace with the actual path to your HTML file
//     cy.contains('hello this is the star bridge login service')
//       .should('be.visible')
//   })
// })

// events

// check sections
// use saved _ids to check the following for each event:

// describe('Frontend Events Checked Success', function () {
//   it('starbridge login service should be running', function () {
//     cy.visit(`https://star-api.starlightmusic.com/bridgelogin`) // Replace with the actual path to your HTML file
//     cy.contains('hello this is the star bridge login service')
//       .should('be.visible')
//   })
// })


//