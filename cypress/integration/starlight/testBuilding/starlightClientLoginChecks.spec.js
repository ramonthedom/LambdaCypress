/// BACKEND ///

// video for login session issue: https://www.youtube.com/watch?v=hOJ50rINCkA

// login
describe('Check StarlightMusic Client Sections', function () {

  beforeEach(() => {
    const user_email = "sqatesting.dl@gmail.com"
    const user_password = "SQATesting1553!$"
    const user_login_url = "https://www.starlightmusic.com"

    let myParams = {
      my_db: 'starlight',
      my_collection: 'clientOtpManager',
      my_id: '651239e2ce0c0935229dc3d5', // silverops user_id associated with OTP when OTP sent
      id_type: 'client' // or client
    };

    cy.login(user_email, user_password, user_login_url, myParams);
  })

  function checkAllImagesExist() {
    cy.get('img').each((img) => {
      cy.request(img.prop('src'))
        .its('status')
        .should('eq', 200)
    })
  }

  function checkBasicInfoSection() {
    cy.contains('.nav-link', 'Basic Info').should('exist').click().then(() => { // .nav-link containing "Finals" should exist, click it
      cy.contains('h3', ' pieces)').should('exist'); //h3 containing " pieces)" should exist
      cy.contains('.EventsComponent_download_text__1sHIG', 'Proposal').should('exist');
      cy.contains('.EventsComponent_download_text__1sHIG', 'Signed Contract').should('exist');
      cy.contains('h3', 'Upcoming Payments').should('exist'); //h3 containing "Upcoming Payments" should exist
      cy.contains('h3', 'Payment History').should('exist'); //h3 containing "Payment History" should exist
      cy.contains('p', 'Total Price:').should('exist');
      cy.get('.ant-table-content').find('tr').should('have.length.at.least', 1);

      checkAllImagesExist()
    })
  }

  function checkBasicInfoSectionWithNoPaymentsOrContract() {
    cy.contains('.nav-link', 'Basic Info').should('exist').click().then(() => { // .nav-link containing "Finals" should exist, click it
      cy.contains('h3', ' pieces)').should('exist'); //h3 containing " pieces)" should exist
      cy.contains('.EventsComponent_download_text__1sHIG', 'Proposal').should('exist');
      cy.contains('h3', 'Upcoming Payments').should('exist'); //h3 containing "Upcoming Payments" should exist
      cy.contains('h3', 'Payment History').should('exist'); //h3 containing "Payment History" should exist
      cy.contains('p', 'Total Price:').should('exist');

      checkAllImagesExist()
    })
  }

  function checkMyBandConfigurationSection() {
    cy.contains('.nav-link', 'My Band Configuration').should('exist').click().then(() => {
      cy.contains('h3', 'Band Configurations').should('exist'); // h3 containing "Band Configurations" should exist
      cy.contains('h5', 'How to?').should('exist');
      cy.contains('button', '+ Add Item').should('exist'); // button containing "Notify All" should exist

      // Segments
      cy.contains('h3', 'Segments').should('exist');
      cy.contains('th', 'Musicians').should('exist'); // th containing "Musicians" should exist

      // Band
      cy.contains('h3', 'Band').should('exist');
      cy.contains('th', 'Qty').should('exist'); // th containing "Musicians" should exist

      checkAllImagesExist()
    });
  }

  function checkDocumentsSection() {
    cy.contains('.nav-link', 'Documents').should('exist').click().wait(500).then(() => {
      cy.contains('h1', "Documents").should('exist');
      cy.contains('button', 'Upload File').should('exist');

      // check for documents
      cy.get('body').then(($body) => {
        // Check if the element for condition1 exists
        if ($body.find('.EventsComponent_contract_docoments__xDg6q').length > 0) {
          // Condition1 is met, so do nothing further
        } else {
          // Condition1 is not met, proceed to check condition2
          cy.contains('h4', 'No Documents available').should('exist');
        }
      });
      // cy.get('.EventsComponent_contract_docoments__xDg6q').should('have.length.at.least', 1);
      // cy.contain('h4', 'No Documents available').should('exist');

      checkAllImagesExist()
    });
  }

  function checkCommunicationSection() {
    cy.contains('.nav-link', 'Communication').should('exist').click().wait(500).then(() => {
      cy.contains('h1', "Activity").should('exist');

      cy.get('body').then(($body) => {
        // Check if the element for condition1 exists
        if ($body.find('.styles_aty-text-container__2E6pD').length > 0) {
          // Condition1 is met, so do nothing further
        } else {
          // Condition1 is not met, proceed to check condition2
          cy.contains('h4', 'No Activity available').should('exist');
        }
      });

      checkAllImagesExist()
    });
  }

  // FINALS SECTIONS

  /// wedding
  function checkWeddingFinalsSection() {
    // Event Info
    checkWeddingFinalsEventInfoSection()

    // Ceremony
    checkFinalsCeremonySection()

    // Special Songs
    checkFinalsSpecialSongsSection();

    // Blessings/Toast
    checkFinalsBlessingToastSection();

    // Song List
    checkFinalsSonglistSection();

    // Production
    checkFinalsProductionSection();

    // Timeline
    checkFinalsTimelineSection();
  }

  /// corporate
  function checkCorporateFinalsSection() {
    // Event Info
    checkCorporateFinalsEventInfoSection()

    // Blessings/Toast
    checkFinalsBlessingToastSection();

    // Song List
    checkFinalsSonglistSection();

    // Production
    checkFinalsProductionSection();

    // Timeline
    checkFinalsTimelineSection();
  }

  /// holiday
  function checkHolidayFinalsSection() {
    // Event Info
    checkHolidayFinalsEventInfoSection()

    // Blessings/Toast
    checkFinalsBlessingToastSection();

    // Song List
    checkFinalsSonglistSection();

    // Production
    checkFinalsProductionSection();

    // Timeline
    checkFinalsTimelineSection();
  }

  /// birthday
  function checkBirthdayFinalsSection() {
    // Event Info
    checkBirthdayFinalsEventInfoSection()

    // Blessings/Toast
    checkFinalsBlessingToastSection();

    // Song List
    checkFinalsSonglistSection();

    // Production
    checkFinalsProductionSection();

    // Timeline
    checkFinalsTimelineSection();
  }

  // function checkReviewsSection() {
  //   cy.contains('.nav-link', 'Reviews').should('exist').click().wait(500).then(() => {
  //     cy.contains('button', 'Add Review +').should('exist'); // button, Add Review +, should exist
  //     cy.contains('p', 'Rating').should('exist');
  //   });
  // }

  // EVENT INFO SECTIONS

  function checkWeddingFinalsEventInfoSection() {
    cy.contains('.Finals_finals_sidebar_title__1DQUZ', 'Event Info').should('exist').click().then(() => { // .finals_sidebar_title, 'Event Info', click it
      cy.contains('h3', 'Parents').should('exist'); // h3, 'Parents', should exist
      cy.contains('h3', 'Event planner').should('exist'); // h3, Event planner, should exist
      cy.contains('h3', 'Socials').should('exist'); // h3, Socials, should exist
      cy.contains('h3', 'Vendor Socials').should('exist'); // h3, Vendor Socials, should exist
      cy.contains('button', 'Save').should('exist');
    });
  }

  function checkCorporateFinalsEventInfoSection() {
    cy.contains('.Finals_finals_sidebar_title__1DQUZ', 'Event Info').should('exist').click().then(() => { // .finals_sidebar_title, 'Event Info', click it
      cy.contains('h3', 'Guest(s) Of Honor').should('exist'); // h3, 'Parents', should exist
      cy.contains('h3', 'Event planner').should('exist'); // h3, Event planner, should exist
      cy.contains('h3', 'Socials').should('exist'); // h3, Socials, should exist
      cy.contains('h3', 'Vendor Socials').should('exist'); // h3, Vendor Socials, should exist
      cy.contains('button', 'Save').should('exist');
    });
  }

  function checkHolidayFinalsEventInfoSection() {
    cy.contains('.Finals_finals_sidebar_title__1DQUZ', 'Event Info').should('exist').click().then(() => { // .finals_sidebar_title, 'Event Info', click it
      cy.contains('h3', 'Guest(s) Of Honor').should('exist'); // h3, 'Parents', should exist
      cy.contains('h3', 'Event planner').should('exist'); // h3, Event planner, should exist
      cy.contains('h3', 'Socials').should('exist'); // h3, Socials, should exist
      cy.contains('h3', 'Vendor Socials').should('exist'); // h3, Vendor Socials, should exist
      cy.contains('button', 'Save').should('exist');
    });
  }

  function checkBirthdayFinalsEventInfoSection() {
    cy.contains('.Finals_finals_sidebar_title__1DQUZ', 'Event Info').should('exist').click().then(() => { // .finals_sidebar_title, 'Event Info', click it
      cy.contains('h3', 'Guest(s) Of Honor').should('exist'); // h3, 'Parents', should exist
      cy.contains('h3', 'Event planner').should('exist'); // h3, Event planner, should exist
      cy.contains('h3', 'Socials').should('exist'); // h3, Socials, should exist
      cy.contains('h3', 'Vendor Socials').should('exist'); // h3, Vendor Socials, should exist
      cy.contains('button', 'Save').should('exist');
    });
  }

  function checkFinalsCeremonySection() {
    cy.contains('.Finals_finals_sidebar_title__1DQUZ', 'Ceremony').should('exist').click().then(() => {
      cy.get('.Finals_finals_main_container__2E4tK').find('.mb-3').should('have.length.greaterThan', 1); // .finals_main_container should contain more than 1 elemtent .mb-3
      cy.contains('.CeremonyComponent_finals_main_add_song_card__2Ntup', 'Click to add a song').should('exist');
      cy.contains('button', 'Save').should('exist');
    });
  }

  function checkFinalsSpecialSongsSection() {
    cy.contains('.Finals_finals_sidebar_title__1DQUZ', 'Special Songs').should('exist').click().then(() => {
      cy.get('.CeremonyComponent_ul_padding_none__Xpi_x').find('.mb-3').should('have.length.greaterThan', 1); // .finals_main_container should contain more than 1 elemtent .mb-3
      cy.contains('.CeremonyComponent_finals_main_add_song_card__2Ntup', 'Click to add a song').should('exist');
      cy.contains('button', 'Save').should('exist');
    });
  }

  function checkFinalsBlessingToastSection() {
    cy.contains('.Finals_finals_sidebar_title__1DQUZ', 'Blessing/Toast').should('exist').click().then(() => {
      cy.get('.Finals_finals_main_container__2E4tK').find('.mb-3').should('have.length.greaterThan', 1); // .finals_main_container should contain more than 1 elemtent .mb-3
      cy.contains('.CeremonyComponent_finals_main_add_song_card__2Ntup', 'Click to add a participant').should('exist');
      cy.contains('button', 'Save').should('exist');
    });
  }

  function checkFinalsSonglistSection() {
    cy.contains('.Finals_finals_sidebar_title__1DQUZ', 'Song List').should('exist').click().wait(500).then(() => {
      // cy.contains('.finals-request-song-heading', 'Requested Songs').should('exist'); // .finals-request-song-heading, Requested Songs, should exist
      cy.contains('.SongsFinalComponent_myBand_add_new_song_btn__1u8Uj', '+ Request a song').should('exist'); // a, Add a song +
      cy.contains('.SongsFinalComponent_songs_heading__1fPng', 'Band Songs').should('exist'); // .finals-request-song-heading, Band Songs
      cy.get('.SongsFinalComponent_myband_song_list_table__Tw8xm').find('tr').should('have.length.greaterThan', 1);
    });
  }

  function checkFinalsProductionSection() {
    cy.contains('.Finals_finals_sidebar_title__1DQUZ', 'Production').should('exist').click().then(() => {
      cy.contains('.mb-2', 'Venue Info').should('exist');
      cy.contains('button', 'Save').should('exist');
    });
  }

  function checkFinalsTimelineSection() {
    cy.contains('.Finals_finals_sidebar_title__1DQUZ', 'Timeline').should('exist').click().then(() => {
      cy.contains('h3', 'Timeline').should('exist'); // h3, Timeline, should exist
      cy.get('.TimelineComponent_timeline_events_container__16PSl').find('.TimelineComponent_timeline_card__31gmQ').should('have.length.greaterThan', 1);
      // cy.contains('button', 'Save').should('exist');
    });
  }

  function visitStarlightMusic() {
    cy.visit("https://www.starlightmusic.com/dashboard")
    cy.viewport(1728, 1000);
    console.log("LOGIN SUCCESS")
  }

  // ~~~~~~~~~~~~ //
  // 1. DASHBOARD //
  // ~~~~~~~~~~~~ //

  it('Dashboard should present correctly', function () {

    visitStarlightMusic()

    cy.contains('a', 'Dashboard').should('exist').click();
    cy.contains('.account-heading', 'Dashboard').should('exist');

    cy.contains('h3', 'Notifications').should('exist');
    cy.contains('h3', 'Recent activities').should('exist');

  })

  //~~~~~~~~~~~~~~~~~~~~~//
  // 3. SAVED PROPOSALS  //
  //~~~~~~~~~~~~~~~~~~~~~//

  it('Proposal section should present correctly', function () {

    visitStarlightMusic()

    cy.contains('a', 'Saved Proposals').should('exist').click();
    cy.contains('.account-heading', 'Saved Proposals').should('exist');

    cy.contains('h4', 'No proposals available').should('exist');

    // check events

  })

  //~~~~~~~~~~~~~~~~//
  // 4. CONTRACT //
  //~~~~~~~~~~~~~~~~//

  it('Contract section should present correctly', function () {

    visitStarlightMusic()

    cy.contains('a', 'Contract').should('exist').click();
    cy.contains('.account-heading', 'Contract').should('exist');

    cy.contains('h4', 'No contracts available').should('exist');

  })


  //~~~~~~~~~~~~~~//
  // 2. EVENTS //
  //~~~~~~~~~~~~~~//

  //~~~~~~~~~~~~~~//
  // WEDDING TYPE //
  //~~~~~~~~~~~~~~//


  it('WEDDING -- Events section should present correctly', function () {

    visitStarlightMusic()

    cy.contains('a', 'Events').should('exist').click();
    cy.contains('.account-heading', 'Events').should('exist');

    // check events

    // visit starlightmusic/events/64a6cf538ee20fd5284f176d
    // cy.visit("https://www.starlightmusic.com/events/651d7ece2de31dac7851c89e")
    // cy.visit("https://www.starlightmusic.com/events/63f3dc3823c68ed8a8f465a3") //RS 4/20/

    

    const sampleLiveWeddingEventId = "644e9aa95e392bcc8504eb4d" //RS 1/13/2024

    cy.visit("https://www.starlightmusic.com/events/" + sampleLiveWeddingEventId).then(() => {

      cy.contains('.event-detail-heading', 'Event Details').should('exist');

      //3.1 Basic Info
      checkBasicInfoSection()

      // 3.2. My Band Configuration
      checkMyBandConfigurationSection()

      // 3.3. Documents
      checkDocumentsSection()

      // 3.4. Communication
      checkCommunicationSection()

      // 3.5. Finals
      // checkFinalsSection()
      // 4.1.1.7 Finals
      cy.contains('.nav-link', 'Finals').should('exist').click().wait(500).wait(200).then(() => { // .nav-link containing "Finals" should exist, click it
        checkWeddingFinalsSection()
      })
    })
  })

  //~~~~~~~~~~~~~~//
  //   CORPORATE  //
  //~~~~~~~~~~~~~~//

  it('CORPORATE -- Events section should present correctly', function () {

    visitStarlightMusic()

    cy.contains('a', 'Events').should('exist').click();
    cy.contains('.account-heading', 'Events').should('exist');

    const testCorporateEventId = "651ec1319adb424aae8ee34b" // OX 11/04/2028 -- TEST EVENT

    cy.visit("https://www.starlightmusic.com/events/" + testCorporateEventId).wait(200).then(() => {

      cy.contains('.event-detail-heading', 'Event Details').should('exist');

      //3.1 Basic Info
      checkBasicInfoSectionWithNoPaymentsOrContract() // BECAUSE TEST EVENT

      // 3.2. My Band Configuration
      checkMyBandConfigurationSection()

      // 3.3. Documents
      checkDocumentsSection()

      // 3.4. Communication
      checkCommunicationSection()

      // 3.5. Finals
      cy.contains('.nav-link', 'Finals').should('exist').click().wait(500).then(() => { // .nav-link containing "Finals" should exist, click it
        checkCorporateFinalsSection()
      })
    })
  })

  //~~~~~~~~~~~~~~//
  //    HOLIDAY   //
  //~~~~~~~~~~~~~~//

  it('HOLIDAY -- Events section should present correctly', function () {

    visitStarlightMusic()

    cy.contains('a', 'Events').should('exist').click();
    cy.contains('.account-heading', 'Events').should('exist');

    const testHolidayEventId = "651ec1609adb424aae8ee7de" // BB 11/05/2028 -- TEST EVENT

    cy.visit("https://www.starlightmusic.com/events/" + testHolidayEventId).wait(200).then(() => {

      cy.contains('.event-detail-heading', 'Event Details').should('exist');

      //3.1 Basic Info
      checkBasicInfoSectionWithNoPaymentsOrContract() // BECAUSE TEST EVENT

      // 3.2. My Band Configuration
      checkMyBandConfigurationSection()

      // 3.3. Documents
      checkDocumentsSection()

      // 3.4. Communication
      checkCommunicationSection()

      // 3.5. Finals
      cy.contains('.nav-link', 'Finals').should('exist').click().wait(500).then(() => { // .nav-link containing "Finals" should exist, click it
        checkHolidayFinalsSection()
      })
    })
  })

  //~~~~~~~~~~~~~~//
  //    BIRTHDAY  //
  //~~~~~~~~~~~~~~//

  it('BIRTHDAY -- Events section should present correctly', function () {

    visitStarlightMusic()

    cy.contains('a', 'Events').should('exist').click();
    cy.contains('.account-heading', 'Events').should('exist');

    const testBirthdayEventId = "651ec1829adb424aae8eec30" // RS 11/06/2028 -- TEST EVENT

    cy.visit("https://www.starlightmusic.com/events/" + testBirthdayEventId).wait(200).then(() => {

      cy.contains('.event-detail-heading', 'Event Details').should('exist');

      //3.1 Basic Info
      checkBasicInfoSectionWithNoPaymentsOrContract() // BECAUSE TEST EVENT

      // 3.2. My Band Configuration
      checkMyBandConfigurationSection()

      // 3.3. Documents
      checkDocumentsSection()

      // 3.4. Communication
      checkCommunicationSection()

      // 3.5 Finals
      cy.contains('.nav-link', 'Finals').should('exist').click().wait(500).then(() => { // .nav-link containing "Finals" should exist, click it
        checkBirthdayFinalsSection()
      })
    })
  })
});
