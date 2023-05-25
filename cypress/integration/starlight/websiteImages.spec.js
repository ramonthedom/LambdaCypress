describe('Checking for broken images on Starlight Music pages', () => {
    const mainPagesToCheck = [
      '/',
      '/our-talent',
      '/about-us',
      '/celebrities',
      '/contact-us',
      '/credits',
      '/faq',
      '/meet-the-team',
      '/privacy-polices',
      '/terms-and-conditions'
    ];

    const bandPagesToCheck = [
      '/band/acoustic-guitar-ensembles',
      '/band/dj-kristaval-nyc-celebrity-disc-jockey',
      '/band/fleur-seule',
      '/band/latin---acoustic-guitar',
      '/band/star-power-nyc-wedding-band',
      '/band/the-blake-band-nyc-wedding-band',
      '/band/the-starlight-experience',
      '/band/white-light-nyc-wedding-band'
    ]

    const cityPagesToCheck = [
      '/cities/aspen-wedding-bands',
      '/cities/boca-raton-wedding-bands',
      '/cities/boston-wedding-bands',
      '/cities/chicago-wedding-bands',
      '/cities/dallas-wedding-bands',
      '/cities/denver-wedding-bands',
      '/cities/detroit-wedding-bands',
      '/cities/houston-wedding-bands',
      '/cities/las-vegas-wedding-bands',
      '/cities/los-angeles-wedding-bands',
      '/cities/maine-wedding-bands',
      '/cities/mexico-wedding-bands',
      '/cities/miami-wedding-bands',
      '/cities/newport-ri-wedding-bands',
      '/cities/palm-beach-wedding-bands',
      '/cities/philadelphia-wedding-bands',
      '/cities/pittsburgh-wedding-bands',
      '/cities/san-francisco-wedding-bands',
      '/cities/st-louis-wedding-bands',
      '/cities/the-hamptons-wedding-bands',
      '/cities/vermont-wedding-bands',
      '/cities/washington-dc-wedding-bands',
    ];


  
    mainPagesToCheck.forEach((page) => {
      context(`On main page ${page}`, () => {
        it('should not have any broken images', () => {
          cy.visit(`https://www.starlightmusic.com${page}`);
          cy.get('img').each((img) => {
            cy.request(img.prop('src'))
              .its('status')
              .should('eq', 200);
          });
        });
      });
    });

    bandPagesToCheck.forEach((page) => {
      context(`On band page ${page}`, () => {
        it('should not have any broken images', () => {
          cy.visit(`https://www.starlightmusic.com${page}`);
          cy.get('img').each((img) => {
            cy.request(img.prop('src'))
              .its('status')
              .should('eq', 200);
          });
        });
      });
    });

    cityPagesToCheck.forEach((page) => {
      context(`On city page ${page}`, () => {
        it('should not have any broken images', () => {
          cy.visit(`https://www.starlightmusic.com${page}`);
          cy.get('img').each((img) => {
            cy.request(img.prop('src'))
              .its('status')
              .should('eq', 200);
          });
        });
      });
    });

  });