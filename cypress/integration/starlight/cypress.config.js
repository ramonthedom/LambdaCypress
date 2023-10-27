module.exports = {
  // e2e: {

  setupNodeEvents(on, config) {
    // implement node event listeners here
    on('before:browser:launch', (browser, launchOptions) => {
      if (browser.name === 'electron') {
        launchOptions.preferences
      }
    })
  },
  experimentalSessionAndOrigin: true,
  // },
}
