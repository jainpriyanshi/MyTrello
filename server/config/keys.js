module.exports = {
  mongoURI: process.env.MONGOLAB_URI || "mongodb://localhost:27017",
  secretOrKey: process.env.SECRET || "secret"
  };