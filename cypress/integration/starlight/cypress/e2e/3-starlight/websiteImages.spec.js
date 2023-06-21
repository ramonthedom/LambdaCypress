describe('Checking for broken images on Starlight Music pages', function () {
  const pagesToCheck = [
    '/',
    '/band/onyx-nyc-wedding-band',
    '/band/rock-and-soul-nyc-premiere-wedding-band',
    '/band/starlight-orchestra-corporate-events-and-nyc-weddings',
    '/band/string-performers-eve-nyc-wedding-corporate-musicians',
    '/cities/aspen-wedding-bands',
    '/our-talent',
    //   '/about-us',
    //   '/band/acoustic-guitar-ensembles',
    //   '/band/dj-kristaval-nyc-celebrity-disc-jockey',
    //   '/band/fleur-seule',
    //   '/band/latin---acoustic-guitar',
    //   '/band/star-power-nyc-wedding-band',
    //   '/band/the-blake-band-nyc-wedding-band',
    //   '/band/the-starlight-experience',
    //   '/band/white-light-nyc-wedding-band',
    //   '/celebrities',
    //   '/cities/boca-raton-wedding-bands',
    //   '/cities/boston-wedding-bands',
    //   '/cities/chicago-wedding-bands',
    //   '/cities/dallas-wedding-bands',
    //   '/cities/denver-wedding-bands',
    //   '/cities/detroit-wedding-bands',
    //   '/cities/houston-wedding-bands',
    //   '/cities/las-vegas-wedding-bands',
    //   '/cities/los-angeles-wedding-bands',
    //   '/cities/maine-wedding-bands',
    //   '/cities/mexico-wedding-bands',
    //   '/cities/miami-wedding-bands',
    //   '/cities/newport-ri-wedding-bands',
    //   '/cities/palm-beach-wedding-bands',
    //   '/cities/philadelphia-wedding-bands',
    //   '/cities/pittsburgh-wedding-bands',
    //   '/cities/san-francisco-wedding-bands',
    //   '/cities/st-louis-wedding-bands',
    //   '/cities/the-hamptons-wedding-bands',
    //   '/cities/vermont-wedding-bands',
    //   '/cities/washington-dc-wedding-bands',
    //   '/contact-us',
    //   '/credits',
    //   '/faq',
    //   '/meet-the-team',
    //   '/privacy-polices',
    //   '/terms-and-conditions'
  ]

  pagesToCheck.forEach((page) => {
    context(`On page ${page}`, function () {
      it('should not have any broken images', function () {
        cy.visit(`https://www.starlightmusic.com${page}`)
        cy.get('img').each((img) => {
          cy.request(img.prop('src'))
              .its('status')
              .should('eq', 200)
        })
      })
    })
  })
})
