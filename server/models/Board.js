const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const BoardSchema = new Schema({
      name: {
          type: String
      },
      list: [{
          name: {
              type: String
          },
          listid: {
             type: String
          },
          state: {
              type: String
          }
      }]
});

module.exports = Board = mongoose.model("board",BoardSchema);