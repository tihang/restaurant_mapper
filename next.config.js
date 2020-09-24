module.exports = {
  serverRuntimeConfig: {
    //   // Will only be available on the server side
    YELP_API_KEY: process.env.YELP_API_KEY,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    MapboxAccessToken: process.env.MapboxAccessToken,
  },
};
