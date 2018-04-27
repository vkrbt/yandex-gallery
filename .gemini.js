module.exports = {
  rootUrl: 'http://localhost:3000',
  gridUrl: 'http://127.0.0.1:4444/wd/hub',
  windowSize: '1700x800',
  sessionRequestTimeout: 20000,
  httpTimeout: 5000,
  browsers: {
    chrome: {
      calibrate: false,
      screenshotsDir: './gh-screens',
      desiredCapabilities: {
        browserName: 'chrome',
      },
      compositeImage: true,
    },
  },
};
