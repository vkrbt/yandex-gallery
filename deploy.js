const env = require('dotenv').config();
const ghpages = require('gh-pages');

ghpages.publish(
  'build',
  {
    branch: 'gh-pages',
    repo: `https://${process.env.GH_TOKEN}@github.com/vkrbt/yandex-gallery.git`,
  },
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Sucessfully deployed!');
    }
  },
);
