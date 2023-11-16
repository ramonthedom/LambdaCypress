import {
  expect
} from "chai";

describe('Starlight Music Website Interactions', () => {

  beforeEach(() => {
    // Visit the Starlight Music website before each test
    cy.visit('https://www.starlightmusic.com');
  });

  // ~~~~~~~~~~~~~~~~~ //
  // 1. HEADER BUTTONS //
  // ~~~~~~~~~~~~~~~~~ //

  it('check header buttons', () => {
    cy.get('a.Header_nav_link__3qapQ').contains('FAQ').should('have.attr', 'href', '/faq'); //FAQ
    cy.get('a.Header_nav_link__3qapQ').contains('Browse Bands').should('have.attr', 'href', '/our-talent'); // Browse Bands
    cy.get('a.Header_nav_link__3qapQ').contains('Meet the Team').should('have.attr', 'href', '/meet-the-team'); // Meet The Team
    cy.get('a.Header_nav_link__3qapQ').contains('Celebrities').should('have.attr', 'href', '/celebrities'); // Celebrities
    cy.get('a.Header_nav_link__3qapQ').contains('Contact Us').should('have.attr', 'href', '/contact-us'); // Contact Us
  })

  // login buttons should result in h6 modal containing the text "New to Starlight Music"
  it('should ensure button "Login/Sign Up" is functioning correctly', () => {
    cy.get('#login-signup-btn').should('exist').click().wait(200).then(() => {
      cy.contains('p', 'New to Starlight Music').should('exist');
    })
  })

  // ~~~~~~~~~~~~~~~~~ //
  // 2. FOOTER BUTTONS //
  // ~~~~~~~~~~~~~~~~~ //
  it('check footer buttons', () => {

    // Starlight
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Home').should('have.attr', 'href', '/');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('FAQ').should('have.attr', 'href', '/faq');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Meet the team').should('have.attr', 'href', '/meet-the-team');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Celebrities').should('have.attr', 'href', '/celebrities');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('About Us').should('have.attr', 'href', '/about-us');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Contact Us').should('have.attr', 'href', '/contact-us');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Our Talent').should('have.attr', 'href', '/our-talent');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Credits').should('have.attr', 'href', '/credits');

    // Browse bands
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Acoustic Guitar Ensemble').should('have.attr', 'href', '/band/acoustic-guitar-ensembles');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Blake Band').should('have.attr', 'href', '/band/the-blake-band-nyc-wedding-band');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('DJ Kristaval').should('have.attr', 'href', '/band/dj-kristaval-nyc-celebrity-disc-jockey');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Fleur Seule').should('have.attr', 'href', '/band/fleur-seule');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Latin - Acoustic Guitar').should('have.attr', 'href', '/band/latin---acoustic-guitar');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('MC Mike D.').should('have.attr', 'href', '/band/mc-mike-d');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Onyx').should('have.attr', 'href', '/band/onyx-nyc-wedding-band');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Rock and Soul').should('have.attr', 'href', '/band/rock-and-soul-nyc-premiere-wedding-band');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Star Power').should('have.attr', 'href', '/band/star-power-nyc-wedding-band');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Starlight Orchestra').should('have.attr', 'href', '/band/starlight-orchestra-corporate-events-and-nyc-weddings');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('String Performers (E.V.E)').should('have.attr', 'href', '/band/string-performers-eve-nyc-wedding-corporate-musicians');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('The Starlight Experience').should('have.attr', 'href', '/band/the-starlight-experience');
    cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('White Light').should('have.attr', 'href', '/band/white-light-nyc-wedding-band');

    /// Social Media buttons
    cy.get('a.img_btn')
      .find('img[alt="instagram"]')
      .parent()
      .should('have.attr', 'href', 'https://www.instagram.com/starlightmusicnyc');

    cy.get('a.img_btn')
      .find('img[alt="facebook"]')
      .parent()
      .should('have.attr', 'href', 'https://www.facebook.com/starlightmusicnyc');

    cy.get('a.img_btn')
      .find('img[alt="linkedin"]')
      .parent()
      .should('have.attr', 'href', 'https://www.linkedin.com/company/starlightmusic');

  })

  // ~~~~~~~~~~~~~~~~~ //
  // 3. MIDDLE BUTTONS //
  // ~~~~~~~~~~~~~~~~~ //

  // pricing button
  it('check BIG pricing button', () => {
    cy.get('.Header_main_header_big_availability_btn__4sb-h').should('exist').click().wait(200).then(() => {
      cy.get('section.d-flex align-items-center Header_search_box__1hIlx').should('exist');
    })
  })

  // Play now
  it('Play button works', () => {
    cy.contains('button.FeaturedVideoComponent_featured_video_content_btn__3sjgU', 'Play Now').should('exist').click().wait(200).then(() => {
      cy.contains('button.FeaturedVideoComponent_featured_video_content_btn__3sjgU', 'Pause').should('exist');
    })
  })

  // prev button
  it('Previous/Next buttons should work', () => {
    //start point
    cy.get('div.slick-slide.slick-active.slick-current').should('have.attr', 'data-index', '0');
    cy.get("button.slick-arrow.slick-prev")[0].click().wait(200).then(() => {
      cy.get('div.slick-slide.slick-active.slick-current').should('have.attr', 'data-index', '5');
      cy.get("button.slick-arrow.slick-next")[0].click().wait(200).then(() => {
        cy.get('div.slick-slide.slick-active.slick-current').should('have.attr', 'data-index', '0');
      })
    })
  })


  // More Band Videos
  it('More Bands video button should work', () => {
    cy.contains("button.ant-btnFeaturedVideoComponent_more_band_btn__3_AJU", "More Band Videos").should("exist").click().wait(500).then(() => {
      cy.url().should('eq', 'https://www.starlightmusic.com/our-talent')
    })
  })

  // About starlight button
  it('About Starlight button should work', () => {
    cy.contains("button.AboutUsComponent_know_more_btn__QEIZD", "About Starlight").should("exist").click().wait(500).then(() => {
      cy.url().should('eq', 'https://www.starlightmusic.com/about-us')
    })
  })

  // Go button
  it('Cities GO button should work', () => {
    cy.get("d-inline-flex align-items-center justify-content-center img_btn.TopCitiesComponent_top_cities_main_slide_icon__1Ceel").should("exist").click().wait(500).then(() => {
      cy.url().should('eq', 'https://www.starlightmusic.com/cities/aspen-wedding-bands')
    })
  })

  // Cities - buttons
  it('Cities previous and next buttons should work', () => {
    cy.contains('.TopCitiesComponent_top_cities_main_slide_heading__3-kHS', 'Aspen').should('exist');
    cy.get("button.slick-arrow.slick-prev")[1].click().wait(200).then(() => {
      cy.contains('.TopCitiesComponent_top_cities_main_slide_heading__3-kHS', 'Washington').should('exist');

      cy.get("button.slick-arrow.slick-next")[1].click().wait(200).then(() => {
        cy.contains('.TopCitiesComponent_top_cities_main_slide_heading__3-kHS', 'Aspen').should('exist');
      })
    })
  })

  /// Hightlighs - buttons
  it('Highlights previous and next buttons should work', () => {
    cy.contains('.TestimonialComponent_testimonial_slide_content_heading__3ZrRl', 'Kevin Hart and Eniko Parrish').should('exist');
    cy.get("button.slick-arrow.slick-prev")[2].click().wait(200).then(() => {
      cy.contains('.TestimonialComponent_testimonial_slide_content_heading__3ZrRl', 'Evan and Flo Rida').should('exist');

      cy.get("button.slick-arrow.slick-next")[2].click().wait(200).then(() => {
        cy.contains('.TestimonialComponent_testimonial_slide_content_heading__3ZrRl', 'Kevin Hart and Eniko Parrish').should('exist');
      })
    })
  })

  // IG Feed
  it('IG Feed should be active', () => {
    cy.contains('p', 'the access token is not valid').should('not.exist');
  })

  // see more button
  it('IG See More Button should work', () => {
    cy.contains('.ant-btn.feeds-btn', 'See More').find('a').should('have.attr', 'href', 'https://www.instagram.com/starlightmusicnyc'); //IG
  })

  // Cities buttons
  it('Aspen Button should work', () => {
    cy.contains('a.RecentCitiesComponent_recent_cities_list_items__1n16d', 'Aspen').should('have.attr', 'href', '/cities/aspen-wedding-bands'); //Aspen 
  })

  // Get In Touch button
  it('Get In Touch Button should work', () => {
    cy.contains('.GetInTouchComponent_getintouch_section_btn__1cgml', 'Get In Touch').should('exist').click().wait(500).then(() => {
      cy.url().should('eq', 'https://www.starlightmusic.com/contact-us')
    })
  })

  // ~~~~~~~~~~~~~~~~~ //
  // 4. HEADER BUTTONS //
  // ~~~~~~~~~~~~~~~~~ //

  /// home button
  it('Home buttom should scroll user to top', () => {
    cy.get('a.Header_main_logo__Z92SE')
      .find('img[src="/assets/logos/BlueStarlightMusic-Logo-CMYK-Horizontal-highres-transparent.png"]')
      .parent()
      .click()
      .wait(200)
      .then(() => {
        cy.window().then((win) => {
          expect(win.scrollY.to.equal(0));
        })
      })
  })

  /// click here for pricing
  it('check header pricing button', () => {
    cy.contains('button.d-flex align-items-center.Header_nav_section_search_mini_btn__2MjOH').should('exist').click().wait(200).then(() => {
      cy.get('section.d-flex align-items-center Header_search_box__1hIlx').should('exist');
    })
  })

  /// schedule a zoom
  it('check header schedule a zoom button', () => {
    cy.scrollTo('bottom');
    cy.wait(500);

    cy.get('#book-a-demo-btn').contains('Schedule a Zoom').should('exist').click().wait(200).then(() => {
      cy.get('div.lmtWIHO_gkbTeeyuvoJC.sbRR6Vj9cBntcZ6P4tOo').should('exist');
    })
  })

  // ~~~~~~~~~~~~~~~~~~~~ //
  // 5. HAMBURGER BUTTONS //
  // ~~~~~~~~~~~~~~~~~~~~ //

  it('check hamburger menu items', () => {
    cy.scrollTo('bottom');
    cy.wait(500);
    cy.get('#dropdown-basic').should('exist').click();

    //// hi
    cy.get('a.text-dark.Header_nav_link__3qapQ').contains('Home').should('have.attr', 'href', '/'); //Home
    cy.get('a.text-dark.Header_nav_link__3qapQ').contains('Our Talent').should('have.attr', 'href', '/our-talent'); //Our Talent
    cy.get('a.text-dark.Header_nav_link__3qapQ').contains('Meet the Team').should('have.attr', 'href', '/meet-the-team'); //Meet the Team
    cy.get('a.text-dark.Header_nav_link__3qapQ').contains('Celebrities').should('have.attr', 'href', '/celebrities'); //Celebrities
    cy.get('a.text-dark.Header_nav_link__3qapQ').contains('About Us').should('have.attr', 'href', '/about-us'); //About Us
    cy.get('a.text-dark.Header_nav_link__3qapQ').contains('Contact Us').should('have.attr', 'href', '/contact-us'); //Contact Us
    cy.get('a.text-dark.Header_nav_link__3qapQ').contains('FAQ').should('have.attr', 'href', '/faq'); //FAQ  
  })

  it('check hamburger schedule a zoom button', () => {
    cy.scrollTo('bottom');
    cy.wait(500);
    cy.get('#dropdown-basic').should('exist').click();

    cy.get('a.text-dark.Header_nav_link__3qapQ.Header_checkLink__2KnJq').contains('Schedule a Zoom').should('exist').click().wait(200).then(() => {
      cy.get('div.lmtWIHO_gkbTeeyuvoJC.sbRR6Vj9cBntcZ6P4tOo').should('exist');
    })
  })

  it('check hamburger login button', () => {
    cy.scrollTo('bottom');
    cy.wait(500);
    cy.get('#dropdown-basic').should('exist').click();

    cy.get('a.Header_menu_dropdown_auth__1pnut dropdown-item').contains('Login / Sign Up').should('exist').click().wait(200).then(() => {
      cy.contains('p', 'New to Starlight Music').should('exist');
    });
  })

});