gemini.suite('Gallery desktop', suite => {
  suite
    .setUrl('/')
    .before(actions => {
      actions.waitForElementToShow('.image-tile');
    })
    .setCaptureElements('.images')
    .ignoreElements({ every: '.image-tile' })
    .capture('plain');
});

gemini.suite('Gallery mobile', suite => {
  suite
    .setUrl('/')
    .before(actions => {
      actions.setWindowSize(360, 640);
      actions.waitForElementToShow('.image-tile');
    })
    .setCaptureElements('.images')
    .ignoreElements({ every: '.image-tile' })
    .capture('plain');
});
