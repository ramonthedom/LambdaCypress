describe('Testing the venue commissions for Starlight Band Service', function () {
  // it('Blue Hill at Stone Barns commission should be greater than 0%', function () {
  // //   const url = baseUrl + bridgelogin
  //   const url = 'https://star-api.starlightmusic.com/starlightband/api/v1/band/619ea78bd9b171af1ce6e328/configurations/wedding/2029-10-11?latitude=41.1042276&longitude=-73.8285566&event_place=630%2BBedford%2BRd%2BTarrytown%2BNY%2B10591%2BUSA'

  //   cy.request('GET', url)
  //     .then((response) => {
  //         expect(response.status).to.eq(200)

  //         cy.log('Response: ' + JSON.stringify(response))
  //         expect(response.body.commission.totalCommission).to.be.greaterThan(0)
  //         expect(response.body.commission.venue).to.be.greaterThan(0)
  //         expect(response.body.commission.venueAdditional).to.be.greaterThan(0)

  //     })
  // })

  
  // Array of venues with their respective URLs
  const venues = [{
      "name": "Blue Hill at Stone Barns",
      "url": "https://star-api.starlightmusic.com/starlightband/api/v1/band/619ea78bd9b171af1ce6e328/configurations/wedding/2029-10-11?latitude=41.1042276&longitude=-73.8285566&event_place=630%2BBedford%2BRd%2BTarrytown%2BNY%2B10591%2BUSA"
    },
    {
      "name": "Bowery Hotel",
      "url": "https://star-api.starlightmusic.com/starlightband/api/v1/band/619ea78bd9b171af1ce6e328/configurations/wedding/2029-10-11?latitude=40.7260114&longitude=-73.9916125&event_place=335%2BBowery%2BNew%2BYork%2BNY%2B10003%2BUSA"
    },
    {
      "name": "Carnegie Hall",
      "url": "https://star-api.starlightmusic.com/starlightband/api/v1/band/619ea78bd9b171af1ce6e328/configurations/wedding/2029-10-11?latitude=40.7651258&longitude=-73.97992359999999&event_place=881%2B7th%2BAve%2BNew%2BYork%2BNY%2B10019%2BUSA"
    },
    {
      "name": "Chelsea Pier - Pier 60",
      "url": "https://star-api.starlightmusic.com/starlightband/api/v1/band/619ea78bd9b171af1ce6e328/configurations/wedding/2029-10-11?latitude=40.746645&longitude=-74.01005700000002&event_place=Pier%2B60%2BChelsea%2BPiers%2BNew%2BYork%2BNY%2B10011%2BUSA"
    },
    {
      "name": "Chelsea Pier-Lighthouse",
      "url": "https://star-api.starlightmusic.com/starlightband/api/v1/band/619ea78bd9b171af1ce6e328/configurations/wedding/2029-10-11?latitude=40.7477512&longitude=-74.01110179999999&event_place=The%2BLighthouse%2BPier%2B61%2BChelsea%2BPiers%2BNew%2BYork%2BNY%2B10011%2BUSA"
    },
    {
      "name": "Cipriani (East 42nd Street)",
      "url": "https://star-api.starlightmusic.com/starlightband/api/v1/band/619ea78bd9b171af1ce6e328/configurations/wedding/2029-10-11?latitude=40.7512893&longitude=-73.9771957&event_place=110%2BE%2B42nd%2BSt%2BNew%2BYork%2BNY%2B10017%2BUSA"
    },
    {
      "name": "Current- Chelsea Piers",
      "url": "https://star-api.starlightmusic.com/starlightband/api/v1/band/619ea78bd9b171af1ce6e328/configurations/wedding/2029-10-11?latitude=40.7481792&longitude=-74.0086142&event_place=62%2BChelsea%2BPiers%2BNew%2BYork%2BNY%2B10011%2BUSA"
    },
    {
      "name": "Hudson Yards - Peak",
      "url": "https://star-api.starlightmusic.com/starlightband/api/v1/band/619ea78bd9b171af1ce6e328/configurations/wedding/2029-10-11?latitude=40.7539962&longitude=-74.0010727&event_place=30%2BHudson%2BYards%2B101st%2Bfloor%2BNew%2BYork%2BNY%2B10001%2BUSA"
    },
    {
      "name": "Plaza Hotel",
      "url": "https://star-api.starlightmusic.com/starlightband/api/v1/band/619ea78bd9b171af1ce6e328/configurations/wedding/2029-10-11?latitude=40.7646318&longitude=-73.9743251&event_place=768%2B5th%2BAve%2BNew%2BYork%2BNY%2B10019%2BUSA"
    },
    {
      "name": "Rainbow Room",
      "url": "https://star-api.starlightmusic.com/starlightband/api/v1/band/619ea78bd9b171af1ce6e328/configurations/wedding/2029-10-11?latitude=40.7593331&longitude=-73.9795094&event_place=30%2BRockefeller%2BPlaza%2B65th%2BFloor%2BNew%2BYork%2BNY%2B10112%2BUSA"
    },
    {
      "name": "Ritz Carlton/Philadelphia",
      "url": "https://star-api.starlightmusic.com/starlightband/api/v1/band/619ea78bd9b171af1ce6e328/configurations/wedding/2029-10-11?latitude=39.95144560000001&longitude=-75.1641494&event_place=10%2BAve%2BOf%2BThe%2BArts%2BPhiladelphia%2BPA%2B19102%2BUSA"
    },
    {
      "name": "Tappan Hill",
      "url": "https://star-api.starlightmusic.com/starlightband/api/v1/band/619ea78bd9b171af1ce6e328/configurations/wedding/2029-10-11?latitude=41.0719326&longitude=-73.8536238&event_place=81%2BHighland%2BAve%2BTarrytown%2BNY%2B10591%2BUSA"
    },
    {
      "name": "The Loading Dock- Stamford, CT",
      "url": "https://star-api.starlightmusic.com/starlightband/api/v1/band/619ea78bd9b171af1ce6e328/configurations/wedding/2029-10-11?latitude=41.0364835&longitude=-73.5533899&event_place=375%2BFairfield%2BAve%2BStamford%2BCT%2B06902%2BUSA"
    },
    {
      "name": "The Piermont - LI",
      "url": "https://star-api.starlightmusic.com/starlightband/api/v1/band/619ea78bd9b171af1ce6e328/configurations/wedding/2029-10-11?latitude=40.685125&longitude=-73.3156679&event_place=494%2BFire%2BIsland%2BAve%2BBabylon%2BNY%2B11702%2BUSA"
    }
  ];

  // Array of venues with no commission
  const venuesNoCommission = [{
    "name": "Gotham Hall",
    "url": "https://star-api.starlightmusic.com/starlightband/api/v1/band/619ea78bd9b171af1ce6e328/configurations/wedding/2029-10-11?latitude=40.7516243&longitude=-73.987325&event_place=Gotham%2BHall%2B1356%2BBroadway%2BNew%2BYork%2BNY%2B10018%2BUSA"
  }];

  // For each venue, test that the commission is greater than 0%
  venues.forEach(venue => {
    it(`${venue.name} commission should be greater than 0%`, function () {
      const url = venue.url

      cy.request('GET', url)
        .then((response) => {
          expect(response.status).to.eq(200)
          // Check that the total commission, venue commission, and additional venue commission are all greater than 0
          expect(response.body.commission.totalCommission).to.be.greaterThan(0)
          expect(response.body.commission.venue).to.be.greaterThan(0)
          expect(response.body.commission.venueAdditional).to.be.greaterThan(0)
        })
    })
  })

  // For each venue with no commission, test that the commission is equal to 0%
  venuesNoCommission.forEach(venue => {
    it(`Anti-check: ${venue.name} commission should be equal to 0%`, function () {
      const url = venue.url

      cy.request('GET', url)
        .then((response) => {
          expect(response.status).to.eq(200)
          // Check that the total commission, venue commission, and additional venue commission are all equal to 0
          expect(response.body.commission.totalCommission).to.eq(0)
          expect(response.body.commission.venue).to.eq(0)
          expect(response.body.commission.venueAdditional).to.eq(0)
        })
    })
  })
})