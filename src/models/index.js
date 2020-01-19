const mongoose = require("mongoose");
const mongoDB ="mongodb+srv://minotad66:tisuca66@cluster0-gqkom.mongodb.net/test?retryWrites=true&w=majority";

const ChatSchema  = require("./chat");

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, error => {
  !error
    ? console.log("Conexión exitosa")
    : console.log(error);
});

module.exports = ChatSchema;
