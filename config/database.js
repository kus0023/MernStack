const mongoose = require("mongoose");

const dbString = process.env.DBSTRING;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};

mongoose.connect(dbString, options, function (err) {
  if (err) console.log(err);

  console.log("Connected to Database...");
});
