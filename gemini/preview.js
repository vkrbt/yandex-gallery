gemini.suite('Preview desktop', suite => {
  suite
    .setUrl('/')
    .before(actions => {
      actions.waitForElementToShow('.image-tile');
      actions.click('.image-tile');
      actions.waitForElementToShow('.preview__image');
    })
    .setCaptureElements('.modal-overlay')
    .ignoreElements({ every: '.preview__image' })
    .capture('plain');
});

gemini.suite('Preview mobile', suite => {
  suite
    .setUrl('/')
    .before(actions => {
      actions.setWindowSize(360, 640);
      actions.waitForElementToShow('.image-tile');
      actions.click('.image-tile');
      actions.waitForElementToShow('.preview__image');
    })
    .setCaptureElements('.modal-overlay')
    .ignoreElements({ every: '.preview__image' })
    .capture('plain');
});
