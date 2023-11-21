    // 0. Create 6 months filter

    export const evtApprovedCnameContainsWaitPeriod = 1500;
    export const evtApprovedCnameThenWaitPeriod = 1500;
    export const finalsSidebarTitleContainsEventInfoWaitTime = 1000;
    export const finalsMainContainerMb3WaitTime = 500;

    export function create6MonthFilter() {

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
            // cy.wait(1000)
            // cy.get('.ant-select-item-option-active .demo-option-label-item').click();
            // cy.contains('.title > .ant-select > .ant-select-selector > .ant-select-selection-item', namedVariable).should('exist');
        });

    }

    // 0.1 Remove 6 months filter
    export function remove6Monthfilter() {
        cy.request({
            method: 'DELETE',
            url: 'https://8ze16mvrz1.execute-api.us-east-1.amazonaws.com/prod/removeSixMonthsEventsList'
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    }

    // 0.2. Check Dashboard
    export function checkDashboard() {
        visitStarbridge()

        // 1. Dashboard
        cy.contains('a', 'Dashboard').should('exist').click();
        cy.contains('.dashboard_heading', 'Dashboard').should('exist');
    }

    // 1. Wedding
    export function testWeddingEvent() {
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
            cy.contains('button', 'Export Final Pdf').should('exist'); // button, Export Final Pdf should exist
            cy.contains('label', 'Finals Status:').should('exist'); // label, Finals Status:

        });
    }

    // 2. Birthday
    export function testBirthdayEvent() {
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
            cy.contains('button', 'Export Final Pdf').should('exist'); // button, Export Final Pdf should exist
            cy.contains('label', 'Finals Status:').should('exist'); // label, Finals Status:

        });
    }

    // 3. Charity
    export function testCharityEvent() {
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
            cy.contains('button', 'Export Final Pdf').should('exist'); // button, Export Final Pdf should exist
            cy.contains('label', 'Finals Status:').should('exist');
        }); // label, Finals Status:

    }

    // 4. Corporate
    export function testCorporateEvent() {
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
            cy.contains('button', 'Export Final Pdf').should('exist'); // button, Export Final Pdf should exist
            cy.contains('label', 'Finals Status:').should('exist'); // label, Finals Status:

        });
    }

    // 5. Private
    export function testPrivateEvent() {
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
            // checkFinalsSpecialSongsSection();

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
    export function testHolidayEvent() {
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
            cy.contains('button', 'Export Final Pdf').should('exist'); // button, Export Final Pdf should exist
            cy.contains('label', 'Finals Status:').should('exist'); // label, Finals Status:

        });

    }

    export function checkBasicInfoSection() {
        cy.contains('h3', 'Booked By').should('exist'); //h3 containing "Booked By" should exist
        cy.contains('h3', 'Lead Origin').should('exist'); //h3 containing "Lead Origin" should exist
        cy.contains('h3', 'Client Details').should('exist'); //h3 containing "Client Details" should exist
        cy.contains('h3', 'Upcoming Payments').should('exist'); //h3 containing "Upcoming Payments" should exist
        cy.contains('h3', 'Payment History').should('exist'); //h3 containing "Payment History" should exist
        cy.contains('p', 'Total Price:').should('exist');
    }

    export function checkConfigurationSection() {
        cy.get("#config-btn").should('exist').click().then(() => {
            cy.contains('h3', 'Band Configurations').should('exist'); // h3 containing "Band Configurations" should exist
            cy.contains('.basic_info_heading', 'Segments').should('exist'); // .basic_info_heading containing "Segments" should exist
            cy.contains('.basic_info_heading', 'Band').should('exist');
        });
    }

    export function checkCommunicationSection() {
        cy.contains('.nav-link', 'Communication').should('exist').click().wait(500).then(() => {
            cy.contains('div', "Office Side").should('exist').click().then(() => {
                cy.contains('h1', "Activity").should('exist'); // h1 containing "Documents" should exist
            });

            cy.contains('div', "Client Side").should('exist').click().then(() => {
                cy.contains('h1', "Activity").should('exist');
            });
        });
    }

    export function checkBandSection() {
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

    export  function checkExpensesSection() {
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

    export function checkDocumentsSection() {
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

    export function checkReviewsSection() {
        cy.contains('.nav-link', 'Reviews').should('exist').click().wait(500).then(() => {
            cy.contains('button', 'Add Review +').should('exist'); // button, Add Review +, should exist
            cy.contains('p', 'Rating').should('exist');
        });
    }

    export function checkGigStylingSection() {
        cy.contains('.finals_sidebar_title', 'Gig Styling').should('exist').click().then(() => {
            cy.contains('.heading', 'global').should('exist'); // h1, Global, should exist          
            cy.contains('.heading', 'table data').should('exist');
        });
    }

    export function checkFinalsSpecialSongsSection() {
        cy.contains('.finals_sidebar_title', 'Special Songs').should('exist').click().then(() => {
            cy.wait(finalsMainContainerMb3WaitTime);
            cy.get('.finals_main_container').find('.mb-3').should('have.length.greaterThan', 1); // .finals_main_container should contain more than 1 elemtent .mb-3
            cy.contains('.finals_main_add_song_card', 'Click to add a song').should('exist');
        });
    }

    export function checkFinalsNotesSection() {
        cy.contains('.finals_sidebar_title', 'Notes').should('exist').click().then(() => {
            cy.contains('.finals__band_info_heading', 'Band Leader Notes').should('exist'); // '.finals__band_info_heading', 'Band Leader Notes', should exist
            cy.contains('.finals__band_info_heading', 'Song Notes').should('exist'); // .finals__band_info_heading, Song Notes, should exist
            cy.contains('.finals__band_info_heading', 'Wardrobe').should('exist');
        });
    }

    export function checkFinalsSonglistSection() {
        cy.contains('.finals_sidebar_title', 'Song List').should('exist').click().wait(500).then(() => {
            // cy.contains('.finals-request-song-heading', 'Requested Songs').should('exist'); // .finals-request-song-heading, Requested Songs, should exist
            cy.contains('.myBand_add_new_song_btn', /Request a song \+|Add a song \+/).should('exist');
            cy.contains('.finals-request-song-heading', 'Band Songs').should('exist'); // .finals-request-song-heading, Band Songs
            cy.get('span.ml-1.mr-2').then(($span) => {
                // Check if the title of the span is not 'DJ Kristivl'
                if ($span.attr('title') !== 'DJ Kristaval' && $span.attr('title') !== 'Disc Jockey') {
                    cy.wait(5000);
                    cy.get('.myband-song-list-table').find('td').should('have.length.greaterThan', 1);
                    cy.get('.myband-song-list-table').find('.myband-youtube-table').should('have.length.greaterThan', 1);
                } else {
                    cy.log("DJ Kristival or Disc Jockey found - NO SONGLIST")
                }
            });
        });
    }

    export function checkFinalsBlessingToastSection() {
        cy.contains('.finals_sidebar_title', 'Blessing/Toast').should('exist').click().then(() => {
            cy.wait(finalsMainContainerMb3WaitTime);
            cy.get('.finals_main_container').find('.mb-3').should('have.length.greaterThan', 1); // .finals_main_container should contain more than 1 elemtent .mb-3
            cy.contains('.finals_main_add_song_card', 'Click to add a participant').should('exist');
        });
    }

    export function checkFinalsProductionSection() {
        cy.contains('.finals_sidebar_title', 'Production').should('exist').click().then(() => {
            cy.contains('.mb-2', 'Venue Info').should('exist');
        });
    }

    export function checkFinalsTimelineSection() {
        cy.contains('.finals_sidebar_title', 'Timeline').should('exist').click().then(() => {
            cy.contains('h3', 'Timeline').should('exist'); // h3, Timeline, should exist
            cy.get('.timeline-events-container').find('.timeline-card').should('have.length.greaterThan', 1);
        });
    }

    export function visitStarbridge() {
        cy.visit("https://starbridge.starlightmusic.com")
        cy.viewport(1728, 1000);
        // console.log("LOGIN SUCCESS")
        // cy.wait(3000);
    }