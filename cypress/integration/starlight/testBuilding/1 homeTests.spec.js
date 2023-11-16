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
    // Header buttons
    // it('should find the FAQ link and verify it has the correct href', () => {
    //   cy.get('a.Header_nav_link__3qapQ').contains('FAQ').should('have.attr', 'href', '/faq'); //FAQ
    // });
  
    // it('should find the Browse Bands link and verify it has the correct href', () => {
    //   cy.get('a.Header_nav_link__3qapQ').contains('Browse Bands').should('have.attr', 'href', '/our-talent'); // Browse Bands
    // });
  
    // it('should find the Meet the Team link and verify it has the correct href', () => {
    //   cy.get('a.Header_nav_link__3qapQ').contains('Meet the Team').should('have.attr', 'href', '/meet-the-team'); // Meet The Team
    // });
  
    // it('should find the Celebrities link and verify it has the correct href', () => {
    //   cy.get('a.Header_nav_link__3qapQ').contains('Celebrities').should('have.attr', 'href', '/celebrities'); // Celebrities
    // });
  
    // it('should find the Contact Us link and verify it has the correct href', () => {
    //   cy.get('a.Header_nav_link__3qapQ').contains('Contact Us').should('have.attr', 'href', '/contact-us'); // Contact Us
    // });

    // login buttons should result in h6 modal containing the text "New to Starlight Music"
    it('should ensure button "Login/Sign Up" is functioning correctly', () => {
      cy.get('#login-signup-btn').should('exist').click().wait(200).then(() => {
        cy.contains('p', 'New to Starlight Music').should('exist');
      })
    })

    // ~~~~~~~~~~~~~~~~~ //
    // 2. FOOTER BUTTONS //
    // ~~~~~~~~~~~~~~~~~ //

    /// Footer buttons
    // footer Home button should exist
    it('footer home button should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Home').should('have.attr', 'href', '/');
    })

    // footer FAQ button should exist
    it('footer FAQ button should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('FAQ').should('have.attr', 'href', '/faq');
    })

    // meet the team
    it('footer Meet The Team button should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Meet the Team').should('have.attr', 'href', '/meet-the-team');
    })

    // celebrities
    it('footer Celebrities button should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Celebrities').should('have.attr', 'href', '/celebrities');
    })

    // about us
    it('footer About Us button should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('About Us').should('have.attr', 'href', '/about-us');
    })

    // contact us
    it('footer Contact Us button should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Contact Us').should('have.attr', 'href', '/contact-us');
    })

    // out talent
    it('footer Our Talent button should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Our Talent').should('have.attr', 'href', '/our-talent');
    })

    // credits
    it('footer Credits button should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Credits').should('have.attr', 'href', '/credits');
    })

    // Browse bands
    /// acoustic guitar ensemble
    it('Acoustic Guitar Ensemble link should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Acoustic Guitar Ensemble').should('have.attr', 'href', '/band/acoustic-guitar-ensembles');
    })

    /// blake band
    it('Blake Band link should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Blake Band').should('have.attr', 'href', '/band/the-blake-band-nyc-wedding-band');
    })

    /// DJ Kristaval
    it('DJ Kristaval link should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('DJ Kristaval').should('have.attr', 'href', '/band/dj-kristaval-nyc-celebrity-disc-jockey');
    })

    /// Fleur Seule
    it('Fleur Seule link should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Fleur Seule').should('have.attr', 'href', '/band/fleur-seule');
    })

    /// Latin - Acoustic Guitar
    it('Latin - Acoustic Guitar link should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Latin - Acoustic Guitar').should('have.attr', 'href', '/band/latin---acoustic-guitar');
    })

    /// MC Mike D.
    it('MC Mike D. link should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('MC Mike D.').should('have.attr', 'href', '/band/mc-mike-d');
    })

    /// Onyx
    it('Onyx link should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Onyx').should('have.attr', 'href', '/band/onyx-nyc-wedding-band');
    })

    /// Rock and Soul
    it('Rock and Soul link should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Rock and Soul').should('have.attr', 'href', '/band/rock-and-soul-nyc-premiere-wedding-band');
    })    

    /// Star Power
    it('Star Power link should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Star Power').should('have.attr', 'href', '/band/star-power-nyc-wedding-band');
    })

    /// Starlight Orchestra
    it('Starlight Orchestra link should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('Starlight Orchestra').should('have.attr', 'href', '/band/starlight-orchestra-corporate-events-and-nyc-weddings');
    })

    /// String Performers (E.V.E)
    it('String Performers (E.V.E) link should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('String Performers (E.V.E)').should('have.attr', 'href', '/band/string-performers-eve-nyc-wedding-corporate-musicians');
    })

    /// The Starlight Experience
    it('The Starlight Experience link should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('The Starlight Experience').should('have.attr', 'href', '/band/the-starlight-experience');
    })

    /// White Light
    it('White Light link should work', () => {
      cy.get('a.FooterNavComponent_footernav_heading_text__m4X1F').contains('White Light').should('have.attr', 'href', '/band/white-light-nyc-wedding-band');
    })

    /// Social Media buttons
    //// Insta
    it('should verify Instagram link', () => {
      // Replace 'specific-alt-text' with the actual alt text and '/expected-href' with the actual href value
      cy.get('a.img_btn') // Selects the `a` element with the class 'img_btn'
        .find('img[alt="instagram"]') // Finds the `img` with the specific 'alt' attribute
        .parent() // Goes up to the `a` element that is the parent of the `img`
        .should('have.attr', 'href', 'https://www.instagram.com/starlightmusicnyc'); // Checks that the `a` element has the correct 'href' attribute value
    });

    //// Facebook
    it('should verify Facebook link', () => {
      // Replace 'specific-alt-text' with the actual alt text and '/expected-href' with the actual href value
      cy.get('a.img_btn') // Selects the `a` element with the class 'img_btn'
        .find('img[alt="facebook"]') // Finds the `img` with the specific 'alt' attribute
        .parent() // Goes up to the `a` element that is the parent of the `img`
        .should('have.attr', 'href', 'https://www.facebook.com/starlightmusicnyc'); // Checks that the `a` element has the correct 'href' attribute value
    });


    //// linkdin
    it('should verify Linkedin link', () => {
      // Replace 'specific-alt-text' with the actual alt text and '/expected-href' with the actual href value
      cy.get('a.img_btn') // Selects the `a` element with the class 'img_btn'
        .find('img[alt="linkedin"]') // Finds the `img` with the specific 'alt' attribute
        .parent() // Goes up to the `a` element that is the parent of the `img`
        .should('have.attr', 'href', 'https://www.linkedin.com/company/starlightmusic'); // Checks that the `a` element has the correct 'href' attribute value
    });

    // ~~~~~~~~~~~~~~~~~ //
    // 2. FOOTER BUTTONS //
    // ~~~~~~~~~~~~~~~~~ //

    /// Middle

    // Play now

    // prev button

    // next button
  
    // More Band Videos

    // About starlight button

    // Go button

    // Prev button

    // Next button

    /// Hightlighs

    // prev buttons

    // next buttons

    // IG Feed

    // feed active

    // see more button

    // Cities buttons

    // Get In Touch button

    // 
    // Assuming that the buttons follow a similar pattern
    it('should ensure button "Login/Sign Up" is functioning correctly', () => {
      cy.get('button.Header_nav_link__3qapQ').contains('Login/Sign Up').should('be.visible').and('be.enabled');
    });
  
    it('should ensure button "Click Here for Pricing" is functioning correctly', () => {
      cy.get('button.Header_nav_link__3qapQ').contains('Click Here for Pricing').should('be.visible').and('be.enabled');
    });

    // scroll down, top menu

    /// home

    /// click here for pricing

    /// schedule a zoom

    /// hamburger menu

    //// hi
    //// home
    //// our talent
    //// meet the team
    //// celebrities
    //// about us
    //// contact us
    //// FAQ
    //// Schedule a zoom
    //// my account
  
  });
  