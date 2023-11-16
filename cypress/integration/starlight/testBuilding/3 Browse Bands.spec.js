describe('Starlight Music Website Interactions', () => {

    beforeEach(() => {
      // Visit the Starlight Music website before each test
      cy.visit('https://www.starlightmusic.com');
    });
  
    // Header buttons
    it('should find the FAQ link and verify it has the correct href', () => {
      cy.get('a.Header_nav_link__3qapQ').contains('FAQ').should('have.attr', 'href', '/faq');
    });
  
    it('should find the Browse Bands link and verify it has the correct href', () => {
      cy.get('a.Header_nav_link__3qapQ').contains('Browse Bands').should('have.attr', 'href', '/our-talent');
    });
  
    it('should find the Meet the Team link and verify it has the correct href', () => {
      cy.get('a.Header_nav_link__3qapQ').contains('Meet the Team').should('have.attr', 'href', '/meet-the-team');
    });
  
    it('should find the Celebrities link and verify it has the correct href', () => {
      cy.get('a.Header_nav_link__3qapQ').contains('Celebrities').should('have.attr', 'href', '/celebrities');
    });
  
    it('should find the Contact Us link and verify it has the correct href', () => {
      cy.get('a.Header_nav_link__3qapQ').contains('Contact Us').should('have.attr', 'href', '/contact-us');
    });

    /// Footer buttons

    // home

    // faq

    // meet the team

    // celebrities

    // about us

    // contact us

    // out talent

    // credits

    // acoustic guitar ensemble

    // blake band

    //DJ Kristaval
    //Fleur Seule
    //Latin - Acoustic Guitar
    //MC Mike D.
    //Onyx
    //Rock and Soul
    //Star Power
    //Starlight Orchestra
    //String Performers (E.V.E)
    //The Starlight Experience
    // White Light

    /// Social Media buttons

    //// Insta
    //// Facebook
    //// linkdin

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
  
  });
  