module.exports = {
  rootUrl: 'http://localhost:3000',
  gridUrl: 'http://127.0.0.1:4444/wd/hub',

  browsers: {
    chrome: {
      calibrate: false,
      httpTimeout: 5000,
      screenshotsDir: './screens',
      desiredCapabilities: {
        browserName: 'chrome',
      },
      compositeImage: true,
    },
  },
};
