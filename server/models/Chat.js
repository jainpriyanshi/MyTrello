const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const ChatSchema = new Schema({
      name: {
          type: String
      },
      text: {
          type: String
      },
      boardid: {
          type: String
      }
});

module.exports = Chat = mongoose.model("chat",ChatSchema);