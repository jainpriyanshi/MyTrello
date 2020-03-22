const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const ListSchema = new Schema({
      name: {
          type: String
      },
      task: [{
          name: {
              type: String
          },
          completed: {
              type: Boolean
          }
      }]
});

module.exports = List = mongoose.model("list",ListSchema);