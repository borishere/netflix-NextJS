// module.exports = {
//   images: {
//     domains: ['assets.example.com']
//   }
// };

const withImages = require('next-images');

module.exports = withImages({
  esModule: true,
  webpack(config, options) {
    return config;
  }
});
