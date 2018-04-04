const env = require('dotenv').config();
const ghpages = require('gh-pages');

ghpages.publish(
  'build',
  {
    branch: 'gh-pages',
    repo: `https://${process.env.GITHUB_TOKEN}@github.com/vkrbt/yandex-gallery.git`,
  },
  err => {
    if (err) {
      throw err;
    } else {
      console.log('Sucсessfully deployed!');
    }
  },
);
