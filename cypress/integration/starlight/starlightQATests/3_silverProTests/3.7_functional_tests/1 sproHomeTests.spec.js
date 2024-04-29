/// <reference types="cypress" />

describe('Silver Pro Website Interactions', () => {

  beforeEach(() => {
    // Visit the Silver Pro website before each test
    cy.visit('https://www.silverproentertainment.com');
    cy.viewport(1728, 1000);
  });

  // ~~~~~~~~~~~~~~~~~ //
  // 1. HEADER BUTTONS // 
  // ~~~~~~~~~~~~~~~~~ //

  // CHECKED - UNCOMMENT WHEN READY
  it('check header buttons', () => {
    cy.get('a.Header_nav_link__3qapQ').contains('At Your Venue').should('have.attr', 'href', '/venues'); // Venues
    cy.get('a.Header_nav_link__3qapQ').contains('Browse Bands').should('have.attr', 'href', '/our-talent'); // Browse Bands
    cy.get('a.Header_nav_link__3qapQ').contains('Meet the Team').should('have.attr', 'href', '/meet-the-team'); // Meet The Team
    // cy.get('a.Header_nav_link__3qapQ').contains('Celebrities').should('have.attr', 'href', '/celebrities'); // Celebrities
    cy.get('a.Header_nav_link__3qapQ').then(($links) => {
      // Check if there is a link with text "Celebrities" or "Showcase"
      const isLinkPresent = [...$links].some(link => 
        link.innerText === 'Celebrities' || link.innerText === 'Showcase'
      );
      expect(isLinkPresent).to.be.true;
    });
    cy.get('a.Header_nav_link__3qapQ').contains('Contact Us').should('have.attr', 'href', '/contact'); // Contact Us
  })

  // CHECKED - UNCOMMENT WHEN READY
  // login buttons should result in h6 modal containing the text "New to Starlight Music"
  it('should ensure button "Login/Sign Up" is functioning correctly', () => {
    cy.get('#login-signup-btn').should('exist').click().wait(200).then(() => {
      cy.contains('p', 'New to Silver Pro Music').should('exist');
    })
  })

  // ~~~~~~~~~~~~~~~~~ //
  // 2. FOOTER BUTTONS //
  // ~~~~~~~~~~~~~~~~~ //

  // CHECKED - UNCOMMENT WHEN READY
  it('check footer buttons', () => {
    // Silver Pro
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Home').should('have.attr', 'href', '/');
    // cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('At Your Venue').should('have.attr', 'href', '/venues');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('FAQ').should('have.attr', 'href', '/faq');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Meet the team').should('have.attr', 'href', '/meet-the-team');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Celebrities').should('have.attr', 'href', '/celebrities');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('About us').should('have.attr', 'href', '/about-us');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Contact Us').should('have.attr', 'href', '/contact');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Credits').should('have.attr', 'href', '/credits');

    // Browse bands
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Blake Band').should('have.attr', 'href', '/the-blake-band-nyc-wedding-band');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('The Groove Shop').should('have.attr', 'href', '/the-groove-shop');
    // cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('The Party Shop').should('have.attr', 'href', '/the-party-shop');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('The Rhythm Shop').should('have.attr', 'href', '/the-rhythm-shop');

    /// Social Media buttons
    cy.get('.d-flex > :nth-child(1) > .img_btn').should('have.attr', 'href', 'https://www.instagram.com/silverproentertainment/');
    cy.get('.d-flex > :nth-child(2) > .img_btn').should('have.attr', 'href', 'https://www.facebook.com/SilverProEntertainment');
  })

  // ~~~~~~~~~~~~~~~~~ //
  // 3. MIDDLE BUTTONS //
  // ~~~~~~~~~~~~~~~~~ //

  // THIS WORKS
  // pricing button
  it('check BIG pricing button', () => {
    cy.contains('.Header_main_header_big_availability_btn__4sb-h', "Click Here To See").should('exist').click({force: true});
    cy.contains('.modal-body > .Header_search_box__1hIlx > .Header_search_box_field_wrapper__3dYrn > #search-date-input > .Header_search_box_field_label__39vc0', 'Date of Event').should('exist');
  })

  // THIS WORKS
  // Play now
  it('Play button works', () => {
    cy.contains('.FeaturedVideoComponent_featured_video_content_btn__3sjgU', 'Play Now').should('exist').click({force: true}).wait(200).then(() => {
      cy.contains('.FeaturedVideoComponent_featured_video_content_btn__3sjgU', 'Pause').should('exist');
    })
  })

  // THIS WORKS
  // prev button
  it('Previous/Next buttons should work', () => {
    cy.get('div.slick-slide.slick-active.slick-current').first().should('have.attr', 'data-index', '0');
    cy.get('.FeaturedVideoComponent_featured_video_slider__UhCeB').find('.slick-prev').click({
      force: true
    });
    cy.wait(200);
    cy.get('.FeaturedVideoComponent_featured_video_slider__UhCeB').find('.slick-current').should('have.attr', 'data-index', '4');
    cy.get('.FeaturedVideoComponent_featured_video_slider__UhCeB').find('.slick-next').click({
      force: true
    });
    cy.wait(200);
    cy.get('.FeaturedVideoComponent_featured_video_slider__UhCeB').find('.slick-current').should('have.attr', 'data-index', '0');
  })

  // THIS WORKS
  // More Band Videos
  it('More Bands video button should work', () => {
    cy.contains(".FeaturedVideoComponent_more_band_btn__3_AJU", "More Band Videos").should("exist").click({force: true}).wait(1000).then(() => {
      cy.url().should('eq', 'https://www.silverproentertainment.com/our-talent')
    })
  })

  // THIS WORKS
  // About starlight button
  it('About Starlight button should work', () => {
    cy.contains(".AboutUsComponent_know_more_btn__QEIZD", "About Silver Pro").should("exist").click({force: true}).wait(1000).then(() => {
      cy.url().should('eq', 'https://www.silverproentertainment.com/about-us')
    })
  })

  // THIS WORKS
  // Hightlighs - buttons
  it('Highlights previous and next buttons should work', () => {
    cy.contains('.TestimonialComponent_testimonial_slide_content_heading__3ZrRl', 'Kevin Hart and Eniko Parrish').should('exist');
    cy.get('.TestimonialComponent_testimonial_slider__2Cq7r').find('.slick-prev').click({
      force: true
    });
    cy.wait(200);
    cy.contains('.TestimonialComponent_testimonial_slide_content_heading__3ZrRl', 'Evan and Flo Rida').should('exist');
    cy.get('.TestimonialComponent_testimonial_slider__2Cq7r').find('.slick-next').click({
      force: true
    });
    cy.wait(200);
    cy.contains('.TestimonialComponent_testimonial_slide_content_heading__3ZrRl', 'Kevin Hart and Eniko Parrish').should('exist');
  })

  // THIS WORKS //
  // IG Feed
  it('IG Feed should be active', () => {
    cy.contains('p', 'the access token is not valid').should('not.exist');
  })

  // THIS WORKS
  // see more button
  it('IG See More Button should work', () => {
    cy.contains('a', 'See More').should('have.attr', 'href', 'https://www.instagram.com/silverproentertainment'); //IG
  })

  // THIS WORKS //
  // Get In Touch button
  it('Get In Touch Button should work', () => {
    cy.contains('.GetInTouchComponent_getintouch_section_btn__1cgml', 'Get In Touch').should('exist').click().wait(1000).then(() => {
      cy.url().should('eq', 'https://www.silverproentertainment.com/contact')
    })
  })

  // ~~~~~~~~~~~~~~~~~ //
  // 4. HEADER BUTTONS //
  // ~~~~~~~~~~~~~~~~~ //

  /// home button
  // CHECKED - UNCOMMENT WHEN READY
  it('Home buttom should scroll user to top', () => {
    cy.contains('a', 'At Your Venue').should('be.visible');
    cy.scrollTo('bottom');
    cy.wait(500);
    cy.contains('a', 'At Your Venue').should('not.be.visible');
    cy.get('.Header_main_logo__Z92SE:nth-child(1) > .Header_header_logo__2cVOB').click();
    cy.wait(500);
    cy.contains('a', 'At Your Venue').should('be.visible');
  })

  // click here for pricing
  // CHECKED - UNCOMMENT WHEN READY
  it('check header pricing button', () => {
    cy.scrollTo('bottom');
    cy.wait(500);
    cy.get('#littleSearchLabel').click();
    cy.get('.ant-select-selector').click();
    cy.get('.Header_info_icon__Akgjo > img').click();
    cy.contains('.ant-tooltip-inner','We need this basic information in order to retrieve availability and to calculate pricing.').should('be.visible');
  })

  // schedule a zoom
  // CHECKED - UNCOMMENT WHEN READY
  it('check header schedule a zoom button', () => {
    cy.scrollTo('bottom');
    cy.wait(500);
    cy.get('#book-a-demo-btn').contains('Schedule a Zoom').should('exist').click().wait(200).then(() => {
      cy.get('.calendly-inline-widget > iframe').should('exist')
    })
  })

  // ~~~~~~~~~~~~~~~~~~~~ //
  // 5. HAMBURGER BUTTONS //
  // ~~~~~~~~~~~~~~~~~~~~ //

  // CHECKED - UNCOMMENT WHEN READY
  it('check hamburger menu items', () => {
    cy.scrollTo('bottom');
    cy.wait(500);
    cy.get('#dropdown-basic').should('exist').click();
    cy.get('a.text-dark.Header_nav_link__3qapQ').contains('Home').should('have.attr', 'href', '/'); //Home
    cy.get('a.text-dark.Header_nav_link__3qapQ').contains('At Your Venue').should('have.attr', 'href', '/venues'); //Our Talent
    cy.get('a.text-dark.Header_nav_link__3qapQ').contains('Meet the Team').should('have.attr', 'href', '/meet-the-team'); //Meet the Team
    cy.get('a.text-dark.Header_nav_link__3qapQ').contains('Celebrities').should('have.attr', 'href', '/celebrities'); //Celebrities
    cy.get('a.text-dark.Header_nav_link__3qapQ').contains('About Us').should('have.attr', 'href', '/our-talent'); //About Us
    cy.get('a.text-dark.Header_nav_link__3qapQ').contains('Contact Us').should('have.attr', 'href', '/contact'); //Contact Us
    cy.get('a.text-dark.Header_nav_link__3qapQ').contains('FAQ').should('have.attr', 'href', '/faq'); //FAQ  
  })

  // CHECKED - UNCOMMENT WHEN READY
  it('check hamburger schedule a zoom button', () => {
    cy.scrollTo('bottom');
    cy.wait(500);
    cy.get('#dropdown-basic').should('exist').click();
    cy.get('a.text-dark.Header_nav_link__3qapQ.Header_checkLink__2KnJq').contains('Schedule a Zoom').should('exist').click().wait(200).then(() => {
      cy.get('.calendly-inline-widget > iframe').should('exist')
    })
  })

  // CHECKED - UNCOMMENT WHEN READY
  it('check hamburger login button', () => {
    cy.scrollTo('bottom');
    cy.wait(500);
    cy.get('#dropdown-basic').should('exist').click();
    cy.get('a.Header_menu_dropdown_auth__1pnut.dropdown-item').contains('Login / Sign Up').should('exist').click().wait(200).then(() => {
      cy.contains('p', 'New to Silver Pro Music').should('exist');
    });
  })

});